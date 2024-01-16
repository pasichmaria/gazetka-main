import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'
import { connect } from 'mongoose'

import { usersRouter } from './users'
import { authRouter } from './auth'
import { jwtStrategy, localStrategy } from './strategy'
import { papersRouter } from './papers'
import { config } from './config'

const app = express()

app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

passport.use(jwtStrategy)
passport.use(localStrategy)

app.use('/papers', papersRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)

connect(config.get('mongo'), () => {
  console.log(`Mongo connection established`)
})

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`)
})

export default app
