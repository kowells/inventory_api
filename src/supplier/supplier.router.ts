import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "./supplier.controller";
import { validateSupplier } from "./supplier.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", getSuppliers);
router.get("/:id", getSupplierById);
router.post("/", validateSupplier, createSupplier);
router.put("/:id", validateSupplier, updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
