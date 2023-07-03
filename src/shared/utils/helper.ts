export function formatPhoneNumber(phoneNumber: string) {
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