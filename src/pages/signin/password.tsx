import React, { useEffect, useState } from 'react'
import PasswordInput from '../../components/auth/PasswordInput'
import { useForm } from 'react-hook-form';
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify';
import { sendOTPCodeApi, sendTOSAgreementApi, setUpdatePasswordAuthApi, signInApi, verifyTwoStepMailApi, verifyTwoStepPhoneApi } from '../../api/auth';
import { useRouter } from 'next/router';
import AccountRecovery from '../../components/auth/AccountRecovery';
import TwoStepVerify from '../../components/auth/TwoStepVerify';
import useTranslation from 'next-translate/useTranslation'
import { cryptValue, customShowInputError } from '../../shared/utils/helper';
import Agreement from '../../components/auth/Agreement';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import VerifyCaptcha from '../../components/auth/VerifyCaptcha';

type FormData = {
  email?: string,
  password?: string,
  code?: string,
  phone?: string,
  otpCountDown?: number,
  tos?: boolean,
  new_password?: string,
  confirm_password?: string,
  method?: {
    id: number,
    methodType: string,
    methodDetail: string
  },
};

function Password() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, setValue, getValues, watch, setError, formState: { errors } } = useForm<FormData>();
    const router = useRouter()
    const [page, setPage] = useState('captcha')
    const {t} = useTranslation('common')
    const [emails, setEmails] = useLocalStorage("emails", [])
    const [twoFaMethods, setTwoFaMethods] = useState([])

    useEffect(()=>{
        const email = localStorage.getItem('email')
        if(!email) {
            router.push("/")
        } else {
            setValue("email", JSON.parse(email))
        }
    },[])

    useEffect(()=>{
        setIsLoading(false)
    },[page])

    const onSubmit = async (data:FormData) => {
        setIsLoading(true)
        if(page==="password") {
            await handlePasswordSubmit(data)
        } else if(page=="2fa") {
            await handleAccountRecovery(data)
        } else if(page==="2-step") {
            await handleTwoStepSubmit(data)
        } else if(page==="agreement") {
            await handleAgreementSubmit(data)
        } else if(page==="reset-password") {
            await handleResetPassword(data)
        } else if(page==="captcha") {
            setPage("password")
        }
    }

    const handlePasswordSubmit = async (data: FormData) => {
        try {
            data.password = cryptValue(data.password)
            const response = await signInApi(data)
            if(response.data?.nextPage) {
                setPage(response.data?.nextPage)
                setTwoFaMethods(response.data?.methods)
            } else {
                successFullLogin(response)
            }
        } catch (error) {
            customShowInputError('password', error, setError)
            apiErrorToast(error)
            setIsLoading(false)
        }
    }

    const handleTwoStepSubmit = async (data: FormData) => {
        try {
            const formData = {
                code: cryptValue(data.code),
                methodId: data.method?.id
            }
            let response: any;
            if(data.method?.methodType==="email") {
                response = await verifyTwoStepMailApi(formData)
            } else if(data.method?.methodType==="phone") {
                response = await verifyTwoStepPhoneApi(formData)   
            }
            if(response.data?.nextPage) {
                setPage(response.data?.nextPage)
            } else {
                successFullLogin(response)
            }
        } catch (error) {
            if(error.response?.status===401) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
            customShowInputError('code', error, setError)
            apiErrorToast(error)
            setIsLoading(false)
        }
    }

    const handleAccountRecovery = async (data: FormData) => {
        try {
            const formData = {methodId: data.method?.id}
            const response = await sendOTPCodeApi(formData)
            successToast(`OTP Sent to your ${data.method?.methodType}`)
            if(response?.data?.resendIn) {
                setValue('otpCountDown', response.data.resendIn)
            }
            setPage("2-step")
        } catch (error) {
            apiErrorToast(error)
            if(error.response?.status===401) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
            setIsLoading(false)
        }
    }

    const handleAgreementSubmit = async (data: FormData) => {
        try {
            const response = await sendTOSAgreementApi(data)
            successFullLogin(response)
        } catch (error) {
            apiErrorToast(error)
            if(error.response?.status===401) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
            setIsLoading(false)
        }
    }

    const handleResetPassword = async (data:FormData) => {
        try {
            const resetData: any = {}
            resetData.current_password = cryptValue(data.password)
            resetData.new_password = cryptValue(data.new_password)
            resetData.confirm_password = cryptValue(data.confirm_password)
            const response = await setUpdatePasswordAuthApi(resetData)
            if(response.data?.nextPage) {
                setPage(response.data?.nextPage)
            } else {
                successFullLogin(response)
            }
        } catch (error) {
            if(error.response?.status===401) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
            apiErrorToast(error)
            setIsLoading(false)
        }
     }

    const successFullLogin = (response: any) => {
        successToast(t('auth.password.success'))
        const email = getValues('email')
        if(!emails.includes(email)) {
            setEmails([...emails, email])
        }
        window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {page==="2fa" ? (
            <AccountRecovery twoFaMethods={twoFaMethods} isLoading={isLoading} setValue={setValue} getValues={getValues}/>
        ):page==="2-step" ? (
            <TwoStepVerify isLoading={isLoading} errors={errors} register={register} getValues={getValues}/>
        ):page==="agreement" ? (
            <Agreement register={register} errors={errors} isLoading={isLoading} getValues={getValues}/>
        ):page==="reset-password" ? (
            <ResetPasswordForm errors={errors} register={register} isLoading={isLoading} watch={watch} />
        ):page==="password" ?(
            <PasswordInput register={register} errors={errors} isLoading={isLoading} getValues={getValues}/>
        ):(
            <VerifyCaptcha isLoading={isLoading} getValues={getValues}/>
        )}
    </form>
  )
}

export default Password