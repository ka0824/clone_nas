import url from "./apiDefault";

export const fetchShortcutList = async (id) => {
  const result = await url.get(`/shortcutList?id=${id}`);

  return result.data[0].list;
};

export const updateShortcutList = async () => {};
