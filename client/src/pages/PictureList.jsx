import React from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const PictureList = () => {
  return (
    <div>
      <div className="">
        <Header></Header>
      </div>
      <div>
        <div className="w-2/3 mt-4">
          <form
            className="flex flex-col md:flex-row gap-4 mb-4 pl-32"
          >
            <input
              type="text"
              placeholder="Search Pictures..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {/* Tümü Görseller Fİlan Yazısı */}
        <div className="flex justify-center  items-center p-4">
          <div>
            <Link to="/websites">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Tümü
              </a>
            </Link>
            <Link to="/pictures">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Görseller
              </a>
            </Link>
            <Link to="/videos">
              <a href="#" className="mr-12 hover:underline hover:text-gray-400">
                Videolar
              </a>
            </Link>
            <Link to="/maps">
              <a href="#" className="hover:underline hover:text-gray-400">
                Haritalar
              </a>
            </Link>
          </div>
        </div>
      </div>
      <hr />

      {/* Listelenen yer */}

    </div>
  );
}

export default PictureList
