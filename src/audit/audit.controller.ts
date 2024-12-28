import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { auditSchema } from "../audit/audit.validation";
import { handleServerError } from "../helpers/errorHandling";

// Get all audits
export const getAudits = async (req: Request, res: Response): Promise<void> => {
  try {
    const audits = await prisma.audit.findMany({
      include: { item: true, user: true },
    });

    res.status(200).json({
      success: true,
      message: "Get all audits success",
      data: audits,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch audits");
  }
};

// Get audit by ID
export const getAuditById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const audit = await prisma.audit.findUnique({
      where: { id: Number(id) },
      include: { item: true, user: true },
    });

    if (!audit) {
      res.status(404).json({
        success: false,
        message: "Audit not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Get audit by ID success",
      data: audit,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch audit");
  }
};

// Create a new audit
export const createAudit = async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = auditSchema.safeParse(req.body);

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

    const {
      itemId,
      userId,
      expectedQuantity,
      actualQuantity,
      difference,
      auditDate,
      notes,
    } = parse.data;

    const newAudit = await prisma.audit.create({
      data: {
        itemId,
        userId,
        expectedQuantity,
        actualQuantity,
        difference,
        auditDate,
        notes,
      },
    });

    res.status(201).json({
      success: true,
      message: "Create audit success",
      data: newAudit,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to create audit");
  }
};

// Delete an audit
export const deleteAudit = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const audit = await prisma.audit.findUnique({
      where: { id: Number(id) },
    });

    if (!audit) {
      res.status(404).json({
        success: false,
        message: "Audit not found",
        data: null,
      });
      return;
    }

    await prisma.audit.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Audit deleted successfully",
      data: audit,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete audit");
  }
};