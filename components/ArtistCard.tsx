// components/ArtistCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artist } from '@/lib/types';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="group relative h-36 sm:h-44 w-full overflow-hidden rounded-xl bg-slate-800 cursor-pointer border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-lg text-left"
    >
      {/* 背景バナー画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={artist.bannerUrl}
          alt={`Banner for ${artist.displayName}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
      </div>

      {/* カードの中身 */}
      <div className="relative z-10 flex h-full items-center p-4 sm:p-5 gap-4 sm:gap-6">
        {/* アイコン */}
        <div className="relative shrink-0 h-24 w-24 sm:h-32 sm:w-32 rounded-xl overflow-hidden border-2 border-slate-600/50 shadow-2xl group-hover:border-blue-400 transition-colors bg-slate-700">
          <Image
            src={artist.avatarUrl}
            alt={artist.displayName}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 96px, 128px"
          />
        </div>

        {/* テキスト情報 */}
        <div className="flex flex-col justify-center min-w-0 flex-1">
          {/* サービスバッジ */}
          <div className="mb-2">
            {artist.service === 'Patreon' && (
              <span className="inline-block bg-[#FF424D] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                Patreon
              </span>
            )}
            {artist.service === 'Fanbox' && (
              <span className="inline-block bg-[#0096FA] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                Fanbox
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white truncate drop-shadow-md group-hover:text-blue-200 transition-colors">
            {artist.displayName}
          </h3>

          <p className="text-sm text-slate-300 truncate mb-1 opacity-90">
            @{artist.username}
          </p>

          <div className="flex items-center gap-4 mt-1">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">お気に入り</span>
              <span className="text-sm font-bold text-white leading-none">
                {artist.favoritesCount.toLocaleString()}
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs text-slate-400">フォロワー</span>
              <span className="text-sm font-bold text-white leading-none">
                {artist.followersCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
