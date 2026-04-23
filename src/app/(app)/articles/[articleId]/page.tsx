"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ArticleDetailPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          
          <Badge className="mb-4 bg-yellow-500 text-yellow-950">
            Coming Soon
          </Badge>
          
          <h1 className="text-2xl font-bold">Article Reader</h1>
          <p className="mt-2 text-muted-foreground max-w-md">
            The article reading experience is being built. Soon you&apos;ll be able to read, 
            bookmark, and share articles from the community.
          </p>
          
          <div className="mt-8 flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/articles">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
