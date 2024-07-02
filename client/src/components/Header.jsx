import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between gap-8 p-5 bg-[#F9C365] shadow-lg sticky top-0 font-outfit z-50">
      <div className="flex items-center">
        <p className="text-center cursor-pointer font-petit text-3xl lg:mr-[10rem]">
          Learnify
        </p>
      </div>
      <div className="hidden lg:flex flex-grow-0">
        <ul className="flex flex-row justify-start items-center gap-6 cursor-pointer">
          <li>Home</li>
          <li>Courses</li>
          <li>About us</li>
          <li>Contact us</li>
        </ul>
      </div>
      <div className="hidden lg:flex flex-row gap-6 text-right">
        <button className="cursor-pointer">Login</button>
        <button className="cursor-pointer">Signup</button>
      </div>
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
            <li>Home</li>
            <li>Courses</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
          <div className="flex flex-col gap-6 items-center text-center mt-5">
            <button className="cursor-pointer">Login</button>
            <button className="cursor-pointer">Signup</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
