import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProblemCard from '@/components/ProblemCard';
import SolutionCard from '@/components/SolutionCard';
import { client } from '@/lib/sanity/client';
import { problemsQuery, solutionsQuery } from '@/lib/sanity/queries';
import PageContent from '@/components/PageContent';

// Mock data for development (before Sanity is set up)
const mockProblems = [
  {
    _id: '1',
    title: {
      en: 'Air Pollution',
      th: 'มลพิษทางอากาศ'
    },
    description: {
      en: 'Crop burning releases harmful particulate matter and greenhouse gases, severely impacting air quality and public health.',
      th: 'การเผาพืชปล่อยอนุภาคและก๊าซเรือนกระจกที่เป็นอันตราย ส่งผลกระทบอย่างรุนแรงต่อคุณภาพอากาศและสุขภาพของประชาชน'
    },
    icon: '💨',
    order: 1
  },
  {
    _id: '2',
    title: {
      en: 'Soil Degradation',
      th: 'การเสื่อมโทรมของดิน'
    },
    description: {
      en: 'Burning destroys beneficial microorganisms and organic matter, reducing soil fertility and long-term productivity.',
      th: 'การเผาทำลายจุลินทรีย์ที่เป็นประโยชน์และอินทรียวัตถุ ลดความอุดมสมบูรณ์ของดินและผลผลิตในระยะยาว'
    },
    icon: '🌍',
    order: 2
  },
  {
    _id: '3',
    title: {
      en: 'Health Impacts',
      th: 'ผลกระทบต่อสุขภาพ'
    },
    description: {
      en: 'Smoke from crop burning causes respiratory problems, eye irritation, and cardiovascular issues, especially in vulnerable populations.',
      th: 'ควันจากการเผาพืชทำให้เกิดปัญหาทางเดินหายใจ ระคายเคืองตา และปัญหาหัวใจและหลอดเลือด โดยเฉพาะในกลุ่มเสี่ยง'
    },
    icon: '🏥',
    order: 3
  }
];

const mockSolutions = [
  {
    _id: '1',
    title: {
      en: 'Zero-Till Farming',
      th: 'การทำเกษตรแบบไม่ไถพรวน'
    },
    description: {
      en: 'Plant crops directly into residue without burning. Reduces costs, saves time, and improves soil health.',
      th: 'ปลูกพืชลงไปในตอซังโดยตรงโดยไม่ต้องเผา ลดต้นทุน ประหยัดเวลา และปรับปรุงสุขภาพของดิน'
    },
    icon: '🌾',
    category: 'agricultural',
    order: 1
  },
  {
    _id: '2',
    title: {
      en: 'Bio-Decomposer',
      th: 'ตัวย่อยสลายชีวภาพ'
    },
    description: {
      en: 'Spray microbial solution to rapidly decompose crop residue, converting it into nutrient-rich compost.',
      th: 'พ่นสารละลายจุลินทรีย์เพื่อย่อยสลายตอซังอย่างรวดเร็ว เปลี่ยนให้เป็นปุ๋ยหมักที่อุดมด้วยสารอาหาร'
    },
    icon: '🧪',
    category: 'technology',
    order: 2
  },
  {
    _id: '3',
    title: {
      en: 'Baler Machine',
      th: 'เครื่องอัดฟาง'
    },
    description: {
      en: 'Collect and bale crop residue for use as animal fodder, fuel, or raw material for industries.',
      th: 'เก็บและอัดตอซังเพื่อใช้เป็นอาหารสัตว์ เชื้อเพลิง หรือวัตถุดิบสำหรับอุตสาหกรรม'
    },
    icon: '🚜',
    category: 'technology',
    order: 3
  },
  {
    _id: '4',
    title: {
      en: 'Subsidies & Incentives',
      th: 'เงินอุดหนุนและแรงจูงใจ'
    },
    description: {
      en: 'Government support for farmers adopting sustainable practices and purchasing machinery.',
      th: 'การสนับสนุนจากรัฐบาลสำหรับเกษตรกรที่ใช้แนวปฏิบัติที่ยั่งยืนและซื้อเครื่องจักร'
    },
    icon: '💰',
    category: 'economic',
    order: 4
  }
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Try to fetch from Sanity, fall back to mock data
  let problems = mockProblems;
  let solutions = mockSolutions;

  try {
    const fetchedProblems = await client.fetch(problemsQuery);
    const fetchedSolutions = await client.fetch(solutionsQuery);

    if (fetchedProblems && fetchedProblems.length > 0) {
      problems = fetchedProblems;
    }
    if (fetchedSolutions && fetchedSolutions.length > 0) {
      solutions = fetchedSolutions;
    }
  } catch (error) {
    // Use mock data if Sanity is not configured yet
    console.log('Using mock data - Sanity not configured yet');
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PageContent problems={problems} solutions={solutions} />
      <Footer />
    </div>
  );
}
