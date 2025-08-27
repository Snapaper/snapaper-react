import PaperPage from '@/components/paper/PaperPage';

export async function generateMetadata({ params }) {
  const subject = params.subject?.replace('amp;', '').replaceAll('-', ' ') || 'IGCSE';
  return {
    title: `${subject} - ${params.year} | IGCSE | Snapaper`,
    description: `Cambridge International IGCSE ${subject} past papers for ${params.year}`,
  };
}

export default function IGCSEPaperPage({ params }) {
  return <PaperPage category="igcse" level="igcse" source="ppca" params={params} />;
}