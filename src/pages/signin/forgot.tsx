import React, { useState } from 'react'
import { resetPasswordApi } from '../../api/auth'
import { apiErrorToast, successToast } from '../../shared/toastifier/toastify'
import { useForm } from 'react-hook-form';
import ForgotPassword from '../../components/auth/ForgotPassword';
import useTranslation from 'next-translate/useTranslation'
import{
    Container,
    Alert,
    Box,
    Typography
} from "@mui/material";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';


type FormData = {
  email: string,
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Forgot() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const {t} = useTranslation("common")
    const [hasSent, setHasSent] = useState<boolean>(false)

    const router = useRouter()

    const [progress, setProgress] = React.useState(10);
    React.useEffect(() => {
      if(hasSent) {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }
    }, [hasSent]);

    React.useEffect(()=>{
      if(progress>80) {
        router.push("/")
      }
    },[progress])

    const onSubmit = async (data:FormData) => {
        setIsLoading(true)
        try {
            await resetPasswordApi(data)
            successToast(t('auth.forgot.success'))
            setHasSent(true)
        } catch (error) {
            apiErrorToast(error)
        }
        setIsLoading(false)
    }
    
  return (
    hasSent ? (
      <div className="flex justify-center items-center min-h-screen">
        <Container maxWidth="xs">
          <Alert severity="success">{t('auth.forgot.message')}</Alert>
          <LinearProgressWithLabel value={progress} />
        </Container>
      </div>
    ): (
    <form onSubmit={handleSubmit(onSubmit)}>
        <ForgotPassword register={register} errors={errors} isLoading={isLoading} />
    </form>
    )
  )
}

export default Forgot