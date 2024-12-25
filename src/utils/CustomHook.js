const useLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { useLocalStorage };
