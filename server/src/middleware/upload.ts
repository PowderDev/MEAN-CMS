import multer from 'multer'
import moment from 'moment'
import * as path from 'path'
import * as fs from 'fs'

const urlToUploadsFolder = path.resolve(__dirname, '..', '..', 'uploads')
const allowedTypes = ['png', 'jpg', 'jpeg']

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(urlToUploadsFolder)) {
            fs.mkdirSync(urlToUploadsFolder, { recursive: true })
        }
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    const type = file.mimetype.split('/')[1]
    if (allowedTypes.includes(type)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 5242880
}

export default multer({ storage, fileFilter, limits })