import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";

import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocation,
} from "./location.controller";
import { validateLocation } from "./location.validation";

const router = Router();
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", getLocations);
router.get("/:id", getLocationById);
router.post("/", validateLocation, createLocation);
router.put("/:id", validateLocation, updateLocation);
router.delete("/:id", deleteLocation);

export default router;
