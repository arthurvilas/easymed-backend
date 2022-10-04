const knex = require('../database/knex');
const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const attachJWTToRes = require('../utils/attachJWT');

const login = async (req, res) => {
  const { email, password } = req.body;

  let roles = {};
  [
    roles.patient,
    roles.doctor,
    // roles.admin
  ] = await Promise.all([
    await knex('patients').where('email', email),
    await knex('doctors').where('email', email),
    // await knex('admin').where('email', email),
  ]);

  for (const role in roles) {
    if (roles[role].length !== 0) {
      const [entity] = roles[role];
      const passwordMatch = await compare(password, entity.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { id: entity.id, role },
          process.env.JWT_SECRET,
          { algorithm: 'HS256' }
        );
        attachJWTToRes(res, token);
        return res.json(entity);
      }
    }
  }

  return res.status(400).json('Not found');
};

module.exports = login;
