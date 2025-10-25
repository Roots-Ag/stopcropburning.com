import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'th', type: 'string', title: 'Thai' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'th', type: 'text', title: 'Thai' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedContent',
      title: 'Detailed Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'block' }],
        },
        {
          name: 'th',
          type: 'array',
          title: 'Thai',
          of: [{ type: 'block' }],
        },
      ],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon identifier',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Agricultural Practice', value: 'agricultural' },
          { title: 'Technology', value: 'technology' },
          { title: 'Policy', value: 'policy' },
          { title: 'Economic', value: 'economic' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
      category: 'category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});
