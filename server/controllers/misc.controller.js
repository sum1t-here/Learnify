import AppError from "../utils/error.util.js";
import sendEmail from "../utils/sendmail.util.js";

export const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!email || !name || !message) {
    return next(new AppError("All fields are required"));
  }

  try {
    const subject = "Learnify contact us form";
    const textmsg = `${name} - ${email} <br/> ${message}`;

    await sendEmail(process.env.CONTACT_US_EMAIL, subject, textmsg);
  } catch (err) {
    console.log(err);
    return next(new AppError(err.message, 4004));
  }
  res.status(200).json({
    success: true,
    message: "Your request has been submitted successfully",
  });
};
