import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-navy text-card hover:bg-navy-2",
        leaf: "bg-leaf text-card hover:bg-leaf-2",
        secondary: "bg-card text-ink shadow-[var(--shadow-border)] hover:bg-sage",
        ghost: "bg-transparent text-ink hover:bg-sage/70",
        outline: "border border-line bg-card text-ink hover:bg-sage",
        blush: "bg-blush text-ink hover:bg-blush/80",
        bronze: "bg-bronze text-card hover:bg-bronze/90",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
