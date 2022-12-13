import { Router } from "express";
import { addRental, deleteRental, finishRental, getRentals } from "../controllers/rentalsController.js";
import { isCustomer, isGame, isInStock, isRental, isReturned } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.get('/rentals', getRentals)
router.post('/rentals', isCustomer, isGame, isInStock, addRental)
router.post('/rentals/:id/return', isRental, isReturned, finishRental)
router.delete('/rentals/:id', isRental, isReturned, deleteRental)

export default router;