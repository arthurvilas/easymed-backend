const knex = require('../database/knex');
const jwt = require('jsonwebtoken');

const auth = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'No auth token' });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const { email } = payload;
  if (!email) {
    return res.status(400).json('User not found');
  }

  let roles = {};
  [
    roles.patient,
    roles.doctor,
    // roles.admin
  ] = await Promise.all([
    await knex('patients').where('email', payload.email),
    await knex('doctors').where('email', payload.email),
    // await knex('admin').where('email', email),
  ]);

  for (const role in roles) {
    if (roles[role].length !== 0) {
      const [entity] = roles[role];
      const token = jwt.sign({ id: entity.id, role }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
      });
      return res.json({ ...entity, token });
    }
  }

  return res.status(400).json('User not found');
};

module.exports = auth;
