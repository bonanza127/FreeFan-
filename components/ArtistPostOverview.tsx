// components/ArtistPostOverview.tsx
import React, { useState, useMemo } from 'react';
import { Search, Flame, Clock, Users, Image as ImageIcon } from 'lucide-react';
import { Artist, Post, ViewMode, SortOrder } from '@/lib/types';
import ArtistCard from './ArtistCard';
import PostListView from './PostListView';

interface ArtistPostOverviewProps {
  artists: Artist[];
  posts: Post[];
}

const ArtistPostOverview: React.FC<ArtistPostOverviewProps> = ({ artists, posts }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('creators');
  const [sortOrder, setSortOrder] = useState<SortOrder>('popular');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // フィルタリングとソート
  const processedArtists = useMemo(() => {
    if (viewMode !== 'creators') return [];

    let result = [...artists];

    // 検索フィルタ
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (artist) =>
          artist.displayName.toLowerCase().includes(lowerSearchTerm) ||
          artist.username.toLowerCase().includes(lowerSearchTerm) ||
          artist.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // ソート
    result.sort((a, b) => {
      if (sortOrder === 'popular') {
        return b.favoritesCount - a.favoritesCount;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [artists, viewMode, searchTerm, sortOrder]);

  const processedPosts = useMemo(() => {
    if (viewMode !== 'posts') return [];

    let result = [...posts];

    // 検索フィルタ
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter((post) => post.title.toLowerCase().includes(lowerSearchTerm));
    }

    // ソート
    result.sort((a, b) => {
      if (sortOrder === 'popular') {
        return b.likes - a.likes;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [posts, viewMode, searchTerm, sortOrder]);

  return (
    <main className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* 検索入力フィールド（モバイル用） */}
      <div className="flex justify-center mb-8 md:hidden">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            placeholder="絵師、イラストレーター、アイドルの作品を検索..."
            className="w-full h-10 rounded-full bg-slate-800 border-none pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ページヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* クリエイター/投稿切り替えタブ */}
        <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 shadow-sm shrink-0">
          <button
            onClick={() => setViewMode('creators')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
              viewMode === 'creators'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Users className="w-4 h-4" />
            クリエイター
          </button>
          <button
            onClick={() => setViewMode('posts')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${
              viewMode === 'posts'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            投稿
          </button>
        </div>

        {/* ビュータイトル */}
        <div className="flex-1 text-center md:text-left min-w-0 md:pl-8 lg:pl-0">
          <h1 className="text-xl font-bold text-white mb-0 truncate">
            {viewMode === 'creators'
              ? '人気の絵師・イラストレーター・アイドル'
              : '新着・人気のファンアート投稿'}
          </h1>
          <p className="text-slate-400 text-sm hidden sm:block">
            {viewMode === 'creators'
              ? 'PatreonやFanboxなどで活躍する、ファン注目のクリエイターを探しましょう。'
              : '最新のファンアートや人気イラストをチェック。あなたの「推し」を見つけよう！'}
          </p>
        </div>

        {/* ソート切り替え */}
        <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 shadow-sm shrink-0">
          <button
            onClick={() => setSortOrder('popular')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              sortOrder === 'popular'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Flame className="w-4 h-4" />
            人気順
          </button>
          <button
            onClick={() => setSortOrder('newest')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              sortOrder === 'newest'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            新着順
          </button>
        </div>
      </div>

      {/* コンテンツ表示エリア */}
      {viewMode === 'creators' ? (
        <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 min-h-[500px] content-start">
          {processedArtists.length > 0 ? (
            processedArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
              <Users className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">クリエイターは見つかりませんでした</p>
              <p className="text-sm">フィルタや並び替えオプションを変更してみてください</p>
            </div>
          )}
        </section>
      ) : (
        <PostListView posts={processedPosts} />
      )}

      {/* ページネーション */}
      {(processedArtists.length > 0 && viewMode === 'creators') || (processedPosts.length > 0 && viewMode === 'posts') ? (
        <div className="mt-12 flex justify-center gap-2">
          <button className="h-10 w-10 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            &lt;
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50">
            1
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            2
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            3
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            &gt;
          </button>
        </div>
      ) : null}
    </main>
  );
};

export default ArtistPostOverview;
