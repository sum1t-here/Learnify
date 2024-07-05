import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[90vh] pt-12 px-6 md:px-20 flex flex-col items-center justify-center text-gray-800 font-outfit">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative w-full max-w-5xl">
        <div className="space-y-5">
          <img
            className="w-full h-64 object-cover rounded-md shadow-lg"
            alt="thumbnail"
            src={state?.thumbnail?.secure_url}
          />

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-between text-xl">
              <p className="font-semibold">
                <span className="text-indigo-600 font-bold">
                  Total lectures:{" "}
                </span>
                {state?.numberOfLectures}
              </p>

              <p className="font-semibold">
                <span className="text-indigo-600 font-bold">Instructor: </span>
                {state?.createdBy}
              </p>
            </div>

            {role === "ADMIN" || data?.subscription?.status === "active" ? (
              <button
                onClick={() =>
                  navigate("/course/displaylectures", { state: { ...state } })
                }
                className="bg-green-400 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-green-500 transition-all ease-in-out duration-300"
              >
                Watch lectures
              </button>
            ) : (
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-400 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-green-500 transition-all ease-in-out duration-300"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2 text-xl">
          <h1 className="text-3xl font-bold text-indigo-600 mb-5 text-center">
            {state?.title}
          </h1>

          <p className="text-indigo-600 font-semibold">Course description:</p>
          <p>{state?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
