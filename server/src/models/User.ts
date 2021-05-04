import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Document, model, Schema } from 'mongoose'
import keys from '../config/keys';

interface IUser extends Document {
    email: string
    password: string
    comparePassword: (enteredPassword: string) => boolean
    getJWT: () => any
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

const secret = keys.Jwt_Secret || 'secret'

userSchema.methods.getJWT = function () {
    return jwt.sign({ userId: this._id }, secret, {
        expiresIn: keys.Jwt_Expires_Time
    })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    const answer = await bcrypt.compare(enteredPassword, this.password)
    return answer
}


const User = model<IUser>('users', userSchema)
export default User