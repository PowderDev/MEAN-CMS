import { Request, Response } from "express"
import User from '../models/User'
import errorHandler from '../utils/ErrorHandler'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email }).select('+password')

        if (!candidate) {
            res.status(404).json({
                success: false,
                message: 'User with this email does not exist'
            })
        } else {
            if (await candidate.comparePassword(password)) {
                const token = `Bearer ${candidate.getJWT()}`
                res.status(200).json({
                    success: true,
                    token
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Invalid password'
                })
            }
        }
    }
    catch (err) {
        errorHandler(err, res)
    }

}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            })
        } else {
            const user = new User({ email, password })

            const token = `Bearer ${user.getJWT()}`
            await user.save()
            res.status(201).json({
                success: true,
                token
            })
        }
    }
    catch (err) {
        errorHandler(err, res)
    }

}
