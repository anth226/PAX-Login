import React, { useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Card, FormControlLabel, TextField ,Checkbox} from "@mui/material";
import LogoImg from '../../images/logo.svg'
import { useForm } from 'react-hook-form';
import { getResetLink, setUpdatePassword } from '../../api/auth';
import { apiErrorToast } from '../../shared/toastifier/toastify';
import CustomButton from '../../components/ui/CustomButton';


type FormData = {
    password?: string,
    confirmPassword:''
};

function ResetPassword() {
    const router = useRouter();
    const code = router.query.link
    const[isUpdatePassword,setIsUpdatePassword] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data:FormData) => {
        setUpdatePassword(data)
     }

    useEffect(()=>{
     checkResetLink()
    },[code])

    const checkResetLink = async () => {
      setIsLoading(true)
      try {
        await getResetLink(code,setIsUpdatePassword,isUpdatePassword)
      } catch (error) {
        apiErrorToast(error)
      }
      setIsLoading(false)
    }
 
  return (
    <div className="flex justify-center items-center h-screen ">
    <Card variant="outlined" className="p-8 w-[35%]">
      <div className="flex justify-center items-center">
        <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
      </div>
      <div className="flex flex-col gap-2 items-center my-4">
        <div className=" text-2xl text-[#202124]">Update Password</div>
      </div>
      <form className="my-10 flex flex-col gap-10 w-full" onSubmit={ handleSubmit(onSubmit)}>
        <div>
          <TextField
              type={showPassword ? "text" : "password"}
              id="demo-helper-text-misaligned"
              label="Enter your password"
              className="w-full"
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password?.message : false}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required."
                },
              })}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              id="demo-helper-text-misaligned"
              label="Confirm password"
              className="w-full mt-6"
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword? errors.confirmPassword?.message : false}
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "confirm password is required."
                },
              })}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Show password"
              onChange={handleClickShowPassword}
              className="text-sm"
            />
        </div>
        <div className="flex justify-end items-center" >
          <CustomButton isLoading={isLoading} title='Submit'/>
        </div>
      </form>
    </Card>
  </div>
  )
}

export default ResetPassword