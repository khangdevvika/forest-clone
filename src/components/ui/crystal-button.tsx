import React from "react"
import { cn } from "@/lib/utils"

export type CrystalButtonVariant = "primary" | "secondary" | "warning" | "danger" | "ghost" | "blue" | "outline" | "brown"

export type CrystalButtonSize = "sm" | "md" | "lg" | "xl" | "icon"

export type CrystalButtonRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"

const variantStyles: Record<CrystalButtonVariant, { face: string; shadow: string }> = {
  primary: { face: "bg-primary text-primary-foreground", shadow: "bg-primary/70" },
  secondary: { face: "bg-violet-500 text-white", shadow: "bg-violet-800" },
  warning: { face: "bg-amber-400 text-amber-900", shadow: "bg-amber-600" },
  danger: { face: "bg-red-500 text-white", shadow: "bg-red-800" },
  ghost: { face: "bg-white/15 text-white", shadow: "bg-black/40" },
  blue: { face: "bg-blue-500 text-white", shadow: "bg-blue-800" },
  outline: { face: "bg-card text-foreground border border-border", shadow: "bg-border" },
  brown: { face: "bg-amber-800 text-amber-100", shadow: "bg-amber-950" },
}

const sizeStyles: Record<CrystalButtonSize, string> = {
  sm: "h-8  px-3  text-xs",
  md: "h-10 px-6  text-sm",
  lg: "h-12 px-8  text-base",
  xl: "h-14 px-10 text-lg",
  icon: "h-10 w-10  p-0",
}

const radiusStyles: Record<CrystalButtonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
}

const DefaultSpinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

export interface CrystalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CrystalButtonVariant
  size?: CrystalButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  radius?: CrystalButtonRadius
  isLoading?: boolean
  loadingSpinner?: React.ReactNode
  loadingText?: string
  fullWidth?: boolean
}

export const CrystalButton = React.forwardRef<HTMLButtonElement, CrystalButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      radius = "xl",
      children,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingSpinner,
      loadingText,
      fullWidth = false,
      disabled,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading
    const spinner = loadingSpinner ?? <DefaultSpinner />
    const { face, shadow } = variantStyles[variant]

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          // Wrapper: chứa cả face + shadow, không có bg, không có border
          // height = face height + depth (shadow nhô ra phía dưới)
          "group relative cursor-pointer select-none",
          "border-none bg-transparent p-0 outline-none",
          radiusStyles[radius],
          fullWidth && "w-full",
          isDisabled && "pointer-events-none opacity-50",
          className,
        )}
        {...rest}
      >
        {/* ── Shadow layer: cố định, không di chuyển, bằng đúng kích thước wrapper ── */}
        <div aria-hidden="true" className={cn("absolute inset-0 size-full", radiusStyles[radius], sizeStyles[size], shadow, "translate-y-2")} />

        {/* ── Face layer: nổi lên trên shadow, translate xuống khi active ── */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-2",
            "size-full font-semibold",
            radiusStyles[radius],
            "select-none whitespace-nowrap",
            "active:translate-y-2",
            "transition-transform duration-80 ease-out",
            "group-hover:brightness-110",
            face,
            sizeStyles[size],
          )}
        >
          {isLoading ? (
            <>
              {spinner}
              {loadingText ?? children}
            </>
          ) : (
            <>
              {leftIcon && <span className="shrink-0">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="shrink-0">{rightIcon}</span>}
            </>
          )}
        </div>
      </button>
    )
  },
)

CrystalButton.displayName = "CrystalButton"
