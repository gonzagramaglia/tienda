interface WhatsAppLinkParams {
  phoneNumber: string
  productTitle: string
  price?: number
  currency?: string
  customMessage?: string
}

export function buildWhatsAppLink({
  phoneNumber,
  productTitle,
  price,
  currency = 'ARS',
  customMessage,
}: WhatsAppLinkParams): string {
  const cleanPhone = (phoneNumber || '5493515490431').replace(/\D/g, '')

  if (customMessage && customMessage.trim().length > 0) {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage.trim())}`
  }

  const priceText = price
    ? ` (${currency === 'USD' ? 'US$' : '$'} ${new Intl.NumberFormat('es-AR').format(price)})`
    : ''

  const message = `Hola! Me interesa *${productTitle}* que vendés en tu tienda`

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
