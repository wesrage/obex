module.exports = {
   ecmaFeatures: {
      modules: true,
   },
   env: {
      jest: true,
      node: true,
   },
   extends: 'defaults',
   parser: 'babel-eslint',
   plugins: [
      'babel',
   ],
   rules: {
      'comma-dangle': [1, 'always-multiline'],
      'indent': [2, 3],
      'no-use-before-define': 0,
   },
};
