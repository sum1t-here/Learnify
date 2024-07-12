import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isValidEmail, isValidPassword } from "../helpers/regexMatcher";
function SignUp() {
  const [previewImg, setPreviewImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function handleImage(e) {
    e.preventDefault();
    // getting image
    const uploadedImg = e.target.files[0];
    if (uploadedImg) {
      setSignupData({
        ...signupData,
        avatar: uploadedImg,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImg);
      fileReader.addEventListener("load", function () {
        setPreviewImg(this.result);
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !signupData.email ||
      !signupData.fullname ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please fill in all details");
      return;
    }

    if (signupData.fullname.length < 5 || signupData.fullname.length > 30) {
      toast.error("Name must be > 5 or < 30");
      return;
    }

    if (!isValidEmail(signupData.email)) {
      toast.error("Please check your email");
      return;
    }

    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullname", signupData.fullname);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/");

    setSignupData({
      fullname: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImg("");
  }
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      <img
        src={login}
        alt="Login"
        className="hidden  lg:h-auto lg:w-[460px] lg:block"
      />

      {/* Form section */}
      <div className="lg:w-[35%] min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg  min-w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            noValidate
          >
            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImg ? (
                <img
                  src={previewImg}
                  className="w-24 h-24 rounded-full m-auto"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>
            <input
              type="file"
              className="hidden"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png, .svg, .webp"
              onChange={handleImage}
            />
            <label className="p-2 font-outfit" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="p-2 border rounded-md"
              name="fullname"
              id="fullname"
              value={signupData.fullname}
              onChange={handleInput}
            />
            <label className="p-2 font-outfit" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={signupData.email}
              onChange={handleInput}
              className="p-2 border rounded-md"
              name="email"
              id="email"
            />
            <label className="p-2 font-outfit" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleInput}
              className="p-2 border rounded-md"
              name="password"
              id="password"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
              Signup
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
