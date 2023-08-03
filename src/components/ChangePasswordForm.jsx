import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { toast } from 'react-toastify'

function ChangePasswordForm() {
  // Using useState hook to handle local state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useNavigate hook for programmatically navigating the router
  const navigate = useNavigate();

  // useContext hook to access the global context, UserContext
  const { token, setToken } = useContext(UserContext);

  // Define the API URL depending on the current mode (production or development)
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // This function will be triggered when the form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the new password and the confirmed password
    if (newPassword !== confirmPassword) {
      toast.warn("New password and confirm password do not match!");
      return;
    }

    // Make a PUT request to change the password
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

      // Log the response data for debugging purposes
      console.log(response.data);

      // If the password change was successful, navigate to the login page
      if (response.data.message === "Password changed successfully") {
        toast.success("Successfully updated password!");
        setToken(null); // Clear the token as it might become invalid after password change
        localStorage.removeItem("token"); // Also clear the token from local storage
        navigate("/login"); // Navigate the user to the login page
      }
    } catch (error) {
      console.error(error.response);
      // Handle specific error message
      if (
        error.response &&
        error.response.data.message === "Invalid current password"
      ) {
        toast.error("Invalid current password, please try again.");
      } else {
        toast.error("An error occurred while updating the password.");
      }
    }
  };

  // This function will be triggered when the delete button is clicked
  const handleDelete = async () => {
    // Ask for user confirmation before deletion
    if (
      window.confirm(
        "Do you wish to delete your account? All data will be removed from the database."
      )
    ) {
      // Make a DELETE request to delete the user account
      try {
        const response = await axios.delete(`${API_URL}/users/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        // If the account deletion was successful, navigate to the home page
        if (response.data.message === "Account deleted successfully") {
          toast.info("Your account has been deleted successfully.");
          setToken(null);
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during delete account request: ", error);
        if (error.response) {
          console.error("Server response: ", error.response.data);
        }
        toast.error("An error occurred while trying to delete your account.");
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
