module.exports = {
  extends: [
    '@chuhoman/eslint-config-vue',
  ],
  rules: {
    'no-console': 'off',
    // for script setup marco
    'no-undef': 'off',
    'no-unused-vars': 'off',

    'vue/multi-word-component-names': 'off',

    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/no-unused-vars': 'off'
  },
};
