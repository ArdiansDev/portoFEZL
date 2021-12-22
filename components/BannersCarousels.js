import Banner from './Banner';
import * as React from 'react';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import { useAuth } from 'context/AuthContext';
import NextImage from './NextImage';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/solid';
export default function Banners() {
  const { banners } = useAuth();
  if (banners) {
    banners['banner_rewards_desktop'].href = '/profile?tab=rewards';
    banners['banner_leaderboard_desktop'].href = '/profile?tab=profile';
    banners['banner_journey_desktop'].href = '/journeys';
    banners['banner_invitation_challenges_desktop'].href =
      '/profile?tab=challenge&subtab=invitation';
    banners['banner_weekly_challenges_desktop'].href =
      '/profile?tab=challenge&subtab=weekly';
    banners['banner_resources_desktop'].href = '/resources';
    banners['banner_rewards_mobile'].href = '/profile?tab=rewards';
    banners['banner_leaderboard_mobile'].href = '/profile?tab=profile';
    banners['banner_journey_mobile'].href = '/journeys';
    banners['banner_invitation_challenges_mobile'].href =
      '/profile?tab=challenge&subtab=invitation';
    banners['banner_weekly_challenges_mobile'].href = '/profile?tab=challenge';
    banners['banner_resources_mobile'].href = '/resources';

    banners['banner_charity_desktop'].href = '/profile?tab=rewards';
    banners['banner_charity_mobile'].href = '/profile?tab=rewards';
  }

  // console.log("banners", banners);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,

    autoplaySpeed: 5000,
  };

  const sliderRef = useRef();
  const nextSlide = (e) => {
    e.preventDefault();
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const ScreenSize = screen.width < 640 ? true : false;

  return (
    <div className="w-full relative   items-center h-max">
      <button
        className="width-40 text-white left-4 absolute z-10 top-24 mobile:width-20 mobile:top-20 mobile:left-1"
        onClick={previousSlide}
      >
        <ArrowCircleLeftIcon />
      </button>
      <button
        className="width-40 absolute z-10 right-4 top-24 text-white  mobile:width-20 mobile:top-20 mobile:right-1"
        onClick={nextSlide}
      >
        <ArrowCircleRightIcon />
      </button>
      <div>
        <Slider ref={sliderRef} className="z-0" {...settings}>
          {banners.banner_charity_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_charity_mobile.image
                  : banners.banner_charity_desktop.image
              }
              href={banners.banner_charity_desktop.href}
            />
          ) : null}
          {banners.banner_weekly_challenges_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_weekly_challenges_mobile.image
                  : banners.banner_weekly_challenges_desktop.image
              }
              href={banners.banner_weekly_challenges_desktop.href}
            />
          ) : null}
          {banners.banner_invitation_challenges_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_invitation_challenges_mobile.image
                  : banners.banner_invitation_challenges_desktop.image
              }
              href={banners.banner_invitation_challenges_desktop.href}
            />
          ) : null}
          {banners.banner_journey_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_journey_mobile.image
                  : banners.banner_journey_desktop.image
              }
              href={banners.banner_journey_desktop.href}
            />
          ) : null}
          {banners.banner_leaderboard_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_leaderboard_mobile.image
                  : banners.banner_leaderboard_desktop.image
              }
              href={banners.banner_leaderboard_desktop.href}
            />
          ) : null}
          {banners.banner_resources_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_resources_mobile.image
                  : banners.banner_resources_desktop.image
              }
              href={banners.banner_resources_desktop.href}
            />
          ) : null}
          {banners.banner_rewards_desktop.image ? (
            <Banner
              image={
                ScreenSize
                  ? banners.banner_rewards_mobile.image
                  : banners.banner_rewards_desktop.image
              }
              href={banners.banner_rewards_desktop.href}
            />
          ) : null}
        </Slider>
      </div>
    </div>
  );
}
