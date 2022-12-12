import { connection } from "../database/db.js";

export async function getGames(req, res) {
  try {
    const { name } = req.query;
    if (name) {
      const games = await connection.query(
        `SELECT * FROM games WHERE LOWER(name) LIKE LOWER($1) || '%';`,
        [name]
      );
      res.send(games.rows);
    }
    const games = await connection.query("SELECT * FROM games;");
    res.send(games.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
