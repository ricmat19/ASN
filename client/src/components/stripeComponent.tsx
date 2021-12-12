import React, { FC } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import PaymentC from "./payment";

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.REACT_APP_STRIPEPUBLIC || ""
);

const StripeC: FC = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentC />
      </Elements>
    </div>
  );
};

export default StripeC;
