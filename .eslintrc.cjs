module.exports = {
  extends: [
    '@chuhoman/eslint-config-vue',
  ],
  rules: {
    'no-console': 'off',
    // for script setup marco
    'no-undef': 'off',
    'no-unused-vars': 'off',

    'curly': ['error', 'all'],

    'vue/multi-word-component-names': 'off',
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],

    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/member-ordering': 'off',
  },
};
