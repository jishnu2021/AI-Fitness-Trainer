import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadImage = () => {
  useEffect(() => {
    getImage();
  }, []);

  const [allimage, setAllImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImage = async () => {
    const result = await axios.get("http://localhost:5000/get-image");
    setAllImage(result.data.data);
  };

  const handleImageClick = (index) => {
    // Set the selected image based on its index
    setSelectedImage(index);
  };

  return (
    <div>
      <h1>Uploaded Image</h1>
      {allimage == null
        ? ""
        : allimage.map((data, index) => (
            <img
              key={index}
              src={require(`./photos/${data.image}`)}
              height={100}
              width={100}
              style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickable
              onClick={() => handleImageClick(index)} // Handle click event
            />
          ))}
      {/* Conditionally render the larger version of the selected image */}
      {selectedImage !== null && (
        <div>
          <h2>Selected Image</h2>
          <img
            src={require(`./photos/${allimage[selectedImage].image}`)}
            height={200} // Adjust the height for larger size
            width={200} // Adjust the width for larger size
            alt={`Selected Image ${selectedImage}`}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
