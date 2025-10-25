'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { localeNames, type Locale } from '@/lib/i18n/config';

export default function Header() {
  const t = useTranslations('nav');
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const otherLocale: Locale = currentLocale === 'en' ? 'th' : 'en';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="text-2xl font-bold text-green-700">
          🌾 Stop Crop Burning
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href={`/${currentLocale}#problems`}
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            {t('problems')}
          </Link>
          <Link
            href={`/${currentLocale}#solutions`}
            className="text-gray-700 hover:text-green-700 transition-colors"
          >
            {t('solutions')}
          </Link>

          <Link
            href={`/${otherLocale}`}
            className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors text-sm font-medium"
          >
            {localeNames[otherLocale]}
          </Link>
        </div>
      </nav>
    </header>
  );
}
