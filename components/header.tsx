// components/Header.tsx
import React from 'react';
import { Search, Menu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  isDetail?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDetail = false }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {isDetail && (
            <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all">
              <span className="text-white font-bold text-lg italic">F</span>
            </div>
            <span className="text-xl font-black text-white italic tracking-tight group-hover:text-blue-400 transition-colors">
              FanFree!
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="絵師、イラストレーター、アイドルの作品を検索..."
              className="w-full h-10 rounded-full bg-slate-800 border-none pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <button className="hidden sm:block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-900/20">
            登録
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="メニュー">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
