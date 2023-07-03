import React from 'react'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'

function GoogleRecaptchV3({handleVerify, reCaptchaKey, refreshReCaptcha}) {
  return (
    <GoogleReCaptcha onVerify={handleVerify} refreshReCaptcha={refreshReCaptcha} />
  )
}

export default GoogleRecaptchV3