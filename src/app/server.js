import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // allow React dev server
    methods: ["GET", "POST"],
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Signature endpoint with optional folder query
app.get("/sign-upload", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = req.query.folder || "zannya/uploads"; // default folder
  const upload_preset = "signed-upload"; // must match Cloudinary dashboard

  // Params must include the same fields you’ll use in the client upload
  const paramsToSign = {
    timestamp,
    folder,
    upload_preset,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    folder,
    upload_preset,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`✅ Sign server running at http://localhost:${port}`)
);