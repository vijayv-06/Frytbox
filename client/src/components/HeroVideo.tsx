import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile((prev) => (prev !== mobile ? mobile : prev));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Use vertical Frytbox22.mp4 for responsive mobile mode, Frytbox11.mp4 for desktop
  const videoSrc = isMobile
    ? `${import.meta.env.BASE_URL}videos/Frytbox22.mp4`
    : `${import.meta.env.BASE_URL}videos/Frytbox11.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo = () => {
      if (!video) return;
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser restricts initial autoplay without interaction
          const resumeOnTouch = () => {
            video.play().catch(() => {});
            window.removeEventListener('touchstart', resumeOnTouch);
            window.removeEventListener('click', resumeOnTouch);
          };
          window.addEventListener('touchstart', resumeOnTouch, { once: true });
          window.addEventListener('click', resumeOnTouch, { once: true });
        });
      }
    };

    playVideo();

    // Loop reassurance: when video reaches end, rewind and play continuously
    const handleEnded = () => {
      video.currentTime = 0;
      playVideo();
    };

    // Keep looping even if paused unexpectedly
    const handlePause = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    // Resume when user returns to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoSrc]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video Player: Frytbox22.mp4 on Mobile / Frytbox11.mp4 on Desktop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          key={isMobile ? 'mobile-frytbox22' : 'desktop-frytbox11'}
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-95 contrast-105"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Minimal clean gradient overlay for readability without dimming the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25 sm:from-black/60 sm:via-black/35 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 sm:from-black/50 sm:to-black/20" />
      </div>

      {/* Hero Content Container: Low Content, High Impact */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full mb-5 sm:mb-6 border border-white/20 text-[10px] sm:text-xs font-semibold tracking-wider text-white uppercase max-w-full">
            <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse shrink-0" />
            <span className="truncate">GLOBAL FREIGHT FORWARDING & SUPPLY CHAIN</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.1] font-display">
            Connecting Businesses. <br />
            <span className="text-white">Moving the </span>
            <span className="text-[#38BDF8]">World.</span>
          </h1>

          {/* Concise Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl">
            Reliable multi-modal air, ocean, and inland freight solutions designed to streamline your global trade from factory floor to customer door.
          </p>

          {/* Single Focused Professional Blue CTA */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/quote"
              className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2.5 text-center"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/services"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 transition-all flex items-center justify-center text-center"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Minimal Stats Strip */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
          <div className="p-1 sm:p-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">120+</div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-0.5">Global Ports & Hubs</div>
          </div>
          <div className="p-1 sm:p-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">99.4%</div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-0.5">On-Time Performance</div>
          </div>
          <div className="p-1 sm:p-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">450+</div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-0.5">Trade Lanes Active</div>
          </div>
          <div className="p-1 sm:p-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">24/7</div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-0.5">Dedicated Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
