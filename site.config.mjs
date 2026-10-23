// Kilotoken site configuration. No secrets here.
const envUrl = process.env.SITE_URL;
export const SITE_URL = (envUrl || 'https://kilotoken.example').replace(/\/$/, '');
export const BASE_PATH = process.env.BASE_PATH || '/';

const site = {
  id: 'kilotoken',
  name: 'Kilotoken',
  tagline: 'AI models, tokens, and developer tooling — explained for builders.',
  description: 'Kilotoken covers open-weight models, token economics, security research, and agent workflows for developers and AI practitioners. Published by the OnlyOrders team.',
  siteUrl: SITE_URL,
  basePath: BASE_PATH,
  locale: 'en',
  publisher: { name: 'OnlyOrders', url: 'https://onlyorders.tech/' },
  theme: {
    accent: '#7c3aed',
    accent2: '#06b6d4',
    bg: '#0b0b12',
    fg: '#e9e9f1',
    muted: '#9a9ab0',
    card: '#151522',
  },
  categories: {
    'open-models': 'Open Models',
    'developer-tooling': 'Developer Tooling',
    'ai-security': 'AI Security',
    'agents': 'Agents',
    'ai-for-business': 'AI for Business',
    'ai-news': 'AI News',
  },
};

export default site;
