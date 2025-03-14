import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = ({ email, userId }) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password is required");
    }
    const user = await User.create({ email, password });
    // res.cookie("jwt", createToken({ email, userId: user.id }), {
    //   secure: true,
    //   maxAge,
    //   sameSite: "None",
    // });

    res.cookie("jwt", createToken({ email, userId: user.id }), {
      httpOnly: true,
      secure: false, // For local development
      maxAge,
      sameSite: "Lax", // Lax mode mein kaam karega
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email or password is incorrect");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Email or password is incorrect");
    }
    // res.cookie("jwt", createToken({ email, userId: user.id }), {
    //   secure: true,
    //   maxAge,
    //   sameSite: "None",
    // });

    res.cookie("jwt", createToken({ email, userId: user.id }), {
      httpOnly: true,
      secure: false, // For local development
      maxAge,
      sameSite: "Lax", // Lax mode mein kaam karega
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Internal Server Error");
  }
};

export const getUserInfo = async (request, response, next) => {
  try {
    const userData = await User.findById(request.userId);
    console.log("User Data:", userData);

    if (!userData) {
      return response.status(400).send("User not found");
    }
    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    console.log(userId);
    const { firstName, lastName, color } = req.body;
    console.log("Received Data:", { userId, firstName, lastName, color });

    if (!firstName || !lastName || color === undefined) {
      return res.status(400).send("firstname lastname and color is required.");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );

    if (!userData) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(201).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Internal Server Error");
  }
};

// export const addProfileImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("File is required");
//     }

//     const date = Date.now();
//     let fileName = `uploads/profiles/${date}${req.file.originalname}`; // Yeh sahi path banayega
//     renameSync(req.file.path, fileName);

//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { image: fileName },
//       { new: true, runValidators: true }
//     );

//     return res.status(201).json({
//       image: updatedUser.image,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Internal Server Error");
//   }
// };

export const addProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }

    const date = Date.now();
    const fileName = `uploads/profiles/${date}${req.file.originalname}`;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    // 👇 Yaha complete updated user bhej rahe
    return res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// export const removeProfileImage = async (req, res) => {
//   try {
//     const { userId } = req;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     if (user.image) {
//       unlinkSync(user.image);
//     }

//     user.image = null;
//     await user.save();
//     return res.status(201).send("Profile image removed successfully.");
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Internal Server Error");
//   }
// };

export const removeProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // 👇 Image ko delete kar rahe
    if (user.image) {
      unlinkSync(user.image);
    }

    // 👇 User ki image ko null kar rahe
    user.image = null;
    await user.save();

    // 👇 Updated user ko return kar rahe
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt","", { maxAge: 1, secure: true, sameSite: "None" });
    return res.status(200).send("Logged out successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
