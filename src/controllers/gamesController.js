import { connection } from "../database/db.js";

export async function getGames(req, res) {
  try {
    const { name } = req.query;
    if (name) {
      const games = await connection.query(
        `SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE LOWER(games.name) LIKE LOWER($1) || '%';`,
        [name]
      );
      return res.send(games.rows);
    }
    const games = await connection.query(
      `SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`
    );
    res.send(games.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addGame(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
