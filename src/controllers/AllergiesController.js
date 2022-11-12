const knex = require('../database/knex');

class AllergiesController {
  async listAllergies(req, res) {
    const allergies = await knex.select().from('allergies');

    return res.json(allergies);
  }

  async getAllergies(req, res) {
    const { idPatient } = req.params;
    const [patient] = await knex('patients').where('id', idPatient);
    if (!patient) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientAllergies = await knex('patients_allergies as pa')
      .select('a.id', 'a.description', 'pa.symptoms')
      .join('allergies as a', 'pa.idAllergy', 'a.id')
      .where({ idPatient });

    return res.json(patientAllergies);
  }

  async createAllergy(req, res) {
    const { idPatient } = req.params;
    const { idAllergy, symptoms } = req.body;
    const [patient] = await knex('patients').where('id', idPatient);
    const [allergy] = await knex('allergies').where('id', idAllergy);
    if (!patient || !allergy) {
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
    const [createdAllergy] = await knex('patients_allergies').insert(
      {
        idPatient,
        idAllergy,
        symptoms,
      },
      '*'
    );

    return res
      .status(201)
      .json({ ...createdAllergy, description: allergy.description });
  }

  async deleteAllergy(req, res) {
    const { idPatient } = req.params;
    const { idAllergy } = req.body;
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

    return res.status(200).json(existingAllergy);
  }
}

module.exports = AllergiesController;
