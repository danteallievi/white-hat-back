const User = require("../../database/models/user");

const createUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("Wrong credentials");
      error.code = 401;
      next(error);
    } else {
      const userToCreate = await User.create({
        email,
        name,
      });
      res.json(userToCreate);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
