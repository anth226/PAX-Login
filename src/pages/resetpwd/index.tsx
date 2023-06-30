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


type FormData = {
    password?: string,
    confirm_password: string,
    reset_code: string
};

function ResetPassword() {
    const {t} = useTranslation("common")
    const router = useRouter();
    const code = router.query.link
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const[isValidLink, setIsValidLink] = useState<boolean>(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const onSubmit = async (data:FormData) => {
      try {
        await setUpdatePasswordApi(data)
        successToast(t("auth.resetpwd.success"));
        router.push("/")
      } catch (error) {
        apiErrorToast(error)
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
    <div className="flex justify-center items-center py-8 min-h-screen">
      <Container maxWidth="xs">
        {isValidLink ? (
        <Card variant="outlined" className="p-8">
          <div className="flex justify-center items-center">
            <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
          </div>
          <div className="flex flex-col gap-2 items-center my-4">
            <div className=" text-2xl text-[#202124]">{t("auth.resetpwd.reset")}</div>
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
                  className="w-full mt-4"
                  error={errors.confirm_password ? true : false}
                  helperText={errors.confirm_password? errors.confirm_password?.message : false}
                  {...register("confirm_password", {
                    validate: (value) => value === watch('password') || 'Passwords must match.',
                  })}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Show password"
                  onChange={handleClickShowPassword}
                  className="text-sm mt-4"
                  style={{marginLeft:0,marginTop:"0.5rem"}}
                />
            </div>
            <div className="flex justify-end items-center" >
              <CustomButton isLoading={isLoading} title='Submit'/>
            </div>
          </form>
        </Card>
        ):(
          <Alert severity="error">Invalid Reset Link. Please try again!</Alert>
        )}
      </Container>
  </div>
  )
}

export default ResetPassword