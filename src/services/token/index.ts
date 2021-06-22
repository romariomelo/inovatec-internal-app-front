const KEY_TOKEN = "_token";

export const setToken = (token: string): void => {
  localStorage.setItem(KEY_TOKEN, token);
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(KEY_TOKEN);
  return token;
};

export const removeToken = (): void => {
  return localStorage.removeItem(KEY_TOKEN);
};

export const hasToken = (): boolean => {
  return localStorage.getItem(KEY_TOKEN) === null ? false : true;
}
