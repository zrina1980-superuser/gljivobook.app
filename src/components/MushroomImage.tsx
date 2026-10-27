import React, { useEffect, useRef, useState } from 'react';
import { Mushroom } from '../types/mushroom';
import {
  fetchMushroomPhoto,
  getCachedPhoto,
  removePhotoFromCache,
} from '../services/imageService';

interface MushroomImageProps {
  mushroom: Mushroom;
  className?: string;
  priority?: boolean;
  onPhotoResolved?: (url: string | null) => void;
}

export const MushroomImage: React.FC<MushroomImageProps> = ({
  mushroom,
  className = 'w-full h-48',
  priority = false,
  onPhotoResolved,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(priority);
  const [photoUrl, setPhotoUrl] = useState<string | null>(() =>
    mushroom.userPhoto || getCachedPhoto(mushroom.id)
  );
  const [isLoading, setIsLoading] = useState<boolean>(!photoUrl);
  const [retriedFallback, setRetriedFallback] = useState<boolean>(false);

  useEffect(() => {
    onPhotoResolved?.(photoUrl);
  }, [photoUrl, onPhotoResolved]);

  // Observe viewport intersection so scrolling cards load smoothly without API rate-limiting
  useEffect(() => {
    if (priority || photoUrl) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, photoUrl, mushroom.id]);

  // Fetch photo when visible or when mushroom ID/userPhoto changes
  useEffect(() => {
    let isMounted = true;

    if (mushroom.userPhoto) {
      setPhotoUrl(mushroom.userPhoto);
      setIsLoading(false);
      return;
    }

    const cached = getCachedPhoto(mushroom.id);
    if (cached) {
      setPhotoUrl(cached);
      setIsLoading(false);
      return;
    }

    if (!isVisible) return;

    setPhotoUrl(null);
    setIsLoading(true);
    setRetriedFallback(false);

    fetchMushroomPhoto(mushroom, false).then((url) => {
      if (isMounted) {
        setPhotoUrl(url);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [mushroom.id, mushroom.userPhoto, mushroom.wikiQuery, isVisible]);

  // If primary cached/Wikipedia URL fails to load in <img>, automatically try iNaturalist/Commons fallback skipping the failed URL
  const handleImageError = () => {
    if (!retriedFallback && !mushroom.userPhoto) {
      const failedUrl = photoUrl || undefined;
      setRetriedFallback(true);
      setPhotoUrl(null);
      setIsLoading(true);
      removePhotoFromCache(mushroom.id);
      fetchMushroomPhoto(mushroom, true, failedUrl).then((fallbackUrl) => {
        setPhotoUrl(fallbackUrl);
        setIsLoading(false);
      });
    } else {
      setPhotoUrl(null);
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`mushroom-photo-frame relative overflow-hidden bg-[#111a14] select-none ${className}`}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${mushroom.name} (${mushroom.latin})`}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#15231a] to-[#0c140f]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
              <span className="text-[11px] text-[#8fa696] italic text-center">
                Dohvaćanje terenske fotografije ({mushroom.latin.split(' ').slice(0, 2).join(' ')})...
              </span>
            </div>
          ) : (
            <div className="text-center space-y-1">
              <div className="text-xs font-semibold text-[#c5d6cb]">{mushroom.name}</div>
              <div className="text-[11px] text-[#8fa696] italic">{mushroom.latin}</div>
            </div>
          )}
        </div>
      )}
      <div className="mushroom-photo-vignette absolute inset-0 bg-gradient-to-t from-[#0b110e] via-transparent to-transparent opacity-65 pointer-events-none" />
    </div>
  );
};
