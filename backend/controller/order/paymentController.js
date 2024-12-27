const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Validate the structure and contents of cartItems
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Invalid cart items. Must be a non-empty array.', error: true });
    }

    const isValid = cartItems.every(
      item =>
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        item.price > 0 &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );

    if (!isValid) {
      return res.status(400).json({
        message: 'Invalid cart items. Each item must have a valid name, positive price, and positive quantity.',
        error: true,
      });
    }

    console.log('Creating Stripe session with items:', JSON.stringify(cartItems, null, 2));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents and ensure it's an integer
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Replace with your production success URL
      cancel_url: 'http://localhost:3000/cancel',   // Replace with your production cancel URL
    });

    // Return session ID to the client
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    // Log full error details for debugging
    console.error('Payment Controller Error:', error.stack);

    // Return generic error response to the client
    res.status(500).json({ message: 'Internal Server Error. Please try again later.', error: true });
  }
};

module.exports = paymentController;
