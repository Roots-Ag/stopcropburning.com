'use client';

import { useParams } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';

interface Problem {
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
}

export default function ProblemCard({ problem }: { problem: Problem }) {
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
      {problem.icon && (
        <div className="text-5xl mb-4">{problem.icon}</div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {problem.title[locale]}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {problem.description[locale]}
      </p>
    </div>
  );
}
