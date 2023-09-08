import React from 'react';
import { Playfair } from 'next/font/google';
import Image from 'next/image';
import { Button } from './ui/button';
import { IconArrowRight } from '@tabler/icons-react';
// const playfair = Playfair({ subsets: ['latin'] });
function HomeUI() {
  return (
    <div className="flex items-center justify-between py-12">
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-serif font-medium lg:text-5xl">
          Complete fashion solution <br /> in one place
        </h1>
        <p className="text-xl">
          Your ultimate destination for all things fashion
        </p>
        <Button>
          Explore More
          <IconArrowRight className="h-4 w-4 stroke-[1.5px] ml-2" />
        </Button>
      </div>
      <Image
        src="/hero-image-1.jpg"
        width="300"
        className="mr-32"
        height="1"
        alt="Hero Image"
      />
    </div>
  );
}

export default HomeUI;
