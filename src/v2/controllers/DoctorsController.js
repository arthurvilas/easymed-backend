const { hash } = require('bcryptjs');
const knex = require('../database/knex');
const jwt = require('jsonwebtoken');

// .../doctors
const createDoctor = async (req, res) => {
  const { name, email, crm, password } = req.body;
  const [unavailableEmail] = await knex('doctors').where({ email });
  if (unavailableEmail) {
    return res.status(400).json({ error: 'Email already in use' });
  }
  const hashedPassword = await hash(password, 8);
  const [doctor] = await knex('doctors').insert(
    {
      name,
      email,
      crm,
      password: hashedPassword,
    },
    '*'
  );

  const token = jwt.sign(
    { id: doctor.id, role: 'doctor' },
    process.env.JWT_SECRET
  );

  delete doctor.password;
  return res.status(201).json({ ...doctor, token, role: 'doctor' });
};

// .../doctors/:idDoctor
const updateDoctor = async (req, res) => {
  const { idDoctor } = req.params;
  const [doctor] = await knex('doctors').where('id', idDoctor);
  if (!doctor) {
    return res.json(400).json({ error: 'No doctor with id ' + id });
  }

  let { name, email, crm, password, prevPassword } = req.body;
  if (password) {
    if (!prevPassword) {
      return res
        .status(400)
        .json({ error: 'Send previous password to update password' });
    }
    const passwordMatch = await compare(prevPassword, doctor.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Passwords does not match' });
    }
    password = await hash(req.body.password, 8);
  }

  const updatedAt = new Date();

  const [updatedDoctor] = await knex('doctors')
    .where({ id: idDoctor })
    .update({ name, email, crm, password, updatedAt }, '*');

  delete updatedDoctor.password;
  return res.status(200).json(updatedDoctor);
};

// .../doctors/:idDoctor
const getDoctor = async (req, res) => {
  const { idDoctor } = req.params;
  const [doctor] = await knex('doctors').where('id', idDoctor);
  if (!doctor) {
    return res.status(400).json({ error: 'No doctor with id ' + idDoctor });
  }

  delete doctor.password;
  return res.json(doctor);
};

module.exports = {
  createDoctor,
  updateDoctor,
  getDoctor,
};
