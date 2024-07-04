import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for check if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  // for displaying options according to role
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());

    if (res?.payload?.success) navigate("/");
  }

  return (
    <div className="flex flex-row items-center justify-between gap-8 p-4 bg-[#F9C365] shadow-lg sticky top-0 font-outfit z-50">
      <div className="flex items-center">
        <p className="text-center cursor-pointer font-petit text-3xl lg:mr-[10rem]">
          Learnify
        </p>
      </div>
      <div className="hidden lg:flex mr-32">
        <ul className="flex flex-row justify-start items-center gap-6 cursor-pointer">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && role === "ADMIN" && (
            <li>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
          )}
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contacts">Contact us</Link>
          </li>
        </ul>
      </div>
      {!isLoggedIn && (
        <div className="hidden lg:flex flex-row gap-6 text-right">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Signup
            </button>
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="hidden lg:flex flex-row gap-6 text-right">
          <Link to="/profile">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
              Profile
            </button>
          </Link>
          <Link onClick={handleLogout}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full ">
              Logout
            </button>
          </Link>
        </div>
      )}

      {/* isOpen is the state variable that determines if the menu is open or closed. */}
      {/* setIsOpen is the function that updates isOpen. */}
      {/* toggled={isOpen} passes the current state to the Hamburger component. */}
      {/* toggle={setIsOpen} passes the function to update the state to the Hamburger component. */}
      <div className="lg:hidden flex items-center">
        <Hamburger toggled={isOpen} toggle={setIsOpen} />
      </div>
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#F9C365] shadow-lg z-40 p-5">
          <ul className="flex flex-col items-center gap-6 cursor-pointer">
            <li onClick={closeMenu}>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li onClick={closeMenu}>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li onClick={closeMenu}>
              <Link to="/courses">Courses</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/about">About us</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/contacts">Contact us</Link>
            </li>
          </ul>
          {!isLoggedIn && (
            <div className="flex flex-row mr-2 gap-6 items-center text-center mt-5 justify-center">
              <Link to="/login">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                  onClick={closeMenu}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                  onClick={closeMenu}
                >
                  Signup
                </button>
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex flex-row mr-2 gap-6 items-center text-center mt-5 justify-center">
              <Link to="/profile">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                  onClick={closeMenu}
                >
                  Profile
                </button>
              </Link>
              <Link to="/logout">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
