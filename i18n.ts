import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './lib/i18n/config';

export default getRequestConfig(async ({ locale }) => {
  // For static export, use default locale if invalid
  const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;

  return {
    locale: validLocale as string,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
