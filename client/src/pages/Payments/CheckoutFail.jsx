import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CheckoutFail() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <AiOutlineCloseCircle className="text-red-600 text-9xl mb-5" />
      <h1 className="text-3xl font-bold text-red-600">Failed!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your transaction failed. Please try again.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default CheckoutFail;
