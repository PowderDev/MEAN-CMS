import { Request, Response } from "express"
import Order from '../models/Order'
import errorHandler from '../utils/ErrorHandler'

export const getAll = async (req: Request, res: Response) => {
    try {
        const { offset, limit, start, end, order } = req.query

        const query: { date?: Object, user: string | undefined, order?: number } = {
            user: req.user?._id
        }

        if (start) query.date = { $gte: start }
        if (end) {
            if (!query.date) query.date = {}
            query.date = { $lte: end }
        }
        if (order) query.order = Number(order)

        const orders = await Order.find(query)
            .sort({ date: -1 })
            .skip(Number(offset))
            .limit(Number(limit))

        res.status(200).json(orders)
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { list } = req.body
        const userId = req.user?._id
        const lastOrder = await Order.findOne({ user: userId }).sort({ date: -1 })

        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = new Order({ list, user: userId, order: maxOrder + 1 })
        await order.save()

        res.status(201).json(order)
    }
    catch (err) {
        errorHandler(err, res)
    }
}
