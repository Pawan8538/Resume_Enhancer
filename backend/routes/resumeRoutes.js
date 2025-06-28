const express = require("express");
const router = express.Router();
const upload = require("../middlewares/handleFile");
const resumeController = require("../controllers/resumeController");

// Upload resume (PDF/DOCX)
router.post("/upload", upload.single("resume"), resumeController.uploadResume);

// Enhance a resume section
router.post("/ai-enhance", resumeController.enhanceSection);

// Save resume JSON
router.post("/save-resume", resumeController.saveResume);

// Download resume JSON
router.get("/download-resume", resumeController.downloadResume);

module.exports = router;