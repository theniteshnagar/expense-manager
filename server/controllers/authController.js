/*
    HTTP Status Code
    
    1xx: Informational – Communicates transfer protocol-level information.
    2xx: Success – Indicates that the client’s request was accepted successfully.
    3xx: Redirection – Indicates that the client must take some additional action in order to complete their request.
    4xx: Client Error – This category of error status codes points the finger at clients.
    5xx: Server Error – The server takes responsibility for these error status codes.
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //   Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please add all fields",
      });
    }

    // Check if user exists or not
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //   Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //   Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "User Register Successful"
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email and password exists
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Check email and password is correct
    const user = await User.findOne({
      email: email,
    });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (user && isPasswordCorrect) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: "User Login Successful",
      });
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
