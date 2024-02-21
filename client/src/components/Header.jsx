import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import KS from '../assets/KS.png';
import { FaUser } from "react-icons/fa";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-white p-0 sticky top-0 flex justify-between items-center">
      <Link to="/">
        {/* Logo */}
        <img src={KS} alt="Logo" className=" w-14 ml-10" />
      </Link>

      {/* Avatar ve Menü */}
      <div className="flex items-center space-x-8 ">
        {/* Menü */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <a
              href="#"
              className="text-gray-600  hover:text-gray-900 hover:underline"
            >
              Görseller
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Videolar
            </a>
          </li>
        </ul>

        {/* Avatar */}
        <div className="flex items-center">
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 rounded-full flex items-center justify-center bg-transparent">
                <FaUser className="md:h-8 w-8 h-10 w-10" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

/*     <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div> */
