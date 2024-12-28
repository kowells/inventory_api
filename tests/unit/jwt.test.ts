import { generateToken } from "../../src/services/jwt";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("JWT Service", () => {
  const mockPayload = { userId: 1, username: "testuser" };
  const mockSecret = "secret";

  beforeEach(() => {
    process.env.JWT_SECRET = mockSecret; // Set secret untuk testing
    jest.clearAllMocks(); // Bersihkan mock sebelum setiap test
  });

  it("should generate a token with correct payload and options", () => {
    const expiresIn = "1h";

    // Mock implementasi jwt.sign
    (jwt.sign as jest.Mock).mockImplementation(() => "mockedToken");

    const token = generateToken(mockPayload, expiresIn);

    // Periksa bahwa jwt.sign dipanggil dengan benar
    expect(jwt.sign).toHaveBeenCalledWith(mockPayload, mockSecret, {
      expiresIn,
    });
    expect(token).toBe("mockedToken");
  });

  it("should use default expiresIn if not provided", () => {
    (jwt.sign as jest.Mock).mockImplementation(() => "mockedToken");

    const token = generateToken(mockPayload);

    // Periksa bahwa jwt.sign menggunakan default expiresIn
    expect(jwt.sign).toHaveBeenCalledWith(mockPayload, mockSecret, {
      expiresIn: "1h",
    });
    expect(token).toBe("mockedToken");
  });
});
