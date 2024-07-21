import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleExtractText = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Send the image to your OCR model API
      const response = await axios.post(
        "http://localhost:5000/extract-text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = response;
      setExtractedText(data.text);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        OCR Image Input
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "#666",
          marginBottom: "20px",
        }}
      >
        Upload an image file to extract text using OCR.
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          width: "100%",
          height: "40px",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleExtractText}
        style={{
          width: "100%",
          height: "40px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Extract Text"}
      </button>
      <p
        style={{
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        Extracted Text :
      </p>
      <textarea
        value={extractedText}
        readOnly
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          resize: "vertical",
        }}
      />
    </div>
  );
};

export default ImageUpload;
