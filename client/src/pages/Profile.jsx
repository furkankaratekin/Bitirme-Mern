import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import KS from "../assets/KS.png";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [listFavorites, setListFavorites] = useState([]);
  const [listWebsites, setListWebsites] = useState([]);
  const [filteredWebsites, setFilteredWebsites] = useState([]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  //Favorileri gösterme ID ile
  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = currentUser._id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/list-favorite`
        );
        setListFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Web sitelerini çekme
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/websites");
        setListWebsites(response.data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };

    fetchWebsites();
  }, [listFavorites]); // listFavorites değiştiğinde bu useEffect tekrar çalışır

  // Favori listesindeki ID'lere göre web sitelerini filtreleme
  useEffect(() => {
    const filtered = listWebsites.filter((website) =>
      listFavorites.includes(website._id)
    );
    setFilteredWebsites(filtered);
  }, [listWebsites, listFavorites]); // listWebsites veya listFavorites değiştiğinde bu useEffect tekrar çalışır

  // Favorileri silme işlevi
  const removeFavorite = async (websiteId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/${currentUser._id}/remove-favorite`,
        { websiteId }
      );
      if (response.status === 200) {
        setListFavorites((currentFavorites) =>
          currentFavorites.filter((id) => id !== websiteId)
        );
        setFilteredWebsites((currentFiltered) =>
          currentFiltered.filter((website) => website._id !== websiteId)
        );
        // Başarılı toast mesajı
        toast.success("Favorilerden kaldırıldı!");
      }
    } catch (error) {
      console.error("Favori kaldırma işlemi başarısız.", error);
      // Hata toast mesajı
      toast.error("Favori kaldırma işlemi başarısız oldu.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Link to="/">
          <div className="flex justify-start m-5">
            <img src={KS} alt="" className="w-14 h-auto" />
          </div>
        </Link>
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="profile"
              className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
              onClick={() => fileRef.current.click()}
            />
            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
            <input
              defaultValue={currentUser.username}
              type="text"
              id="username"
              placeholder="Username"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteAccount}
              className="text-red-700 cursor-pointer"
            >
              Delete Account
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-700 cursor-pointer"
            >
              Sign out
            </span>
          </div>
          <p className="text-red-700 mt-5">
            {error && "Something went wrong!"}
          </p>
          <p className="text-green-700 mt-5">
            {updateSuccess && "User is updated successfully!"}
          </p>
          <hr />
          <div>
            <ToastContainer />

            <div className="mt-12">
              <h2 className="text-center text-2xl text-red-700">Favoriler</h2>
              <ul>
                {filteredWebsites.map((website) => (
                  <li key={website._id}>
                    <div className="flex items-center mt-4">
                      <Link
                        to={`/websites/${website.id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={website.img_logo}
                          alt="Website Logo"
                          className="rounded-full w-16 h-16 border-2 border-black"
                        />
                      </Link>
                      <Link to={`/websites/${website.id}`} className="ml-5">
                        <p>{website.uzun_link}</p>
                      </Link>
                      {/* Favori silme butonu */}
                      <button
                        className="text-lg ml-5 hover:scale-125 text-red-800"
                        onClick={() => removeFavorite(website._id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
      
    </div>
  );
}


