// import React, { useEffect, useState } from 'react';
// import axios from 'axios'
import React from "react";
import {useNavigate} from 'react-router-dom'

const Imageupload = () => {

    const navigate = useNavigate();
  // const [allimage,setAllImage]=useState(null);
  

  // const getImage = async () => {
  //   const result = await axios.get("http://localhost:5000/get-image");
  //   console.log(result);
  //   setAllImage(result.data.data);
  // };

  const goto=()=>{
    navigate('/home')
  }


 
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append('userfile', event.target.image.files[0]);
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor="image">Upload Image</label><br />
        <input type="file" name="image" id="image" /><br />
        <button type='submit'>Submit</button>
      </form>
    <button onClick={goto}>ShowImages</button>
    {/* {
      allimage==null ? ""
      : allimage.map((data,index)=>{
        return <img key={index} src={require(`./photos/${data.image}`)} height={100} width={100}/>
      })
    } */}

    </>
  );
};

export default Imageupload;
