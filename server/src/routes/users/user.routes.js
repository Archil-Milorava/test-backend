import express from 'express'

import { authCheck, createUser, likeUnlikePost, logIn, logOut } from './user.controller.js'
import { protectedRoute } from '../../middleware/protectedRoute.js'

const userRouter = express.Router()


userRouter.post('/createUser', createUser)
userRouter.post('/login', logIn)
userRouter.get('/logOut', logOut)
userRouter.get('/currentUser', protectedRoute, authCheck)
userRouter.patch('/likeUnlike/:blogId', protectedRoute, likeUnlikePost)



export default userRouter