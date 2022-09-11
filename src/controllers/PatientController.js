const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const jwt = require("jsonwebtoken");
const attachJWTToRes = require("../utils/attachJWT");

class PatientController {

  async create(req, res) {
    const { name, cpf, phone, email, password } = req.body;
    const [ unavailableEmail ] = await knex('patient').where('email', email);
    if (unavailableEmail) {
      res.status(400).json({ error: "Email already in use" });
      throw new Error("Email already in use");
    }
    const hashedPassword = await hash(password, 8);
    const [ patient_id ] = await knex('patient').insert({
      name,
      cpf,
      phone,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: patient_id, role: 'patient' }, process.env.JWT_SECRET);
    attachJWTToRes(res, token);

    res.status(201).json({
      id: patient_id,
      name,
      cpf,
      phone,
      email
    });
  }

}

module.exports = PatientController;
