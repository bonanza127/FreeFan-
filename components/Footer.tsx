// components/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-800 py-8 bg-slate-900">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-2xl font-black text-slate-700 italic">F</span>
        </div>
        <p className="text-slate-500 text-sm">
          &copy; 2025 FanFree! Inc. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-slate-600">
          <Link href="#" className="hover:text-slate-400">
            プライバシーポリシー
          </Link>
          <Link href="#" className="hover:text-slate-400">
            利用規約
          </Link>
          <Link href="#" className="hover:text-slate-400">
            クッキーについて
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
