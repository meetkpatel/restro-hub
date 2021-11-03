require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/api/get/category', (req, res, next) => {
  const sql = 'select * from "category"';
  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.json(grade);
    })
    .catch(err => next(err));
});
app.get('/api/get/menu', (req, res, next) => {
  const sql = 'select * from "users"';
  db.query(sql)
    .then(result => {
      const menuRow = result.rows;
      res.json(menuRow);
    })
    .catch(err => next(err));
});

app.post('/api/add/category', (req, res, next) => {
  const { addcategory } = req.body;
  if (!addcategory) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
        insert into "category" ("categoryName")
        values ($1)
        returning *
      `;
  const params = [addcategory];
  db.query(sql, params)
    .then(result => {
      const [categoryAdded] = result.rows;
      if (!categoryAdded) {
        throw new ClientError(401, 'invalid login');
      }
      res.json(categoryAdded);
    })
    .catch(err => next(err));
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
