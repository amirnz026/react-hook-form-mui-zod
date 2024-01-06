export const patterns = {
  elevenDigits: /^\d{11}$/,
  tenDigits: /^\d{10}$/,
  sixDigits: /^\d{6}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  zeroTo99: /^(0?[0-9]|[1-9][0-9])$/,
  zeroTo999: /^(0|[1-9]\d{0,2})$/,
  oneTo999: /^([1-9]\d{0,2})$/,
  zeroTo50Characters: /^.{0,50}$/,
  number: /^\d*\.?\d+$/,
  phoneNumber: /^(?:0[9])\d{9}$/,
};
