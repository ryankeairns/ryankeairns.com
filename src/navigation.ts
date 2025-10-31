import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Work',
      href: getPermalink('/work'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/in/ryan-keairns' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/ryankeairns' },
  ],
  footNote: `
    Copyright © ${new Date().getFullYear()} Ryan Keairns
  `,
};
