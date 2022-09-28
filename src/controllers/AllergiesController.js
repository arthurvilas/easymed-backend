const knex = require('../database/knex');

class AllergiesController {
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

    res.status(201).json({ ...allergy, symptoms });
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
}

module.exports = AllergiesController;
