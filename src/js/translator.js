import i18next from 'i18next';
import Backend from "i18next-http-backend"

let language 

if (localStorage.getItem('favoriteLanguage')) {
  language = localStorage.getItem('favoriteLanguage')
} else {
  language = 'es'
}

i18next.use(Backend).init({
  lng: language, // if you're using a language detector, do not define the lng option
  debug: true,
  backend:{
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  ns: ['translation'],
  defaultNS: 'translation',
  
  // va al Json por la traduccion
}).then(() => updatecontent())
// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
//aca las recorre
function updatecontent() {
  const htmlElements = document.querySelectorAll('[data-i18n]')

  htmlElements.forEach(element => {
    const value = element.getAttribute('data-i18n')
    element.innerHTML = i18next.t(value)
  })
  }

// cambia el idioma
window.changeLanguage = function(ing){
  i18next.changeLanguage(ing).then(() => updatecontent())
  
}
