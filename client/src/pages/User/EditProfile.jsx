import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    previewImg: "",
    fullname: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUploader(e) {
    e.preventDefault();
    const uploadedImg = e.target.files[0];
    if (uploadedImg) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImg);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImg: this.result,
          avatar: uploadedImg,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.fullname || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullname.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("avatar", data.avatar);
    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserData());
    navigate("/user/profile");
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center gap-5 rounded-lg p-4 text-[#333333] w-80 min-h-[26rem] bg-white shadow-lg"
        noValidate
      >
        <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
        <label className="cursor-pointer" htmlFor="image_uploads">
          {data.previewImg ? (
            <img
              className="w-28 h-28 rounded-full m-auto"
              src={data.previewImg}
              alt="Profile"
            />
          ) : (
            <BsPersonCircle className="w-28 h-28 rounded-full m-auto text-gray-500" />
          )}
        </label>
        <input
          onChange={handleImageUploader}
          className="hidden"
          type="file"
          id="image_uploads"
          name="image_uploads"
          accept=".jpg, .png, .svg, .jpeg, .webp"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname" className="text-lg font-semibold">
            Full Name
          </label>
          <input
            required
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Enter your name"
            className="bg-transparent px-2 py-1 border rounded"
            value={data.fullname}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded py-2 text-lg cursor-pointer"
        >
          Update Profile
        </button>
        <Link to="/user/profile">
          <p className="link text-yellow-600 cursor-pointer flex items-center justify-center w-full gap-2">
            <AiOutlineArrowLeft /> Go back to profile
          </p>
        </Link>
      </form>
    </div>
  );
}

export default EditProfile;
