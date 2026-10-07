export const SITE = {
  name: 'Lara Bordalo',
  title: 'Lara Bordalo Illustration',
  description:
    'My name is Lara Bordalo, I am a Brazilian graphic artist and I am currently based in Portugal. I work mixing art, illustration and design.',
  keywords: 'art,illustration,design,books,kids illustration,advertising illustration',
  email: 'art@larabordalo.com',
  lang: 'en',
};

export const NAV = [
  { href: '/', label: 'Ilustrattion' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const SOCIAL = [
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/larabordalo' },
  { icon: 'pinterest', label: 'Pinterest', href: 'https://www.pinterest.pt/alarabordalo/' },
  { icon: 'email', label: 'Email', href: `mailto:${SITE.email}` },
] as const;

/**
 * Contact form endpoint. The form posts to Web3Forms (free, no backend):
 * create an access key at https://web3forms.com with art@larabordalo.com and
 * set PUBLIC_WEB3FORMS_KEY in the hosting environment. Without a key the form
 * falls back to opening the visitor's mail app.
 */
export const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;
