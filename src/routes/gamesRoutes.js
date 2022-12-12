import { Router } from "express";

const router = Router();

router.get("/games", getGames);
router.post("/games", addGame);

export default router;
