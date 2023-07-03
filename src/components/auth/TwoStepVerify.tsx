import React, {useState, useEffect} from 'react'
import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Avatar
  } from "@mui/material";
import {AccountCircle} from "@material-ui/icons"
import LogoImg from '../../images/logo.svg'
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";
import InputAdornment from '@mui/material/InputAdornment';
import CustomButton from '../ui/CustomButton';
import { TAuthProps } from '../../shared/types/auth';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation'
import LinearProgress from '@mui/material/LinearProgress';
import { formatPhoneNumber } from '../../shared/utils/helper';
import { sendOTPCodeMailApi, sendOTPCodePhoneApi } from '../../api/auth';
import { apiErrorToast } from '../../shared/toastifier/toastify';




function TwoStepVerify({errors, register, isLoading, getValues}:TAuthProps) {
  const [email, setEmail] = useLocalStorage("email", "")
  const recoveryType: string = getValues('recoveryType')
  const phone: string = getValues('phone')
  const {t} = useTranslation("common")
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      setCanResendOtp(true)
    }
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const resendOTP = async () => {
    const recoveryType = getValues('recoveryType')
    try {
      if(recoveryType==="mail") {
          let data = {
            email: getValues('email')
          }
          await sendOTPCodeMailApi(data)
        } else if(recoveryType==="phone") {
          let data = {
            phone: getValues('phone')
          }
          await sendOTPCodePhoneApi(data)   
        }
    } catch (error) {
        apiErrorToast(error)
    }
  }

  return (
    <div className="flex justify-center items-center py-8 ">
      <Container maxWidth="sm">
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
          <div className="text-2xl text-black">{t('auth.two-step.header')}</div>
          <div className=" text-[#202124] ">{t('auth.two-step.title')}</div>
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
        <div className='mt-8'>
          <div className=" text-[#202124] mt-2 text-sm">
            {t('auth.two-step.text', {phone: recoveryType=="mail" ? email : formatPhoneNumber(phone)})}
          </div>
        </div>
        
        <div className="my-10 flex flex-col gap-10 w-full">
          <div>
            <TextField
              label={t('auth.two-step.input.label')}
              className="w-full "
             
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
            />
          </div>

          <div className="flex justify-between items-center">
            <Button type='button' onClick={resendOTP} variant="contained" color="secondary" size='small' disabled={!canResendOtp}>
              {!canResendOtp ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </Button>
            <CustomButton title={t('auth.two-step.buttonTitle')} isLoading={isLoading}/>
          </div>
        </div>
        </div>
      </Card>
      </Container>
    </div>
  )
}

export default TwoStepVerify