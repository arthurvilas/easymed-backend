const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
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

    return res.status(201).json({
      id: patient_id,
      name,
      cpf,
      phone,
      email,
    });
  }

  async updatePatient(req, res) {
    const { idPatient } = req.params;
    const [patient] = await knex('patients').where('id', idPatient);
    if (!patient) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }

    let {
      name,
      cpf,
      email,
      password,
      prevPassword,
      phone,
      height,
      weight,
      gender,
      pictureUrl,
      birthDate,
    } = req.body;

    if (password) {
      if (!prevPassword) {
        return res
          .status(400)
          .json({ error: 'Send previous password to update password' });
      }
      const passwordMatch = await compare(prevPassword, patient.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Passwords does not match' });
      }
      password = await hash(req.body.password, 8);
    }

    const date = new Date();
    const updatedAt =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    await knex('patients').where({ id: idPatient }).update({
      name,
      cpf,
      email,
      password,
      phone,
      height,
      weight,
      gender,
      pictureUrl,
      birthDate,
      updatedAt,
    });

    return res.status(204).json();
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
