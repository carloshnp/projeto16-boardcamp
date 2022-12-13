import { connection } from "../database/db.js";

export async function getCustomers(req, res) {
  try {
    const cpf = req.query.cpf;
    if (cpf) {
      const query = await connection.query(
        `SELECT * FROM customers WHERE cpf LIKE $1 || '%';`,
        [cpf]
      );
      return res.send(query.rows);
    }
    const query = await connection.query('SELECT * FROM customers;')
    res.send(query.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomersById(req, res) {
  return;
}

export async function addCustomer(req, res) {
  return;
}

export async function updateCustomer(req, res) {
  return;
}
