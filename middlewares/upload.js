const multer = require("multer");
const path = require("path")


// Configure multer storage
const storage = multer.diskStorage({});


const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb('Error: Images and MP4 videos only!');
};

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 20000000 }, // 20MB limit
    fileFilter: fileFilter
}).fields([
    { name: "poster", maxCount: 1 },
    { name: "trailer", maxCount: 1 }
]);


module.exports = upload;
