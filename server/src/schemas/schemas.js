const Card = {
  type: 'object',
  required: [
    '_id',
    'title',
    'price',
    'category',
    'count',
    'description',
    'phoneNumber',
    'currency',
    'name',
    'location',
    'images',
    'status',
    'type',
  ],
  properties: {
    _id: {
      type: 'string',
      // pattern: '^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$',
    },
    title: {
      type: 'string',
      maxLength: 175,
    },
    description: {
      type: 'string',
      maxLength: 175,
    },
    price: {
      type: 'number',
      maxLength: 8,
    },
    category: {
      type: 'string',
      enum: ['paper', 'plastic', 'glass', 'metal'],
    },
    phoneNumber: {
      type: 'number',
      maxLength: 12,
      minimum: 10,
    },
    location: {
      type: 'string',
      maxLength: 255,
    },
    currency: {
      type: 'string',
    },
    name: {
      type: 'string',
      maxLength: 50,
    },
    count: {
      type: 'number',
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          originalName: { type: 'string' },
        },
      },
    },
    status: {
      type: 'string',
      enum: ['Active', 'Pending', 'Rejected'],
    },
    type: {
      type: 'string',
      enum: ['buy', 'sell', 'free'],
    },
    createdAt: {
      type: 'string',
    },
  },
};

export default Card;
