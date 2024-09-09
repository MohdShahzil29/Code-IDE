import React, { useState } from "react";

const FileManager = ({ onSelectFile }) => {
  const [folders, setFolders] = useState([
    // {
    //   name: "Folder1",
    //   files: ["file1.js", "file2.js"],
    // },
    // {
    //   name: "Folder2",
    //   files: ["file3.js", "file4.js"],
    // },
  ]);

  const handleFileClick = (folderName, fileName) => {
    if (typeof onSelectFile === "function") {
      onSelectFile(folderName, fileName);
    } else {
      console.error("onSelectFile is not a function");
    }
  };

  return (
    <div>
      {folders.map((folder) => (
        <div key={folder.name}>
          <h4>{folder.name}</h4>
          <ul>
            {folder.files.map((file) => (
              <li key={file} onClick={() => handleFileClick(folder.name, file)}>
                {file}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FileManager;
