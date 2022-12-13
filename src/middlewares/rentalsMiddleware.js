import { connection } from "../database/db.js";

export async function isCustomer(req, res, next) {
    try {
        const { customerId } = req.body;
        const query = await connection.query(
            `SELECT * FROM customers WHERE id=$1;`,
            [customerId]
        )
        if (!query.rowCount) {
            return res.sendStatus(400)
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}