import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancellation() {
    toast("Initialising Cancelation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation Successful");
    navigate("/");
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="my-10 flex flex-col gap-6 rounded-lg p-6 bg-white text-[#333333] w-full max-w-md shadow-lg">
        <img
          src={userData?.avatar?.secureURL}
          className="w-40 mx-auto rounded-full border-4 border-[#34485E] shadow-md"
          alt="User Avatar"
        />
        <h3 className="text-2xl font-bold text-center text-[#34485E] capitalize">
          {userData?.fullname}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-lg">
          <p className="font-semibold">Email:</p>
          <p className="overflow-auto">{userData?.email}</p>
          <p className="font-semibold">Role:</p>
          <p>{userData?.role}</p>
          <p className="font-semibold">Subscription:</p>
          <p>
            {userData?.subscription?.status === "active"
              ? "Active"
              : "Inactive"}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to="/changepassword"
            className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center"
          >
            Change Password
          </Link>
          <Link
            to="/user/editprofile"
            className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center"
          >
            Edit Profile
          </Link>
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-500 hover:bg-red-400 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
