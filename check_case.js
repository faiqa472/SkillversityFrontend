const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
const dynamicImportRegex = /import\(['"]([^'"]+)['"]\)/g;
const exportRegex = /export\s+.*?\s+from\s+['"]([^'"]+)['"]/g;

let hasError = false;

function checkImport(filePath, importPath) {
  let targetPath;
  if (importPath.startsWith('.')) {
    targetPath = path.resolve(path.dirname(filePath), importPath);
  } else if (importPath.startsWith('@/')) {
    targetPath = path.resolve('./src', importPath.slice(2));
  } else {
    return; // Ignore external packages
  }

  let dirToCheck = path.dirname(targetPath);
  let baseToCheck = path.basename(targetPath);

  if (fs.existsSync(dirToCheck)) {
    let files = fs.readdirSync(dirToCheck);
    let found = files.find(f => {
      let fNoExt = f.replace(/\.(ts|tsx|js|jsx|css|scss|json)$/, '');
      return f === baseToCheck || fNoExt === baseToCheck;
    });
    
    if (found) {
      let foundNoExt = found.replace(/\.(ts|tsx|js|jsx|css|scss|json)$/, '');
      if (found !== baseToCheck && foundNoExt !== baseToCheck) {
        if (found.toLowerCase() === baseToCheck.toLowerCase() || foundNoExt.toLowerCase() === baseToCheck.toLowerCase()) {
          console.error(`Case mismatch in ${filePath}:\n  Import: '${importPath}'\n  Actual: '${found}'\n`);
          hasError = true;
        }
      }
    } else {
        let asDir = path.resolve(dirToCheck, baseToCheck);
        if (fs.existsSync(asDir) && fs.statSync(asDir).isDirectory()) {
            let files = fs.readdirSync(path.dirname(asDir));
            let foundDir = files.find(f => f.toLowerCase() === baseToCheck.toLowerCase() && f !== baseToCheck);
            if (foundDir) {
                console.error(`Case mismatch in ${filePath}:\n  Import: '${importPath}'\n  Actual Dir: '${foundDir}'\n`);
                hasError = true;
            }
        }
    }
  } else {
      let currentDir = dirToCheck;
      let pathSegments = [];
      while (!fs.existsSync(currentDir) && currentDir !== path.parse(currentDir).root) {
          pathSegments.unshift(path.basename(currentDir));
          currentDir = path.dirname(currentDir);
      }
      
      if (fs.existsSync(currentDir) && pathSegments.length > 0) {
          let firstMissing = pathSegments[0];
          let files = fs.readdirSync(currentDir);
          let foundDir = files.find(f => f.toLowerCase() === firstMissing.toLowerCase() && f !== firstMissing);
          if (foundDir) {
             console.error(`Case mismatch in ${filePath}:\n  Import: '${importPath}'\n  Directory path differs: expected '${foundDir}' instead of '${firstMissing}'\n`);
             hasError = true;
          }
      }
  }
}

walkDir('./src', (filePath) => {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    checkImport(filePath, match[1]);
  }
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    checkImport(filePath, match[1]);
  }
  while ((match = exportRegex.exec(content)) !== null) {
    checkImport(filePath, match[1]);
  }
});

if (!hasError) {
  console.log('No case sensitivity issues found.');
}
