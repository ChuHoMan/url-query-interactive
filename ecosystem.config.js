module.exports = {
  apps: [
    {
      name: 'Interactive Url Query',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
};
