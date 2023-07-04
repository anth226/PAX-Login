import React, { useEffect,useState } from 'react'
import Image from 'next/image';
import { Card, FormControlLabel, TextField ,Checkbox, Container, Alert, Box} from "@mui/material";
import LogoImg from '../../images/logo.svg'
import CustomButton from '../ui/CustomButton';
import useTranslation from 'next-translate/useTranslation';
import { validatePasswordComplexity } from '../../shared/utils/helper';
import AuthFooter from '../ui/AuthFooter';
import LinearProgress from '@mui/material/LinearProgress';

function ResetPasswordForm({errors, register, isLoading, watch}) {
  const {t} = useTranslation("common")
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex justify-center items-center py-8 min-h-screen">
      <Container maxWidth="xs">
        <Card variant="outlined" style={{ filter: isLoading ? 'opacity(70%)' : 'blur(0)' }} >
          {isLoading&& (
            <Box sx={{ width: '100%' }}>
              <LinearProgress/>
            </Box>
          )}
            <div className='py-8 px-4'>
              <div className="flex justify-center items-center">
                <Image alt='Logo' src={LogoImg} className="h-14 w-14 text-center" />
              </div>
              <div className="flex flex-col gap-2 items-center my-4">
                <div className=" text-2xl text-[#202124] dark:text-[#ddd]">{t("auth.resetpwd.reset")}</div>
              </div>
              <div className="my-10 flex flex-col gap-10 w-full">
                <div>
                  <TextField
                      type={showPassword ? "text" : "password"}
                      id="demo-helper-text-misaligned"
                      label="Enter your password"
                      className="w-full custom-text-input"
                      error={errors.password ? true : false}
                      helperText={errors.password ? errors.password?.message : false}
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required."
                        },
                        validate: validatePasswordComplexity
                      })}
                    />
                    <TextField
                      type={showPassword ? "text" : "password"}
                      id="demo-helper-text-misaligned"
                      label="Confirm password"
                      className="w-full mt-4 custom-text-input"
                      error={errors.confirm_password ? true : false}
                      helperText={errors.confirm_password? errors.confirm_password?.message : false}
                      {...register("confirm_password", {
                        validate: (value) => value === watch('password') || 'Passwords must match.',
                      })}
                      style={{marginTop:"1rem"}}
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
              </div>
            </div>
          </Card>
          <AuthFooter/>
      </Container>
    </div>
  )
}

export default ResetPasswordForm