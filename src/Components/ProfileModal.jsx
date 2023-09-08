/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { imageUpload } from "../utility/utility";
import { AuthContext } from "../Providers/AuthProvider";

const ProfileModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { updateUserProfile, user } = useContext(AuthContext);

  const handleSave = () => {
    if (!name || !bio) {
      console.error("Name and bio are required.");
      return;
    }

    if (selectedImage) {
      imageUpload(selectedImage)
        .then((data) => {
          const image = data.data.display_url;
          updateUserProfile(user, name, image, bio)
            .then(() => {
              console.log("Profile updated successfully");
              onClose();
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      updateUserProfile(user, name, user.photoURL, bio)
        .then(() => {
          console.log("Profile updated successfully");
          onClose();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Profile"
            className="w-20 h-20 rounded-full mb-4"
          />
        )}
        <div className="mb-4">
          <label className="text-sm font-medium">Name</label>
          <br />
          <input
            type="text"
            className="w-60 outline-none p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">Bio</label> <br />
          <textarea
            className="w-60 outline-none p-2 border rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex w-full gap-3">
          <button
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            onClick={() => onClose()}
            className="bg-blue-500 w-full text-white py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
