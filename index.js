// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
// const XLSX = require("xlsx");

// // Path for the Excel file (Change this if needed)
// const filePath = path.join(__dirname, "visits.xlsx");

// // Function to fetch and update Excel
// async function updateExcel() {
//     try {
//         console.log("Fetching logs...");
//         const response = await axios.get("https://hehe-kohl-six.vercel.app/logs");
//         const logs = response.data;

//         // Convert logs to worksheet
//         const worksheet = XLSX.utils.json_to_sheet(logs);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

//         // Write the Excel file
//         XLSX.writeFile(workbook, filePath);
//         console.log(`Excel updated at ${new Date().toLocaleTimeString()}`);
//     } catch (error) {
//         console.error("Error fetching logs:", error.message);
//     }
// }

// // Run every 1 minute
// setInterval(updateExcel, 60 * 1000);

// // Run immediately on start
// updateExcel();
// index.js
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const app = express();
const PORT = process.env.PORT || 3000;

// Path to the Excel file (same file always updated)
const filePath = path.join(__dirname, "visits.xlsx");

// Function to fetch and update Excel
async function updateExcel() {
  try {
    const { data } = await axios.get("https://hehe-kohl-six.vercel.app/logs");

    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Logs");

    // Write the file (overwrite)
    XLSX.writeFile(wb, filePath);

    console.log(`✅ Excel updated at ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error("❌ Error updating Excel:", err.message);
  }
}

// Update every 1 minute
setInterval(updateExcel, 60 * 1000);

// First update on server start
updateExcel();

// Route to download the file
app.get("/visits.xlsx", (req, res) => {
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
