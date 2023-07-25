const router = require('express').Router()
const admin = require('firebase-admin')
const db = admin.firestore()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const express = require('express')

router.post('/create', async (req, res) => {
  try {
    const id = Date.now()
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    }
    const response = await db.collection('products').doc(`/${id}/`).set(data)
    return res.status(200).send({ data: response })
  } catch (error) {
    res.status(500).send({ message: error })
  }
})

router.get('/all', async (req, res) => {
  ;(async () => {
    try {
      let query = db.collection('products')

      let response = []
      await query.get().then((querySnap) => {
        querySnap.docs.map((doc) => {
          response.push({ ...doc.data() })
        })
        return response
      })
      return res.status(200).send({ data: response })
    } catch (error) {
      return res.send({ message: error })
    }
  })()
})

router.delete('/delete/:productId', async (req, res) => {
  const productId = req.params.productId

  try {
    await db
      .collection('products')
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ data: result })
      })
  } catch (error) {
    return res.send({ message: error })
  }
})

router.post('/addToCart/:userId', async (req, res) => {
  const userId = req.params.userId
  const productId = req.body.productId

  try {
    const doc = await db
      .collection('cartItem')
      .doc(`/${userId}/`)
      .collection('items')
      .doc(`/${productId}/`)
      .get()

    if (doc.data()) {
      const quantity = doc.data().quantity + 1
      const updatedItem = await db
        .collection('cartItem')
        .doc(`/${userId}/`)
        .collection('items')
        .doc(`/${productId}/`)
        .update({ quantity })
      return res.status(200).send({ data: updatedItem })
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      }
      const addItems = await db
        .collection('cartItem')
        .doc(`/${userId}/`)
        .collection('items')
        .doc(`/${productId}/`)
        .set(data)
      return res.status(200).send({ data: addItems })
    }
  } catch (error) {
    return res.send({ message: error })
  }
})

router.delete('/deleteFromCart/:userId', async (req, res) => {
  const userId = req.params.userId
  const productId = req.body.productId

  try {
    const doc = await db
      .collection('cartItem')
      .doc(`/${userId}/`)
      .collection('items')
      .doc(`/${productId}/`)
      .get()

    if (doc.data()) {
      if (doc.data().quantity === 1) {
        await db
          .collection('cartItem')
          .doc(`/${userId}/`)
          .collection('items')
          .doc(`/${productId}/`)
          .delete()
          .then((result) => {
            return res.status(200).send({ data: result })
          })
      } else {
        const quantity = doc.data().quantity - 1
        const updatedItem = await db
          .collection('cartItem')
          .doc(`/${userId}/`)
          .collection('items')
          .doc(`/${productId}/`)
          .update({ quantity })
        return res.status(200).send({ data: updatedItem })
      }
    }
  } catch (error) {
    return res.send({ message: error })
  }
})

router.get('/getCartItems/:user_id', async (req, res) => {
  const userId = req.params.user_id
  ;(async () => {
    try {
      let query = db
        .collection('cartItem')
        .doc(`/${userId}/`)
        .collection('items')

      let response = []
      await query.get().then((querySnap) => {
        querySnap.docs.map((doc) => {
          response.push({ ...doc.data() })
        })
        return response
      })
      return res.status(200).send({ data: response })
    } catch (error) {
      return res.send({ message: error })
    }
  })()
})

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.data.cartItem.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product_name,
          images: [item.imageURL],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    }
  })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['US'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: { unit: 'hour', value: 2 },
            maximum: { unit: 'hour', value: 4 },
          },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    line_items,

    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  })

  res.send({ url: session.url })
})

const endpointSecret = process.env.WEBHOOK_SECRET

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        // Then define and call a function to handle the event payment_intent.succeeded
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send()
  }
)

module.exports = router
