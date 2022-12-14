import { Router } from "express";
import {
  addCustomer,
  getCustomers,
  getCustomersById,
  updateCustomer,
} from "../controllers/customersController.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", addCustomer);
router.put("/customers/:id", updateCustomer);

export default router;
