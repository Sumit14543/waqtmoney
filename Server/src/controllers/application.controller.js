import {
  createApplication,
  createContactQuery,
  createHeroLead,
  getApplicationById,
  updateApplication,
  updateBankDetails,
  updateReferenceDetails,
  updateWorkDetails,
} from "../services/application.service.js";
import { lookupIfsc } from "../services/ifsc.service.js";

export const saveHeroLead = async (req, res, next) => {
  try {
    const result = await createHeroLead(req.body);

    res.status(200).json({
      success: true,
      message: "Lead submitted",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const saveContactQuery = async (req, res, next) => {
  try {
    const result = await createContactQuery(req.body);

    res.status(200).json({
      success: true,
      message: "Contact query submitted",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

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

export const updateApp = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    await updateApplication(id, data);
    res.status(200).json({
      success: true,
      message: "Application updated",
      data: {
        nextPath:
          data.current_step === "documents_uploaded"
            ? "/user/customer-video-kyc"
            : data.current_step === "video_kyc_completed"
              ? "/user/loan-status"
            : undefined,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getApp = async (req, res, next) => {
  try {
    const application = await getApplicationById(req.params.id);

    if (!application) {
      res.status(404).json({
        success: false,
        message: "Application not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

export const updateWorkDetailsApp = async (req, res, next) => {
  try {
    const { id, applicationId, ...data } = req.body;
    await updateWorkDetails(id || applicationId, data);

    res.status(200).json({
      success: true,
      message: "Work details saved",
      data: {
        nextPath: "/user/bank-details",
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getIfscDetails = async (req, res, next) => {
  try {
    const data = await lookupIfsc(req.params.ifsc || req.query.ifsc);

    res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBankDetailsApp = async (req, res, next) => {
  try {
    const { id, applicationId, ...data } = req.body;
    await updateBankDetails(id || applicationId, data);

    res.status(200).json({
      success: true,
      message: "Bank details saved",
      data: {
        nextPath: "/user/references",
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateReferenceDetailsApp = async (req, res, next) => {
  try {
    const { id, applicationId, ...data } = req.body;
    await updateReferenceDetails(id || applicationId, data);

    res.status(200).json({
      success: true,
      message: "Reference details saved",
      data: {
        nextPath: "/user/salary-slip",
      },
    });
  } catch (err) {
    next(err);
  }
};
