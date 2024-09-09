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
