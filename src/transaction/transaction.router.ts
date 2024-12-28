import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "./transaction.controller";
import { validateTransaction } from "./transaction.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.post("/", validateTransaction, createTransaction);
router.put("/:id", validateTransaction, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
