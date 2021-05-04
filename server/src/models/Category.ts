import { model, Schema } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageSrc: {
        type: String,
        default: 'https://avatanplus.ru/files/resources/mid/577e401d99b8d155c52a73be.png'
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Category = model('categories', categorySchema)
export default Category