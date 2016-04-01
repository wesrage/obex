module.exports = {
   ecmaFeatures: {
      modules: true,
   },
   env: {
      mocha: true,
      node: true,
   },
   extends: 'airbnb',
   parser: 'babel-eslint',
   plugins: [
      'babel',
   ],
   rules: {
      'comma-dangle': [1, 'always-multiline'],
      'indent': [2, 3],
      'guard-for-in': 0,
      'no-unused-expressions': 0,
      'no-use-before-define': 0,
   },
};
