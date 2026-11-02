import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configuración de la Tienda',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Catálogo',
      type: 'string',
      initialValue: 'Tienda Personal de Gonza',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Breve descripción',
      type: 'text',
      rows: 2,
      initialValue: 'Artículos propios cuidados y en excelente estado. Se prueban y retiran en persona.',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp (con código de país)',
      type: 'string',
      description: 'Ej: 5493515490431 (código de país 54 + 9 + característica sin 0 ni 15)',
      initialValue: '5493515490431',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación / Zona de entrega',
      type: 'string',
      initialValue: 'Ciudad Universitaria, Córdoba Capital',
    }),
  ],
})

