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
    const query = await connection.query("SELECT * FROM customers;");
    res.send(query.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomersById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(404);
    }
    const query = await connection.query(
      `SELECT * FROM customers WHERE id=$1;`,
      [id]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addCustomer(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  return;
}
