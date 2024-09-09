import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here"); // Initial code value
  const [language, setLanguage] = useState("javascript"); // Default language is set to JavaScript
  const [output, setOutput] = useState(""); // To store the output of the code execution

  // Handle code change in the Monaco Editor
  const handleEditorChange = (newCode) => {
    setCode(newCode);
  };

  // Handle language change based on the dropdown selection
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Handle the "Run Code" button click
  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }), // Sending both code and language
      });
      const result = await response.json();
      setOutput(result.output || "No output"); // Set the output from the server
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error executing code");
    }
  };

  return (
    <div>
      {/* Language Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={handleRunCode} style={{ marginLeft: "10px" }}>
          Run Code
        </button>
      </div>

      {/* Code Editor */}
      <MonacoEditor
        height="80vh"
        language={language} // Dynamically set language for Monaco Editor
        value={code}
        onChange={handleEditorChange}
      />

      {/* Output Display */}
      <div style={{ marginTop: "10px" }}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
