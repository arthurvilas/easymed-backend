const knex = require('../database/knex');

class MedicationsController {
  async getMedications(req, res) {
    const { idPatient } = req.params;
    const patient = await knex('patients').where('id', idPatient);
    if (patient.length === 0) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientMedications = await knex('patients_medications as pm')
      .select('m.name', 'pm.*')
      .join('medications as m', 'pm.idMedication', 'm.id')
      .where({ idPatient });

    return res.json(patientMedications);
  }

  async createMedication(req, res) {
    const { idPatient } = req.params;
    const { id: idMedication, dosage, isActive } = req.body;
    const patient = await knex('patients').where('id', idPatient);
    const medication = await knex('medications').where('id', idMedication);
    if (patient.length === 0 || medication.length === 0) {
      return res
        .status(400)
        .json({ error: "Provide existing Patient and Medication id's" });
    }
    const [existingMedication] = await knex('patients_medications').where({
      idPatient,
      idMedication,
    });
    if (existingMedication) {
      return res.status(400).json({ error: 'Medication already registered' });
    }
    const date = new Date();
    const startedAt =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    await knex('patients_medications').insert({
      idPatient,
      idMedication,
      dosage,
      isActive,
      startedAt,
    });

    return res.status(201).json({
      idPatient,
      idMedication,
      dosage,
      isActive,
      startedAt,
    });
  }

  async updateMedication(req, res) {
    const { idPatient } = req.params;
    let { id: idMedication, dosage, isActive, startedAt, stoppedAt } = req.body;
    const [existingMedication] = await knex('patients_medications').where({
      idPatient,
      idMedication,
    });
    if (!existingMedication) {
      return res.status(400).json({ error: 'Medication not registered' });
    }

    const date = new Date();
    if (existingMedication.isActive === 1 && isActive === false) {
      stoppedAt =
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    await knex('patients_medications')
      .where({
        idPatient,
        idMedication,
      })
      .update({
        dosage,
        isActive,
        startedAt,
        stoppedAt,
      });

    return res.json({
      id: idMedication,
      dosage,
      isActive,
      startedAt: existingMedication.startedAt,
      stoppedAt,
    });
  }

  async deleteMedication(req, res) {
    const { idPatient } = req.params;
    const { id: idMedication } = req.body;
    const [existingMedication] = await knex('patients_medications').where({
      idPatient,
      idMedication,
    });
    if (!existingMedication) {
      return res.status(400).json({ error: 'Medication not registered' });
    }
    await knex('patients_medications')
      .where({
        idPatient,
        idMedication,
      })
      .del();

    return res.json(existingMedication);
  }
}

module.exports = MedicationsController;
