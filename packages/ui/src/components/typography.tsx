import { cn } from "@workspace/ui/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

import type { ComponentProps } from "react";

export const H1 = ({ className, children, ...props }: ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "text-3xl text-foreground font-bold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ className, children, ...props }: ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "text-2xl text-foreground font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ className, children, ...props }: ComponentProps<"h3">) => {
  return (
    <h3
      className={cn(
        "text-xl text-foreground font-medium tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ className, children, ...props }: ComponentProps<"h4">) => {
  return (
    <h4
      className={cn(
        "text-lg text-foreground font-medium tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

export const H5 = ({ className, children, ...props }: ComponentProps<"h5">) => {
  return (
    <h5
      className={cn(
        "text-base text-foreground font-medium tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h5>
  );
};

const paragraphVariants = cva("", {
  variants: {
    variant: {
      default: "text-sm text-foreground/80",
      caption: "text-xs text-foreground/50",
      error: "text-sm text-red-500",
      success: "text-sm text-green-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const P = ({
  className,
  children,
  variant,
  ...props
}: ComponentProps<"p"> & VariantProps<typeof paragraphVariants>) => {
  return (
    <p className={cn(paragraphVariants({ variant }), className)} {...props}>
      {children}
    </p>
  );
};
