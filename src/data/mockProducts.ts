import { Product, SiteSettings } from '@/types'

export const defaultSiteSettings: SiteSettings = {
  title: 'Tienda Personal de Gonza',
  subtitle: 'Artículos propios cuidados y en excelente estado. Se prueban y retiran en persona.',
  whatsappNumber: '5493515490431',
  location: 'Ciudad Universitaria, Córdoba Capital',
}

export const mockProducts: Product[] = [
  {
    _id: 'mock-1',
    title: 'Sony PlayStation 5 con 2 Joysticks DualSense',
    slug: { current: 'sony-playstation-5-dualsense' },
    price: 780000,
    currency: 'ARS',
    status: 'disponible',
    condition: 'Como nuevo / Impecable',
    category: 'Consolas y Videojuegos',
    featured: true,
    description:
      'PlayStation 5 versión con lectora de discos (825 GB). Incluye dos joysticks DualSense originales impecables, cable HDMI ultra high speed, cable de alimentación y base original. Muy poco uso, caja completa.',
    mercadolibreUrl: 'https://articulo.mercadolibre.com.ar/MLA-sony-playstation-5',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80',
        alt: 'PlayStation 5 con joystick',
      },
      {
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Control DualSense',
      },
    ],
  },
  {
    _id: 'mock-2',
    title: 'Monitor Dell UltraSharp 27" 4K USB-C (U2720Q)',
    slug: { current: 'monitor-dell-ultrasharp-27-4k' },
    price: 650,
    currency: 'USD',
    status: 'disponible',
    condition: 'Usado - Excelente estado',
    category: 'Tecnología y Computación',
    featured: true,
    description:
      'Monitor profesional Dell UltraSharp 27 pulgadas resolución 4K UHD (3840 x 2160), panel IPS con 99% sRGB y 95% DCI-P3. Carga notebooks por USB-C (90W). Base regulable en altura y rotación.',
    mercadolibreUrl: '', // Probará la búsqueda automática en ML
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
        alt: 'Monitor de escritorio',
      },
    ],
  },
  {
    _id: 'mock-3',
    title: 'Bicicleta Mountain Bike Venzo Talon R29 Talle M',
    slug: { current: 'bicicleta-mountain-bike-venzo-talon-r29' },
    price: 340000,
    currency: 'ARS',
    status: 'reservado',
    condition: 'Usado - Buen estado',
    category: 'Deportes y Bicicletas',
    featured: false,
    description:
      'Rodado 29, cuadro de aluminio 6061, 24 velocidades Shimano, frenos a disco hidráulicos Shimano, suspensión delantera con bloqueo al manubrio. Cubiertas con medio año de uso.',
    mercadolibreUrl: '',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Bicicleta Mountain Bike',
      },
    ],
  },
  {
    _id: 'mock-4',
    title: 'Silla Ergonómica de Oficina Rolic Cool Mesh',
    slug: { current: 'silla-ergonomica-rolic-cool-mesh' },
    price: 190000,
    currency: 'ARS',
    status: 'vendido',
    condition: 'Usado - Excelente estado',
    category: 'Muebles y Hogar',
    featured: false,
    description:
      'Silla ergonómica con respaldo de malla respirable, soporte lumbar regulable, apoyabrazos 3D y mecanismo sincro multiposición.',
    mercadolibreUrl: '',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
        alt: 'Silla de oficina ergonómica',
      },
    ],
  },
]

