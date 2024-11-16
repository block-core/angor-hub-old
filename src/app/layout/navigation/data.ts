/* eslint-disable */
import { AngorNavigationItem } from '@angor/components/navigation';

export const defaultNavigation: AngorNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home',
    },
    {
        id: 'explore',
        title: 'Explore',
        type: 'basic',
        icon: 'heroicons_outline:magnifying-glass',
        link: '/explore',
    },
    {
        id: 'bookmark',
        title: 'Bookmark',
        type: 'basic',
        icon: 'heroicons_outline:bookmark',
        link: '/bookmark',
    },
    {
        id: 'chat',
        title: 'Chat',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/chat',
        badge: {
            title: '0',
            classes: 'px-2 bg-[#086c81] text-white rounded-full',
        },
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
    {
        id: 'settings',
        title: 'Settings',
        type: 'basic',
        icon: 'heroicons_outline:cog-6-tooth',
        link: '/settings',
    }
];

export const horizontalNavigation: AngorNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home',
    },
    {
        id: 'explore',
        title: 'Explore',
        type: 'basic',
        icon: 'heroicons_outline:magnifying-glass',
        link: '/explore',
    },
    {
        id: 'bookmark',
        title: 'Bookmark',
        type: 'basic',
        icon: 'heroicons_outline:bookmark',
        link: '/bookmark',
    },
    {
        id: 'chat',
        title: 'Chat',
        type: 'basic',
        icon: 'heroicons_outline:chat-bubble-left-right',
        link: '/chat',
        badge: {
            title: '27',
            classes: 'px-2 bg-[#086c81] text-white rounded-full',
        },
    },
    {
        id: 'profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/profile',
    },
    {
        id: 'settings',
        title: 'Settings',
        type: 'basic',
        icon: 'heroicons_outline:cog-6-tooth',
        link: '/settings',
    }
];
