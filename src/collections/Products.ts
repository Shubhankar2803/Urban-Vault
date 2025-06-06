import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    fields: [

        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'text',
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            admin:{
                description: 'Price in USD',
            }
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media', // Assuming you have a media collection for images
            required: true,
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories', 
          hasMany: false, 

        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags', 
            hasMany: true, 
        },
        {
            name: 'inStock',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'rating',
            type: 'number',
            min: 0,
            max: 5,
            defaultValue: 0,
        },
        {
            name: 'reviewsCount',
            type: 'number',
            defaultValue: 0,
        },
        {
            name:"refundPolicy",
            type:"select",
            options:["30-day", "14-day", "7-day","7-day","1-day", "No Refund"],
            defaultValue:"30-day",
        }
    ]
}