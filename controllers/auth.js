import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    const profileImage = req.file ? `assets/${req.file.filename}` : "assets/profile.jpg";

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      profileImage,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    const user = savedUser.toObject();
    delete user.password;

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('err', err);
  }
}

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userToReturn = user.toObject();
    delete userToReturn.password;
    res.status(200).json({ token, user: userToReturn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin Log In
export const adminLogin = async (req, res) => {
  try{
    const {email, password} = req.body;
    const admin = await  Admin.findOne({email: email});
    if (!admin) return res.status(400).json({ msg: "Admin does not exist."});

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});

    const token = jwt.sign({ id: admin._id}, process.env.JWT_SECRET);
    const adminToReturn = admin.toObject();
    delete adminToReturn.password;
    res.status(200).json({ token, user: adminToReturn });
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
}