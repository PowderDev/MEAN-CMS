import { model, Schema } from 'mongoose'

const positionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        // required: true
    }
})

const Position = model('positions', positionSchema)
export default Position