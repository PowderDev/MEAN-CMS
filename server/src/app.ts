import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import passportJwtFunc from './middleware/passport'
import * as path from 'path'


const app = express()

//Things
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
passportJwtFunc(passport)
app.use('/uploads', express.static('uploads'))

//Routes
import authRoutes from './routes/auth'
import analyticsRoutes from './routes/analytics'
import orderRoutes from './routes/order'
import categoryRoutes from './routes/category'
import positionRoutes from './routes/position'

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../../client/dist/app'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '..', 'client', 'dist', 'app', 'index.html')
        )
    })
}

export default app