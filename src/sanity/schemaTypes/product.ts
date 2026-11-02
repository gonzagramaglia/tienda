import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  icon: () => '📦',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del producto',
      type: 'string',
      description: 'Ej: PlayStation 5 con 2 joysticks, Bicicleta Mountain Bike R29',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Identificador / URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      description: 'Monto numérico sin puntos ni símbolos (ej: 450000)',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
      initialValue: 'ARS',
      options: {
        list: [
          { title: 'Pesos Argentinos ($ ARS)', value: 'ARS' },
          { title: 'Dólares Estadounidenses (US$ USD)', value: 'USD' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado de disponibilidad',
      type: 'string',
      initialValue: 'disponible',
      options: {
        list: [
          { title: '🟢 Disponible para la venta', value: 'disponible' },
          { title: '🟡 Reservado / En conversación', value: 'reservado' },
          { title: '🔴 Ya vendido', value: 'vendido' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Condición del artículo',
      type: 'string',
      initialValue: 'Usado - Excelente estado',
      options: {
        list: [
          'Nuevo en caja sellada',
          'Como nuevo / Sin detalles',
          'Usado - Excelente estado',
          'Usado - Buen estado',
          'Para repuesto / Con detalles',
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Fotos del producto',
      type: 'array',
      description: 'Subí una o más fotos reales. La primera se usará como portada.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Descripción breve de la foto',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Debe incluir al menos una foto'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción detallada',
      type: 'text',
      rows: 5,
      description: 'Detalles del producto, tiempo de uso, accesorios incluidos, forma de entrega, etc.',
    }),
    defineField({
      name: 'mercadolibreUrl',
      title: 'Enlace a Mercado Libre',
      type: 'url',
      description: 'Opcional. Si tenés una publicación activa en ML o una de referencia, poné el link aquí. Si lo dejás vacío, el botón buscará automáticamente este producto en Mercado Libre.',
    }),
    defineField({
      name: 'whatsappCustomMessage',
      title: 'Mensaje personalizado para WhatsApp',
      type: 'string',
      placeholder: 'Ej: Hola! Me interesa la tablet lenovo M11 que vendés en tu tienda',
      description: 'Opcional. Por ejemplo: "Hola! Me interesa la tablet lenovo M11 que vendés en tu tienda"',
    }),
    defineField({
      name: 'featured',
      title: '¿Destacar en la parte superior?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      currency: 'currency',
      status: 'status',
      media: 'images.0',
    },
    prepare({ title, price, currency, status, media }) {
      const statusIcons: Record<string, string> = {
        disponible: '🟢',
        reservado: '🟡',
        vendido: '🔴',
      }
      const icon = statusIcons[status || 'disponible'] || '📦'
      const formattedPrice = price
        ? `${currency === 'USD' ? 'US$' : '$'} ${new Intl.NumberFormat('es-AR').format(price)}`
        : 'Sin precio'

      return {
        title: `${icon} ${title || 'Sin título'}`,
        subtitle: `${formattedPrice} • ${status || 'disponible'}`,
        media,
      }
    },
  },
})

