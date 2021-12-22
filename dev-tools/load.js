import {DevTools} from './dev-tools'

function loadDevTools(callback) {

    // the default is off in Cypress
    if (window?.Cypress && process.env.NODE_ENV === "production") return;
  
    // the default is on in development
    return go()
    
    function go() {
      // use a dynamic import so the dev-tools code isn't bundled with the regular
      // app code so we don't worry about bundle size.
      return <DevTools callback={callback}/>
    }
  }
  
  export {loadDevTools}
  
  /*
  eslint
    eqeqeq: "off",
  */
  