import CsvData from '../Modules/CsvData.js';
import csv from 'csvtojson';
import fs from 'fs';

export const uploadCsv = async (req,res) => {
    try{
        const jsonArray = await csv().fromFile(req.file.path);
        await CsvData.insertMany(jsonArray.map(row=>({fields: row})));
        fs.unlinkSync(req.file.path); // remove temp file
        res.status(201).json({message:'CSV uploaded', count: jsonArray.length});
    }catch(err){
        res.status(500).json({message:'CSV upload error', error: err.message});
    }
}
