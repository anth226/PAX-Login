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
  FormHelperText
} from "@mui/material";
import {AccountCircle} from "@mui/icons-material"
import LogoImg from '../../images/logo.svg'
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";
import CustomButton from '../ui/CustomButton'
import { TAuthProps } from "../../shared/types/auth";
import Link from "next/link";
import useLocalStorage from "../../shared/hooks/useLocalStorage";
import useTranslation from 'next-translate/useTranslation'
import AuthFooter from "../ui/AuthFooter";

function Agreement({ register, errors, isLoading, getValues}:TAuthProps) {
  const [email, setEmail] = useLocalStorage("email", "")
  const {t} = useTranslation("common")

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
              <div className="text-sm text-[#202124] dark:text-[#ddd]">
               {email}
              </div>
            </div>
          </div>
          
          <div className=" text-[#202124]  dark:text-[#ddd] mt-6 text-sm" >
            In order to continue with login process you must acknowledge that you have read and agree to both the PXM Training Terms of Service and Privacy Policy.Using any PXM Training services signifies your acceptance of all related service-specific terms.<br/><br/>
            Once done, check the box bellow which serves as your confirmation to agreement on these documents. Once the box is checked, you may click the button below to proceed.
          </div>
          <FormGroup className="my-4">
            <FormControlLabel control={
              <Checkbox
                {...register("tos", {
                      required: {
                        value: true,
                        message: t('auth.agreement.input.errors.required'),
                      },
                })}
              />
            } label={t('auth.agreement.input.label')}
            style={{marginLeft:0,marginTop:"0.5rem"}}
            />
            {errors.tos?.message ? (
              <FormHelperText style={{color:"red"}}>{errors.tos?.message}</FormHelperText>
            ):(null)}
          </FormGroup>
          <div className="flex justify-end mb-4">
            <CustomButton  title={t('auth.agreement.buttonTitle')} isLoading={isLoading}/>
          </div>
        </Card>
        <AuthFooter/>
      </Container>
    </div>
  )
}

export default Agreement