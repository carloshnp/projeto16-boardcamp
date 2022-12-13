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

export async function addRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, (SELECT CURRENT_DATE), $3, null, (SELECT "pricePerDay" FROM games where id=$2)*$3, null);`,
      [customerId, gameId, daysRented]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}