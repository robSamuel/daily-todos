export const formatAmount = (number, isCurrency = false, currencySign = '$') => {
  const validatedAmount = number || 0;
  const amount = validatedAmount.toLocaleString();

  if(isCurrency)
      return `${currencySign}${amount}`;

  return amount;
};