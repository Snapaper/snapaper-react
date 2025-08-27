import HeroSection from '@/components/home/HeroSection';
import ResourceCards from '@/components/home/ResourceCards';
import AboutSection from '@/components/home/AboutSection';
import NoticeBar from '@/components/home/NoticeBar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <main className="ant-container">
        <NoticeBar />
        <HeroSection />
        <ResourceCards />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}