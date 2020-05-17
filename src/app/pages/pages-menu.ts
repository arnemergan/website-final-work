import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Upload invoice',
    icon: 'archive-outline',
    link: '/pages/upload-invoice',
  },
  {
    title: 'Invoices',
    icon: 'archive-outline',
    link: '/pages/invoices',
  },
  {
    title: 'Statistics',
    icon: 'pie-chart-outline',
    link: '/pages/statistics',
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
    link: '/pages/settings',
  }
];
