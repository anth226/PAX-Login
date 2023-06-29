import React, { useEffect, useState } from 'react'
import PasswordInput from '../../components/auth/PasswordInput'
import { useForm } from 'react-hook-form';
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify';
import { signInApi, verifyTwoStepApi } from '../../api/auth';
import { useRouter } from 'next/router';
import AccountRecovery from '../../components/auth/AccountRecovery';
import TwoStepVerify from '../../components/auth/TwoStepVerify';
import useTranslation from 'next-translate/useTranslation'


type FormData = {
  email?: string,
  password?: string,
  code?: string,
};

function Password() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
    const router = useRouter()
    const [page, setPage] = useState('password')
    const {t} = useTranslation('common')

    useEffect(()=>{
        const email = localStorage.getItem('email')
        if(!email) {
            router.push("/")
        } else {
            setValue("email", JSON.parse(email));
        }
    },[])

    const onSubmit = async (data:FormData) => {
        setIsLoading(true)
        if(page==="password") {
            await handlePasswordSubmit(data)
        } else if(page==="2-step") {
            await handleTwoStepSubmit(data)
        }
        setIsLoading(false)
    }

    const handlePasswordSubmit = async (data: FormData) => {
        try {
            const response = await signInApi(data)
            setPage("recovery")
        } catch (error) {
            apiErrorToast(error)
        }
    }

    const handleTwoStepSubmit = async (data: FormData) => {
        try {
            // Only For Demo
            if(data.code!=="4444") {
                await verifyTwoStepApi(data)
            }
            successToast(t('auth.password.success'))
            window.location.href = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "/"
        } catch (error) {
            apiErrorToast(error)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {page==="recovery" ? (
            <AccountRecovery isLoading={isLoading} setPage={setPage}/>
        ):page==="2-step" ? (
            <TwoStepVerify isLoading={isLoading} errors={errors} register={register}/>
        ):(
            <PasswordInput register={register} errors={errors} isLoading={isLoading} />
        )}
    </form>
  )
}

export default Password