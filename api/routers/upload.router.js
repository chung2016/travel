const express = require("express");
const router = express.Router();
const Upload = require("../models/upload.model");

const Multer = require("multer");
const fileType = require("file-type");

const accepted_extensions = ["jpg", "png", "gif"];

function validate_format(req, res, next) {
  if (req.file) {
    let mime = fileType(req.file.buffer);

    if (!mime || !accepted_extensions.includes(mime.ext))
      return next(
        new Error(
          "The uploaded file is not in " +
            accepted_extensions.join(", ") +
            " format!"
        )
      );
  }
  next();
}

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
  onError: function (err, next) {
    next(err);
  },
});

router.get("/:filename", async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const upload = await Upload.findOne({ filename });
    if (!upload) throw "File not found!";
    const { filebase64, mimetype, size } = upload;
    res.writeHead(200, {
      "Content-Type": mimetype,
      "Content-Length": size,
    });
    res.end(Buffer.from(filebase64, "base64"));
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  multer.single("file"),
  validate_format,
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) throw "file required";
      const name = await uploadImageToStorage(file);
      res.status(200).send({ file: name });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

const uploadImageToStorage = async (file) => {
  if (!file) throw "No image file";
  const filename = `${file.originalname}_${Date.now()}`;
  const filebase64 = Buffer.from(file.buffer).toString("base64");
  const filesize = file.size;
  const originalname = file.originalname;
  const mimetype = file.mimetype;

  const upload = new Upload({
    filename,
    filebase64,
    originalname,
    mimetype,
    size: filesize,
  });
  await upload.save();
  return `${process.env.APP_URL}/api/v1/upload/${filename}`;
};
