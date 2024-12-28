import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { inventoryLogSchema } from "../inventory_log/inventory_log.validation";
import { handleServerError } from "../helpers/errorHandling";

// Get all inventory logs
export const getInventoryLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await prisma.inventoryLog.findMany({
      include: { item: true, user: true }, 
    });
    
    res.status(200).json({
      success: true,
      message: "Get all inventory logs success",
      data: logs,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch logs");
  }
};

// Get inventory log by ID
export const getInventoryLogById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const log = await prisma.inventoryLog.findUnique({
      where: { id: Number(id) },
      include: { item: true, user: true },  
    });

    if (!log) {
      res.status(404).json({
        success: false,
        message: "Inventory log not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Get inventory log by ID success",
      data: log,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch log");
  }
};

// Create an inventory log
export const createInventoryLog = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const parse = inventoryLogSchema.safeParse(req.body);

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

    const { itemId, userId, changeQuantity, beforeQuantity, afterQuantity } = parse.data;

    // Create a new inventory log
    const newLog = await prisma.inventoryLog.create({
      data: {
        itemId, 
        userId,
        changeQuantity,
        beforeQuantity,
        afterQuantity,
        logDate: new Date(),

      },
    });

    res.status(201).json({
      success: true,
      message: "Create inventory log success",
      data: newLog,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to create inventory logs");
  }
};

// Delete an inventory log
export const deleteInventoryLog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const log = await prisma.inventoryLog.findUnique({
      where: { id: Number(id) },
    });

    if (!log) {
      res.status(404).json({
        success: false,
        message: "Inventory log not found",
        data: null,
      });
      return;
    }

    await prisma.inventoryLog.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Inventory log deleted successfully",
      data: log,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete log");
  }
};
