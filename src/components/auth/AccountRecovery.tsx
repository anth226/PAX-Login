import React, { useRef, useTransition } from 'react'
import{ Box,
    Button,
    Card,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    TextField,
    Avatar
  } from "@mui/material";
import {AccountCircle, MailRounded} from "@material-ui/icons"

import LogoImg from '../../images/logo.svg'
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LockIcon from '@mui/icons-material/Lock';
import { TAuthProps } from '../../shared/types/auth';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation'
import { formatPhoneNumber } from '../../shared/utils/helper';



function AccountRecovery({ isLoading, setValue, getValues }:TAuthProps) {
  const [email, setEmail] = useLocalStorage("email", "")
  const [phone, setPhone] = useLocalStorage("phone", "")
  const {t} = useTranslation("common")
  const buttonRef = useRef<any>(null)

  return (
    <div className="flex justify-center items-center p-8 px-0">
      <Container maxWidth="sm">
      <Card variant="outlined" className="pb-16">

        <div className='p-8 pb-4'>
          <div className="flex justify-center items-center">
            <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
          </div>

          <div className="flex flex-col gap-2 items-center my-4">
            <div className="text-xl text-[#202124]">{t('auth.recovery.header')}</div>
            <div className='text-[#202124]  text-center'>{t('auth.recovery.title')}</div>
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

          <div className=' text-[#202124] font-medium mt-8'>{t('auth.recovery.choose')}</div>
        </div>

        <List  component="nav" aria-label="mailbox folders"  >
          <ListItem disabled={isLoading} button className='px-8 p-4' onClick={()=>{
            setValue("recoveryType", "mail")
            buttonRef.current?.click()
          }}>
            <div className='flex items-center gap-4  cursor-pointer'>    
              <MailRounded color='primary'/>  
              <div className='text-sm text-[#202124]'>
                {/* {t('tap')} <span className='font-medium inline'>{t('yes')}</span> {t('auth.recovery.phone')} */}
                {t('auth.recovery.verify_code', {phone: email})}
                </div>
              </div>
          </ListItem>
          <Divider variant="middle" className='mx-8' />
      
          <ListItem disabled={isLoading} button className='px-8 p-4' onClick={()=>{
            setValue("recoveryType", "phone")
            buttonRef.current?.click()
          }}>
            <div className='flex items-center gap-4  cursor-pointer'>    
              <ChatIcon color='primary'/>  
              <div className='flex flex-col gap-1'>
                      <div className='text-sm text-[#202124]'>{t('auth.recovery.verify_code', {phone: formatPhoneNumber(getValues('phone'))})}</div>
                      <div className='text-xs'>{t('auth.recovery.rates')}</div>
                  </div> 
              </div>
          </ListItem>
          <Divider variant="middle" className='mx-8' />
         

          <ListItem button className='px-8 p-4' disabled>
            <div className='flex items-center gap-4  cursor-pointer'>    
              <HelpOutlineIcon color='primary'/>  
              <div className='text-sm text-[#202124]'>{t('auth.recovery.another')}</div>
              </div>
          </ListItem>
          <Divider variant="middle" className='mx-8' />
          
        </List>
      </Card>
      <button className='hidden' type='submit' ref={buttonRef}>Submit</button>
      </Container>
    </div>
  )
}

export default AccountRecovery