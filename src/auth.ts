import bcrypt from 'bcrypt';

// Hash a password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Compare password with hashed password
export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};
