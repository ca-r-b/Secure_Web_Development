const logger = (req, res, next) => {
    // date
    // action
    
    const timestamp = new Date().toISOString();

    // const logMessage = `[${timestamp}] - ${req.method} ${
    //   req.protocol
    // }://${req.get("host")}${req.originalUrl} || STATUS CODE: ${
    //   res.statusCode
    // } || RESPONSE TIME: ${duration}ms`;

    const logMessage = `[${timestamp}] - ${req.method}`;

    console.log("testing lang pi: " + logMessage);
};

module.exports = logger;


// import colors from "colors";
// // import fs for file system
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import axios from "axios";

// // create a __dirname variable to store the current directory
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // create a folder called logs
// const logFolder = path.join(__dirname, "../logs");
// if (!fs.existsSync(logFolder)) {
//   fs.mkdirSync(logFolder, { recursive: true });
// }

// // generate a filename based on the current date
// const currentDate = new Date();
// const currentDateString = currentDate.toISOString().split("T")[0];
// const logFileName = ${currentDateString}.log;

// // create a file called access.txt
// const logFilePath = path.join(logFolder, logFileName);
// const logger = (req, res, next) => {
//   const start = Date.now();

//   // finish event
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     const methodColors = {
//       GET: colors.green,
//       POST: colors.blue,
//       PUT: colors.yellow,
//       DELETE: colors.red,
//     };
//     const color = methodColors[req.method] || colors.white;
//     const timestamp = new Date().toISOString();

//     const logMessage = `[${timestamp}] - ${req.method} ${
//       req.protocol
//     }://${req.get("host")}${req.originalUrl} || STATUS CODE: ${
//       res.statusCode
//     } || RESPONSE TIME: ${duration}ms`;

//     console.log(color(logMessage));

//     fs.appendFile(logFilePath, ${logMessage}\n, (err) => {
//       if (err) {
//         console.error('Failed to write log to file.', err);
//       }
//     });

//     axios.post('http://localhost:8001/log', {
//       logMessage: logMessage
//     })
//       .then((response) => console.log('Log sent to logging server.', response.data))
//       .catch((error) => console.error('Failed to send log to logging server.', error));
//     // console.log(
//     //   color(
//     //     ${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}
//     //   )
//     // );
//   });

//   next();
// };

// export default logger;