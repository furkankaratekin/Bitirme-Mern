import React from "react";
import { Link } from "react-router-dom"; // React Router bağlantıları için

const Footer = () => {
  return (
    <footer className="bg-gray-50 p-3">
      <div className="hidden lg:block lg:flex lg:justify-end mr-10">
        <Link
          to="/hakkinda"
          className="lg:ml-4  hover:text-gray-500 hover:underline"
        >
          Hakkında
        </Link>
        <Link
          to="/gizlilik"
          className="lg:ml-4  hover:text-gray-500 hover:underline"
        >
          Gizlilik
        </Link>
        {/* İstediğiniz kadar başka hover efektlerini de ekleyebilirsiniz */}
      </div>
    </footer>
  );
};

export default Footer;
