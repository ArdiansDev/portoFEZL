
export const JsonParse = (key) => {
    let valueInLocalStorage = localStorage.getItem(key);

    try {
      return JSON.parse(valueInLocalStorage)
    } catch (error) {
      window.localStorage.removeItem(key)
    }
}