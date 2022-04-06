import { NextFunction, Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads");
  },
  filename: function (_req, file, cb) {
    const fileType = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileType}`);
  },
});

const multerConfig = multer({ storage: storage });

export default function uploadFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const upload = multerConfig.array("images", 2);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json({
        message: "Error uploading file",
        error: err,
      });
    }

    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error uploading file",
        error: err,
      });
    }

    return next();
  });
}
