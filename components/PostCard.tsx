// components/PostCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group relative aspect-square bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 cursor-pointer"
    >
      <Image
        src={post.imageUrl}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-between items-center text-xs text-white">
          <span className="flex items-center gap-1">
            <Heart size={12} /> {post.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} /> {post.views.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
