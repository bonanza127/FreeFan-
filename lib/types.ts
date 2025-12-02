// lib/types.ts
export interface Artist {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  favoritesCount: number;
  followersCount: number;
  isPatreon?: boolean;
  service?: string;
  tags: string[];
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  views: number;
  createdAt: string;
  artistId?: number; // アーティストとの関連付け用
}

export interface PageProps {
  artists: Artist[];
  posts: Post[];
}

export type ViewMode = 'creators' | 'posts';
export type SortOrder = 'popular' | 'newest';

// lib/data.ts
import { Artist, Post } from './types';

// モックデータ
const ARTIST_DATA = [
  { name: 'theobrobine', service: 'Patreon', tags: ['Fantasy', 'Concept Art'] },
  { name: 'mdasutarou', service: 'Pixiv Fanbox', tags: ['Mecha', 'Sci-Fi'] },
  { name: 'cosmic_sketch', service: 'Patreon', tags: ['Space', 'Illustration'] },
  { name: 'ink_whisper', service: 'Fanbox', tags: ['Traditional', 'Manga'] },
  { name: 'pixel_sensei', service: 'Patreon', tags: ['Pixel Art', 'Game Dev'] },
  { name: 'chara_lab', service: 'Fanbox', tags: ['Character Design', 'Cute'] },
  { name: 'mono_chrome', service: 'Patreon', tags: ['Black & White', 'Sketch'] },
  { name: 'neon_dreamer', service: 'Fanbox', tags: ['Cyberpunk', 'Vaporwave'] },
  { name: 'mythic_brush', service: 'Patreon', tags: ['Mythology', 'Epic'] },
  { name: 'daily_doodle', service: 'Fanbox', tags: ['Daily', 'Animals'] },
];

// アーティストデータ生成関数
export function generateArtists(): Artist[] {
  return ARTIST_DATA.map((data, index) => {
    const id = index + 1;
    return {
      id,
      username: data.name.toLowerCase().replace(/ /g, '_'),
      displayName: data.name,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&face&id=${id}`,
      bannerUrl: `https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&h=600&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&id=${id}`,
      bio: `${data.name}です。${data.tags.join('と')}をテーマに活動しています。応援よろしくお願いします！`,
      favoritesCount: Math.floor(Math.random() * 100000) + 20000,
      followersCount: Math.floor(Math.random() * 50000) + 10000,
      isPatreon: data.service === 'Patreon',
      service: data.service,
      tags: data.tags,
      createdAt: `2023-${String(12 - index).padStart(2, '0')}-15`,
    };
  });
}

// 投稿データ生成関数
export function generatePosts(artistId: number): Post[] {
  return Array.from({ length: 9 }).map((_, i) => {
    const baseDate = new Date(`2024-${String((artistId % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`);
    baseDate.setHours(10 + i);
    return {
      id: parseInt(`${artistId}${i}`),
      title: `Artwork #${i + 1} by Artist ${artistId}`,
      imageUrl: `https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&id=${artistId * 10 + i}`,
      likes: Math.floor(Math.random() * 5000) + 100,
      views: Math.floor(Math.random() * 20000) + 1000,
      createdAt: baseDate.toISOString().split('T')[0],
      artistId,
    };
  });
}

// 全投稿データ生成
export function generateAllPosts(): Post[] {
  const artists = generateArtists();
  return artists.flatMap(artist => generatePosts(artist.id));
}

// SSG用データ取得関数
export async function getAllArtists(): Promise<Artist[]> {
  // 実際のプロジェクトではここでAPIやデータベースからデータを取得
  return generateArtists();
}

export async function getAllPosts(): Promise<Post[]> {
  // 実際のプロジェクトではここでAPIやデータベースからデータを取得
  return generateAllPosts();
}

export async function getArtistById(id: number): Promise<Artist | null> {
  const artists = await getAllArtists();
  return artists.find(artist => artist.id === id) || null;
}

export async function getPostsByArtistId(artistId: number): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.artistId === artistId);
}
