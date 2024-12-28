import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";

import {
  getInventoryLogs,
  getInventoryLogById,
  createInventoryLog,
  deleteInventoryLog,
} from "./inventory_log.controller";
import { validateInventoryLog } from "./inventory_log.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", getInventoryLogs);
router.get("/:id", getInventoryLogById);
router.post("/", validateInventoryLog, createInventoryLog);
router.delete("/:id", deleteInventoryLog);

export default router;
