import { connection } from "../database/db.js";

export async function isCustomer(req, res, next) {
  try {
    const { customerId } = req.body;
    const query = await connection.query(
      `SELECT * FROM customers WHERE id=$1;`,
      [customerId]
    );
    if (!query.rowCount) {
      return res.sendStatus(400);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function isGame(req, res, next) {
  try {
    const { gameId } = req.body;
    const query = await connection.query(`SELECT * FROM games WHERE id=$1;`, [
      gameId,
    ]);
    if (!query.rowCount) {
      return res.sendStatus(400);
    }
    res.locals.game = query.rows[0];
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function isInStock(req, res, next) {
  try {
    const { id } = req.params;
    const query = await connection.query(
      `SELECT COUNT(*) FROM rentals WHERE "gameId"=$1`,
      [id]
    );
    if (res.locals.game.stockTotal - query <= 0) {
      return res.sendStatus(400);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function isRental(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }
    const query = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [
      id,
    ]);
    if (!query.rowCount) {
      return res.sendStatus(404);
    }
    res.locals.rental = query;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function isReturned(req, res, next) {
  const method = req.method;
  if (method === "DELETE") {
    if (!res.locals.rental.rows[0].returnDate) {
      return res.sendStatus(400);
    }
  } else if (res.locals.rental.rows[0].returnDate) {
    return res.sendStatus(400);
  }
  next();
}
