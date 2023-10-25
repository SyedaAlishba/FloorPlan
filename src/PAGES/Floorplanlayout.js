import React from 'react'
import './Floorplanlayout.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Floorplanlayout = () => {
    return (
        <Box className='Mainwrapper'>
            <Box className="TextfiledFlex" >
                <TextField className='TextfieldStyle' id="outlined-basic" label="Name" variant="outlined" />
                <TextField className='TextfieldStyle' id="outlined-basic" label="Date" variant="outlined" />
                <TextField className='TextfieldStyle' id="outlined-basic" label="Address" variant="outlined" />
                <TextField className='TextfieldStyle' id="outlined-basic" label="Remarks" variant="outlined" />


            </Box>
        </Box>

    )
}

export default Floorplanlayout