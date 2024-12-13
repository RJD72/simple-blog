/* eslint-disable no-unused-vars */
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../apiCalls/uploadImage";
import { useDispatch, useSelector } from "react-redux";

// Move toolbarOptions outside the component
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link", "image"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Memoize modules using useMemo
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Update the image preview state
      };
      reader.readAsDataURL(selectedFile); // Read the file
      setFile(selectedFile); // Store the file for upload
    } else {
      setImage(null); // Reset image state
      setFile(null); // Reset file state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      let uploadedImageUrl;

      // Upload the image if a file is selected
      if (file) {
        const uploadUrl = "/api/post/upload";
        try {
          const uploadResponse = await uploadImage(file, uploadUrl);
          uploadedImageUrl = uploadResponse.imageUrl.secure_url;
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError.message);
          setPublishError("Failed to upload the image.");
          setLoading(false);
          return;
        }
      }

      // Create the post
      const res = await fetch("/api/post/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          content,
          image: uploadedImageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        console.error("Post creation failed:", data.message);
        setLoading(false);
        return;
      }

      // Success: Reset form and navigate
      setPublishError(null);
      setFormData({});
      setContent("");
      setImage(null);
      setFile(null);
      setPosts(data.savedPost);

      navigate(`/post/${data.savedPost.slug}`);
    } catch (error) {
      setPublishError("Something went wrong during post creation.");
      console.error(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            defaultValue=""
            onChange={(e) =>
              setFormData({
                ...formData,
                categories: [e.target.value],
              })
            }
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        {image ? (
          <>
            <div className="h-64 w-64 overflow-hidden">
              <img src={image} alt="Post image" />
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
              <FileInput
                type="file"
                accept="image/*"
                // onChange={(e) => setFile(e.target.files[0])}
                onChange={handleImageChange}
              />
              <Button
                type="button"
                gradientDuoTone="purpleToBlue"
                size="sm"
                outline
                // onClick={handleUpload}
                disabled={loading}
              >
                Upload image
              </Button>
            </div>
          </>
        )}
        <ReactQuill
          modules={modules}
          theme="snow"
          placeholder="Create post..."
          className="h-72 mb-12"
          required
          value={content}
          onChange={setContent}
        />
        <Button type="submit" gradientDuoTone="purpleToPink" className="mt-5">
          Publish
        </Button>
      </form>
      {publishError && (
        <Alert className="mt-5" color="failure">
          {publishError}
        </Alert>
      )}
    </div>
  );
};

export default CreatePost;
