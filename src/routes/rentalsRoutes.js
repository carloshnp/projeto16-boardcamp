import { Router } from "express";
import { getRentals } from "../controllers/rentalsController.js";

const router = Router();

router.get('/rentals', getRentals)
router.post('/rentals')
router.post('/rentals/:id/return')
router.delete('/rentals/:id')

export default router;