import React, { useState } from "react";
import "./Floorplanlayout.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import logoImg from "../../src/Images/logo33-removebg-preview.png"


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
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [print, setPrint] = useState([]);

  const buttonStyle = {
    color: '#1f4879',
    borderRadius: '10px', 
    border: '2px solid lightblue',
  };
  const buttonStyleSubmit = {
    color: 'white',
    borderRadius: '10px', 
    border: '2px solid lightblue',
    textTransform: 'none',

  
  }
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Form submitted with data:', { name, date, address, remarks });
  };
 

  return (

  <>
  <Box >
    <header className='headerWrapper'>
        <Box>
           <img src={logoImg} />

        </Box>
        <Box>
        <Box className="txtStyle">
        <p>
        BUDDYFECTS PTE. LTD.<br />
  UEN: 202318717Z<br />
  1003 BUKIT MERAH<br />
  CENTRAL<br />
  #07-43<br />
  SINGAPORE (159836)
        </p>
  
</Box>
        </Box>
    </header>
  </Box>
<form  onSubmit={handleSubmit}>

    <Box className="Mainwrapper">
        
      <Box className="TextfiledFlex"  >
        <Box>
        <label style={{margin:"0px", padding:"0px",color:"white",fontSize:"18px"}} >Name</label>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log("name is ", name);
          }}
          className="TextfieldStyle"
          id="outlined-basic"
          variant="outlined"
        />

        </Box>
        <Box>
        <label style={{margin:"0px", padding:"0px",color:"white",fontSize:"18px"}} >Date</label>
        <TextField
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            console.log("date is", date);
          }}
          className="TextfieldStyle"
          id="outlined-basic"
          variant="outlined"
        />
</Box>

<Box>
        <label style={{margin:"0px", padding:"0px",color:"white",fontSize:"18px"}} >Address</label>
        <TextField
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            console.log("address is", address);
          }}
          className="TextfieldStyle"
          id="outlined-basic"
          variant="outlined"
        />

</Box>
<Box>
        <label style={{margin:"0px", padding:"0px",color:"white",fontSize:"18px"}} >Remarks</label>
        <TextField
          value={remarks}
          onChange={(e) => {
            setRemarks(e.target.value);
            console.log("reamrks is", remarks);
          }}
          className="TextfieldStyle"
          id="outlined-basic"
          variant="outlined"
        />
</Box>
        <Box>
            <div  >

          <label className="locTxt">Location</label>
            </div>
          <Select
            options={options}
            value={location}
            onChange={(selectedOptions) => {
              setLocation(selectedOptions.value);
              setPrint((prevPrint) => [...prevPrint, selectedOptions.value]);

              console.log("selected option is", typeof location);
            }}
          />
        </Box>

        {count?.map((item, index) => (
          <Destription location={location} print={print[index]} />
        ))}
        <Box className="btnFlex">
          <Button
           
            onClick={() => {
              setCount([...count, count.push(1)]);
            }}
            color="primary"
            style={buttonStyle}
          >
            <AddIcon />
          </Button>
          <Box >

          <Button style={buttonStyleSubmit} 
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
  </>
  );
};

const Destription = (props) => {
  return (
    <Box className="Flexdiscrip">
      <Box>
        <input type="file" />
      </Box>
      <p>{props.print}</p>

      <Box>
        <Box className="Descriptionflex">
        <Box>
        <label style={{margin:"0px", padding:"0px",color:"white",fontSize:"18px"}} >Description</label>
          <TextField
            className="TextfieldStyle"
            id="outlined-basic"
            variant="outlined"
          />
          </Box>
         
        </Box>
      </Box>
    </Box>
  );
};

export default Floorplanlayout;
