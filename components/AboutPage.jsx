'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <main className="page-container">
        <Button type="primary" onClick={() => router.back()} style={{ marginBottom: '20px' }}>
          <ArrowLeftOutlined /> Back
        </Button>
        
        <h1 className="page-title">About Snapaper</h1>
        <p className="page-des">
          The ultimate destination for CAIE past papers and study resources
        </p>
        
        <div className="page-body">
          <h2>Our Mission</h2>
          <p>
            Snapaper is dedicated to providing free and easy access to Cambridge International
            past papers and study resources for students worldwide. We believe that education
            should be accessible to everyone, regardless of their location or financial situation.
          </p>
          
          <h2>What We Offer</h2>
          <ul>
            <li>Complete collection of IGCSE and A-Level past papers</li>
            <li>PDF textbooks and study guides</li>
            <li>Save My Exams practice materials</li>
            <li>One-click paper finding with our One Step feature</li>
            <li>Mobile-friendly interface for studying on the go</li>
          </ul>
          
          <h2>About the Author</h2>
          <p>
            Snapaper was created by Tony (Lipeng) He, a passionate developer committed to making
            educational resources more accessible. The project is open-source and welcomes
            contributions from the community.
          </p>
          
          <h2>Support Us</h2>
          <p>
            If you find Snapaper helpful, please consider supporting us through{' '}
            <a href="https://github.com/sponsors/ttttonyhe" target="_blank" rel="noreferrer">
              GitHub Sponsors
            </a>
            . Your support helps us maintain the servers and continue improving the platform.
          </p>
          
          <h2>Contact</h2>
          <p>
            For questions, suggestions, or support, please email us at{' '}
            <a href="mailto:tony.hlp@hotmail.com">tony.hlp@hotmail.com</a>
          </p>
          
          <h2>Open Source</h2>
          <p>
            Snapaper is open-source software. Visit our{' '}
            <a href="https://github.com/Snapaper" target="_blank" rel="noreferrer">
              GitHub repository
            </a>{' '}
            to view the code, report issues, or contribute to the project.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}