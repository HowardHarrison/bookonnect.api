import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../models/Admin.js";

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