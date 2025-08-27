import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Snapaper',
  description: 'Learn more about Snapaper and our mission to help CAIE students worldwide access past papers and study resources.',
};

const AboutPage: React.FC = () => {
  return (
    <>
      <AboutContent />
      <Footer />
    </>
  );
};

export default AboutPage;