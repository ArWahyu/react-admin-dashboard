import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { DataGrid, GridToolbar  } from "@mui/x-data-grid";

const Karyawan = () => {

const columns = [
      {
        field: "nik",
        headerName: "NIK",
        flex: 1.5,
      },
      {
        field: "nama",
        headerName: "Nama",
        flex: 2.5,
        cellClassName: "name-column--cell",
      },
      {
        field: "jenisKelamin",
        headerName: "JK",
        flex: .5,
      },
      {
        field: "alamat",
        headerName: "Alamat",
        flex: 1,
      },
      {
        field: "jdUnit",
        headerName: "Unit",
        flex: 1,
      },
      {
        field: "jdPT",
        headerName: "PT",
        flex: 1,
      },
      {
        field: "jdJabatan",
        headerName: "Jabatan",
        flex: 1,
      },
];    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 
    const[karyawan,setKaryawan]=useState([]);

    const gandi = "http://192.168.85.80:3030/api/v1/karyawan";

    useEffect(() => {
      axios.get(gandi)
      .then(res => {
        return res.data.data
      })
      .then(res => {
        return res.map(objData => {
          const jd = objData.jobdescId
          const sl = objData.salaryId
          delete objData.jobdescId
          delete objData.salaryId
          return {
            ...objData,
            ...jd,
            ...sl
          }
        })
      })
      .then(res => {
        setKaryawan(res)
      })
      .catch(err => {
        console.log(err.message)
      })
    },[]);

  return (
    <Box m="20px">
      <Header
        title="DATA KARYAWAN"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
       
       <DataGrid
          rows={karyawan}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Karyawan;