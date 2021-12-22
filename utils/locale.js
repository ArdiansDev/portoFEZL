
export const locale = (key) => {
    let localeLocalStorage = localStorage.getItem("locale");
    let locale;
    try {
       locale = JSON.parse(localeLocalStorage)
    } catch (error) {
      window.localStorage.removeItem("locale")
    }

    if(key in locale){
      return locale[key]
    } else {
      return key
    }
}