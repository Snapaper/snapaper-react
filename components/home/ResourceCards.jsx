import Link from 'next/link';
import Image from 'next/image';
import imagePlaceholder from '@/lib/imagePlaceholder';

const resources = [
  {
    href: '/cate/igcse',
    image: 'https://static.ouorz.com/igcse.jpeg',
    title: 'IGCSE',
    description: 'Cambridge International General Certificate of Secondary Education',
  },
  {
    href: '/cate/alevels',
    image: 'https://static.ouorz.com/alevel.jpeg',
    title: 'A Levels',
    description: 'Cambridge International General Certificate of Education Advanced Level',
  },
  {
    href: '/topic/ebooks',
    image: 'https://static.ouorz.com/ebooks.jpeg',
    title: 'PDF eBooks',
    description: 'Cambridge International Curriculum PDF electronic textbooks',
  },
  {
    href: '/topic/savemyexams',
    image: 'https://static.ouorz.com/sme.jpeg',
    title: 'Save My Exams',
    description: 'Practice exam mark schemes',
  },
];

export default function ResourceCards() {
  return (
    <section className="next-index-section-cards">
      {resources.map((resource) => (
        <Link href={resource.href} key={resource.href}>
          <div className="card">
            <div>
              <Image
                src={resource.image}
                width={48}
                height={48}
                placeholder="blur"
                blurDataURL={imagePlaceholder}
                alt={resource.title}
              />
            </div>
            <div>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}