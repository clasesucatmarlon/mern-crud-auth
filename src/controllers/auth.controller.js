import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const pswHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      email,
      username,
      password: pswHash
    });
    const userSaved = await newUser.save();

    // GENERAR TOKEN
    const token = await createAccessToken({ id: userSaved._id });

    // GENERAR COOKIE
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAT: userSaved.createdAt,
      updatedAT: userSaved.updatedAt
    });
  } catch (error) {
    res.status(500).json({message: error.message });
  }
};


// {
//   "email": "clasesucatmarlon5@gmail.com",
//   "password": "marlon12345",
//   "username": "clasesucatmarlon5"
// }

export const login = (req, res) => {
  res.send("Login....");
};
