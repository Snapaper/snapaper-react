import PaperPage from '@/components/paper/PaperPage';

export async function generateMetadata({ params }) {
  const subject = params.subject?.replace('amp;', '').replaceAll('-', ' ') || 'A Levels';
  return {
    title: `${subject} - ${params.year} | A Levels | Snapaper`,
    description: `Cambridge International A Level ${subject} past papers for ${params.year}`,
  };
}

export default function ALevelPaperPagePpco({ params }) {
  return <PaperPage category="alevel" level="alevels" source="ppco" params={params} />;
}