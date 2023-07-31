import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);

  // Define API_URL based on the mode
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/users/change-password`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.message === "Password changed successfully") {
        alert("Successfully updated password!");
        setToken(null); // You should also clear token after password change because it might become invalid.
        localStorage.removeItem("token"); // Clear the token from local storage too.
        navigate("/login"); // Navigate to login page.
      }
    } catch (error) {
      console.error(error.response);
      if (
        error.response &&
        error.response.data.message === "Invalid current password"
      ) {
        alert("Invalid current password, please try again.");
      } else {
        alert("An error occurred while updating the password.");
      }
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Do you wish to delete your account? All data will be removed from the database."
      )
    ) {
      try {
        console.log("Token before request: ", token);
        const response = await axios.delete(`${API_URL}/users/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        if (response.data.message === "Account deleted successfully") {
          alert("Your account has been deleted successfully.");
          setToken(null);
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during delete account request: ", error);
        if (error.response) {
          console.error("Server response: ", error.response.data);
        }
        alert("An error occurred while trying to delete your account.");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-5 space-y-4 text-voyage-black"
        >
          <div className="w-full space-y-4">
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />

            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />
          </div>
          <div className="self-start">
            <button
              type="submit"
              className="bg-voyage-green shadow-lg text-white font-roboto mb-10 font-light rounded px-4 py-2"
            >
              Update
            </button>
            <div>
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-700 underline mb-10"
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
