import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getAllSubscriptions, getSubscriptionDetails, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', authorize, getAllSubscriptions)

subscriptionRouter.get('/:id', getSubscriptionDetails) // fix this

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => {
  res.send({
    message: 'UPDATE subscription'
  })
})

subscriptionRouter.delete('/:id', (req, res) => {
  res.send({
    message: 'DELETE subscription'
  })
})

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id', (req, res) => {
  res.send({
    message: 'CANCEL subscription'
  })
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({
    message: 'GET upcoming renewals'
  })
})

export default subscriptionRouter