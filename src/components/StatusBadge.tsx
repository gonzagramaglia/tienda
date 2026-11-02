import { ProductStatus } from '@/types'

interface StatusBadgeProps {
  status: ProductStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'disponible') {
    return null
  }

  const isSold = status === 'vendido'

  return (
    <span
      className={`text-[11px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-soft ${
        isSold
          ? 'bg-black text-white'
          : 'bg-white text-ui-fg-base border border-ui-border-base'
      }`}
    >
      {isSold ? 'Vendido' : 'Reservado'}
    </span>
  )
}
