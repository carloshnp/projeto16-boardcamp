import { Router } from "express";
import { addRental, getRentals } from "../controllers/rentalsController.js";
import { isCustomer, isGame, isInStock } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.get('/rentals', getRentals)
router.post('/rentals', isCustomer, isGame, isInStock, addRental)
router.post('/rentals/:id/return')
router.delete('/rentals/:id')

export default router;