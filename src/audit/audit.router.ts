import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";

import {
  getAudits,
  getAuditById,
  createAudit,
  deleteAudit,
} from "./audit.controller";
import { validateAudit } from "./audit.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", getAudits);
router.get("/:id", getAuditById);
router.post("/", validateAudit, createAudit);
router.delete("/:id", deleteAudit);

export default router;
