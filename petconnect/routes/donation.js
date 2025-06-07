const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'chf',
          product_data: {
            name: 'Spende für PetConnect', // dieser Text ist frontendseitig sichtbar
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.status(200).json({
      id: session.id,
      message: res.__('donation.session_created')
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({
      message: res.__('errors.payment_failed'),
      error: error.message
    });
  }
});

module.exports = router;