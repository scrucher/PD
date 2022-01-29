import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Public/data/uploads');
        console.log({
            "req2": req,
            "file2": file,
            "cb2": cb,
        })
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
        console.log({
            "req1": req,
            "file1": file,
            "cb1": cb,
        })
    }
});  

//@ts-ignore
const fileFilter = (req, file, cb) => {
    console.log({
        "req": req,
        "file": file,
        "cb": cb,
    })
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

let upload = multer({ storage: storage, fileFilter: fileFilter,});

export default upload.single('image')

