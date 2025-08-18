// src/components/ui/slot.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    const child = React.Children.only(children) as React.ReactElement<any>
    return React.cloneElement(child, {
      ...props,
      ref,
      className: cn(child.props.className, className),
    })
  }
)
Slot.displayName = "Slot"
