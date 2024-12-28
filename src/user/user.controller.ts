import { prisma } from "../database/prisma";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateToken } from "../services/jwt";
import { loginSchema, userSchema } from "./user.validation";
import { handleServerError } from "../helpers/errorHandling";

export const registerUser = async (req: any, res: any) => {
  try {
    const userValid = userSchema.safeParse(req.body);

    if (!userValid.success) {
      const errorMessage = userValid.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: errorMessage,
      });
    }

    const { username, password, role } = userValid.data;

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken. Please choose another username.",
        data: null,
      });
    }

    console.error("Error in registerUser:", error);
    handleServerError(error, res, "Failed to create user");
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const userValid = loginSchema.safeParse(req.body);

    if (!userValid.success) {
      const errorMessage = userValid.error.issues.map(
        (err) => `${err.path} - ${err.message}`
      );

      return res.status(400).json({
        success: false,
        message: "Validation errors",
        data: errorMessage,
      });
    }

    const { username, password } = userValid.data;

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
        data: null,
      });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, role: user.role });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {username: user.username, token, role: user.role },
    });
  } catch (error) {
    handleServerError(error, res, "Login Failed");
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
        data: null,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    handleServerError(error, res, "Failed to delete user");
  }
};
