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

app.get('/api/get/menu', (req, res, next) => {
  const sql = 'select * from "users"';
  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.json(grade);
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
