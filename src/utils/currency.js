const USD_TO_NGN = 1550;

export const convertToNaira = (usdAmount) => {
  return usdAmount * USD_TO_NGN;
};

export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPrice = (usdAmount, discountPercentage = 0) => {
  const discountedUsdPrice = usdAmount * (1 - discountPercentage / 100);
  const nairaAmount = convertToNaira(discountedUsdPrice);
  return formatNaira(nairaAmount);
}; 