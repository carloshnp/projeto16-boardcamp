import { connection } from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const query = await connection.query("SELECT * FROM categories;");
    res.send(query.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function insertCategory(req, res) {
  const { name } = req.body;
  if (name.length === 0) {
    return res.sendStatus(400);
  }
  try {
    const catExists = await connection.query(
      `SELECT * FROM categories WHERE name = $1;`,
      [name]
    );
    if (catExists.rows.length > 0) {
      return res.sendStatus(409);
    }

    const query = await connection.query(
      `INSERT INTO categories (name) VALUES ($1)`,
      [name]
    );
    console.log(query);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
