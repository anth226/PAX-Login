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
} from "@mui/material";
import {AccountCircle} from "@material-ui/icons"
import LogoImg from '../../images/logo.svg'
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { TAuthProps } from "../../shared/types/auth";
import Link from "next/link";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
import useTranslation from 'next-translate/useTranslation'



function PasswordInput({ register, errors, isLoading}:TAuthProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const {t} = useTranslation("common")
    const [email, setEmail] = useLocalStorage("email", "")

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container maxWidth="xs">
        <Card variant="outlined" className="p-4 py-8">
          <div className="flex justify-center items-center">
            <Image alt="Logo" src={LogoImg} className="h-14 w-14 text-center" />
          </div>
          <div className="flex flex-col gap-2 items-center my-4">
            <div className="text-2xl text-[#202124]">{t('auth.password.header')}</div>
            <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 gap-2 cursor-pointer">
              <Avatar className="w-6 h-6">
                <AccountCircle />
              </Avatar>
              <div className="text-sm text-[#202124]">
                {email}
              </div>
                <KeyboardArrowDownRoundedIcon className="h-4 w-4" />
            </div>
          </div>
          <div className=" text-[#202124] mt-6 text-sm" >
            {t('auth.password.title')}
          </div>
          <div className="my-4 flex flex-col gap-14 w-full">
            <div className="flex flex-col">
              <TextField
                type={showPassword ? "text" : "password"}
                label={t('auth.password.input.label')}
                className="w-full mb-2"
                error={errors.password}
                helperText={errors.password ? errors.password?.message : false}
                {...register("password", {
                  required: {
                    value: true,
                    message: t('auth.password.input.errors.required')
                  },
                  minLength: {
                    value: 6,
                    message: t('auth.password.input.errors.length')
                  }
                })}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={t('auth.password.show')}
                onChange={handleClickShowPassword}
                className="text-sm ml-0"
              />
          </div>
            <div className="flex justify-between items-center">
              <Link
                className="text-[#1a73e8] font-medium cursor-pointer text-sm"
                href={"/signin/forgot"}
              >
                {t('auth.password.forgot')}
              </Link>
              <CustomButton title={t('auth.password.buttonTitle')} isLoading={isLoading}/>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default PasswordInput