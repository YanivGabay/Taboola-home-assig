module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Remove .js extensions for imports
        '^(\\.{1,2}/.*)\\.js$': '$1'
    }
};
  