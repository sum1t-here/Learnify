import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

function CheckoutSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <AiOutlineCheckCircle className="text-green-600 text-9xl mb-5" />
      <h1 className="text-3xl font-bold text-green-600">Success!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your transaction was successful.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default CheckoutSuccess;
