import { prisma } from "../database/prisma";
import { itemSchema } from "../item/item.validation";
import { Request, Response } from "express";
import { handleValidationError, handleServerError } from "../helpers/errorHandling";

// Get all items with pagination
export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, category, name, supplier } = req.query;

    // Konversi parameter query menjadi angka
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    // Hitung offset berdasarkan page dan limit
    const offset = (pageNumber - 1) * limitNumber;

    // Buat filter dinamis
    const filters: any = {};
    if (category) {
      filters.category = { name: { contains: String(category), mode: "insensitive" } };
    }
    if (name) {
      filters.name = { contains: String(name), mode: "insensitive" };
    }
    if (supplier) {
      filters.supplier = { name: { contains: String(supplier), mode: "insensitive" } };
    }

    // Ambil data item dengan filter dan pagination
    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where: filters,
        skip: offset,
        take: limitNumber,
        include: { category: true, supplier: true }, // Sesuaikan dengan relasi yang dibutuhkan
      }),
      prisma.item.count({
        where: filters, // Hitung total item dengan filter
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Get all items success",
      data: items,
      meta: {
        total, // Total jumlah data
        page: pageNumber, // Halaman saat ini
        limit: limitNumber, // Jumlah data per halaman
        totalPages: Math.ceil(total / limitNumber), // Total halaman
      },
    });
  } catch (error) {
    return handleServerError(error, res, "Get all items failed");
  }
};

// Create a new item
export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = itemSchema.safeParse(req.body);

    if (!parse.success) {
      return handleValidationError(parse.error, res);
    }

    const item = await prisma.item.create({
      data: parse.data,
    });

    res.status(201).json({
      success: true,
      message: "Create item success",
      data: item,
    });
  } catch (error) {
    handleServerError(error, res, "Create item failed");
  }
};

// Update an item
export const updateItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const existingItem = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!existingItem) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
      return;
    }

    const parse = itemSchema.partial().safeParse(req.body);

    if (!parse.success) {
      return handleValidationError(parse.error, res);
    }

    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: parse.data,
    });

    res.status(200).json({
      success: true,
      message: "Update item success",
      data: item,
    });
  } catch (error) {
    handleServerError(error, res, "Update item failed");
  }
};

// Delete an item
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
      return;
    }

    await prisma.item.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Delete item success",
      data: item,
    });
  } catch (error) {
    handleServerError(error, res, "Delete item failed");
  }
};