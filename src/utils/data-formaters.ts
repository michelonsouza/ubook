export function formatPhoneNumberMask(phoneNumber: string | null): string {
  if (!phoneNumber) {
    return '';
  }

  const newValue = phoneNumber?.replace(/[^\d]/g, '');

  if (newValue && newValue.length > 10) {
    return newValue?.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  return newValue?.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}
