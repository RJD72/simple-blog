/* eslint-disable no-unused-vars */
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { uploadImage } from "../apiCalls/uploadImage";

const ProfilePage = () => {
  const [formInfo, setFormInfo] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpload = async (e) => {
    const url = `/api/user/upload`;
    try {
      dispatch(updateStart());

      const image = e.target.files[0];

      const data = await uploadImage(image, url);

      dispatch(updateSuccess(data));
      setFormInfo({});
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateStart());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formInfo),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.error));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="my-7 text-center font-semibold text-3xl">
        {currentUser.username} Profile
      </h1>
      <form
        className="max-w-4xl mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="w-32 h-32 shadow-sm overflow-hidden rounded-full self-center">
          <img
            src={
              (currentUser.profile_pic && currentUser.profile_pic) ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            className="rounded w-full h-full object-cover border-gray "
          />
        </div>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="image" value="Upload profile picture" />
          </div>
          <div className="">
            <FileInput id="image" onChange={handleUpload} />
          </div>
        </div>

        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <div className="">
            <TextInput
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="username" value="Email" />
          </div>
          <div className="">
            <TextInput
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-2">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};
export default ProfilePage;
