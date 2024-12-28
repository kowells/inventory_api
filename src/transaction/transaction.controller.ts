import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { transactionSchema } from "../transaction/transaction.validation";
import { handleServerError } from "../helpers/errorHandling";

// Get all transactions
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { item: true, user: true },  // Ganti inventory dengan item
    });

    res.status(200).json({
      success: true,
      message: "Get all transactions success",
      data: transactions,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch transactions");
  }
};

// Get transaction by ID
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: { item: true, user: true },  // Ganti inventory dengan item
    });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Get transaction by ID success",
      data: transaction,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to fetch transaction");
  }
};

// Create a new transaction
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validasi menggunakan Zod
    const parse = transactionSchema.safeParse(req.body);

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

    const { itemId, userId, transactionType, quantity, notes, transactionDate } = parse.data;

    // Membuat transaksi baru
    const newTransaction = await prisma.transaction.create({
      data: { 
        itemId, 
        userId, 
        transactionType, 
        quantity, 
        notes, 
        transactionDate: transactionDate ? new Date(transactionDate) : new Date(),  // Set default transactionDate jika tidak ada
      },
    });

    res.status(201).json({
      success: true,
      message: "Create transaction success",
      data: newTransaction,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to create transaction");
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Cek apakah transaksi ada
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTransaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
        data: null,
      });
      return;
    }

    // Validasi update dengan partial schema
    const parse = transactionSchema.partial().safeParse(req.body);

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

    const { itemId, userId, transactionType, quantity, notes, transactionDate } = parse.data;

    // Update transaksi
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: { 
        itemId, 
        userId, 
        transactionType, 
        quantity, 
        notes, 
        transactionDate: transactionDate ? new Date(transactionDate) : undefined,  // Jika ada, update tanggal transaksi
      },
    });

    res.status(200).json({
      success: true,
      message: "Update transaction success",
      data: updatedTransaction,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to update transaction");
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Cek apakah transaksi ada
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!transaction) {
      res.status(404).json({
        success: false,
        message: "Transaction not found",
        data: null,
      });
      return;
    }

    // Hapus transaksi
    await prisma.transaction.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete transaction");
  }
};
