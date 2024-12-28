import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { supplierSchema } from "../supplier/supplier.validation";
import { handleServerError } from "../helpers/errorHandling";

// Get all suppliers
export const getSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json({
      success: true,
      message: "Get all suppliers success",
      data: suppliers,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch suppliers");
  }
};

// Get supplier by ID
export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!supplier) {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Get supplier by ID success",
      data: supplier,
    });
  } catch (error) {
    console.error(error);
    handleServerError(error, res, "Failed to fetch supplier");
  }
};

// Create a new supplier
export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = supplierSchema.safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path.join(".")} - ${err.message}`
      );

      res.status(400).json({
        success: false,
        message: errorMessage,
      });
      return;
    }

    const newSupplier = await prisma.supplier.create({
      data: parse.data,
    });

    res.status(201).json({
      success: true,
      message: "Create supplier success",
      data: newSupplier,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to create supplier");
  }
};

// Update a supplier
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const existingSupplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!existingSupplier) {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
      return;
    }

    const parse = supplierSchema.partial().safeParse(req.body);

    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path.join(".")} - ${err.message}`
      );

      res.status(400).json({
        success: false,
        message: errorMessage,
      });
      return;
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data: parse.data,
    });

    res.status(200).json({
      success: true,
      message: "Update supplier success",
      data: updatedSupplier,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to update supplier");
  }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
    });

    if (!supplier) {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
      return;
    }

    await prisma.supplier.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Supplier deleted successfully",
       data: supplier,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete supplier");
  }
};