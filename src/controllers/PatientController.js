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
    const patient = await knex('patients').where('id', idPatient);
    if (patient.length === 0) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientAllergies = await knex('patients_allergies as pa')
      .select('a.id', 'a.description', 'pa.symptoms')
      .join('allergies as a', 'pa.idAllergy', 'a.id')
      .where({ idPatient });

    res.json(patientAllergies);
  }

  async createAllergy(req, res) {
    const { idPatient } = req.params;
    const { id: idAllergy, symptoms } = req.body;
    const patient = await knex('patients').where('id', idPatient);
    const allergy = await knex('allergies').where('id', idAllergy);
    if (patient.length === 0 || allergy.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide existing Patient and Allergy id's" });
    }
    const [existingAllergy] = await knex('patients_allergies').where({
      idPatient,
      idAllergy,
    });
    if (existingAllergy) {
      return res.status(400).json({ error: 'Allergy already registered' });
    }
    await knex('patients_allergies').insert({
      idPatient,
      idAllergy,
      symptoms,
    });

    res.status(201).json({ allergy, symptoms });
  }

  async deleteAllergy(req, res) {
    const { idPatient } = req.params;
    const { id: idAllergy } = req.body;
    const [existingAllergy] = await knex('patients_allergies').where({
      idPatient,
      idAllergy,
    });
    if (!existingAllergy) {
      return res.status(400).json({ error: 'Allergy not registered' });
    }
    await knex('patients_allergies')
      .where({
        idPatient,
        idAllergy,
      })
      .del();
    delete existingAllergy.idPatient;

    return res.status(200).json(existingAllergy);
  }

  async getConditions(req, res) {
    const { idPatient } = req.params;
    const patient = await knex('patients').where('id', idPatient);
    if (patient.length === 0) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientDiseases = await knex('patients_conditions as pc')
      .select('c.id', 'c.name', 'pc.symptoms')
      .join('conditions as c', 'pc.idCondition', 'c.id')
      .where({ idPatient });

    res.json(patientDiseases);
  }

  async createCondition(req, res) {
    const { idPatient } = req.params;
    const { id: idCondition, isActive, isInFamily, symptoms } = req.body;
    const patient = await knex('patients').where('id', idPatient);
    const condition = await knex('conditions').where('id', idCondition);
    // TODO: Check for existing condition?
    if (patient.length === 0 || condition.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide existing Patient and Condition id's" });
    }
    await knex('patients_conditions').insert({
      idPatient,
      idCondition,
      isActive,
      isInFamily,
      symptoms,
    });

    res.status(201).json({
      condition,
      isActive,
      isInFamily,
      symptoms,
    });
  }

  async updateCondition(req, res) {
    const { idPatient } = req.params;
    const { id: idCondition, isActive, isInFamily, symptoms } = req.body;
    const [existingCondition] = await knex('patients_conditions').where({
      idPatient,
      idCondition,
    });
    if (!existingCondition) {
      return res.status(400).json({ error: 'Condition not registered' });
    }
    await knex('patients_conditions')
      .where({
        idPatient,
        idCondition,
      })
      .update({
        isActive,
        isInFamily,
        symptoms,
      });

    return res.json({ id: idCondition, isActive, isInFamily, symptoms });
  }

  async deleteCondition(req, res) {
    const { idPatient } = req.params;
    const { id: idCondition } = req.body;
    const [existingCondition] = await knex('patients_conditions').where({
      idPatient,
      idCondition,
    });
    if (!existingCondition) {
      return res.status(400).json({ error: 'Condition not registered' });
    }
    await knex('patients_conditions')
      .where({
        idPatient,
        idCondition,
      })
      .del();
    delete existingCondition.idPatient;

    return res.json(existingCondition);
  }
}

module.exports = PatientController;
