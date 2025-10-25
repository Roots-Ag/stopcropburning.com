'use client';

import { useTranslations } from 'next-intl';
import ProblemCard from './ProblemCard';
import SolutionCard from './SolutionCard';

interface Problem {
  _id: string;
  title: { en: string; th: string };
  description: { en: string; th: string };
  icon?: string;
  image?: any;
}

interface Solution {
  _id: string;
  title: { en: string; th: string };
  description: { en: string; th: string };
  icon?: string;
  image?: any;
  category?: string;
}

export default function PageContent({
  problems,
  solutions,
}: {
  problems: Problem[];
  solutions: Solution[];
}) {
  const t = useTranslations('home');

  return (
    <>
      {/* Problems Section */}
      <section id="problems" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('problems.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('problems.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('solutions.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('solutions.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <SolutionCard key={solution._id} solution={solution} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
