import { Avatar, Box, Card, Container, LinearProgress, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Image from 'next/image'
import { AccountCircle } from '@mui/icons-material'
import Link from 'next/link'
import CustomButton from '../../components/ui/CustomButton'
import AuthFooter from '../../components/ui/AuthFooter'
import ReCAPTCHA from "react-google-recaptcha";
import LogoImg from '../../images/logo.svg'

const reCaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCH_KEY;


function VerifyCaptcha({isLoading, getValues}) {
    const {t} = useTranslation("common")
    const [isCaptchResolved, setIsCaptchaResolved] = React.useState(false)

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Container maxWidth="xs">
            <Card variant="outlined" style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }} >
            {isLoading&& (
                <Box sx={{ width: '100%' }}>
                <LinearProgress/>
                </Box>
            )}
            <div className="p-4 py-8">
                <div className="flex justify-center items-center">
                <Image alt="Logo" src={LogoImg} className="h-14 w-14 text-center" />
                </div>
                <div className="flex flex-col gap-2 items-center my-4">
                    <Typography variant='h5'>{t('auth.password.header')}</Typography>
                <div className="flex items-center justify-center rounded-full border border-gray-300 p-1 gap-2">
                    <Avatar className="w-6 h-6">
                    <AccountCircle />
                    </Avatar>
                    <div className="text-sm text-[#202124] dark:text-[#ddd] ">
                    {getValues('email')}
                    </div>
                </div>
                </div>
                
                <div className=" text-[#202124] dark:text-[#ddd] mt-6 text-sm" >
                {t('auth.password.title')}
                </div>
                <div className="my-4 flex flex-col gap-14 w-full">
                    <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey={`${reCaptchaKey}`}
                            onChange={setIsCaptchaResolved}
                            onExpired={()=>setIsCaptchaResolved(false)}
                            onErrored={()=>setIsCaptchaResolved(false)}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <Link
                            className="text-[#1a73e8] font-medium cursor-pointer text-sm"
                            href={"/signin/forgot"}
                        >
                            {t('auth.password.forgot')}
                        </Link>
                        <CustomButton title={t('auth.index.buttonTitle')} isLoading={isLoading} isDisabled={!isCaptchResolved}/>
                    </div>
                </div>
            </div> 
        </Card>
        <AuthFooter/>
    </Container>
    </div>
    )
}

export default VerifyCaptcha