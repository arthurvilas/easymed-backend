const knex = require('../database/knex');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const attachJWTToRes = require('../utils/attachJWT');

class PatientController {
  async createPatient(req, res) {
    const { name, cpf, phone, email, password } = req.body;
    const [unavailableEmail] = await knex('patients').where('email', email);
    if (unavailableEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await hash(password, 8);
    const [patient_id] = await knex('patients').insert({
      name,
      cpf,
      phone,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: patient_id, role: 'patient' },
      process.env.JWT_SECRET
    );
    attachJWTToRes(res, token);

    res.status(201).json({
      id: patient_id,
      name,
      cpf,
      phone,
      email,
    });
  }

  async getPatient(req, res) {
    const { idPatient } = req.params;
    const [patient] = await knex('patients').where('id', idPatient);
    if (!patient) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    delete patient.password;

    return res.json(patient);
  }
}

module.exports = PatientController;
