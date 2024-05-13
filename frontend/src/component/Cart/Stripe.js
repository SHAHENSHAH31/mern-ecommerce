import Payment from "./Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const Stripe = ({stripeApiKey}) =>{

 return(
    <>
      <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
    </>
 )
}

export default Stripe;