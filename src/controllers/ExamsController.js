const knex = require('../database/knex');

class ExamsController {
  async getExams(req, res) {
    const { idPatient } = req.params;
    const patientExams = await knex('exams').where({ idPatient });

    return res.json(patientExams);
  }

  async createExam(req, res) {
    const { idPatient, examType, location, summary, date } = req.body;
    const [patient] = await knex('patients').where('id', idPatient);
    const [doctor] = await knex('doctors').where('id');
    if (!patient || !doctor) {
      return res.status(404).json({
        error: 'Provide an existing patient, doctor and patientCondition',
      });
    }

    const [createdExam] = await knex('exams').insert(
      {
        idPatient,
        examType,
        location,
        summary,
        date,
      },
      '*'
    );

    return res.status(201).json(createdExam);
  }

  async updateExam(req, res) {
    const { idExam } = req.body;

    const [exam] = await knex('exams').where({ id: idExam });
    if (!exam) {
      return res
        .status(400)
        .json({ error: 'No exam with id' + idExam });
    }

    let { examType, location, summary, date } = req.body;
    const [updatedExam] = await knex('exams')
      .where({ id: idExam })
      .update({ examType, location, summary, date }, '*');

    return res.json(updatedExam);
  }

  async deleteExam(req, res) {
    const { idExam } = req.body;

    const [exam] = await knex('exams').where({ id: idExam });
    if (!exam) {
      return res
        .status(400)
        .json({ error: 'No exam with id' + idExam });
    }

    await knex('exams')
      .where({ id: idExam })
      .del();

    return res.json(exam);
  }
}

module.exports = ExamsController;
