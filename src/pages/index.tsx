import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { verifyEmailApi} from '../api/auth'
import { apiErrorToast } from '../shared/toastifier/toastify'
import SignInForm from '../components/auth/SignInForm';
import { useRouter } from 'next/router';

type FormData = {
  email: string,
};

function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter()

  const onSubmit = async (data:FormData) => {
    setIsLoading(true)
    try {
      await verifyEmailApi(data)
      localStorage.setItem("email", JSON.stringify(data.email))
      router.push("/signin/password")
    } catch (error) {
      apiErrorToast(error)
    }
    setIsLoading(false)
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignInForm register={register} errors={errors} isLoading={isLoading} />
    </form>
    </>
  )
}

export default SignInPage