import { Document, model, Schema } from 'mongoose'

export interface IOrder extends Document {
    date: Date
    order: number
    list: [{
        name: string
        quantity: number
        cost: number
    }]
    user: string
}

const orderSchema = new Schema<IOrder>({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            }
        }
    ]
})

const Order = model<IOrder>('orders', orderSchema)
export default Order