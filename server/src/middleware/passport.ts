import expressAsyncHandler from 'express-async-handler'
import { PassportStatic } from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import keys from '../config/keys'
import User from '../models/User'

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.Jwt_Secret
}

export default function (passport: PassportStatic) {
    passport.use(new Strategy(options, async (payload, done) => {
        try {
            const user = await User.findById(payload.userId)

            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }))
}
