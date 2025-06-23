import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null, "./public/temp")
    },
    filename : function (req,file,cb){
         crypto.randomBytes(12,function(err,bytes){
            const fn = bytes.toString("hex") + path.extname(file.originalname)
            cb(null, fn);
        })
    }
})

export const upload = multer({storage});