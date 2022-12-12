import { Router } from "express";
import {
  getCategories,
  insertCategory,
} from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", insertCategory);

export default router;
