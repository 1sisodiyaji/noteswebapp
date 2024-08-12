import React from "react";
import { WobbleCard } from "./ui/wobble-card.tsx";

export function WobbleCardDesign() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
     <WobbleCard
  containerClassName="col-span-1 lg:col-span-2 bg-pink-800 min-h-[250px] lg:min-h-[300px]"
  className=""
>
  <div className="max-w-xs">
    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
      Notes Saver: Simplify Your Note-Taking Experience
    </h2>
    <p className="mt-4 text-left text-base/6 text-neutral-200">
      With Notes Saver, you can easily manage, organize, and access your notes anytime, anywhere. Join our growing community of users and experience the convenience of seamless note-taking.
    </p>
  </div>
  <img 
    src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1723464769/codesaarthi/13_vlpez6.png"
    width={500}
    height={500}
    alt="Notes Saver demo"
    className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
  />
</WobbleCard>
<WobbleCard containerClassName="col-span-1 md:min-h-[300px] min-h-[250px]">
  <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
    Keep Your Notes Organized and Accessible
  </h2>
  <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
    Whether it's for personal use, work, or study, Notes Saver provides the tools you need to keep your notes in perfect order. Enjoy features like group management, note sharing, and more.
  </p>
</WobbleCard>
<WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[250px] lg:min-h-[600px] xl:min-h-[300px]">
  <div className="max-w-sm">
    <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
      Get Started with Notes Saver Today!
    </h2>
    <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
      Join thousands of satisfied users who have transformed their note-taking experience with Notes Saver. Sign up now and start organizing your notes with ease.
    </p>
  </div>
  <img
    src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1723464283/codesaarthi/12_bggwwb.png"
    width={500}
    height={500}
    alt="Notes Saver demo"
    className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
  />
</WobbleCard>

    </div>
  );
}
