import midtransClient from "midtrans-client";

export const proccesTransaction = async (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: req.body.orderId,
        gross_amount: req.body.amount,
      },
      customer_details: {
        first_name: req.body.name,
        email: req.body.email,
      },
      callbacks: {
        finish: `${process.env.DOMAIN_FE}/confirmation`,
      },
      enable_payment: [
        "mandiri_clicpay",
        "bca-_clicpay",
        "bni_va",
        "bca_va",
        "permata_va",
        "gopay",
        "shopeepay",
      ],
    };
    snap
      .createTransaction(parameter)
      .then((transaction) => {
        const dataPayment = {
          mindtransResponse: JSON.stringify(transaction),
        };
        const transactionToken = transaction.token;

        res.status(200).json({token:transactionToken, dataPayment});
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({error: error.message})
      });
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
};


export const getStatus = async(req,res)=>{   
    try {
     const snap = new midtransClient.Snap({
       isProduction: false,
       serverKey: process.env.MIDTRANS_SERVER_KEY,
       clientKey: process.env.MIDTRANS_CLIENT_KEY,
     });
     snap.transaction.status(req.params.orderId).then(response => {
        res.status(200).json(response)
     }).catch(error => {
        res.status(404).json({error:"order tidak ditemukan"})
     })
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
}