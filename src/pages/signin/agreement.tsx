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
import User from '@mui/icons-material/Phonelink';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { TAuthProps } from '../../shared/types/auth';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AuthFooter from '../../components/ui/AuthFooter';
import ChooseAccount from '../../components/auth/ChooseAccount';
import Agreement from '../../components/auth/Agreement';

function agreement() {
  return (
   <Agreement/>
  )
}

export default agreement