import React, { useState } from "react";

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGEzNGFjNzRlZDIwMTIyNzNlYTgyYjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODg0MjQzMjR9.kBPoIhp1fTqREZff7uwQemohi9nOEBm8Hs77JtdchnY";

      const response = await fetch(
        "https://sabbathschool.duresa.com.et/api/v1/am/quarters/2020_01/lessons/01/image",
        //"http://localhost:3000/api/v1/am/quarters/2020_01/image",
        {
          method: "POST",
          headers: {
            "x-auth-token": token,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Image uploaded successfully");
        // Perform any additional actions upon successful upload
      } else {
        alert("Error uploading image");
        // Handle error cases
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
      // Handle network or server errors
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadFile;
