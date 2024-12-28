import express from "express";
import { json } from "body-parser";
import userRoutes from "../src/user/user.routes";
import itemRoutes from "./item/item.routes";
import categoryRoutes from "./category/category.router";
import supplierRoutes from "./supplier/supplier.router";
import auditRoutes from "./audit/audit.router";
import locationRoutes from "./location/location.router";
import inventoryLogRoutes from "./inventory_log/inventory_log.router";
import transactionRoutes from "./transaction/transaction.router";
import { prisma } from "./database/prisma";

const app = express();

app.use(json());

// Routes
app.use("/users", userRoutes);
app.use("/item", itemRoutes);
app.use("/category", categoryRoutes);
app.use("/supplier", supplierRoutes);
app.use("/audit", auditRoutes);
app.use("/location", locationRoutes);
app.use("/inventoryLog", inventoryLogRoutes);
app.use("/transaction", transactionRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await prisma.$connect();
});
