import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { categorySchema } from "../category/category.validation";
import { handleServerError } from "../helpers/errorHandling";

// Get all categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      success: true,
      message: "Get all categories success",
      data: categories,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch categories");
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Get category by ID success",
      data: category,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch category");
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = categorySchema.safeParse(req.body);

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

    const newCategory = await prisma.category.create({
      data: parse.data,
    });

    res.status(201).json({
      success: true,
      message: "Create category success",
      data: newCategory,
    });
  } catch (error) {
        handleServerError(error, res, "Failed to create category");

  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      res.status(404).json({
        success: false,
        message: "Category not found",
        data: null,
      });
      return;
    }

    const parse = categorySchema.partial().safeParse(req.body);

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

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: parse.data,
    });

    res.status(200).json({
      success: true,
      message: "Update category success",
      data: updatedCategory,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to update category");
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
        data: null,
      });
      return;
    }

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete category");
  }
};