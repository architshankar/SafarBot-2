// import { cn } from "@/lib/utils"

// function Skeleton({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn("animate-pulse rounded-md bg-muted", className)}
//       {...props}
//     />
//   )
// }

// export { Skeleton }

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
