const knex = require('../database/knex');

class DiagnosesController {
  async getDiagnosis(req, res) {
    const { idPatient } = req.params;
    const patientDiagnoses = await knex('diagnoses').where({ idPatient });

    for (const diagnosis of patientDiagnoses) {
      diagnosis.relatedExams = await knex('diagnoses_exams').where({
        idDiagnosis: diagnosis.id,
      });
    }

    return res.json(patientDiagnoses);
  }

  async createDiagnosis(req, res) {
    const {
      idPatient,
      idDoctor,
      description,
      diagnosisUrl,
      idExams, // Array
    } = req.body;
    const [patient] = await knex('patients').where('id', idPatient);
    const [doctor] = await knex('doctors').where('id', idDoctor);
    if (!patient || !doctor) {
      return res.status(404).json({
        error: 'Provide an existing patient and doctor',
      });
    }

    const exams = await knex('exams').whereIn('id', idExams);

    if (exams.length !== idExams.length) {
      return res
        .status(404)
        .json({ error: 'Provide an array of existing exams' });
    }

    const [createdDiagnosis] = await knex('diagnoses').insert(
      {
        idPatient,
        idDoctor,
        description,
        diagnosisUrl,
      },
      '*'
    );

    for (const id of idExams) {
      await knex('diagnoses_exams').insert({
        idDiagnosis: createdDiagnosis.id,
        idExam: id,
      });
    }

    return res.status(201).json({ ...createdDiagnosis, idExams });
  }

  async updateDiagnoses(req, res) {
    const { idDiagnosis } = req.body;
    // const reqDoctor = req.id;
    // const doctor = knex('doctors').where({id: reqDoctor});
    const [diagnosis] = await knex('diagnoses').where({ id: idDiagnosis });
    if (!diagnosis) {
      return res
        .status(400)
        .json({ error: 'No diagnosis with id' + idDiagnosis });
    }
    let { description, diagnosisUrl, idExams } = req.body;

    // DIAGNOSIS TABLE
    let updatedDiagnosis = {};
    if (description || diagnosisUrl) {
      [updatedDiagnosis] = await knex('diagnoses')
        .where({ id: idDiagnosis })
        .update({ description, diagnosisUrl }, '*');
    }

    // DIAGNOSIS_EXAMS TABLE
    if (idExams) {
      const currentDiagnosis = await knex('diagnoses_exams').where({
        idDiagnosis,
      });

      const currentExams = currentDiagnosis.map(
        (diagnoses) => diagnoses.idExam
      );

      for (const idExam of idExams) {
        if (!currentExams.includes(idExam)) {
          await knex('diagnoses_exams').insert({
            idDiagnosis,
            idExam,
          });
        }
      }
    }
    return res.json({ ...updatedDiagnosis, exams: idExams });
  }

  async deleteDiagnosisExam(req, res) {
    const { idDiagnosis, idExam } = req.body;
    const [existingExam] = await knex('diagnoses_exams').where({
      idDiagnosis,
      idExam,
    });

    if (!existingExam) {
      return res.status(400).json({ error: 'Exam and diagnosis not related' });
    }

    await knex('diagnoses_exams').where({ idDiagnosis, idExam }).del();

    return res.json(existingExam);
  }
}

module.exports = DiagnosesController;
