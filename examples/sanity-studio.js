// examples/sanity-studio.js
// Sanity Studio integration with Contact BioSolutions brand kit

// sanity.config.ts
export const sanityConfig = `
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Import brand styles
import '@contact-biosolutions/firehawk-brand-kit/css/base.css'

export default defineConfig({
  name: 'agronomy-central',
  title: 'Agronomy Central',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      layout: (props) => {
        return (
          <div className="min-h-screen bg-neutral-50">
            {props.renderDefault(props)}
          </div>
        )
      },
      navbar: (props) => {
        return (
          <div className="bg-primary-600 text-white">
            <div className="px-4 py-3">
              <h1 className="text-lg font-semibold">Contact BioSolutions CMS</h1>
            </div>
            {props.renderDefault(props)}
          </div>
        )
      }
    }
  },

  theme: {
    // Use brand colors in Sanity theme
    color: {
      light: {
        primary: {
          base: '#0284c7', // primary-600
          dark: '#0369a1',  // primary-700
        },
        secondary: {
          base: '#64748b', // secondary-500
        }
      }
    }
  }
})
`;

// Custom Sanity components with brand styling
export const customComponents = `
// components/CustomStringInput.tsx
import { StringInputProps } from 'sanity'
import { TextInput } from '@sanity/ui'

export function CustomStringInput(props: StringInputProps) {
  return (
    <TextInput
      {...props.elementProps}
      className="border-neutral-200 focus:border-primary-500 focus:ring-primary-500"
    />
  )
}

// components/BrandedPreview.tsx
import { PreviewProps } from 'sanity'

export function BrandedPreview(props: PreviewProps) {
  return (
    <div className="p-4 bg-white border border-neutral-200 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 rounded-full bg-primary-500"></div>
        <h3 className="font-medium text-neutral-900">{props.title}</h3>
      </div>
      {props.subtitle && (
        <p className="text-sm text-neutral-600">{props.subtitle}</p>
      )}
      {props.description && (
        <p className="text-xs text-neutral-500 mt-2">{props.description}</p>
      )}
    </div>
  )
}

// components/CustomDocument.tsx
export function CustomDocument(props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
        <div className="border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-500"></div>
            <h1 className="text-lg font-semibold text-neutral-900">
              Document Editor
            </h1>
          </div>
        </div>
        <div className="p-6">
          {props.renderDefault(props)}
        </div>
      </div>
    </div>
  )
}
`;

// Schema with brand-aware field configurations
export const brandedSchemas = `
// schemas/article.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      description: 'excerpt'
    },
    // Use custom branded preview
    component: BrandedPreview
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      // Custom styling
      components: {
        input: CustomStringInput
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        // Brand colors for category pills
        layout: 'tags'
      }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Brand Highlight', value: 'brandHighlight' }
            ]
          }
        }
      ]
    })
  ]
})

// schemas/category.ts
export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' }
        ]
      }
    })
  ]
})
`;

// Desk structure with brand organization
export const deskStructure = `
// deskStructure.ts
import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Brand-organized content sections
      S.listItem()
        .title('📝 Content')
        .child(
          S.list()
            .title('Content Types')
            .items([
              S.listItem()
                .title('Articles')
                .child(
                  S.documentTypeList('article')
                    .title('Articles')
                    .filter('_type == "article"')
                )
            ])
        ),
      
      S.listItem()
        .title('🏷️ Organization')
        .child(
          S.list()
            .title('Organization')
            .items([
              S.listItem()
                .title('Categories')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                )
            ])
        ),
      
      S.listItem()
        .title('⚙️ Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Brand Settings')
                .child(
                  S.document()
                    .schemaType('brandSettings')
                    .documentId('brandSettings')
                )
            ])
        )
    ])
`;