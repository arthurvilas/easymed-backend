const knex = require('../../database/knex');

// .../patients/:idPatient/exams
const getPatientExams = async (req, res) => {
  const { idPatient } = req.params;
  const patientExams = await knex('exams').where({ idPatient });

  return res.json(patientExams);
};

// .../patients/:idPatient/exams
const createPatientExam = async (req, res) => {
  const { idPatient } = req.params
  const { examType, location, summary, date } = req.body;
  const [patient] = await knex('patients').where('id', idPatient);
  if (!patient) {
    return res.status(404).json({
      error: 'Provide an existing patient',
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
};

// .../patients/exams/idExam
const updatePatientExam = async (req, res) => {
  const { idExam } = req.params;

  const [exam] = await knex('exams').where({ id: idExam });
  if (!exam) {
    return res.status(400).json({ error: 'No exam with id' + idExam });
  }

  let { examType, location, summary, date } = req.body;
  const [updatedExam] = await knex('exams')
    .where({ id: idExam })
    .update({ examType, location, summary, date }, '*');

  return res.json(updatedExam);
};


// .../exams/:idExam
const deletePatientExam = async (req, res) => {
  const { idExam } = req.params;

  const [exam] = await knex('exams').where({ id: idExam });
  if (!exam) {
    return res.status(400).json({ error: 'No exam with id' + idExam });
  }

  await knex('exams').where({ id: idExam }).del();

  return res.json(exam);
};

module.exports = {
  getPatientExams,
  createPatientExam,
  updatePatientExam,
  deletePatientExam
};
