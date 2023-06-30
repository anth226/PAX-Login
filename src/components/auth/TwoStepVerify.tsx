import React from 'react'
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



function TwoStepVerify({errors, register, isLoading, getValues}:TAuthProps) {
  const [email, setEmail] = useLocalStorage("email", "")
  const recoveryType: string = getValues('recoveryType')
  const phone: string = getValues('phone')
  const {t} = useTranslation("common")

  return (
    <div className="flex justify-center items-center py-8 ">
      <Container maxWidth="sm">
      <Card variant="outlined" className="p-8">
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
            {t('auth.two-step.text', {phone: recoveryType=="mail" ? email : phone})}
          </div>
        </div>
        
        <div className="my-10 flex flex-col gap-10 w-full">
          <div>
            <TextField
              label={t('auth.two-step.input.label')}
              className="w-full "
              InputProps={{
                startAdornment: <InputAdornment position="start">G-</InputAdornment>,
              }}
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
            {/* <div
              className="text-[#1a73e8] font-medium text-sm cursor-pointer"
              onClick={() => setPage("verify-options")}
            >
              Try Another Way
            </div> */}
            <CustomButton title={t('auth.two-step.buttonTitle')} isLoading={isLoading}/>
          </div>
        </div>
      </Card>
      </Container>
    </div>
  )
}

export default TwoStepVerify