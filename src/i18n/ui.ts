export const LANGS = ['en', 'pt', 'es', 'it'] as const;
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

const es: typeof en = {
  role: 'Ilustradora y autora',
  title: 'Lara Bordalo · Ilustradora y autora de libros infantiles',
  description:
    'Lara Bordalo es una ilustradora y autora de libros infantiles brasileña, afincada en Portugal, que trabaja con técnica mixta: recorte, pintura y digital.',
  nav: { home: 'Inicio', books: 'Libros', illustration: 'Ilustración', about: 'Sobre mí' },
  langName: 'Español',
  home: {
    tl: 'Ilustradora y autora',
    tr: 'Portafolio 2026',
    bl: 'Arrastra las imágenes · haz clic para ampliar',
    br: 'Portugal',
    hint: 'Toca una imagen para ampliarla',
    dymo: 'Recorte · Pintura · Historia',
    palette: 'Paleta · 2026',
    colors: ['Coral', 'Ocre', 'Rosa', 'Azul noche'],
  },
  books: {
    meta: 'Libros ilustrados y obra publicada',
    titles: (n: number) => `${n} títulos`,
    author: 'Texto',
    publisher: 'Editorial',
    medium: 'Técnica',
    format: 'Edición',
    view: 'Ver el libro',
    illustrated: 'Ilustraciones de Lara Bordalo',
  },
  illustration: {
    meta: 'Narrativas e ilustraciones sueltas',
    note: 'Tamaños relativos entre las obras',
    all: 'Todas',
    works: (n: number) => `${n} ${n === 1 ? 'obra' : 'obras'}`,
    filter: 'Filtrar por categoría',
  },
  about: {
    meta: 'Sobre mí',
    disciplines: 'Libros ilustrados · Ilustración · Técnica mixta',
    portrait: 'Lara en el estudio',
    contactLabel: 'Contacto · libros, encargos y hola',
    hello: 'Si quieres trabajar conmigo, tienes alguna pregunta o simplemente quieres saludar, estaré encantada de hablar contigo.',
    copy: 'Copiar e-mail',
    copied: 'Copiado',
    selected: 'Seleccionado',
    form: {
      name: 'Nombre',
      email: 'Email *',
      message: 'Mensaje *',
      send: 'Enviar mensaje',
      sent: '¡Gracias! Te responderé pronto :)',
      error: (email: string) => `No se pudo enviar el mensaje. Escríbeme a ${email}.`,
    },
  },
  project: { next: 'Siguiente', back: 'Todo el trabajo' },
  lightbox: { label: 'Obra ampliada', close: 'Cerrar · Esc', prev: '← Anterior', next: 'Siguiente →', open: 'Abrir proyecto →' },
  cursor: { drag: 'Arrastra', view: 'Ver', open: 'Abrir' },
  foot: { rights: 'Todos los derechos reservados', top: 'Volver arriba ↑' },
  notFound: { title: 'Perdido', text: 'Esta página no existe.', back: 'Volver al inicio →' },
};

const it: typeof en = {
  role: 'Illustratrice e autrice',
  title: 'Lara Bordalo · Illustratrice e autrice di albi illustrati',
  description:
    'Lara Bordalo è un’illustratrice e autrice di albi illustrati brasiliana che vive in Portogallo e lavora a tecnica mista: carta ritagliata, pittura e digitale.',
  nav: { home: 'Home', books: 'Libri', illustration: 'Illustrazione', about: 'Chi sono' },
  langName: 'Italiano',
  home: {
    tl: 'Illustratrice e autrice',
    tr: 'Portfolio 2026',
    bl: 'Trascina le immagini · clicca per ingrandire',
    br: 'Portogallo',
    hint: 'Tocca un’immagine per ingrandirla',
    dymo: 'Ritaglio · Pittura · Storia',
    palette: 'Palette · 2026',
    colors: ['Corallo', 'Ocra', 'Rosa', 'Blu notte'],
  },
  books: {
    meta: 'Albi illustrati e lavori pubblicati',
    titles: (n: number) => `${n} titoli`,
    author: 'Testo',
    publisher: 'Editore',
    medium: 'Tecnica',
    format: 'Edizione',
    view: 'Vedi il libro',
    illustrated: 'Illustrazioni di Lara Bordalo',
  },
  illustration: {
    meta: 'Narrazioni e illustrazioni singole',
    note: 'Dimensioni relative tra le opere',
    all: 'Tutte',
    works: (n: number) => `${n} ${n === 1 ? 'opera' : 'opere'}`,
    filter: 'Filtra per categoria',
  },
  about: {
    meta: 'Chi sono',
    disciplines: 'Albi illustrati · Illustrazione · Tecnica mista',
    portrait: 'Lara nello studio',
    contactLabel: 'Contatti · libri, commissioni e un saluto',
    hello: 'Se vuoi lavorare con me, hai domande o vuoi semplicemente salutarmi, sarò felice di parlare con te.',
    copy: 'Copia e-mail',
    copied: 'Copiato',
    selected: 'Selezionato',
    form: {
      name: 'Nome',
      email: 'Email *',
      message: 'Messaggio *',
      send: 'Invia messaggio',
      sent: 'Grazie! Ti risponderò presto :)',
      error: (email: string) => `Non è stato possibile inviare il messaggio. Scrivimi a ${email}.`,
    },
  },
  project: { next: 'Successivo', back: 'Tutti i lavori' },
  lightbox: { label: 'Opera ingrandita', close: 'Chiudi · Esc', prev: '← Precedente', next: 'Successiva →', open: 'Apri il progetto →' },
  cursor: { drag: 'Trascina', view: 'Vedi', open: 'Apri' },
  foot: { rights: 'Tutti i diritti riservati', top: 'Torna su ↑' },
  notFound: { title: 'Perso', text: 'Questa pagina non esiste.', back: 'Torna alla home →' },
};

export const UI = { en, pt, es, it };
export const t = (lang: Lang) => UI[lang];

/** Language codes for <html lang> and og:locale. */
export const LOCALES: Record<Lang, { html: string; og: string }> = {
  en: { html: 'en', og: 'en_US' },
  pt: { html: 'pt', og: 'pt_PT' },
  es: { html: 'es', og: 'es_ES' },
  it: { html: 'it', og: 'it_IT' },
};

/** Prefix an internal path for the given language: ('/books', 'pt') -> '/pt/books'. */
export const href = (path: string, lang: Lang) =>
  lang === 'en' ? path : path === '/' ? `/${lang}` : `/${lang}${path}`;

/** Language of a URL path, and the same path without the language prefix. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const clean = pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  for (const lang of LANGS) {
    if (lang !== 'en' && (clean === `/${lang}` || clean.startsWith(`/${lang}/`)))
      return { lang, path: clean.slice(lang.length + 1) || '/' };
  }
  return { lang: 'en', path: clean };
}
