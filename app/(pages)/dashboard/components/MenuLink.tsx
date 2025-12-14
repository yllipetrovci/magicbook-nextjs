'use client';

import Link from 'next/link';
import clsx from 'clsx';

export interface MenuItem {
  id: string;
  path: string;
  label: string;
  icon: string;
  color?: string;
}

interface MenuLinkProps {
  item: MenuItem;
  isActive: boolean;
}

export const MenuLink: React.FC<MenuLinkProps> = ({ item, isActive }) => {
  const isInvite = item.id === 'invite';

  return (
    <Link
      href={item.path}
      className={clsx(
        // base
        'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all whitespace-nowrap md:whitespace-normal group border',

        // desktop visibility
        isInvite && 'md:hidden',

        // active vs inactive
        isActive
          ? 'bg-white/10 border-white/10 shadow-lg'
          : 'hover:bg-white/5 border-transparent',

        // invite highlight (only when not active)
        isInvite &&
          !isActive &&
          'bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
      )}
    >
      {/* Icon Wrapper */}
      <div
        className={clsx(
          'w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner',

          isActive && ['bg-magic-surface', item.color],

          !isActive &&
            (isInvite
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-white/5 text-gray-500')
        )}
      >
        <i className={clsx('fa-solid', item.icon)} />
      </div>

      {/* Label */}
      <span
        className={clsx(
          'font-bold',

          isActive && 'text-white',

          !isActive &&
            (isInvite
              ? 'text-yellow-100'
              : 'text-gray-400 group-hover:text-gray-200')
        )}
      >
        {item.label}
      </span>

      {/* Active Indicator (Desktop only) */}
      {isActive && (
        <div className="ml-auto hidden md:block w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
      )}

      {/* Invite Sparkle */}
      {isInvite && !isActive && (
        <i className="fa-solid fa-sparkles text-yellow-400 text-xs animate-pulse ml-auto" />
      )}
    </Link>
  );
};
