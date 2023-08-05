export const getDataFromLocal = (key) => localStorage.getItem(key)

export const removeDataFromLoca = (key) => localStorage.removeItem(key)

export const setDataFromLocal = (key, data) => localStorage.setItem(key, data)

export const clearDataFromLocal = () => localStorage.clear()
