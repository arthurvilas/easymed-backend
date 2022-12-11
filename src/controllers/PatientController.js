const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

class PatientController {
  async listPatients(req, res) {
    const patients = await knex.select().from('patients');
    return res.json(patients);
  }

  async createPatient(req, res) {
    const { name, cpf, phone, email, password } = req.body;
    const [unavailableEmail] = await knex('patients').where('email', email);
    if (unavailableEmail) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await hash(password, 8);
    const [patient] = await knex('patients').insert(
      {
        name,
        cpf,
        phone,
        email,
        password: hashedPassword,
      },
      '*'
    );

    const token = jwt.sign(
      {
        id: patient.id,
        role: 'patient',
        email: patient.email,
        pictureUrl: patient.pictureUrl,
      },
      process.env.JWT_SECRET
    );

    delete patient.password;
    return res.status(201).json({ ...patient, token, role: 'patient' });
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

    const updatedAt = new Date();

    const [updatedPatient] = await knex('patients')
      .where({ id: idPatient })
      .update(
        {
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
        },
        '*'
      );

    delete updatedPatient.password;
    return res.status(200).json(updatedPatient);
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
