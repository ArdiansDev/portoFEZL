import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import Banner from './Banner';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { useAuth } from 'context/AuthContext';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Banners() {
  const [[page, direction], setPage] = useState([0, 0]);
  const { banners } = useAuth();
  if(banners){
    banners["banner_rewards"].href = '/profile?tab=rewards'
    banners["banner_leaderboard"].href = '/profile?tab=profile'
    banners["banner_journey"].href = '/journeys'
    banners["banner_challenges"].href = '/profile?tab=challenge'
    banners["banner_resources"].href = '/resources'
  }

  let arrayBanners = Object.entries(banners).map((e) => e[1]);
  arrayBanners = arrayBanners.filter(({image}) => image);
  const imageIndex = wrap(0, arrayBanners.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  if(arrayBanners.length === 0){
    return null
  }


  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <Banner
            image={arrayBanners[imageIndex].image}
            title={arrayBanners[imageIndex].title}
            description={arrayBanners[imageIndex].description}
            background={arrayBanners[imageIndex].background}
            href={arrayBanners[imageIndex].href}
          />
        </motion.div>
      </AnimatePresence>
      <div
        className="banner-next sm:flex hidden width-32 height-32 rounded-16 bg-white items-center justify-center"
        onClick={() => paginate(1)}
      >
        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
      </div>
      <div
        className="banner-prev sm:flex hidden width-32 height-32 rounded-16 bg-white items-center justify-center"
        onClick={() => paginate(1)}
      >
        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}
