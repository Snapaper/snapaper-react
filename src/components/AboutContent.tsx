'use client';

import React from 'react';
import Image from 'next/image';
import {
  GithubOutlined,
  MailOutlined,
  GlobalOutlined,
  HeartOutlined,
  RocketOutlined,
  TeamOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const AboutContent: React.FC = () => {
  const features = [
    {
      icon: <RocketOutlined className="text-3xl text-primary" />,
      title: 'Fast & Reliable',
      description: 'Lightning-fast access to thousands of past papers with 99.9% uptime.',
    },
    {
      icon: <TeamOutlined className="text-3xl text-secondary" />,
      title: 'Community Driven',
      description: 'Built by students, for students. We understand your needs.',
    },
    {
      icon: <SafetyOutlined className="text-3xl text-accent" />,
      title: 'Always Free',
      description: 'Quality education resources should be accessible to everyone.',
    },
    {
      icon: <ThunderboltOutlined className="text-3xl text-green-500" />,
      title: 'Constantly Updated',
      description: 'New papers added regularly to keep you prepared.',
    },
  ];

  const stats = [
    { value: '1000+', label: 'Past Papers' },
    { value: '50+', label: 'Subjects' },
    { value: '10K+', label: 'Students Helped' },
    { value: '5', label: 'Years Running' },
  ];

  return (
    <div className="flex-1">
      <main className="container-main">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              About <span className="text-gradient gradient-primary">Snapaper</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed animate-slide-up">
              Empowering CAIE students worldwide with instant access to past papers,
              study resources, and exam preparation materials.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="pb-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Snapaper was founded in 2018 with a simple mission: to make CAIE past papers
                  and study resources easily accessible to students everywhere. We believe that
                  quality education materials should be free and available to all students,
                  regardless of their location or financial situation.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  What started as a small project has grown into a comprehensive platform serving
                  thousands of students globally. We&apos;re committed to continuously improving and
                  expanding our resources to better serve the CAIE student community.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 text-center shadow-md animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Snapaper?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resource Guide Section */}
        <section className="pb-16">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Resource Guide</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Started</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Use the One Step feature for quick paper access
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Browse by category (IGCSE or A Levels)
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Check trending subjects for popular papers
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Download papers for offline study
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Study Tips</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Practice with past papers regularly
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Time yourself to simulate exam conditions
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Review mark schemes thoroughly
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Focus on frequently tested topics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section className="pb-16">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Creator</h2>
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">TH</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Tony (Lipeng) He</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Full-stack developer and CAIE alumnus passionate about making education
                accessible to all. Started Snapaper as a student project and continues
                to maintain and improve it for the global student community.
              </p>
            </div>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/ttttonyhe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <GithubOutlined className="text-xl" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:tony.hlp@hotmail.com"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <MailOutlined className="text-xl" />
                <span>Email</span>
              </a>
              <a
                href="https://www.ouorz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <GlobalOutlined className="text-xl" />
                <span>Website</span>
              </a>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="pb-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center">
            <HeartOutlined className="text-5xl text-red-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Snapaper</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Snapaper is free and will always be free. If you find our service helpful,
              consider supporting us to help cover server costs and future development.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://github.com/sponsors/ttttonyhe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Sponsor on GitHub
              </a>
              <a
                href="https://www.ouorz.com/sponsor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-block"
              >
                Other Ways to Support
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutContent;