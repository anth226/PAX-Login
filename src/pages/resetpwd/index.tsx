import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Card, FormControlLabel, TextField ,Checkbox, Container, Alert} from "@mui/material";
import LogoImg from '../../images/logo.svg'
import { useForm } from 'react-hook-form';
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify';
import CustomButton from '../../components/ui/CustomButton';
import { getResetLinkApi, setUpdatePasswordApi } from '../../api/auth';
import useTranslation from 'next-translate/useTranslation';
import CryptoJS from 'crypto-js'


import ResetPasswordForm from '../../components/auth/ResetPasswordForm'
import { cryptValue } from '../../shared/utils/helper';


type FormData = {
    new_password?: string,
    confirm_password: string,
    reset_code: string
};

function ResetPassword() {
    const {t} = useTranslation("common")
    const router = useRouter();
    const code = router.query.link
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const[isValidLink, setIsValidLink] = useState<boolean>(false)

    const onSubmit = async (data:FormData) => {
      setIsLoading(true)
      try {
        // encrypt newData
        const formData = {
          password: cryptValue(data.new_password),
          confirm_password: cryptValue(data.confirm_password),
          reset_code: data.reset_code
        }
        await setUpdatePasswordApi(formData)
        successToast(t("auth.resetpwd.success"));
        router.push("/")
      } catch (error) {
        apiErrorToast(error)
        setIsLoading(false)
      }
     }

    useEffect(()=>{
      if(code) {
        checkResetLink()
      }
    },[code])

    const checkResetLink = async () => {
      setIsLoading(true)
      try {
        const data = {
          reset_code: code
        }
        await getResetLinkApi(data)
        setIsValidLink(true)
        setValue("reset_code", String(code))
      } catch (error) {
        apiErrorToast(error)
      }
      setIsLoading(false)
    }
 
  return (
    isValidLink ? (
    <form onSubmit={ handleSubmit(onSubmit)}>
      <ResetPasswordForm errors={errors} register={register} isLoading={isLoading} watch={watch} />
    </form>
    ): (
      <div className="flex justify-center items-center py-8 min-h-screen">
        <Container maxWidth="xs">
          <Alert severity="error">Invalid Reset Link. Please try again!</Alert>
        </Container>
      </div>
    )
  )
}

export default ResetPassword