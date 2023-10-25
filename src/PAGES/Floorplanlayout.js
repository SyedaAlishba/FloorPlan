import React, { useState } from 'react'
import './Floorplanlayout.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Floorplanlayout = () => {

    const options = [
        { value: 'chocolate', label: 'Main door' },
        { value: 'Living Room', label: 'Living Room' },
        { value: 'Bed room', label: 'Bed room' },
        { value: 'Bath', label: 'Bath' },
        { value: 'Kitchen', label: 'Kitchen' },
        { value: 'Yard', label: 'Yard' },
        
      ]
      
const [count,setCount] = useState([1])




    return (
        <Box className='Mainwrapper'>
            <Box className="TextfiledFlex" >
                <TextField className='TextfieldStyle' id="outlined-basic" label="Name" variant="outlined" />
                <TextField className='TextfieldStyle' id="outlined-basic" label="Date" variant="outlined" />
                <TextField className='TextfieldStyle' id="outlined-basic" label="Address" variant="outlined" />
                <TextField className='TextfieldStyle' id="outlined-basic" label="Remarks" variant="outlined" />

                    <Box >
             <label>Location</label>
            <Select options={options} />
            </Box>


{count?.map((item,index)=>(

<Destription />
))

}
<Button onClick={() =>{
    setCount([...count, count.push(1)])
}} color="primary" >
        <AddIcon />
      </Button>

           

            </Box>
            
        </Box>

    )
}

const Destription = () =>{

    
    return(
<Box className="Flexdiscrip">
  
  <Box>
  
  <input type="file" />
  
      </Box>
  
      <Box className='Descriptionflex'>
      <TextField className='TextfieldStyle' id="outlined-basic" label="Distription" variant="outlined"  />
      </Box>
  
  </Box>
    )
}

export default Floorplanlayout