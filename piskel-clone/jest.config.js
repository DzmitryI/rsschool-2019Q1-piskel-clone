module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
  ],
  moduleNameMapper: {
    '\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/src/utils/assetsTransformer.js',
  },
  transform: {
    '^.+\.js$': 'babel-jest',
    '^.+\.html?$': 'html-loader-jest',
  },
};
