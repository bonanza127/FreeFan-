// components/ArtistDetailView.tsx
import React from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { Artist, Post } from '@/lib/types';
import PostCard from './PostCard';

interface ArtistDetailViewProps {
  artist: Artist;
  posts: Post[];
}

const ArtistDetailView: React.FC<ArtistDetailViewProps> = ({ artist, posts }) => {
  return (
    <div className="animate-in slide-in-from-right-10 duration-500">
      {/* ヒーローヘッダー */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-800">
        <Image
          src={artist.bannerUrl}
          alt={`Banner for ${artist.displayName}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* プロフィール情報 */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8">
          <div className="container mx-auto flex items-end gap-6">
            {/* アイコン */}
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl border-4 border-slate-900 shadow-xl overflow-hidden bg-slate-800 -mb-12 sm:-mb-16 shrink-0">
              <Image
                src={artist.avatarUrl}
                alt={artist.displayName}
                fill
                className="object-cover"
                priority
                sizes="144px"
              />
            </div>

            {/* 名前とボタン */}
            <div className="flex-1 pb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
                  {artist.displayName}
                </h1>
                <p className="text-slate-300 font-medium drop-shadow-md">@{artist.username}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-200">
                  <span className="font-bold">
                    {artist.favoritesCount.toLocaleString()}{' '}
                    <span className="font-normal text-slate-400">お気に入り</span>
                  </span>
                  <span className="font-bold">
                    {artist.followersCount.toLocaleString()}{' '}
                    <span className="font-normal text-slate-400">フォロワー</span>
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg shadow-blue-900/30 transition-all"
                  aria-label={`${artist.displayName}をフォロー`}
                >
                  フォロー
                </button>
                <button
                  className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full border border-slate-600 backdrop-blur-sm transition-colors"
                  aria-label="その他のオプション"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-12">
        <div className="flex flex-col gap-8">
          <div className="flex-1">
            {/* プロフィール下の紹介テキストエリア */}
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-2">プロフィール</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{artist.bio}</p>
            </div>

            {/* 投稿ギャラリーのナビゲーション */}
            <div className="flex items-center gap-6 border-b border-slate-700 mb-6">
              <button className="px-4 py-3 text-blue-400 border-b-2 border-blue-400 font-bold">
                投稿 <span className="ml-1 text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">{posts.length}</span>
              </button>
            </div>

            {/* 投稿ギャラリー */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailView;
