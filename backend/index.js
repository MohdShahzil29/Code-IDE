const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { VM } = require("vm2");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/run", (req, res) => {
  const { code, language } = req.body;

  if (language === "javascript") {
    // JavaScript code execution
    try {
      let output = "";
      const vm = new VM({
        timeout: 1000,
        sandbox: {
          console: {
            log: (...args) => {
              output += args.join(" ") + "\n";
            },
          },
        },
      });
      vm.run(code);
      res.status(200).send({ output: output || "No output" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ output: error.toString() });
    }
  } else if (language === "java") {
    // Java code execution
    const filePath = path.join(__dirname, "Test.java");
    fs.writeFileSync(filePath, code);

    exec(
      `javac ${filePath} && java -cp ${__dirname} Test`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("Error:", stderr);
          res.status(500).send({ output: stderr });
        } else {
          res.status(200).send({ output: stdout });
        }
      }
    );
  } else if (language === "c") {
    // C code execution
    const filePath = path.join(__dirname, "program.c");
    fs.writeFileSync(filePath, code);

    exec(`gcc ${filePath} -o program && ./program`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error:", stderr);
        res.status(500).send({ output: stderr });
      } else {
        res.status(200).send({ output: stdout });
      }
    });
  } else if (language === "cpp") {
    // C++ code execution
    const filePath = path.join(__dirname, "program.cpp");
    fs.writeFileSync(filePath, code);

    exec(`g++ ${filePath} -o program && ./program`, (err, stdout, stderr) => {
      if (err) {
        console.error("Error:", stderr);
        res.status(500).send({ output: stderr });
      } else {
        res.status(200).send({ output: stdout });
      }
    });
  } else {
    res.status(400).send({ output: "Unsupported language" });
  }
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});
