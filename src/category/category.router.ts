import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";
import { validateCategory } from "../category/category.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", validateCategory, createCategory);
router.put("/:id", validateCategory, updateCategory);
router.delete("/:id", deleteCategory);

export default router;
