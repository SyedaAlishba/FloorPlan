import React, { useEffect, useState } from "react";
import "./Floorplanlayout.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { Button } from "@mui/material";
import logoImg from "../../src/Images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Nav from "../Components/Nav/Nav";

import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const Floorplanlayout = () => {
  const options = [
    { value: "Main door", label: "Main door" },
    { value: "Living Room", label: "Living Room" },
    { value: "Bed room", label: "Bed room" },
    { value: "Bath", label: "Bath" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "Yard", label: "Yard" },
  ];
  const [count, setCount] = useState([1]);

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");

  const [descriptionArr, setDescriptionArr] = useState([""]);

  const [location, setLocation] = useState("");
  const [locationArr, setLocationArr] = useState([]);

  const [mainImageFile, setMainImageFile] = useState();
  const [mainImgArr, setMainImgArr] = useState([]);
  // const [imgArr, setImgArr] = useState([]);





  const buttonStyle = {
    color: "#1f4879",
    borderRadius: "10px",
    border: "2px solid #1f4879",
  };
  const buttonStyleSubmit = {
    color: "#1f4879",
    borderRadius: "10px",
    border: "2px solid #1f4879",
    textTransform: "none",
  };


  const handleMainImageChange = (e) => {
    setMainImageFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e, index) => {
    const updatedDescriptionArr = [...descriptionArr];

    // Ensure the updated value is assigned to the correct index in the array
    updatedDescriptionArr[index] = e.target.value;

    // Update the state with the modified array
    setDescriptionArr(updatedDescriptionArr);
  };


  const handleSubmit = async (e) => {

    e.preventDefault()
    // console.log("images are", mainImgArr)
    const filteredDescriptionArr = descriptionArr.filter((desc) => desc.trim() !== "");

 locationArr.map((item,index)=>{
console.log(`location at index ${index} is : `, item)
})

descriptionArr.map((item,index)=>{
  console.log(`description at index ${index} is : `, item)
  })

  mainImgArr.map((item,index)=>{
    console.log(`img at index ${index} is : `, item)
    })


    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("remarks", remarks);
    formData.append("date", date);
    // formData.append("remarks", location);

    if (mainImageFile) {
      formData.append("mainImage", mainImageFile);
    } else {
      formData.append("mainImage", "");
    }

    for (const selectedOption of locationArr) {
      formData.append("location", selectedOption);
    }

    for (const desc of filteredDescriptionArr) {
      formData.append("description", desc);
    }

//     // Loop through each sub-array in mainImgArr
// mainImgArr.forEach((imgArray, index) => {
//   console.log(
//     "imgArray is ", imgArray
//   )
//   imgArray.forEach((imgFile, fileIndex) => {
//     console.log(
//       "imgFile is ", imgFile
//     )
//     formData.append('img', imgFile);
//     // formData.append(`img[${index}]`, imgFile);
//   });
// });

const imgCount = [];

// Loop through each sub-array in mainImgArr
mainImgArr.forEach((imgArray, index) => {
  const countArray = [];
  imgArray.forEach((imgFile, fileIndex) => {
    countArray.push(imgFile.length);
    console.log("imgFile is ", imgFile)
  //   const file = imgFile[fileIndex];

  //   if (file) {
    for (let i = 0; i < imgFile.length; i++) {
      const file = imgFile[i];
      formData.append('img', file);
    }
  //   }
  });
  imgCount.push(countArray);
});

// Flatten the imgCount array to get a single array
const flattenedImgCount = imgCount.reduce((acc, val) => acc.concat(val), []);
formData.append('imgCount', JSON.stringify(flattenedImgCount));

    // for (const img of imgFiles) {
    //   if (img) {
    //     formData.append("img", img);
    //   } else {
    //     formData.append("img", ""); // You may want to handle this differently
    //   }
    // }
    // console.log("Form Data Content:");

    // for (const pair of formData.entries()) {
    //   const [key, value] = pair;
    //   if (value instanceof File) {
    //     console.log(key + ": [File]");
    //   } else {
    //     console.log(key + ": " + value);
    //   }
    // }
    // "http://54.226.145.28:3000/api/v1/floorplan"

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/floorplan', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from the server:", response.data);
      // generatePDF();
      toast.success("Data submitted successfully!!")
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!")
    }
  };

  return (
    <>
      <Nav />
      <Box style={{ marginBottom: "20px", padding: "0px" }}>

        <Box>
          <ToastContainer position="top-right" />
          {/* Same as */}
          <ToastContainer />
          <header className="headerWrapper">
            <Box>
              <img src={logoImg} />
            </Box>
            <Box>
              <Box className="txtStyle">
                <p>
                  BUDDYFECTS PTE. LTD.
                  <br />
                  UEN: 202318717Z
                  <br />
                  1003 BUKIT MERAH
                  CENTRAL
                  #07-43
                  <br />
                  SINGAPORE (159836)
                </p>
              </Box>
            </Box>
          </header>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box className="Mainwrapper">
            <Box className="TextfiledFlex">
              <Box>
                <label
                  style={{
                    margin: "0px",
                    padding: "0px",
                    color: "#1f4879",
                    fontSize: "18px",
                  }}
                >
                  Name
                </label>
                <TextField
                  placeholder="Write Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="TextfieldStyle"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Box>
              <Box>
                <label
                  style={{
                    margin: "0px",
                    padding: "0px",
                    color: "#1f4879",
                    fontSize: "18px",
                  }}
                >
                  Date
                </label>
                <div style={{ display: "grid", width: "92%" }}>
                  <DatePicker
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="form-control"
                    id="date"
                    name="date"
                    selected={date}
                    onChange={(date) =>
                      setDate(date)
                    }
                    dateFormat="yyyy-MM-dd"
                  />
                </div>

              </Box>

              <Box>
                <label
                  style={{
                    margin: "0px",
                    padding: "0px",
                    color: "#1f4879",
                    fontSize: "18px",
                  }}
                >
                  Address
                </label>
                <TextField
                  placeholder="Write Address"

                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="TextfieldStyle"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Box>
              <Box>
                <label
                  style={{
                    margin: "0px",
                    padding: "0px",
                    color: "#1f4879",
                    fontSize: "18px",
                  }}
                >
                  Remarks
                </label>
                <TextField
                  placeholder="Write Remarks"

                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                  }}
                  className="TextfieldStyle"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Box>
              <Box gap={2} style={{ display: "flex", flexDirection: "column" }}>



                <label
                  style={{
                    margin: "0px",
                    padding: "0px",
                    color: "#1f4879",
                    fontSize: "18px",
                  }}
                >
                  Main Floor Image
                </label>
                <Box style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <label htmlFor="main-image-input" className="upload-button">
                    <input
                      type="file"
                      accept="image/*"
                      id="main-image-input"
                      onChange={handleMainImageChange}
                      style={{ display: "none" }}
                    />
                    <PhotoCameraIcon fontSize="large" color="primary" />
                  </label>
                  {mainImageFile && (
                    <div>
                      <img style={{ height: "100px", width: "100px" }} src={URL.createObjectURL(mainImageFile)} alt="Selected" />
                    </div>
                  )}
                </Box>
              </Box>
           
              {count?.map((item, index) => (
                <Destription
                  key={index}
                  location={location}
                  print={locationArr[index]}
                  // change={handleImgChange}
                  descChange={(e) => handleDescriptionChange(e, index)} // Pass the index
                  description={descriptionArr[index]} // Use the description at the specific index
                  index={index}
                  // imgFiles={imgFiles}
                  locationOptions={options}
                  updateLocationArr={(selectedLocation) => {
                    const updatedLocationArr = [...locationArr];
                    updatedLocationArr[index] = selectedLocation.value;
                    setLocationArr(updatedLocationArr);
                  }}

                  updateImgArr={(destIndex, imgFiles) => {
                    const updatedMainImgArr = [...mainImgArr];
                    updatedMainImgArr[destIndex] = imgFiles;
                    setMainImgArr(updatedMainImgArr);
                  }}

                />
              ))}
              <Box className="btnFlex">
                <Button
                  onClick={() => {
                    setCount([...count, 1]);
                    setLocationArr([...locationArr, location.value]);

                    // setDescriptionArr([...descriptionArr, description]);
                  }}
                  color="primary"
                  style={buttonStyle}
                >
                  <AddIcon />
                </Button>
                <Box>
                  <Button
                    style={buttonStyleSubmit}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>

    </>
  );
};

const Destription = (props) => {

  const [selectedLocation, setSelectedLocation] = useState(props.locationOptions[0]); // Initialize with the first location option
  const [imgFiles, setImgFiles] = useState([]); // Store multiple image files for this iteration

  const handleImgChange = (e) => {
    const selectedFiles = e.target.files;
    setImgFiles([...imgFiles, selectedFiles]);
  };
  
  useEffect(() => {
    props.updateImgArr(props.index, imgFiles); // Update the parent component's mainImgArr
  }, [imgFiles]);
  return (

    <Box className="Flexdiscrip">
      <label htmlFor={`image-input-${props.index}`} className="upload-button-small">
        <input
          type="file"
          accept="image/*"
          multiple
          id={`image-input-${props.index}`}
          onChange={handleImgChange}
          style={{ display: "none" }}
        />
        <PhotoCameraIcon fontSize="small" color="primary" />
      </label>
      <Box className="location-label">
        <div>
          <label className="location-label">
            Location
          </label>
          <Select
        
            options={props.locationOptions}
            value={selectedLocation}
            onChange={(selectedOption) => {
              setSelectedLocation(selectedOption);
              props.updateLocationArr(selectedOption); // Update locationArr in the parent
            }}
          />
        </div>
      </Box>
      <Box>
        <Box className="Descriptionflex">
          <Box>
            <label className="description-label">
              Description
            </label>
            <TextField
              placeholder="Write Description"
              multiline
              rows={2}
              className="TextfieldStyle-small"
              id={`outlined-basic-${props.index}`}
              variant="outlined"
              value={props.description}
              onChange={(e) => props.descChange(e, props.index)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default Floorplanlayout;
