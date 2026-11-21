export const currencyMap = {
  USD: '$',
  EUR: '€',
  TRY: '₺',
  GBP: '£',
  BRL: 'R$'
};

export const rate = 250 / 3.03; // coins per USD

export const getCurSym = (currency = 'USD') => currencyMap[currency] || '$';

export const fmt = (n) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);

export const moneyFmt = (n, currency = 'USD') => `${getCurSym(currency)}${fmt(n)}`;

export const coinFmt = (n) =>
  new Intl.NumberFormat('en-US').format(Math.floor(n || 0));

export const dollars = (coins) => (coins || 0) / rate;

export function numFmt(n) {
  if (n == null || isNaN(n)) return '0';
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return new Intl.NumberFormat('en-US').format(n);
}

export function cleanHandle(raw, autoAtRemove = true) {
  if (!raw) return '';
  let str = String(raw).trim();
  str = str.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/i, '');
  if (autoAtRemove) {
    str = str.replace(/^@+/, '');
  }
  str = str.split('?')[0].split('/')[0].trim();
  return str;
}
