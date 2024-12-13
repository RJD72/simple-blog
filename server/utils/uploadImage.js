const cloudinary = require("../utils/cloudinary");

module.exports = (imageFile) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error.message);
          return reject({ message: error.message });
        }
        if (result && result.secure_url) {
          //   console.log(result.secure_url);
          return resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }

        return reject({ message: "Unknown error during Cloudinary upload" });
      }
    );

    // Pipe the image buffer to the Cloudinary stream uploader
    stream.end(imageFile.buffer);
  });
};
