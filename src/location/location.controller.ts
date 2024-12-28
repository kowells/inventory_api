import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { locationSchema} from "./location.validation";
import { handleServerError } from "../helpers/errorHandling";

export const getLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await prisma.location.findMany();

    res.status(200).json({
      success: true,
      message: "Get all locations success",
      data: locations,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch locations");
  }
};


// Get inventory location by ID
export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
    });

    if (!location) {
      res.status(404).json({
        success: false,
        message: "Location not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Get location by ID success",
      data: location,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch location");
  }
};


// Create a new inventory location
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = locationSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path.join(".")} - ${err.message}`
      );

      res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
      return;
    }

    const { name, address } = parse.data;

    const newLocation = await prisma.location.create({
      data: { name, address },
    });

    res.status(201).json({
      success: true,
      message: "Create location success",
      data: newLocation,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to create location");
  }
};


// Update an inventory location
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const parse = locationSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path.join(".")} - ${err.message}`
      );

      res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
      return;
    }

    const { name, address } = parse.data;

    const updatedLocation = await prisma.location.update({
      where: { id: Number(id) },
      data: { name, address },
    });

    res.status(200).json({
      success: true,
      message: "Update location success",
      data: updatedLocation,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to update location");
  }
};


// Delete an inventory location
export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
    });

    if (!location) {
      res.status(404).json({
        success: false,
        message: "Location not found",
        data: null,
      });
      return;
    }

    await prisma.location.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
      data: location,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete location");
  }
};