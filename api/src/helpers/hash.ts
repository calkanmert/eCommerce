import bcrypt from 'bcrypt';

const saltOrRounds = 10;

function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, saltOrRounds);
  return hashedPassword;
}

function comparePasswords(plainPassword: string, hashedPassword: string) {
  const result = bcrypt.compareSync(plainPassword, hashedPassword);
  return result;
}

export { hashPassword, comparePasswords };
