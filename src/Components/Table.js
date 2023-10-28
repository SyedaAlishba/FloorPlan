import React ,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
  },
  {
    field: 'mainImage', // Change 'image' to the field name where your image URL is stored
    headerName: 'Image',
    width: 200,
    
    renderCell: (params) => {
        return (
          <img
            src={`http://127.0.0.1:3000/public/image/users/${params.row.mainImage}`}
            alt="Image"
            style={{borderRadius:"5px", width: '80px', height: '50px' }}
          />
        );
      },
    },
  {
    field: 'address',
    headerName: 'Address',
    width: 250,
    editable: true,
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 150,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 170,
    editable: true,
    valueGetter: (params) => {
      const isoDate = params.row.date; // Assuming your API date field is 'date'
      const date = new Date(isoDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    
  },

  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   width: 150,
  //   renderCell: (params) => (
  //     <button onClick={() => downloadPDF(params.row)}>
  //       Download PDF
  //     </button>
  //   ),
  // },

];







export default function Table() {

const [floorData, setFloorData] = useState([])




const getFloorDetails= async () => {
    await axios
      .get(`http://127.0.0.1:3000/api/v1/floorplan`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("floor are ", res)
        setFloorData(res.data.data.floorPlan);
      })
      .catch((err) => {
        console.log("Get Fllor Api Error ", err);
      });
  };


  useEffect(() => {
    getFloorDetails();
  }, []);

  return (
    <>
    {floorData.length !== 0  ?
    
    <Box sx={{ height: '90%', width: '100%' }}>
      <DataGrid
      slots={{ toolbar: GridToolbar }}
        rows={floorData}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    
    </Box>
    : <Box style={{display:"flex", justifyContent:"center", alignItems:"center" , color: "#7393B3"}}>
<h1 >No data to view</h1>
    </Box>
}
    </>

  );
}