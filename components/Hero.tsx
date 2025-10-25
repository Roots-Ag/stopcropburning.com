'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Hero() {
  const t = useTranslations('home.hero');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-green-700 font-medium mb-8">
            {t('subtitle')}
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}#solutions`}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('cta')}
            </a>
            <a
              href={`/${locale}#problems`}
              className="px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('learnMore')}
            </a>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🌾</div>
        <div className="absolute bottom-10 right-10 text-8xl">🌱</div>
        <div className="absolute top-1/2 left-1/4 text-6xl">🍃</div>
      </div>
    </section>
  );
}
