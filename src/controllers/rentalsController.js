import dayjs from "dayjs";
import { connection } from "../database/db.js";

export async function getRentals(req, res) {
  try {
    const { customerId, gameId } = req.query;
    if (customerId) {
      const query = await connection.query(
        `SELECT rentals.*, customers.id AS "customer.id", customers.name AS "customer.name", games.id AS "game.id", games.name AS "game.name", games."categoryId" AS "game.categoryId", categories.name AS "game.categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE "customerId"=$1;`,
        [customerId]
      );
      return res.send(
        query.rows.map((cell) => ({
          id: cell.id,
          customerId: cell.customerId,
          gameId: cell.gameId,
          rentDate: cell.rentDate,
          daysRented: cell.daysRented,
          returnDate: cell.returnDate,
          originalPrice: cell.originalPrice,
          delayFee: cell.delayFee,
          customer: {
            id: cell["customer.id"],
            name: cell["customer.name"],
          },
          game: {
            id: cell["game.id"],
            name: cell["game.name"],
            categoryId: cell["game.categoryId"],
            categoryName: cell["game.categoryName"],
          },
        }))
      );
    }
    if (gameId) {
      const query = await connection.query(
        `SELECT rentals.*, customers.id AS "customer.id", customers.name AS "customer.name", games.id AS "game.id", games.name AS "game.name", games."categoryId" AS "game.categoryId", categories.name AS "game.categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE "gameId"=$1`,
        [gameId]
      );
      return res.send(
        query.rows.map((cell) => ({
          id: cell.id,
          customerId: cell.customerId,
          gameId: cell.gameId,
          rentDate: cell.rentDate,
          daysRented: cell.daysRented,
          returnDate: cell.returnDate,
          originalPrice: cell.originalPrice,
          delayFee: cell.delayFee,
          customer: {
            id: cell["customer.id"],
            name: cell["customer.name"],
          },
          game: {
            id: cell["game.id"],
            name: cell["game.name"],
            categoryId: cell["game.categoryId"],
            categoryName: cell["game.categoryName"],
          },
        }))
      );
    }
    const query = await connection.query(
      `SELECT rentals.*, customers.id AS "customer.id", customers.name AS "customer.name", games.id AS "game.id", games.name AS "game.name", games."categoryId" AS "game.categoryId", categories.name AS "game.categoryName" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id;`
    );
    res.send(
      query.rows.map((cell) => ({
        id: cell.id,
        customerId: cell.customerId,
        gameId: cell.gameId,
        rentDate: cell.rentDate,
        daysRented: cell.daysRented,
        returnDate: cell.returnDate,
        originalPrice: cell.originalPrice,
        delayFee: cell.delayFee,
        customer: {
          id: cell["customer.id"],
          name: cell["customer.name"],
        },
        game: {
          id: cell["game.id"],
          name: cell["game.name"],
          categoryId: cell["game.categoryId"],
          categoryName: cell["game.categoryName"],
        },
      }))
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function addRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    if (daysRented <= 0) {
      return res.sendStatus(400);
    }
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

export async function finishRental(req, res) {
  try {
    const { id } = req.params;
    await connection.query(
      `UPDATE rentals SET "returnDate"=CURRENT_DATE, "delayFee"=((SELECT "rentDate" - CURRENT_DATE FROM rentals WHERE id=$1)*(SELECT "originalPrice" FROM games WHERE id=(SELECT "gameId" FROM rentals WHERE id=$1))) WHERE id=$1;`,
      [id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  try {
    const { id } = req.params;
    await connection.query(`DELETE FROM rentals WHERE id=$1;`, [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
