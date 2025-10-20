export const SUPPORTED_LANGUAGES = [
    {
        identifier : "en" ,
        name : "English"
    } ,

    {
        identifier : "hindi" ,
        name: "Hindi"
    },

    {
        identifier : "french" ,
        name: "French" ,
    },
    {
        identifier : "spanish" ,
        name: "Spanish" ,
    }
]

const lang = {
  en: {
    search: "Search",
    gptSearchPlaceholder: "What would you like to watch today? What genre?",
    clear: "Clear",
  },
  hindi: {
    search: "खोज",
    gptSearchPlaceholder: "आज आप क्या देखना चाहेंगे? कौन सा शैली?",
    clear: "साफ करें",
  },
  spanish: {
    search: "buscar",
    gptSearchPlaceholder: "¿Qué te gustaría ver hoy? ¿Qué género?",
    clear: "Borrar",
  },
  french: {
    search: "Rechercher",
    gptSearchPlaceholder: "Que souhaitez-vous regarder aujourd'hui ? Quel genre ?",
    clear: "Effacer",
  },
};

export default lang;