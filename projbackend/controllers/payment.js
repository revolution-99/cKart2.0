// Directly comes from the documentation
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",
});

exports.getToken = (req, res) => {
  // Directly copied from the docs
  gateway.clientToken.generate(
    {
      // customerId: aCustomerId
    },
    (err, response) => {
      // pass clientToken to your front-end
      if (err) {
        // Error 500 for payment error
        res.status(500).json({
          error: "Unable to proceed the payment",
        });
      } else {
        res.json(response);
      }
    }
  );
};

exports.checkOut = (req, res) => {
  // Receive a payment method nonce from your client
  const nonceFromTheClient = req.body.payment_method_nonce;

  const amountFromClient = req.body.amount;
  gateway.transaction.sale(
    {
      // Setting the amount equal to that which comes from the client (customer)
      amount: amountFromClient,
      paymentMethodNonce: nonceFromTheClient,
      // deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json({
          error: "Unable to checkout",
        });
      }
      else{
          res.send(result)
      }
    }
  );
};
