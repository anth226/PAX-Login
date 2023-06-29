import React from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material";
import LogoImg from '../../images/logo.svg'
import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { TAuthProps } from "../../shared/types/auth";
import useTranslation from 'next-translate/useTranslation'


function ForgotPassword({ register, errors, isLoading}:TAuthProps) {
  const {t} = useTranslation("common")
  return (
    <div className="flex justify-center items-center h-screen ">
      <Card variant="outlined" className="p-4 py-8">
        <div className="flex justify-center items-center">
          <Image alt="Logo" src={LogoImg} className="h-14 w-14 text-center" />
        </div>
        <div className="flex flex-col gap-2 items-center my-4">
          <div className=" text-2xl text-[#202124]">
            {t('auth.forgot.header')}
          </div>
          <div className=" text-[#202124]">
            {t('auth.forgot.title')}
          </div>
        </div>

        <div className="my-10 flex flex-col gap-10 w-full">
          <div>
            <TextField
              label={t('auth.fogot.input.label')}
              className="w-full"
              error={errors.email}
              helperText={errors.email ? errors.email?.message : false}
              {...register("email", {
                required: {
                  value: true,
                  message: t('auth.forgot.input.errors.required')
                },
              })}
            />
          </div>
          <div className="flex justify-end">
            <CustomButton title={t('auth.forgot.buttonTitle')} isLoading={isLoading}/>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ForgotPassword;
