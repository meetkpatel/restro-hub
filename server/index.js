require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

function randomPassword() {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/auth/sign-in', (req, res, next) => {
  const { mobile, password } = req.body;
  if (!mobile || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select *
      from "users"
     where "userNumber" = $1
  `;
  const params = [mobile];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, userNumber, userPassword, userRole } = user;
      return argon2
        .verify(userPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, userNumber, userRole };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.get('/api/get/category', (req, res, next) => {
  const sql = 'select * from "category"';
  db.query(sql)
    .then(result => {
      const cateResult = result.rows;
      res.json(cateResult);
    })
    .catch(err => next(err));
});
app.get('/api/get/waitlist', (req, res, next) => {
  const sql = 'select * from "waitlist"';
  db.query(sql)
    .then(result => {
      const waitListResult = result.rows;
      res.json(waitListResult);
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

app.post('/api/add/waitlist', (req, res, next) => {
  const { addcustname, addcustmobile } = req.body;
  const sql = `
      select * from "waitlist"
      where "userNumber" = $1
      `;
  const params = [addcustmobile];
  db.query(sql, params)
    .then(result => {
      const [fetchResult] = result.rows;
      if (fetchResult) {
        throw new ClientError(403, 'Already exists');
      }
      const password = parseInt(randomPassword());
      const sql = `with "newUser" as (
      insert into "users" ("userName","userNumber","userPassword","userRole")
      values($1,$2,$3,$4)
      returning "userId"
      )
      insert into "waitlist" ("userName","userNumber","userId")
      values ($1,$2,(select "userId" from "newUser"))
      returning *
      `;
      const params = [addcustname, addcustmobile, password, 'Customer'];
      db.query(sql, params)
        .then(result => {
          const [customerAdded] = result.rows;
          if (!customerAdded) {
            throw new ClientError(401, 'mobile number is already used');
          }
          res.json(customerAdded);
        })
        .catch(err => next(err));
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
  SELECT * FROM "category"
  JOIN "items" USING ("categoryId") )
  SELECT "categoryName", "categoryId", JSON_AGG("itemsWithCategory".*) as "items"
  FROM "itemsWithCategory"
  group by "categoryName","categoryId"`;
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
