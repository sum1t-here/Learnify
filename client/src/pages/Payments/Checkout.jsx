import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyPurchase,
} from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  useEffect(() => {
    async function load() {
      await dispatch(getRazorpayId());
      await dispatch(purchaseCourseBundle());
    }
    load();
  }, [dispatch]);

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Learnify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F59E0B",
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment successful");

        const res = await dispatch(verifyPurchase(paymentDetails));
        if (res?.payload?.success) {
          navigate("/checkout/success");
        } else {
          navigate("/checkout/fail");
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <form
      onSubmit={handleSubscription}
      className="min-h-[90vh] flex items-center justify-center text-[#333333]"
    >
      <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg relative bg-white">
        <h1 className="bg-[#F59E0B] absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-t-lg">
          Subscription Bundle
        </h1>
        <div className="px-4 space-y-5 text-center">
          <p className="text-[17px]">
            This purchase will allow you to access all available courses on our
            platform for{" "}
            <span className="text-[#F59E0B] font-bold">
              <br />1 Year duration
            </span>{" "}
            All existing and newly launched courses will also be available.
          </p>
          <p className="flex items-center justify-center gap-1 text-2xl font-bold text-[#F59E0B]">
            <BiRupee />
            <span>499</span> only
          </p>
          <div className="text-gray-600">
            <p>100% refund on cancellation</p>
            <p>* Terms and conditions apply *</p>
          </div>
          <button
            type="submit"
            className="bg-[#F59E0B] hover:bg-[#E58E0A] transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
          >
            Buy Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default Checkout;
