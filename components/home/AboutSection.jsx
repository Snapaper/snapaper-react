'use client';

import Link from 'next/link';
import Image from 'next/image';
import { InfoCircleFilled } from '@ant-design/icons';
import imagePlaceholder from '@/lib/imagePlaceholder';

export default function AboutSection() {
  return (
    <section className="next-index-section-two">
      <div className="next-index-card-left">
        <Link href="/page/about">
          <div>
            <h1 className="about-us-text">
              <InfoCircleFilled /> About Us
            </h1>
            <p>Learn more about Snapaper and its author</p>
          </div>
        </Link>
      </div>
      <div
        className="next-index-card-right"
        onClick={() => {
          window.location.href = 'https://www.ouorz.com/sponsor';
        }}
      >
        <div>
          <a href="https://www.ouorz.com/sponsor" target="_blank" rel="noreferrer">
            <h1>Sponsor Us</h1>
          </a>
          <p>Support the development of Snapaper</p>
        </div>
        <div>
          <Image
            src="https://static.ouorz.com/sponsor.jpeg"
            width={150}
            height={150}
            placeholder="blur"
            blurDataURL={imagePlaceholder}
            alt="Sponsor Us"
          />
        </div>
      </div>
    </section>
  );
}