const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/eventpics/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (AccpetedTypeFiles.includes(file.mimetype)) {
    //accept it
    cb(null, true);
  } else {
    //ignore it
    cb(new Error("wrong type file!"), false);
  }
};

module.exports.upload = multer({
  //dest:"proposalFiles/",
  storage: storage,
  fileFilter: fileFilter,
});

const AccpetedTypeFiles = [
  
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/bmp",
 
];
