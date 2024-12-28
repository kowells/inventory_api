import { authenticate, authorize } from "../../src/middleware/auth";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("authenticate middleware", () => {
    it("should return 401 if no token is provided", () => {
      mockRequest.headers = {};

      authenticate(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Access token is required",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 401 if token is invalid", () => {
      mockRequest.headers = { authorization: "Bearer invalidToken" };
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      authenticate(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid token",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next and attach user to request if token is valid", () => {
      mockRequest.headers = { authorization: "Bearer validToken" };
      const mockPayload = { role: "user" };
      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      authenticate(mockRequest, mockResponse, mockNext);

      expect(jwt.verify).toHaveBeenCalledWith(
        "validToken",
        process.env.JWT_SECRET || "your_secret_key"
      );
      expect((mockRequest as any).user).toEqual(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("authorize middleware", () => {
    it("should return 403 if user role is not authorized", () => {
      const roles = ["admin"];
      const middleware = authorize(roles);
      (mockRequest as any).user = { role: "user" };

      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Access denied",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next if user role is authorized", () => {
      const roles = ["admin"];
      const middleware = authorize(roles);
      (mockRequest as any).user = { role: "admin" };

      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });
});
