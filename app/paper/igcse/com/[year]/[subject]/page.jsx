import { config } from '@/config';
import PaperPageClient from '@/components/paper-page-client';

async function getPapers(year, subject) {
  const res = await fetch(`${config.apiUrl.papers.com.igcse}${subject}/${year}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch papers');
  }
  return res.json();
}

export default async function PaperPage({ params }) {
  const { year, subject } = params;
  const papersData = await getPapers(year, subject);

  return (
    <PaperPageClient
      papers={papersData.papers}
      year={year}
      subject={subject}
      source="com"
      level="igcse"
    />
  );
}
