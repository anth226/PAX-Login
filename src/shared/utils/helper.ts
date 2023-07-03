export function formatPhoneNumber(phoneNumber: string) {
  if(!phoneNumber) return "";
  const lastTwoDigits = phoneNumber.slice(-2);
  const asterisks = '*'.repeat(phoneNumber.length - 2);
  return `${asterisks}${lastTwoDigits}`;
}

export const customShowInputError = (key: any, error: any, setError: Function) => {
    let customMessage = "Some Error Occured."
    if(error.response?.data?.message) {
        customMessage = error.response.data.message
    }
    setError(key, {
        type: 'manual',
        message: customMessage,
    });   
}

export const validatePasswordComplexity = (value) => {
  // password complexity requirements
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!value.match(passwordRegex)) {
    return 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.';
  }
};
