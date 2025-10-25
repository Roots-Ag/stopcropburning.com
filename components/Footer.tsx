'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg mb-4">{t('tagline')}</p>
          <p className="text-sm text-gray-400">
            © {currentYear} Stop Crop Burning. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
