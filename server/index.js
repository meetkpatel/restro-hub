require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

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
app.delete('/api/delete/category/:id', (req, res, next) => {
  const deleteId = parseInt(req.params.id, 10);
  const sql = `delete from "category"
              where "categoryId" = $1
              returning * `;
  const params = [deleteId];

  db.query(sql, params)
    .then(result => {
      const menuRow = result.rows;
      res.json(menuRow);
    })
    .catch(err => next(err));
});

app.post('/api/add/category', (req, res, next) => {
  const { addcategory } = req.body;

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

app.post('/api/add/fooditem', uploadsMiddleware, (req, res, next) => {
  const { categoryselect, itemName, itemPrice, itemDesc } = req.body;
  const catid = parseInt(categoryselect);
  const url = '/images' + '/' + req.file.filename;
  const sql = `
    insert into "items" ("itemName", "itemDescription","itemPrice","categoryId","itemImg")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [itemName, itemDesc, itemPrice, catid, url];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      res.status(201).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/get/menu', (req, res, next) => {
  const sql = `with "itemsWithCategory" as (
  select *
  from "category"
  join "items" using ("categoryId") )
  SELECT "categoryName", "categoryId", JSON_AGG("itemsWithCategory".*) FROM "itemsWithCategory" group by "categoryName","categoryId"`;
  db.query(sql)
    .then(result => {
      const menuRow = result.rows;
      res.json(menuRow);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
