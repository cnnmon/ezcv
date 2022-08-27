/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
import formidable from 'formidable';
import FormData from 'form-data';
import fs from 'fs';
import ResumeParser from './ResumeParser';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Return a "method not allowed" error
    res.status(405).send('Only POST please.');
    return;
  }

  const { files } = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  if (!files.resume || !files.resume.filepath) {
    res.status(400).send('No resume uploaded!');
    return;
  }

  const formData = new FormData();
  formData.append('resume', fs.createReadStream(files.resume.filepath));

  const resumeParser = new ResumeParser(files.resume.filepath);

  resumeParser
    .parseToJSON()
    .then((file) => {
      res.send(file);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}
