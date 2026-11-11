import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.0;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;

    const playVideo = () => {
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    playVideo();

    // Loop reassurance: when video reaches end, immediately rewind and play
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
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video Player: Clear & Highly Visible */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}videos/Frytbox11.mp4`}
          autoPlay
          loop
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover brightness-95 contrast-105"
        />

        {/* Minimal clean gradient overlay for readability without dimming the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Hero Content Container: Low Content, High Impact */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-6 border border-white/20 text-xs font-semibold tracking-wider text-white uppercase">
            <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span>GLOBAL FREIGHT FORWARDING & SUPPLY CHAIN</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
            Connecting Businesses. <br />
            <span className="text-white">Moving the </span>
            <span className="text-[#38BDF8]">World.</span>
          </h1>

          {/* Concise Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-2xl">
            Reliable multi-modal air, ocean, and inland freight solutions designed to streamline your global trade from factory floor to customer door.
          </p>

          {/* Single Focused Professional Blue CTA */}
          <div className="mt-8 flex items-center space-x-4">
            <Link
              to="/quote"
              className="px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-lg hover:shadow-blue-500/25 flex items-center space-x-2.5"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/services"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 transition-all"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Minimal Stats Strip */}
        <div className="mt-16 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">120+</div>
            <div className="text-xs text-gray-300 mt-0.5">Global Ports & Hubs</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">99.4%</div>
            <div className="text-xs text-gray-300 mt-0.5">On-Time Performance</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">450+</div>
            <div className="text-xs text-gray-300 mt-0.5">Trade Lanes Active</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">24/7</div>
            <div className="text-xs text-gray-300 mt-0.5">Dedicated Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
