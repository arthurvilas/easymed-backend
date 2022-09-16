const knex = require('../database/knex');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const attachJWTToRes = require('../utils/attachJWT');

class PatientController {
  async create(req, res) {
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

  async getAllergies(req, res) {
    const { idPatient } = req.params;

    const patientAllergies = await knex('patients_has_allergies as pa')
      .select('a.id', 'a.description', 'pa.symptoms')
      .join('allergies as a', 'pa.idAllergy', 'a.id')
      .where({ idPatient });

    res.json(patientAllergies);
  }

  async createAllergy(req, res) {
    const { idPatient } = req.params;
    const { id: idAllergy, symptoms } = req.body;
    const [patient] = await knex('patients').where('id', idPatient);
    const [allergy] = await knex('allergies').where('id', idAllergy);
    if (patient.length === 0 || allergy.length === 0) {
      return res.status(400).json({error: 'Provide existing Patient and Allergy id\'s'});
    }

    await knex('patients_has_allergies').insert({
      idPatient,
      idAllergy,
      symptoms,
    });
    res.status(201).json({ allergy, symptoms });
  }
}

module.exports = PatientController;
