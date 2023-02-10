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

const getCount = {
  response: {
    200: {
      type: 'number',
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
      'count',
      'images',
      'type',
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
      count: Card.properties.count,
      images: Card.properties.images,
      type: Card.properties.type,
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
      'count',
      'images',
      'type',
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
      count: Card.properties.count,
      images: Card.properties.images,
      type: Card.properties.type,
    },
  },
};

const updateStatus = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: Card.properties._id,
    },
  },
  body: {
    type: 'object',
    required: ['value'],
    properties: {
      value: Card.properties.status,
    },
  },
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

export default { getCard, createCard, updateStatus, getCount, updateCard, deleteCard, getCards };
