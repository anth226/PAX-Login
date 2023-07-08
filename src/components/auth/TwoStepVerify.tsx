import React, {useState, useEffect} from 'react'
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Avatar,
    Typography
  } from "@mui/material";
import {AccountCircle} from "@mui/icons-material"
import LogoImg from '../../images/logo.svg'
import Image from "next/image";
import InputAdornment from '@mui/material/InputAdornment';
import CustomButton from '../ui/CustomButton';
import { TAuthProps } from '../../shared/types/auth';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation'
import LinearProgress from '@mui/material/LinearProgress';
import { formatPhoneNumber } from '../../shared/utils/helper';
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify';
import AuthFooter from '../ui/AuthFooter';
import { sendOTPCodeApi } from '../../api/auth';




function TwoStepVerify({errors, register, isLoading, getValues}:TAuthProps) {
  const [email, setEmail] = useLocalStorage("email", "")
  const method = getValues('method')

  const count = getValues("otpCountDown")
  const {t} = useTranslation("common")
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [countdown, setResendOtpCountDown] = useState(count || 120);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setResendOtpCountDown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      setCanResendOtp(true)
    }
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const resetOTPProcess = (resendIn=120) => {
    setCanResendOtp(false)
    setResendOtpCountDown(resendIn)
  }

  const resendOTP = async () => {
    setCanResendOtp(false)
    try {
      const data = {methodId: method.id}
      const response = await sendOTPCodeApi(data)
      successToast(`OTP Sent to your ${method.methodType}`)
      if(response?.data?.resendIn) {
        resetOTPProcess(response.data.resendIn)
      }
    } catch (error) {
      if(error?.response?.data?.resendIn) {
        resetOTPProcess(error?.response?.data?.resendIn)
      }
      apiErrorToast(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-4">
      <Container maxWidth="xs">
      <Card variant="outlined" style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }} >
        {isLoading&& (
           <Box sx={{ width: '100%' }}>
            <LinearProgress/>
        </Box>)}
      <div className="p-4 py-8">

        <div className="flex justify-center items-center">
          <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
        </div>

        <div className="flex flex-col gap-2 items-center my-4">
          <Typography variant='h5'>{t('auth.two-step.header')}</Typography>
          <Typography variant="caption">{t('auth.two-step.title')}</Typography>
          <div className="mt-4 flex items-center justify-center rounded-full border border-gray-300  gap-2">
            <Avatar className="w-5 h-5">
              <AccountCircle />
            </Avatar>
            <div className="text-xs text-[#202124] dark:text-[#ddd] ">
              {email}
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <Typography variant='subtitle2'>{t('auth.two-step.text',{phone: method.methodDetail})}</Typography>
        </div>
        
        <div className="my-4 flex flex-col gap-10 w-full">
          <div>
            <TextField
              label={t('auth.two-step.input.label')}
              className="w-full custom-text-input text-sm dark:text[#ddd]"
              error={errors.code}
              helperText={errors.code ? errors.code?.message : false}
              {...register("code", {
                required: {
                  value: true,
                  message: t('auth.two-step.input.errors.required')
                },
              })}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={t('auth.two-step.ask_again')}
              style={{marginLeft:0,marginTop:"0.5rem"}}
              className='text-sm'
            />
          </div>

          <div className="flex justify-between items-center">
            <Button type='button' onClick={resendOTP} variant="outlined" color="primary" size='small' disabled={!canResendOtp}>
              {!canResendOtp ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </Button>
            <CustomButton title={t('auth.two-step.buttonTitle')} isLoading={isLoading}/>
          </div>
        </div>
        </div>
      </Card>
      <AuthFooter/>
      </Container>
    </div>
  )
}

export default TwoStepVerify