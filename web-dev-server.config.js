const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  open: true,
  nodeResolve: true,
  preserveSymlinks: true,
  rootDir: './',
  appIndex: './docs/index.html'
};
