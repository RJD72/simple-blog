export const uploadImage = async (file, url) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    return data; // Return the uploaded image data
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw error; // Re-throw the error to be handled by the calling function
  }
};
