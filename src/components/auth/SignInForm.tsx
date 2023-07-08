import React from 'react'
import { Button, Card, TextField, Container,styled,Box, Typography } from "@mui/material";
import LogoImg from '../../images/logo.svg'
import Image from 'next/image';
import CustomButton from '../ui/CustomButton';
import { TAuthProps } from '../../shared/types/auth';
import useTranslation from 'next-translate/useTranslation'
import LinearProgress from '@mui/material/LinearProgress';
import Link from 'next/link';
import AuthFooter from '../ui/AuthFooter';


function SignInForm({ register, errors, isLoading}:TAuthProps) {
  const { t } = useTranslation("common")
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container maxWidth="xs" className=' relative' >
      
      <Card variant="outlined" style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }} >
        {isLoading&& (
           <Box sx={{ width: '100%' }}>
            <LinearProgress/>
          </Box>
        )}
        <div className="p-4 py-8">
        <div className="flex justify-center items-center">
          <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
        </div>
        <div className="flex flex-col gap-2 items-center my-4">
          <Typography variant='h5'>{t('auth.index.header')}</Typography>
          <Typography variant='h6'>{t('auth.index.title')}</Typography>
        </div>
        <div className="my-10 flex flex-col gap-10 w-full">
          <div>
            <TextField
              label={t('auth.index.input.label')}
              className="w-full custom-text-input  "
              error={errors.email}
              helperText={errors.email ? errors.email?.message : false}
              {...register("email", {
                required: {
                  value: true,
                  message: t('auth.index.input.errors.required')
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('auth.index.input.errors.invalid'),
                },
              })}
            />
          </div>
          <div className="text-[#5f6368] text-sm dark:text-[#ddd]">
            {t('auth.index.footerText')}
            <span className="text-[#1a73e8] font-medium  block cursor-pointer ">
              {t('auth.index.footerLink')}
            </span>
          </div>
            <div className="flex justify-end items-center">
           
            {/* <Button variant="text">Create account</Button> */}
            <CustomButton title={t('auth.index.buttonTitle')} isLoading={isLoading}/>
          </div>
        </div>
        </div>
      </Card>
      <AuthFooter/>
      </Container>
    </div>
  )
}

export default SignInForm