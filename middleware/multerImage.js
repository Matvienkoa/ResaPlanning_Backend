const multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png',
//     'image/gif': 'gif'
// };

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './images');
//     },
//     filename: (req, file, callback) => {
//         const originname = file.originalname.split(' ').join('_');
//         const name = originname.split('.').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

module.exports = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" || file.mimetype == "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only image'))
        }
    },
    // limits: { fileSize: 1048576 }
}).single('photo');