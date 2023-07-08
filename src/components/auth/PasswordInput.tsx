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
  Typography,
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material"
import LogoImg from '../../images/logo.svg'
import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { TAuthProps } from "../../shared/types/auth";
import Link from "next/link";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
import useTranslation from 'next-translate/useTranslation'
import LinearProgress from '@mui/material/LinearProgress';
import AuthFooter from "../ui/AuthFooter";

function PasswordInput({ register, errors, isLoading}:TAuthProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const {t} = useTranslation("common")
    const [email, setEmail] = useLocalStorage("email", "")

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container maxWidth="xs">
        
      <Card variant="outlined" style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }} >
        {isLoading&& (
           <Box sx={{ width: '100%' }}>
            <LinearProgress/>
          </Box>
        )}
        <div className="p-4 py-8">
          <div className="flex justify-center items-center">
            <Image alt="Logo" src={LogoImg} className="h-14 w-14 text-center" />
          </div>
          <div className="flex flex-col gap-2 items-center my-4">
            <Typography variant='h5'>{t('auth.password.header')}</Typography>
            <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 gap-2">
              <Avatar className="w-6 h-6">
                <AccountCircle />
              </Avatar>
              <div className="text-sm text-[#202124] dark:text-[#ddd] ">
                {email}
              </div>
            </div>
          </div>
          
          <div className=" text-[#202124] dark:text-[#ddd] mt-6 text-sm" >
            {t('auth.password.title')}
          </div>
          <div className="my-4 flex flex-col gap-14 w-full">
            <div className="flex flex-col">
              <TextField
                type={showPassword ? "text" : "password"}
                label={t('auth.password.input.label')}
                className="w-full custom-text-input dark:text-[#ddd]"
                error={errors.password}
                helperText={errors.password ? errors.password?.message : false}
                {...register("password", {
                  required: {
                    value: true,
                    message: t('auth.password.input.errors.required'),
                  },
                  minLength: {
                    value: 6,
                    message: t('auth.password.input.errors.length', {length:6})
                  },
                })}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t('auth.password.show')}
                onChange={handleClickShowPassword}
                className="text-sm dark:text-[#ddd]"
                style={{marginLeft:0,marginTop:"0.5rem"}}
              />
          </div>
          
          <div className="flex justify-between items-center">
            <Link
              className="text-[#1a73e8] font-medium cursor-pointer text-sm"
              href={"/signin/forgot"}
            >
              {t('auth.password.forgot')}
            </Link>
            <CustomButton  title={t('auth.password.buttonTitle')} isLoading={isLoading}/>
          </div>
          </div>
       </div> 
       </Card>
       <AuthFooter/>
      </Container>
    </div>
  )
}

export default PasswordInput