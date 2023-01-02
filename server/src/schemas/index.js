import Card from './schemas.js';

const getCard = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: Card.properties._id,
    },
  },
  response: {
    200: Card,
  },
};

const getCards = {
  response: {
    200: {
      type: 'array',
      items: Card,
    },
  },
};

const createCard = {
  body: {
    type: 'object',
    required: [
      'title',
      'description',
      'price',
      'category',
      'phoneNumber',
      'location',
      'currency',
      'name',
      'city',
      'count',
      'images',
      'status',
    ],
    properties: {
      title: Card.properties.title,
      description: Card.properties.description,
      price: Card.properties.price,
      category: Card.properties.category,
      phoneNumber: Card.properties.phoneNumber,
      location: Card.properties.location,
      currency: Card.properties.currency,
      name: Card.properties.name,
      city: Card.properties.city,
      count: Card.properties.count,
      images: Card.properties.images,
      status: Card.properties.status,
    },
  },
  response: {
    200: Card,
  },
};

const updateCard = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: Card.properties._id,
    },
  },
  body: {
    type: 'object',
    required: [
      'title',
      'description',
      'price',
      'category',
      'phoneNumber',
      'location',
      'currency',
      'name',
      'city',
      'count',
      'images',
      'status',
    ],
    properties: {
      title: Card.properties.title,
      description: Card.properties.description,
      price: Card.properties.price,
      category: Card.properties.category,
      phoneNumber: Card.properties.phoneNumber,
      location: Card.properties.location,
      currency: Card.properties.currency,
      name: Card.properties.name,
      city: Card.properties.city,
      count: Card.properties.count,
      images: Card.properties.images,
      status: Card.properties.status,
    },
  },
  // response: {
  //   200: Card,
  // },
};

const deleteCard = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: Card.properties._id,
    },
  },
};

export default { getCard, createCard, updateCard, deleteCard, getCards };
