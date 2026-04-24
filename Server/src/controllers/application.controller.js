import { createApplication } from "../services/application.service.js";

export const applyLoan = async (req, res, next) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const result = await createApplication(req.body);

    console.log(result);

    res.status(200).json({
      success: true,
      message: "Application submitted",
      data: result,
    });

  } catch (err) {
    next(err);
  }
};