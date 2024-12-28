import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "./item.controller";
import { validateItem } from "./item.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", authorize(["AUDITOR", "ADMIN"]), getAllItems);
router.post("/", validateItem, createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
