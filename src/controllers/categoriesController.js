import { connection } from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories;");
    res.send(categories.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function insertCategory(req, res) {
  const { name } = req.body;

  if (name.length === 0) {
    res.sendStatus(400);
    return;
  }

  try {
    const catExists = await connection.query(
      `SELECT * FROM categories WHERE name = $1;`,
      [name]
    );
    if (catExists.rows.length > 0) {
      res.sendStatus(409);
      return;
    }
    const createCat = await connection.query(
      `INSERT INTO categories (name) VALUES ($1)`,
      [name]
    );
    console.log(createCat);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
