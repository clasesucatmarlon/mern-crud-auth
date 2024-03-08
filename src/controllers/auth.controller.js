import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";


/**
 * The function `register` handles user registration by hashing the password, saving the user data to
 * the database, generating an access token, setting a cookie, and returning user information in JSON
 * format.
 * @param req - The `req` parameter in the `register` function is an object representing the HTTP
 * request. It contains information about the request made to the server, such as the request headers,
 * body, parameters, and more. In this specific function, `req.body` is used to extract the `email`,
 * @param res - The `res` parameter in the `register` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to send data, set
 * cookies, and provide status codes in response to the client's request.
 */
export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email already exist."]);
    }

    const pswHash = await bcrypt.hash(password, 10);
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
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json(["User not found" ]);
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json(["Invalid credentials"]);
    }

    // GENERAR TOKEN
    const token = await createAccessToken({ id: userFound._id });

    // GENERAR COOKIE
    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAT: userFound.createdAt,
      updatedAT: userFound.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};


export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(400).json({ message: "User not found..." });
  }
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAT: userFound.createdAt,
    updatedAT: userFound.updatedAt
  });
}
