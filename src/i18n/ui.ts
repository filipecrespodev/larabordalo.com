export const LANGS = ['en', 'pt'] as const;
export type Lang = (typeof LANGS)[number];

const en = {
  role: 'Illustrator & author',
  title: 'Lara Bordalo · Illustrator & picture book author',
  description:
    'Lara Bordalo is a Brazilian illustrator and picture book author based in Portugal, working in mixed media: paper cut, painting and digital.',
  nav: { home: 'Home', books: 'Books', illustration: 'Illustration', about: 'About' },
  langName: 'English',
  home: {
    tl: 'Illustrator & author',
    tr: 'Portfolio 2026',
    bl: 'Drag the images · click to enlarge',
    br: 'Portugal',
    hint: 'Tap an image to enlarge',
    dymo: 'Paper cut · Paint · Story',
    palette: 'Palette · 2026',
    colors: ['Coral', 'Ochre', 'Rose', 'Night blue'],
  },
  books: {
    meta: 'Picture books and published work',
    titles: (n: number) => `${n} titles`,
    author: 'Text',
    publisher: 'Publisher',
    medium: 'Technique',
    format: 'Edition',
    view: 'View the book',
    illustrated: 'Illustrated by Lara Bordalo',
  },
  illustration: {
    meta: 'Narratives and single illustrations',
    note: 'Sizes relative to each other',
    all: 'All',
    works: (n: number) => `${n} ${n === 1 ? 'work' : 'works'}`,
    filter: 'Filter by category',
  },
  about: {
    meta: 'About',
    disciplines: 'Picture books · Illustration · Mixed media',
    portrait: 'Lara in the studio',
    contactLabel: 'Contact · books, commissions and hello',
    hello: 'If you would like to work with me, have questions or just want to say hello, I will be happy to talk with you.',
    copy: 'Copy e-mail',
    copied: 'Copied',
    selected: 'Selected',
    form: {
      name: 'Name',
      email: 'Email *',
      message: 'Message *',
      send: 'Send message',
      sent: "Thanks! I'll reply to your message soon :)",
      error: (email: string) => `Sorry, the message could not be sent. Please email ${email}.`,
    },
  },
  project: { next: 'Next', back: 'All work' },
  lightbox: { label: 'Enlarged work', close: 'Close · Esc', prev: '← Previous', next: 'Next →', open: 'Open project →' },
  cursor: { drag: 'Drag', view: 'View', open: 'Open' },
  foot: { rights: 'All rights reserved', top: 'Back to top ↑' },
  notFound: { title: 'Lost', text: "This page doesn't exist.", back: 'Back to the board →' },
};

const pt: typeof en = {
  role: 'Ilustradora e autora',
  title: 'Lara Bordalo · Ilustradora e autora de livros infantis',
  description:
    'Lara Bordalo é uma ilustradora e autora de livros infantis brasileira, a viver em Portugal, que trabalha em técnica mista: recorte, pintura e digital.',
  nav: { home: 'Início', books: 'Livros', illustration: 'Ilustração', about: 'Sobre' },
  langName: 'Português',
  home: {
    tl: 'Ilustradora e autora',
    tr: 'Portfólio 2026',
    bl: 'Arraste as imagens · clique para ampliar',
    br: 'Portugal',
    hint: 'Toque numa imagem para ampliar',
    dymo: 'Recorte · Pintura · História',
    palette: 'Paleta · 2026',
    colors: ['Coral', 'Ocre', 'Rosa', 'Azul-noite'],
  },
  books: {
    meta: 'Livros ilustrados e trabalhos publicados',
    titles: (n: number) => `${n} títulos`,
    author: 'Texto',
    publisher: 'Editora',
    medium: 'Técnica',
    format: 'Edição',
    view: 'Ver o livro',
    illustrated: 'Ilustrações de Lara Bordalo',
  },
  illustration: {
    meta: 'Narrativas e ilustrações avulsas',
    note: 'Tamanhos relativos entre as obras',
    all: 'Todas',
    works: (n: number) => `${n} ${n === 1 ? 'obra' : 'obras'}`,
    filter: 'Filtrar por categoria',
  },
  about: {
    meta: 'Sobre',
    disciplines: 'Livros ilustrados · Ilustração · Técnica mista',
    portrait: 'A Lara no ateliê',
    contactLabel: 'Contacto · livros, encomendas e olá',
    hello: 'Se tiveres interesse em trabalhar comigo, alguma questão ou simplesmente quiseres dizer olá, terei todo o gosto em conversar contigo.',
    copy: 'Copiar e-mail',
    copied: 'Copiado',
    selected: 'Selecionado',
    form: {
      name: 'Nome',
      email: 'Email *',
      message: 'Mensagem *',
      send: 'Enviar mensagem',
      sent: 'Obrigada! Vou responder-te em breve :)',
      error: (email: string) => `Não foi possível enviar a mensagem. Escreve para ${email}.`,
    },
  },
  project: { next: 'Seguinte', back: 'Todo o trabalho' },
  lightbox: { label: 'Obra ampliada', close: 'Fechar · Esc', prev: '← Anterior', next: 'Seguinte →', open: 'Abrir projeto →' },
  cursor: { drag: 'Arraste', view: 'Ver', open: 'Abrir' },
  foot: { rights: 'Todos os direitos reservados', top: 'Voltar ao topo ↑' },
  notFound: { title: 'Perdido', text: 'Esta página não existe.', back: 'Voltar ao início →' },
};

export const UI = { en, pt };
export const t = (lang: Lang) => UI[lang];

/** Prefix an internal path for the given language: ('/books', 'pt') -> '/pt/books'. */
export const href = (path: string, lang: Lang) =>
  lang === 'en' ? path : path === '/' ? '/pt' : `/pt${path}`;

/** Language of a URL path, and the same path without the language prefix. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const clean = pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  if (clean === '/pt' || clean.startsWith('/pt/')) return { lang: 'pt', path: clean.slice(3) || '/' };
  return { lang: 'en', path: clean };
}
