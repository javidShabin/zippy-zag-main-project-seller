import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const ProfilePage = () => {
  // State for user profile management
  const [isSeller, setIsSeller] = useState({});

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/seller/profile",
      });
      setIsSeller(response.data);
    } catch (error) {
      toast.error("Failed to fetch seller profile");
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <main className="flex justify-around gap-5 mt-5">
      {/* Profile Section */}
      <div className="flex justify-center bg-orange-50 items-center rounded-xl shadow-lg">
        <div className="w-[500px] bg-white shadow-xl rounded-xl p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={isSeller.image || "/default-profile.png"}
              alt="User profile"
              className="rounded-full w-[160px] h-[160px] object-cover border-2 border-gray-200"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-medium text-gray-800">
              {isSeller.name}
            </h1>
            <span className="block text-gray-500 mt-1">{isSeller.email}</span>
            <h4 className="text-gray-500 mt-1">{isSeller.phone}</h4>
          </div>

          <div className="mt-6 w-full">
            <div className="grid grid-cols-2 gap-6 text-center text-gray-600">
              <div>
                <h5 className="text-lg font-semibold text-gray-800">Joined</h5>
                <p>{new Date(isSeller.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-gray-800">
                  Location
                </h5>
                <p>{isSeller.location || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full">
            <Link to={"/seller/edit-profile"}>
              <button className="w-full py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition duration-300">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
