import React from 'react'
import {
   
    Card,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    TextField,
  } from "@mui/material";
import LogoImg from '../../images/logo.svg'
import Image from "next/image";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AuthFooter from '../ui/AuthFooter'

function ChooseAccount() {
  return (
    <div className="flex justify-center items-center p-8 min-h-screen ">
        <Container maxWidth="xs">
        <Card variant="outlined" className="p-4 py-8 min-h-[70vh] ">
      <div className="flex justify-center items-center">
        <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
      </div>

      <div className="flex flex-col gap-2 items-center my-4 mb-8">
        <div className="text-xl text-[#202124]">Choose an Account</div>
      </div>
    
     

      <div className="flex items-center  rounded-full border border-gray-300 my-3 gap-6">
          <Image alt='Logo' src={LogoImg} className="h-8 w-8 rounded-full" />
          <div className='flex flex-col'>
            <div className='text-[#202124] text-sm font-medium'>James Blain</div>
            <div className="text-sm text-[#202124]">
            adminuser@gmail.com{" "}
          </div>
          </div>
         
        </div>
      <Divider />

      <div className='flex items-center gap-6 my-3 cursor-pointer'>
        <div>
          <AccountCircleOutlinedIcon />
        </div>
        <div className='flex flex-col gap-1'>
            <div className=' text-[#202124]'>Log Out & Use Different Login</div>
        </div> 
      </div>
      <Divider />

      
    </Card>
    <AuthFooter/>
        </Container>
   
  </div>    
  )
}

export default ChooseAccount