import CategoryPage from '@/components/category/CategoryPage';

export const metadata = {
  title: 'A Levels | Snapaper',
  description: 'Cambridge International General Certificate of Education Advanced Level',
};

export default function ALevelsPage() {
  return <CategoryPage category="alevel" title="A Levels" />;
}