import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Image
        src="/logo.png"
        alt="1Grow"
        className="h-10 w-10 rounded-xl object-contain"
        width={40}
        height={40}
        priority
      />
      {showWordmark && (
        <span className="font-heading text-xl font-bold tracking-tight">
          1<span className="text-gradient">Grow</span>
        </span>
      )}
    </span>
  )
}
