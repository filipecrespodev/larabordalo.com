export const SITE = {
  name: 'Lara Bordalo',
  email: 'art@larabordalo.com',
  instagram: '@larabordalo',
  keywords: 'illustration,picture books,children books,author,illustrator,mixed media,collage,Portugal,Brazil',
};

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/larabordalo' },
  { label: 'Pinterest', href: 'https://www.pinterest.pt/alarabordalo/' },
] as const;

/**
 * Contact form endpoint. The form posts to Web3Forms (free, no backend):
 * create an access key at https://web3forms.com with art@larabordalo.com and
 * set PUBLIC_WEB3FORMS_KEY in the hosting environment. Without a key the form
 * falls back to opening the visitor's mail app.
 */
export const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;
