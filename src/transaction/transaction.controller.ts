import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { transactionSchema } from "../transaction/transaction.validation";
import { handleServerError } from "../helpers/errorHandling";

// Get all transactions
export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { item: true, user: true },
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
export const getTransactionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: { item: true, user: true },
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
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

    const {
      itemId,
      userId,
      transactionType,
      quantity,
      notes,
      transactionDate,
    } = parse.data;

    // Membuat transaksi baru
    const newTransaction = await prisma.transaction.create({
      data: {
        itemId,
        userId,
        transactionType,
        quantity,
        notes,
        transactionDate: transactionDate
          ? new Date(transactionDate)
          : new Date(),
      },
    });

    // Perbarui stok barang berdasarkan jenis transaksi
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      res.status(404).json({
        success: false,
        message: "Item not found",
        data: null,
      });
      return;
    }

    const updatedQuantity =
      transactionType === "IN"
        ? item.quantity + quantity
        : item.quantity - quantity;

    if (updatedQuantity < 0) {
      res.status(400).json({
        success: false,
        message: "Insufficient stock for this transaction",
        data: null,
      });
      return;
    }

    await prisma.item.update({
      where: { id: itemId },
      data: { quantity: updatedQuantity },
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
export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
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

    const { itemId, transactionType, quantity } = parse.data;

    // Dapatkan data item lama
    const item = await prisma.item.findUnique({
      where: { id: existingTransaction.itemId },
    });
    if (!item) {
      res.status(404).json({
        success: false,
        message: "Item not found",
        data: null,
      });
      return;
    }

    // Hitung perubahan stok
    let updatedQuantity = item.quantity;

    // Kembalikan stok dari transaksi sebelumnya
    updatedQuantity =
      existingTransaction.transactionType === "IN"
        ? updatedQuantity - existingTransaction.quantity
        : updatedQuantity + existingTransaction.quantity;

    // Terapkan stok dari transaksi yang diperbarui
    updatedQuantity =
      transactionType === "IN"
        ? updatedQuantity + quantity!
        : updatedQuantity - quantity!;

    if (updatedQuantity < 0) {
      res.status(400).json({
        success: false,
        message: "Insufficient stock for this transaction",
        data: null,
      });
      return;
    }

    // Update stok barang
    await prisma.item.update({
      where: { id: existingTransaction.itemId },
      data: { quantity: updatedQuantity },
    });

    // Update transaksi
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: parse.data,
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
export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
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
