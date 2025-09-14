import CsvData from "../Modules/CsvData.js";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

export const loadCsv = async (req, res) => {
  const results = [];
  fs.createReadStream(path.join(process.cwd(), "data", "medData.csv"))
    .pipe(csvParser())
    .on("data", (row) => results.push(row))
    .on("end", async () => {
      await CsvData.insertMany(results);
      res.json(results);
    });
};

export const getCsvData = async (req, res) => {
  const data = await CsvData.find();
  res.json(data);
};
