import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "cn";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-red-700/40 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-red-700 text-white hover:bg-red-800",
        outline: "border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        ghost: "text-gray-700 hover:bg-gray-100",
        destructive: "bg-red-700 text-white hover:bg-red-800",
        link: "text-red-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-1.5 px-3",
        xs: "h-6 gap-1 rounded px-2 text-xs",
        sm: "h-8 gap-1 px-2.5",
        lg: "h-10 gap-1.5 px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = Omit<ButtonPrimitive.Props, "children" | "title"> &
  VariantProps<typeof buttonVariants> & {
    title?: string;
    children?: ReactNode;
    color?: string;
  };

function Button({
  className,
  variant,
  size,
  title,
  children,
  color,
  style,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      style={{ ...style, ...(color ? { backgroundColor: color } : {}) }}
      {...props}
    >
      {title ?? children}
    </ButtonPrimitive>
  );
}

export { Button };
