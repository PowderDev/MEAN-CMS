import { Request, Response } from "express"
import Category from "../models/Category"
import Position from "../models/Position"
import errorHandler from '../utils/ErrorHandler'

export const getAll = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id
        const categories = await Category.find({ user: userId })

        res.status(200).json(categories)
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)

        res.status(200).json(category)
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Category.findByIdAndRemove(id)
        await Position.findOneAndRemove({ category: id })

        res.status(200).json({ success: true })
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id
        const { name } = req.body
        const file = req.file ? req.file.path : ''

        const category = new Category({ name, user: userId, imageSrc: file })
        await category.save()

        res.status(200).json(category)
    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const file = req.file ? req.file.path : ''
        const toUpdate = file ? { ...req.body, imageSrc: file } : req.body

        const category = await Category.findByIdAndUpdate(id, toUpdate, { new: true })

        res.status(200).json(category)
    }
    catch (err) {
        errorHandler(err, res)
    }
}