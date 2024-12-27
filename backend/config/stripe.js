const Stripe = require('Stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

module.export = stripe