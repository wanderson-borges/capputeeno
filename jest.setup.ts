import "@testing-library/jest-dom";

// Mock do localStorage
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
  key(index) {
    return Object.keys(this.store)[index] || null; // Retorna a chave no índice fornecido
  },
  get length() {
    return Object.keys(this.store).length; // Retorna o número de itens no store
  }
};
