import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/tienda' : '')
const basePath = `${repoBasePath}/studio`

export default defineConfig({
  name: 'default',
  title: 'Panel de Administración - Mis Productos',
  projectId,
  dataset,
  basePath,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
