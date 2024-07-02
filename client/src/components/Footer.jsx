import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiDribbble } from "react-icons/fi";
import { FaHashnode } from "react-icons/fa6";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-black">
      <footer className="p-4 bg-base-300 text-base-content flex flex-col gap-4 justify-center items-center">
        <aside>
          <p className=" text-gray-50 font-inter">
            Copyright © {year} - All right reserved. Designed and coded with ❤️
          </p>
        </aside>
        <aside>
          <ul className="text-gray-50 flex flex-row gap-3">
            <li>
              <FaGithub />
            </li>
            <li>
              <FaLinkedin />
            </li>
            <li>
              <FaXTwitter />
            </li>
            <li>
              <FiDribbble />
            </li>
            <li>
              <FaHashnode />
            </li>
          </ul>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
