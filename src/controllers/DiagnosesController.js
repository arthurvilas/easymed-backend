const knex = require('../database/knex');

class DiagnosesController {
  async getDiagnosis(req, res) {
    const { idPatient } = req.params;
    const [patient] = await knex('patients').where('id', idPatient);
    if (!patient) {
      return res.status(400).json({ error: 'No patient with id ' + idPatient });
    }
    const patientsDiagnosis = await knex('diagnosis').where({ idPatient });
    return res.json(patientsDiagnosis);
  }
}
