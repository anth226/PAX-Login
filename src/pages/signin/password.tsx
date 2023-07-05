import React, { useEffect, useState } from 'react'
import PasswordInput from '../../components/auth/PasswordInput'
import { useForm } from 'react-hook-form';
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify';
import { sendOTPCodeMailApi, sendOTPCodePhoneApi, sendTOSAgreementApi, setUpdatePasswordAuthApi, signInApi, verifyTwoStepMailApi, verifyTwoStepPhoneApi } from '../../api/auth';
import { useRouter } from 'next/router';
import AccountRecovery from '../../components/auth/AccountRecovery';
import TwoStepVerify from '../../components/auth/TwoStepVerify';
import useTranslation from 'next-translate/useTranslation'
import { customShowInputError } from '../../shared/utils/helper';
import Agreement from '../../components/auth/Agreement';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import * as CryptoJS from 'crypto-js'
import useLocalStorage from '../../shared/hooks/useLocalStorage';

type FormData = {
  email?: string,
  password?: string,
  code?: string,
  phone?: string,
  recoveryType?: string,
  otpCountDown?: number,
  tos?: boolean,
  confirm_password?: string,
};

function Password() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, setValue, getValues, watch, setError, formState: { errors } } = useForm<FormData>();
    const router = useRouter()
    const [page, setPage] = useState('password')
    const {t} = useTranslation('common')
    const [emails, setEmails] = useLocalStorage("emails", [])

    useEffect(()=>{
        const email = localStorage.getItem('email')
        if(!email) {
            router.push("/")
        } else {
            setValue("email", JSON.parse(email))
        }
    },[])

    const onSubmit = async (data:FormData) => {
        setIsLoading(true)
        if(page==="password") {
            await handlePasswordSubmit(data)
        } else if(page=="recovery") {
            await handleAccountRecovery(data)
        } else if(page==="2-step") {
            await handleTwoStepSubmit(data)
        } else if(page==="agreement") {
            await handleAgreementSubmit(data)
        } else if(page==="reset-password") {
            await handleResetPassword(data)
        }
        setIsLoading(false)
    }

    const handlePasswordSubmit = async (data: FormData) => {
        try {
            data.password = CryptoJS.AES.encrypt(data.password, process.env.NEXT_PUBLIC_ENCRIPTION_KEY ?? "").toString();
            const response = await signInApi(data)
            if(response.data?.user?.isTwoFactorAuthenticationEnabled) {
                setValue("phone", response.data.user.phone)
                setPage("recovery")
            } else if(response.data?.user?.requirePassReset) {
                    setPage("password-reset")
            } else if(!response.data?.user?.hasAcceptedLatestTOS) {
                    setPage("agreement")
            } else {
                    successFullLogin(response)
            }
        } catch (error) {
            customShowInputError('password', error, setError)
            apiErrorToast(error)
        }
    }

    const handleTwoStepSubmit = async (data: FormData) => {
        try {
            data.code = CryptoJS.AES.encrypt(data.code, process.env.NEXT_PUBLIC_ENCRIPTION_KEY ?? "").toString();
            let response: any;
            if(data.recoveryType==="mail") {
                response = await verifyTwoStepMailApi(data)
            } else if(data.recoveryType==="phone") {
                response = await verifyTwoStepPhoneApi(data)   
            }
            if(response?.data?.user?.requirePassReset) {
                setPage("reset-password")
            } else if(!response?.data?.user?.hasAcceptedLatestTOS) {
                setPage("agreement")
            } else if(response) {
                successFullLogin(response)
            }
        } catch (error) {
            if(error.response.status===429) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
            customShowInputError('code', error, setError)
            apiErrorToast(error)
        }
    }

    const handleAccountRecovery = async (data: FormData) => {
        try {
            let response: any;
            if(data.recoveryType==="mail") {
                response = await sendOTPCodeMailApi(data)
            } else if(data.recoveryType==="phone") {
                response = await sendOTPCodePhoneApi(data)   
            }
            successToast(`OTP Sent to your ${data.recoveryType}`)
            if(response?.data?.resendIn) {
                setValue('otpCountDown', response.data.resendIn)
            }
            setPage("2-step")
        } catch (error) {
            apiErrorToast(error)
        }
    }

    const handleAgreementSubmit = async (data: FormData) => {
        try {
            const response = await sendTOSAgreementApi(data)
            successFullLogin(response)
        } catch (error) {
            apiErrorToast(error)
            if(error.response.status===401) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
        }
    }

    const handleResetPassword = async (data:FormData) => {
        try {
            const response = await setUpdatePasswordAuthApi(data)
            if(!response.data?.user?.hasAcceptedLatestTOS) {
                setPage("agreement")
            } else {
                successFullLogin(response)
            }
        } catch (error) {
            if(error.response.status===401) {
                window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
            }
            apiErrorToast(error)
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
        {page==="recovery" ? (
            <AccountRecovery isLoading={isLoading} setValue={setValue} getValues={getValues}/>
        ):page==="2-step" ? (
            <TwoStepVerify isLoading={isLoading} errors={errors} register={register} getValues={getValues}/>
        ):page==="agreement" ? (
            <Agreement register={register} errors={errors} isLoading={isLoading} getValues={getValues}/>
        ):page==="reset-password" ? (
            <ResetPasswordForm errors={errors} register={register} isLoading={isLoading} watch={watch} />
        ):(
            <PasswordInput register={register} errors={errors} isLoading={isLoading}  getValues={getValues}/>
        )}
    </form>
  )
}

export default Password