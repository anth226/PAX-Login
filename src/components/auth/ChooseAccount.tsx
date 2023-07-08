import React, { useRef } from 'react'
import {
   
  Avatar,
    Box,
    Card,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    LinearProgress,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
  } from "@mui/material";
import LogoImg from '../../images/logo.svg'
import Image from "next/image";
import AuthFooter from '../ui/AuthFooter'
import { Login} from "@mui/icons-material"
import { getRandomColor } from '../../shared/utils/helper';
import useTranslation from 'next-translate/useTranslation';

function ChooseAccount({emails=[], setValue, isLoading, setShowAddNew}) {
  const {t} = useTranslation("common")
  const submitRef: any = useRef()

  return (
    <div className="flex justify-center items-center p-8 min-h-screen">
      <Container maxWidth="xs">
        <Card variant="outlined" className="min-h-[70vh]" style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }}>
          {isLoading&& (
           <Box sx={{ width: '100%' }}>
            <LinearProgress/>
          </Box>
          )}
          <Box className="py-8">
            <div className="flex justify-center items-center">
              <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
            </div>
            <div className="flex flex-col gap-2 items-center my-4 mb-8">
              <Typography variant={"h5"}>{t('choose_account')}</Typography>
            </div>
            {emails.map(email=>{
              const firstLetter = email.charAt(0)
              return(
                <>
                <ListItemButton onClick={(e)=>{
                  setValue('email', email)
                  submitRef.current?.click()
                }} key={email} className='w-full py-4' component="button">
                  <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, backgroundColor: getRandomColor() }}>{firstLetter}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email}/>
                </ListItemButton>
                <Divider/>
                </>
              )
            })}
            <ListItemButton onClick={()=>setShowAddNew(true)} className='w-full py-2' component="button">
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Use Different Account"/>
            </ListItemButton>
            <Divider />
            <button type='submit' className='hidden' ref={submitRef}></button>
          </Box>
        </Card>
        <AuthFooter/>
      </Container>
    </div>    
  )
}

export default ChooseAccount