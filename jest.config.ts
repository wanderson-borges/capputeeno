import nextJest from "next/jest";

// Configuração personalizada do Next.js para Jest
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Caminho para o arquivo de configuração
  testEnvironment: "jest-environment-jsdom", // Ambiente do Jest para o navegador
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeamento de módulos
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Suporte para arquivos TypeScript
  },
};

export default createJestConfig(customJestConfig);
