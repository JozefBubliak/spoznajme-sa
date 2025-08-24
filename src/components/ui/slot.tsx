// src/components/ui/slot.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<any, any>
  className?: string
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) return null as any

    // Bezpečne typujeme klonovaný element aj props
    const child = children as React.ReactElement<Record<string, any>>
    const mergedProps: Record<string, any> = {
      ...(props as Record<string, any>),
      className: cn(child.props.className, className),
      ref, // odovzdáme ref – povolíme cez "any" props
    }

    return React.cloneElement(child, mergedProps)
  }
)
Slot.displayName = "Slot"
