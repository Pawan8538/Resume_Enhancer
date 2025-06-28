import React, { useState } from "react";
import EditableSection from "../components/EditableSection";
const API = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import "../App.css"

function UploadResume() {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const updateSection = (key, newContent) => {
    setResume((prev) => ({ ...prev, [key]: newContent }));
  };

  const handleEnhance = async (sectionKey, content) => {
    try {
      const response = await axios.post(`${API}/ai-enhance`, {
        section: sectionKey,
        content,
      });

      setResume((prev) => ({
        ...prev,
        [sectionKey]: response.data.enhancedContent,
      }));
    } catch (error) {
      console.error("Enhance failed", error);
    }
  };

  const handleSaveResume = async () => {
    try {
      const response = await axios.post(`${API}/save-resume`, resume);
      alert(response.data.message);
    } catch (error) {
      console.error("Error saving resume", error);
      alert("Failed to save resume");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);

      // Mocked parsed resume content
      const dummyResume = {
        name: "John",
        summary: "I am a passionate beginner frontend developer who enjoys creating simple websites. I have learned HTML, CSS, and JavaScript through online courses and small projects. I'm currently practicing React and want to build more real-world applications to improve my skills.",
  education: [
          "B.Tech in Computer Science - XYZ University",
          "Frontend Bootcamp - ABC Institute"
        ],
        skills: ["HTML", "CSS", "JavaScript", "React"],
      };

      setResume({ ...dummyResume, file: file.name });
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed.");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${API}/download-resume`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download resume.");
    }
  };

  return (
    <div className="container">
      <h2>Upload Resume (.pdf or .docx)</h2>
      <input className="upload-input" type="file" onChange={handleFileChange} accept=".pdf,.docx"/>
      <button className="upload-button" onClick={handleUpload}>Upload</button>

      {message && <p>{message}</p>}
      {resume?.file && <p>Uploaded file: {resume.file}</p>}

      {resume && (
        <>
        <div className="resume-container">
          <EditableSection title="Name" sectionKey="name" content={resume.name} onEnhance={handleEnhance} onChange={updateSection} />
          <EditableSection title="Summary" sectionKey="summary" content={resume.summary} onEnhance={handleEnhance} onChange={updateSection} />
          <EditableSection title="Education" sectionKey="education" content={resume.education} onEnhance={handleEnhance} onChange={updateSection} />
          <EditableSection title="Skills" sectionKey="skills" content={resume.skills} onEnhance={handleEnhance} onChange={updateSection} />
        </div>
        <div className="buttons">
      <button onClick={handleSaveResume}>Save Resume</button>
      <button onClick={handleDownload}>Download as JSON</button>
      </div>
      </>
      )}

    </div>
  );
}

export default UploadResume;