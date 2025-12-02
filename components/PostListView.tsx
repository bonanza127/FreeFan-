// components/PostListView.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { Post } from '@/lib/types';
import PostCard from './PostCard';

interface PostListViewProps {
  posts: Post[];
}

const PostListView: React.FC<PostListViewProps> = ({ posts }) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 min-h-[500px] content-start">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
          <Search className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">投稿は見つかりませんでした</p>
          <p className="text-sm">フィルタを変更してみてください</p>
        </div>
      )}
    </section>
  );
};

export default PostListView;
