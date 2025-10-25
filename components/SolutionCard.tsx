'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type Locale } from '@/lib/i18n/config';

interface Solution {
  _id: string;
  title: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  icon?: string;
  image?: any;
  category?: string;
}

export default function SolutionCard({ solution }: { solution: Solution }) {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('home.categories');

  return (
    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-green-100">
      {solution.icon && (
        <div className="text-5xl mb-4">{solution.icon}</div>
      )}
      {solution.category && (
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-3">
          {t(solution.category as any)}
        </span>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {solution.title[locale]}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {solution.description[locale]}
      </p>
    </div>
  );
}
