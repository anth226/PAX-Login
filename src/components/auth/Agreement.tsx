import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Avatar,
  FormGroup,
} from "@mui/material";
import {AccountCircle} from "@material-ui/icons"
import LogoImg from '../../images/logo.svg'
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";
import CustomButton from '../ui/CustomButton'
import { TAuthProps } from "../../shared/types/auth";
import Link from "next/link";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
import useTranslation from 'next-translate/useTranslation'

function Agreement() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container maxWidth="xs">
        <Card variant="outlined" className="p-4 py-8">
          <div className="flex justify-center items-center">
            <Image alt="Logo" src={LogoImg} className="h-14 w-14 text-center" />
          </div>
          <div className="flex flex-col gap-2 items-center my-4">
            <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 gap-2 cursor-pointer">
              <Avatar className="w-6 h-6">
                <AccountCircle />
              </Avatar>
              <div className="text-sm text-[#202124]">
               admin@expale.com
              </div>
                <KeyboardArrowDownRoundedIcon className="h-4 w-4" />
            </div>
          </div>
          
          <div className=" text-[#202124] mt-6 text-sm" >
            In order to continue with login process you must acknowledge that you have read and agree to both the PXM Training Terms of Service and Privacy Policy.Using any PXM Training services signifies your acceptance of all related service-specific terms.<br/><br/>

            Once done, check the box bellow" which serves as your confirmation to agreement on these documents. Once the box is checked,you may click the button below to proceed.


          </div>
          <FormGroup className="my-4">
            <FormControlLabel control={<Checkbox  />} label="I Agree" />
            </FormGroup>
<div className="flex justify-end mb-4">
<Button variant="contained" className="">Agree & Continue</Button>

</div>
        
        </Card>
      </Container>
    </div>
  )
}

export default Agreement