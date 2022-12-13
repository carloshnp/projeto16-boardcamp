import dayjs from "dayjs";
import { connection } from "../database/db.js";

export async function getRentals(req, res) {
  try {
    const { customerId, gameId } = req.query;
    if (customerId) {
      const query = await connection.query(
        `SELECT * FROM rentals WHERE "customerId"=$1;`,
        [customerId]
      );
      return res.send(query.rows);
    }
    if (gameId) {
      const query = await connection.query(
        `SELECT * FROM rentals WHERE "gameId"=$1`,
        [gameId]
      );
      return res.send(query.rows);
    }
    const query = await connection.query("SELECT * FROM rentals");
    res.send(query.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
