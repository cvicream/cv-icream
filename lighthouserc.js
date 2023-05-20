module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recommended',
    },
    assertions: {
      'color-contrast': 'off',
      'csp-xss': 'off',
      'font-display': 'off',
      'meta-viewport': 'off',
      'service-worker': 'off',
      'unused-css-rules': 'off',
      'unused-javascript': 'off',
    },
  },
};
