import { cn } from "@workspace/ui/lib/utils";

interface ShinyTextProps {
  children: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText = ({
  children,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) => {
  const animationDuration = `${speed}s`;

  return (
    <>
      <style>
        {`
      @keyframes shine {
        0% {
          background-position: 100%;
        }
        100% {
          background-position: -100%;
        }
      }
      `}
      </style>
      <p
        className={cn(
          "text-white/70 bg-clip-text inline-block",
          disabled ? "" : "animate-shine",
          className,
        )}
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          animationName: "shine",
          animationDuration: animationDuration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {children}
      </p>
    </>
  );
};
