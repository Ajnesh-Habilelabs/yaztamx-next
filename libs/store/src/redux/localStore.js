export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

export function clearStorage() {
  localStorage.clear();
}
