const INDIA_COUNTRY_CODE = "91";
const INDIA_LOCAL_LENGTH = 10;
const INDIA_INTERNATIONAL_LENGTH = INDIA_COUNTRY_CODE.length + INDIA_LOCAL_LENGTH;

export function formatPhoneNumber(phone?: string | null): string | null {
  if (!phone) return null;

  const digitsOnly = phone.replace(/[^\d]/g, "");
  if (!digitsOnly) return null;

  if (digitsOnly.length === INDIA_LOCAL_LENGTH) {
    return `${INDIA_COUNTRY_CODE}${digitsOnly}`;
  }

  if (digitsOnly.length === INDIA_INTERNATIONAL_LENGTH && digitsOnly.startsWith(INDIA_COUNTRY_CODE)) {
    return digitsOnly;
  }

  return null;
}
