import React, { useState } from 'react'
import { resetPasswordApi } from '../../api/auth'
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify'
import { useForm } from 'react-hook-form';
import ForgotPassword from '../../components/auth/ForgotPassword';
import useTranslation from 'next-translate/useTranslation'


type FormData = {
  email: string,
};

function forgot() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const {t} = useTranslation("common")

    const onSubmit = async (data:FormData) => {
        setIsLoading(true)
        try {
            await resetPasswordApi(data)
            successToast(t('auth.forgot.success'))
        } catch (error) {
            apiErrorToast(error)
        }
        setIsLoading(false)
    }
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <ForgotPassword register={register} errors={errors} isLoading={isLoading} />
    </form>
  )
}

export default forgot