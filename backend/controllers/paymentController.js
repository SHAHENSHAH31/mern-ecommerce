const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  console.log('ghghjjkjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',process.env.STRIPE_SECRET_KEY);
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    description: `Purchase from Ecommerce`,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   const { amount, shippingInfo, user } = req.body;
//   console.log('hi===============================>',amount,shippingInfo,user,user.name);

//   const myPayment = await stripe.paymentIntents.create({
//     amount,
//     currency: "usd", // ✅ must be non-INR for export payments
//     description: `Purchase from Ecommerce`, // ✅ required
//     shipping: {
//       address: {
//         line1: shippingInfo.address,
//         city: shippingInfo.city,
//         state: shippingInfo.state,
//         postal_code: shippingInfo.pinCode,
//         country: shippingInfo.country, // Must be non-IN
//       },
//     },
//     receipt_email: user.email, // ✅ helps with invoice/export compliance
//     metadata: {
//       company: "Ecommerce",
//     },
//   });

//   res.status(200).json({
//     success: true,
//     client_secret: myPayment.client_secret,
//   });
// });


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});