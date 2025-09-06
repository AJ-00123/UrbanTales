import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminAuth } from "../firebaseAdmin.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecretKey";

// Manual signup
export const signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully.", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Manual login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Firebase Google login
export const googleFirebaseLogin = async (req, res) => {
  const { token } = req.body;
  try {
    // Verify Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const { uid, email, name, phone_number } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        phone: phone_number || "N/A",
        password: uid, // temporary password
      });
    }

    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", user, token: jwtToken });
  } catch (err) {
    console.error("Firebase Google Auth Error:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { fullName, phone, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, phone, address },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
