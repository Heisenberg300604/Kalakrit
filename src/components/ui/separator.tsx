import * as React from "react"

import { cn } from "@/lib/utils"

type SeparatorProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-border"
          : "h-full w-px bg-border",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

