module.exports = {
    preset: 'ts-jest',  
    testEnvironment: 'jest-environment-jsdom',  
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss)$': 'identity-obj-proxy', // Use identity-obj-proxy for CSS modules
      },
      transform: {
        '^.+\\.tsx?$': 'ts-jest', // For TypeScript
        '^.+\\.jsx?$': 'babel-jest', // For JavaScript
      },
      transformIgnorePatterns: [
        '/node_modules/(?!your-package-name)', // Adjust if needed
      ],
  };
  