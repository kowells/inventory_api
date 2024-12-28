import { hashPassword, comparePassword } from "../../src/utils/bcrypt";

describe("Hash Service", () => {
  const password = "mypassword";

  it("should hash a password and return a valid hashed value", async () => {
    const hashedPassword = await hashPassword(password);

    // Hash tidak boleh sama dengan password asli
    expect(hashedPassword).not.toBe(password);
    expect(typeof hashedPassword).toBe("string");
  });

  it("should correctly compare a valid password with its hash", async () => {
    const hashedPassword = await hashPassword(password);

    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it("should return false when comparing an incorrect password with a hash", async () => {
    const hashedPassword = await hashPassword(password);

    const isMatch = await comparePassword("wrongpassword", hashedPassword);
    expect(isMatch).toBe(false);
  });
});
