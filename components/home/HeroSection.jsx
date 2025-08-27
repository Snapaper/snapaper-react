'use client';

import { useState } from 'react';
import Image from 'next/image';
import OneStepModal from './OneStepModal';
import imagePlaceholder from '@/lib/imagePlaceholder';

export default function HeroSection() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <section className="next-index-section-one">
        <section className="next-index-card-large" onClick={() => setModalVisible(true)}>
          <Image
            src="https://static.ouorz.com/onestep.jpeg"
            width={400}
            height={260}
            placeholder="blur"
            blurDataURL={imagePlaceholder}
            alt="One Step"
            className="w-full"
          />
          <div>
            <h1>One Step</h1>
            <p>The fastest and easiest way to find a paper</p>
          </div>
        </section>
      </section>
      <OneStepModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}