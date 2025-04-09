const ApiError = require('../utils/api.error');
const { findUserByEmail, findUserByPhone, findUserByUserName } = require('../repository/user.repository');
const { findRoleByName } = require('../repositories/role.repository');
const { saveUser } = require('../repositories/user.repository');
const sendToKafka = require('../kafka/sendToKafka');

const createNewUser = async ({ yourName, UserName, email, password, phone, address, dob, roleName }) => {
    
  const errors = [];
  if (await findUserByEmail(email)) errors.push('Email already exists');
  if (await findUserByUserName(UserName)) errors.push('Username already exists');
  if (await findUserByPhone(phone)) errors.push('Phone already registered');

  if (errors.length > 0) {
    throw new ApiError(400, errors.join(', '));
  }

  const role = await findRoleByName(roleName);
  if (!role) throw new ApiError(400, `Role '${roleName}' does not exist`);
  
  const password_hash = await bcrypt.hash(password, 12);

  const newUser = await saveUser({
    name: yourName,
    UserName,
    email,
    phone,
    address,
    dob,
    password_hash,
    role,
  });

  await sendToKafka('account-user-created', {
    userId: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: role.role_name,
  });

  return newUser;
};

module.exports = { createNewUser };
