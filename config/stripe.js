import stripe from "tipsi-stripe";

// client test : pk_test_mEk3SpdSiKRzNQADwueQKbpR
// client live : pk_live_i5V112Spm1uMo3odGTGW9E3s
stripe.setOptions({
  publishableKey: "pk_test_mEk3SpdSiKRzNQADwueQKbpR"
});
export const optionsCardForm = {
  theme: {
    primaryForegroundColor: "#585F6F",
    accentColor: "#FFCF1B"
  }
};

export default stripe;