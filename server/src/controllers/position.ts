import { Request, Response } from "express"
import Position from "../models/Position"
import errorHandler from '../utils/ErrorHandler'

export const getByCategoryId = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params
        const userId = req.user?._id

        const positions = await Position.find({ category: categoryId })

        res.status(200).json(positions)
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const { name, cost, category } = req.body
        const userId = req.user?._id

        const position = new Position({
            name, cost, category
        })

        await position.save()
        res.status(201).json(position)
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id);

        await Position.findByIdAndRemove(id)

        res.status(200).json({ success: true })
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const position = await Position.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json(position)
    }
    catch (err) {
        errorHandler(err, res)
    }
}
