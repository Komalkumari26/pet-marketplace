import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  const { fullName, email, subject, message } = req.body;
  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const feedback = await Feedback.create({ fullName, email, subject, message });
    res.status(201).json({ msg: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};