import { User } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const isUserExist = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findById(user?._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        message: "Failed to create user",
      });
    }

    res.status(200).json({
      message: "User created successfully",
      createdUser,
    });
  } catch (error) {
    console.log("error while creating the user", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        message: "Please provide the user name",
      });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error) {
    console.log("error while getting the user", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );

    const updated_user = await User.findById(updateUser?._id);

    if (!updated_user) {
      return res.status(400).json({
        message: "Failed to update user",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      updated_user,
    });
  } catch (error) {
    console.log("error while updating the user", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting the user", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { createUser, getUserByName, deleteUser, updateUser };
