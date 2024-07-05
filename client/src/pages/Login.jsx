import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimg from "../assets/login.png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";
import { isValidEmail, isValidPassword } from "../helpers/regexMatcher";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all details");
      return;
    }

    if (!isValidEmail(loginData.email)) {
      toast.error("Please check your email");
      return;
    }

    if (!isValidPassword(loginData.password)) {
      toast.error(
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    }

    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      <img
        src={loginimg}
        alt="Login"
        className="hidden  lg:h-auto lg:w-[460px] lg:block"
      />

      {/* Form section */}
      <div className="lg:w-[35%] min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg  min-w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            noValidate
          >
            <label className="p-2 font-outfit" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleInput}
              className="p-2 border rounded-md"
              name="password"
              id="password"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Donot have an account ?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
