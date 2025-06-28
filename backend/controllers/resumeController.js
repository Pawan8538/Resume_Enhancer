const fs = require("fs");
const path = require("path");

const MOCKED_ENHANCEMENTS = {
  name: "Johnathan Doe",
  summary: "Motivated and detail-oriented frontend developer with a solid foundation in HTML, CSS, and JavaScript. Proficient in building responsive user interfaces using React and modern UI practices. Continuously learning and applying best practices to develop clean, user-friendly web applications. Eager to contribute to collaborative development environments and grow as a professional developer.",
  education: ["B.Tech in Computer Science, ABC University, 2027",
    "Full Stack Bootcamp, XYZ Institute, 2028",],
  skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Git & GitHub", "Bootstrap"],
};

const getResumeSavePath = () => path.join(__dirname, "../savedResumes/resume.json");

// Upload just file received
const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded or invalid file type." });
  }

  res.status(200).json({
    message: "Upload successful!",
    file: req.file.filename,
  });
};

// Enhance section with mocked content
const enhanceSection = (req, res) => {
  const { section, content } = req.body;

  if (!section || !content) {
    return res.status(400).json({ message: "Missing section or content." });
  }

  const enhancedContent = MOCKED_ENHANCEMENTS[section] || `${content} (enhanced)`;
  res.json({ enhancedContent });
};

// Save full resume JSON to disk
const saveResume = (req, res) => {
  const resumeData = req.body;

  if (!resumeData || typeof resumeData !== "object") {
    return res.status(400).json({ message: "Invalid resume data." });
  }

  const savePath = getResumeSavePath();

  fs.writeFile(savePath, JSON.stringify(resumeData, null, 2), (err) => {
    if (err) {
      console.error("Error saving resume:", err);
      return res.status(500).json({ message: "Failed to save resume." });
    }
    res.status(200).json({ message: "Resume saved successfully!" });
  });
};

// Download saved resume
const downloadResume = (req, res) => {
  const filePath = getResumeSavePath();

  res.download(filePath, "resume.json", (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Failed to download file.");
    }
  });
};

module.exports = {
  uploadResume,
  enhanceSection,
  saveResume,
  downloadResume,
};
