const {defaults} = require('jest-config');
module.exports = {
    testRegex: './src/.*\\.spec\\.(ts|tsx?)$',
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    collectCoverageFrom: [
        'src/**/*.(ts,tsx)',
    ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions, 'ts', 'tsx',
    ],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^/(.*)$': '<rootDir>/src/$1'
    },
};
