/* eslint-disable no-unused-vars */
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadImage } from "../apiCalls/uploadImage";
const apiBaseUrl = import.meta.env.VITE_API_URL;

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

const UpdatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

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

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(
          `${apiBaseUrl}/api/post/get-post?postId=${postId}`
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl;

      // Upload the image if a file is selected
      if (file) {
        const uploadUrl = `${apiBaseUrl}/api/post/upload`;
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

      const res = await fetch(`${apiBaseUrl}/api/post/update-post/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          image: uploadedImageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        setLoading(false);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setLoading(false);
        navigate(`/post/${data.updatedPost.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
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
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, categories: e.target.value })
            }
            value={formData.categories}
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

        {/* {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )} */}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Create post..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
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
export default UpdatePost;
