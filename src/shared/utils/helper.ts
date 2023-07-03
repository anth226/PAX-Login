export function formatPhoneNumber(phoneNumber: string) {
  const lastTwoDigits = phoneNumber.slice(-2);
  const asterisks = '*'.repeat(phoneNumber.length - 2);
  return `${asterisks}${lastTwoDigits}`;
}