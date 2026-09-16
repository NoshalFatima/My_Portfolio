import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // <-- Added fs module
import dotenv from "dotenv";
import mongoose from "mongoose";
import xlsx from "xlsx";
import Faq from "./models/Faq.js";
import { embedText } from "./utils/embeddings.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = path.join(__dirname, "..", "portfolio_chatbot_faq.xlsx");

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected.");

  console.log(`Reading ${EXCEL_PATH} ...`);
  
  // Read file as buffer to prevent permission/path issues
  const fileBuffer = fs.readFileSync(EXCEL_PATH);
  const workbook = xlsx.read(fileBuffer, { type: "buffer" });
  
  const sheetName = workbook.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  if (rows.length === 0) {
    console.error("No rows found in the spreadsheet. Check the file/columns.");
    process.exit(1);
  }

  console.log(`Found ${rows.length} rows. Clearing existing faqs collection...`);
  await Faq.deleteMany({});

  console.log("Generating embeddings (this can take a minute the first time)...");
  let count = 0;

  for (const row of rows) {
    const category = String(row.Category || "").trim();
    const question = String(row.Question || "").trim();
    const answer = String(row.Answer || "").trim();

    if (!question || !answer) {
      console.warn("Skipping row with missing Question/Answer:", row);
      continue;
    }

    const embedding = await embedText(`${question} ${answer}`);

    await Faq.create({ category, question, answer, embedding });
    count += 1;
    process.stdout.write(`\rSeeded ${count}/${rows.length}`);
  }

  console.log(`\nDone. Seeded ${count} FAQ entries.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});