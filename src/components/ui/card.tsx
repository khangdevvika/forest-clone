import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva("bg-card text-card-foreground rounded-xl border border-border shadow-sm", {
  variants: {
    variant: {
      default: "",
      interactive: "cursor-pointer hover:border-primary/40 hover:bg-accent/5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-500",
      glass: "bg-white/70 border border-white/90 backdrop-blur-xl shadow-xl shadow-sage-900/5",
      "glass-dark": "bg-black/40 border border-white/20 backdrop-blur-xl shadow-2xl shadow-black/20",
      muted: "bg-muted/30 border border-border/10",
      active: "ring-2 ring-primary border-primary/40 bg-accent/5",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "none",
  },
})

interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
  return <div data-slot="card" className={cn(cardVariants({ variant, padding, className }))} {...props} />
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold tracking-tight", className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-6 pt-0", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
