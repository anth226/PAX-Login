import React, { useEffect, useState } from 'react'
import PasswordInput from '../../components/auth/PasswordInput'
import { useForm } from 'react-hook-form';
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify';
import { sendOTPCodeMailApi, sendOTPCodePhoneApi, signInApi, verifyTwoStepApi } from '../../api/auth';
import { useRouter } from 'next/router';
import AccountRecovery from '../../components/auth/AccountRecovery';
import TwoStepVerify from '../../components/auth/TwoStepVerify';
import useTranslation from 'next-translate/useTranslation'


type FormData = {
  email?: string,
  password?: string,
  code?: string,
  phone?: string,
  recoveryType?: string
};

function Password() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>();
    const router = useRouter()
    const [page, setPage] = useState('password')
    const {t} = useTranslation('common')

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
        }
        setIsLoading(false)
    }

    const handlePasswordSubmit = async (data: FormData) => {
        try {
            const response = await signInApi(data)
            // TODO:: Only For Demo || Need to check if user has 2 step enabled for prod
            if(response.data?.user?.phone) {
                setValue("phone", response.data.user.phone)
                setPage("recovery")
            } else {
                successFullLogin(response)
            }
        } catch (error) {
            apiErrorToast(error)
        }
    }

    const handleTwoStepSubmit = async (data: FormData) => {
        try {
            const response = await verifyTwoStepApi(data)
            successFullLogin(response)
        } catch (error) {
            apiErrorToast(error)
        }
    }

    const handleAccountRecovery = async (data: FormData) => {
        try {
            if(data.recoveryType==="mail") {
                await sendOTPCodeMailApi(data)
            } else if(data.recoveryType==="phone") {
                await sendOTPCodePhoneApi(data)   
            }
            setPage("2-step")
        } catch (error) {
            apiErrorToast(error)
        }
    }

    const successFullLogin = (response: any) => {
        successToast(t('auth.password.success'))
        localStorage.setItem('accessToken', JSON.stringify(response.data?.accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(response.data?.refreshToken))
        window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {page==="recovery" ? (
            <AccountRecovery isLoading={isLoading} setValue={setValue}/>
        ):page==="2-step" ? (
            <TwoStepVerify isLoading={isLoading} errors={errors} register={register}  getValues={getValues}/>
        ):(
            <PasswordInput register={register} errors={errors} isLoading={isLoading} />
        )}
    </form>
  )
}

export default Password