import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { verifyEmailApi} from '../api/auth'
import { apiErrorToast } from '../shared/toastifier/toastify'
import SignInForm from '../components/auth/SignInForm';
import { useRouter } from 'next/router';
import { customShowInputError } from '../shared/utils/helper';
import useLocalStorage from '../shared/hooks/useLocalStorage';
import ChooseAccount from '../components/auth/ChooseAccount';

type FormData = {
  email: string,
};

function SignInPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm<FormData>();
  const router = useRouter()
  const [email, setEmail] = useLocalStorage("email", "")
  const [emails, setEmails] = useLocalStorage("emails", [])
  const [showAddNew, setShowAddNew] = useState<boolean>(false)

  const onSubmit = async (data:FormData) => {
    setIsLoading(true)
    try {
      await verifyEmailApi(data)
      setEmail(data.email)
      router.push("/signin/password")
    } catch (error) {
      customShowInputError('email', error, setError)
      apiErrorToast(error)
      setIsLoading(false)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='py-8'>
    {emails && emails?.length && !showAddNew ? (
      <ChooseAccount setShowAddNew={setShowAddNew} setValue={setValue} isLoading={isLoading} emails={emails}/>
    ):(
      <SignInForm register={register} errors={errors} isLoading={isLoading} />
      )}
    </form>
    </>
  )
}

export default SignInPage