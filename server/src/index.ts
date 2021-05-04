import server from './app'
import mongoose from 'mongoose'
import keys from './config/keys';

const url = keys.dbUrl || ''

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err) => console.log(err))

server.listen(keys.PORT, () => console.log(`Server is running on port ${keys.PORT}`))