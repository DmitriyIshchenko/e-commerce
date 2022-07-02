import { rest, setupWorker } from 'msw';
import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

const NUM_PRODUCTS = 20;

export const db = factory({
  product: {
    id: primaryKey(nanoid),
    name: String,
    description: String,
    price: Number,
    rating: Number,
  },
});

const createProduct = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(100, 999, 2),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

for (let i = 0; i < NUM_PRODUCTS; i += 1) {
  const newProduct = createProduct();
  db.product.create(newProduct);
}

export const handlers = [
  rest.get('/fakeApi/products', (req, res, ctx) => {
    const products = db.product.getAll();
    return res(ctx.json(products));
  }),
];

export const worker = setupWorker(...handlers);
