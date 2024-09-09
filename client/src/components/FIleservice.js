import axios from "axios";

export const saveFile = async (folderName, fileName, content) => {
  const response = await axios.post("http://localhost:5000/files", {
    folderName,
    fileName,
    content,
  });
  return response.data;
};

export const getFile = async (folderName, fileName) => {
  const response = await axios.get(
    `http://localhost:5000/files/${folderName}/${fileName}`
  );
  return response.data;
};

export const runCode = async (code, language) => {
  try {
    const response = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language }), // Send both code and language
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error running code:", error);
    return { output: "Error executing code" };
  }
};
