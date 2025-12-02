// pages/index.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import Header from '@/components/Header';
import ArtistPostOverview from '@/components/ArtistPostOverview';
import Footer from '@/components/Footer';
import { getAllArtists, getAllPosts } from '@/lib/data';
import { Artist, Post } from '@/lib/types';

interface HomePageProps {
  artists: Artist[];
  posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ artists, posts }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30 pb-20">
      <Header />
      <ArtistPostOverview artists={artists} posts={posts} />
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const artists = await getAllArtists();
  const posts = await getAllPosts();

  return {
    props: {
      artists,
      posts,
    },
    // ISR (Incremental Static Regeneration) を有効化
    revalidate: 3600, // 1時間ごとに再生成
  };
};

export default HomePage;
