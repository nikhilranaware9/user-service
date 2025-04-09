const { createNewUser } = require('../services/user.services');
const ApiError = require('../utils/api.error');

const createAccount = async (req, res) => {
  const { name, email, password, phone, address, dob } = req.body;

  try {
    const newUser = await createNewUser({ name, email, password, phone, address, dob });

    return res.status(201).json({
      message: 'Account created successfully!',
      user: {
        id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { createAccount };
