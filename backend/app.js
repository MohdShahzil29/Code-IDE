import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import FileManager from "./components/FileManager";
import { getFile } from "./services/fileService";

const App = () => {
  const [selectedFile, setSelectedFile] = useState({
    folderName: "",
    fileName: "",
  });
  const [code, setCode] = useState("");

  const handleSelectFile = async (folderName, fileName) => {
    try {
      const fileData = await getFile(folderName, fileName);
      setSelectedFile({ folderName, fileName });
      setCode(fileData.content || "// Start coding here...");
    } catch (error) {
      console.error("Error loading file:", error);
      setCode("// Error loading file");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%" }}>
        <FileManager onSelectFile={handleSelectFile} />
      </div>
      <div style={{ width: "80%" }}>
        <CodeEditor fileData={selectedFile} initialCode={code} />
      </div>
    </div>
  );
};

export default App;
