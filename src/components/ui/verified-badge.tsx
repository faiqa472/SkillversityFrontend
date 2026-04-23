import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  title?: string;
}

const sizeMap = {
  sm: { svg: "h-4 w-4", viewBox: "0 0 24 24" },
  md: { svg: "h-5 w-5", viewBox: "0 0 24 24" },
  lg: { svg: "h-6 w-6", viewBox: "0 0 24 24" },
};

/**
 * Blue Verified Badge - For Verified Tutors
 * Twitter/X style - Blue hexagonal badge with white checkmark
 */
export function VerifiedBadge({ className, size = "md", title = "Verified" }: VerifiedBadgeProps) {
  const { svg } = sizeMap[size];
  return (
    <svg
      viewBox="0 0 22 22"
      className={cn(svg, "inline-block flex-shrink-0", className)}
      aria-label={title}
    >
      <title>{title}</title>
      <g>
        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D9BF0" />
          <stop offset="100%" stopColor="#1A8CD8" />
        </linearGradient>
        <path
          fill="url(#blue-gradient)"
          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
        />
        <path
          fill="#fff"
          d="M9.64 15.67l-3.47-3.47 1.06-1.06 2.41 2.41 5.14-5.14 1.06 1.06-6.2 6.2z"
        />
      </g>
    </svg>
  );
}


/**
 * Gold/Premium Badge - For Sponsors & Premium Users
 * Gold hexagonal badge with white checkmark
 */
export function GoldVerifiedBadge({ className, size = "md", title = "Premium" }: VerifiedBadgeProps) {
  const { svg } = sizeMap[size];
  return (
    <svg
      viewBox="0 0 22 22"
      className={cn(svg, "inline-block flex-shrink-0", className)}
      aria-label={title}
    >
      <title>{title}</title>
      <g>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5B800" />
          <stop offset="50%" stopColor="#E5A800" />
          <stop offset="100%" stopColor="#D4990A" />
        </linearGradient>
        <path
          fill="url(#gold-gradient)"
          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
        />
        <path
          fill="#fff"
          d="M9.64 15.67l-3.47-3.47 1.06-1.06 2.41 2.41 5.14-5.14 1.06 1.06-6.2 6.2z"
        />
      </g>
    </svg>
  );
}

/**
 * Official/Platform Badge - For SkillVersity Official Content
 * Purple/Violet hexagonal badge with star icon
 */
export function OfficialBadge({ className, size = "md", title = "Official" }: VerifiedBadgeProps) {
  const { svg } = sizeMap[size];
  return (
    <svg
      viewBox="0 0 22 22"
      className={cn(svg, "inline-block flex-shrink-0", className)}
      aria-label={title}
    >
      <title>{title}</title>
      <g>
        <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <path
          fill="url(#purple-gradient)"
          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
        />
        {/* Star icon for official */}
        <path
          fill="#fff"
          d="M11 5.5l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z"
        />
      </g>
    </svg>
  );
}


/**
 * Company Badge - For Verified Companies/Organizations
 * Teal/Green hexagonal badge with building icon
 */
export function CompanyBadge({ className, size = "md", title = "Verified Company" }: VerifiedBadgeProps) {
  const { svg } = sizeMap[size];
  return (
    <svg
      viewBox="0 0 22 22"
      className={cn(svg, "inline-block flex-shrink-0", className)}
      aria-label={title}
    >
      <title>{title}</title>
      <g>
        <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <path
          fill="url(#teal-gradient)"
          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681.132-.637.075-1.299-.165-1.903.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"
        />
        {/* Building/Company icon */}
        <path
          fill="#fff"
          d="M7 6h3v10H7V6zm5 3h3v7h-3V9zm-6 7h12v1H6v-1z"
        />
      </g>
    </svg>
  );
}

/**
 * Helper to get the right badge based on user type
 */
export type BadgeType = "tutor" | "company" | "platform" | "sponsor" | "learner";

export function getUserBadge(type: BadgeType, size: "sm" | "md" | "lg" = "sm") {
  switch (type) {
    case "tutor":
      return <VerifiedBadge size={size} title="Verified Tutor" />;
    case "company":
      return <CompanyBadge size={size} title="Verified Company" />;
    case "platform":
      return <OfficialBadge size={size} title="Official SkillVersity" />;
    case "sponsor":
      return <GoldVerifiedBadge size={size} title="Sponsor" />;
    default:
      return null;
  }
}
