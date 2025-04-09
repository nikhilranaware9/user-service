const { AppDataSource } = require('../config/db.connection');
const User = require('../entities/user.entitie');

const saveUser = async (userPayload) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepo = queryRunner.manager.getRepository(User);
    const newUser = userRepo.create({
      name: userPayload.name,
      UserName: userPayload.UserName,
      email: userPayload.email,
      phone: userPayload.phone,
      address: userPayload.address,
      dob: userPayload.dob,
      password_hash: userPayload.password_hash,
      role: userPayload.role,
    });

    const savedUser = await userRepo.save(newUser);
    await queryRunner.commitTransaction();
    return savedUser;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

module.exports = { saveUser };
