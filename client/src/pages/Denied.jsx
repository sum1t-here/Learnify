import denied from "../assets/denied.png";

function Denied() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 font-outfit">
      <img
        src={denied}
        alt="404 Not Found"
        className="max-w-full h-auto mb-8 lg:h-[470px] lg:w-[460px]"
      />
      <h1 className="text-3xl lg:text-6xl font-bold text-gray-800 mb-4">
        Unauthorised
      </h1>
      <p className="text-lg lg:text-xl text-gray-600 mb-8 text-center">
        You are not authorized to view this page
      </p>
      <button
        className="bg-blue-600 text-white rounded-full py-2 px-6 text-lg lg:text-xl font-semibold shadow-md hover:bg-blue-700 transition-colors"
        onClick={() => (window.location.href = "/")}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default Denied;
