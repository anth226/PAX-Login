import React, { useRef, useTransition } from 'react'
import{ Box,
    Button,
    Card,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    TextField,
    Avatar,
    Alert,
    Typography
  } from "@mui/material";
import {AccountCircle, MailRounded} from "@mui/icons-material"

import LogoImg from '../../images/logo.svg'
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
import AuthFooter from '../ui/AuthFooter';
import LinearProgress from '@mui/material/LinearProgress';




function AccountRecovery({ isLoading, setValue, getValues, twoFaMethods=[] }:TAuthProps) {
  const [email, setEmail] = useLocalStorage("email", "")
  const phone = getValues("phone")
  const {t} = useTranslation("common")
  const buttonRef = useRef<any>(null)

  return (
    <div className="flex justify-center items-center  min-h-screen py-4">
      <Container maxWidth="xs">
        <Card variant="outlined"  style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }} >
          {isLoading&& (
            <Box sx={{ width: '100%' }}>
              <LinearProgress/>
            </Box>
          )}
          <div className='p-4 py-8'>
            <div className="flex justify-center items-center">
              <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
            </div>

            <div className="flex flex-col gap-2 items-center my-4">
              <Typography variant='h5'>{t('auth.recovery.header')}</Typography>
              <Typography variant="caption">{t('auth.recovery.title')}</Typography>
              <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 gap-2 mt-4">
                <Avatar className="w-6 h-6">
                  <AccountCircle />
                </Avatar>
                <div className="text-sm text-[#202124] dark:text-[#ddd]">
                  {email}
                </div>
              </div>
            </div>

            <Typography variant='subtitle2' className='mt-8'>{t('auth.recovery.choose')}</Typography>
            
            {twoFaMethods?.length ? (
            <List component="nav" aria-label="mailbox folders"  >
              {twoFaMethods.map(method=>{
                return(
                  <>
                    <ListItem disabled={isLoading} button className='px-8 p-4' onClick={()=>{
                      setValue("method", method)
                      buttonRef.current?.click()
                    }}>
                      <div className='flex items-center gap-4  cursor-pointer'>    
                        <GetMethodIcon methodType={method.methodType}/>
                        <div className='text-sm text-[#202124] dark:text-[#ddd]'>
                          {t('auth.recovery.verify_code', {phone: method.methodDetail})}
                          </div>
                        </div>
                    </ListItem>
                    <Divider variant="middle" className='mx-8' />
                  </>
                )
              })}

            <ListItem button className='px-8 p-4' disabled>
              <Box className='flex items-center gap-4  cursor-pointer'>    
                <HelpOutlineIcon color='primary'/>  
                <div className='text-sm text-[#202124] dark:text-[#ddd]'>{t('auth.recovery.another')}</div>
                </Box>
            </ListItem>
            <Divider variant="middle" className='mx-8' />
            </List>
            ):(
              <Alert className='my-4' severity="error">{t('auth.recovery.no_two_step')}</Alert>
            )}

          </div>
        </Card>
        <button className='hidden' type='submit' ref={buttonRef}>Submit</button>
        <AuthFooter/>
      </Container>
    </div>
  )
}

function GetMethodIcon({methodType}) {
  return(
    methodType=="email" ? (
      <MailRounded color='primary'/>  
    ) : methodType=="phone" ? (
      <ChatIcon color='primary'/>
    ) : (
      <></>
    )
  )
}

export default AccountRecovery