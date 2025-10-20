export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "french", name: "French" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "german", name: "German" },
  { identifier: "italian", name: "Italian" },
  { identifier: "japanese", name: "Japanese" },
  { identifier: "korean", name: "Korean" },
  { identifier: "chinese", name: "Chinese" },
  { identifier: "arabic", name: "Arabic" },
];

const lang = {
  en: {
    search: "Search",
    gptSearchPlaceholder: "What would you like to watch today? What genre?",
    clear: "Clear",
    notification: "Searching for movie recommendations",
    listTitle: "Relevant Movies",
  },
  hindi: {
    search: "खोज",
    gptSearchPlaceholder: "आज आप क्या देखना चाहेंगे? कौन सा शैली?",
    clear: "साफ करें",
    notification: "फ़िल्म की सिफारिशें खोज रहे हैं",
    listTitle: "प्रासंगिक फ़िल्में",
  },
  french: {
    search: "Rechercher",
    gptSearchPlaceholder: "Que souhaitez-vous regarder aujourd'hui ? Quel genre ?",
    clear: "Effacer",
    notification: "Recherche de recommandations de films",
    listTitle: "Films pertinents",
  },
  spanish: {
    search: "Buscar",
    gptSearchPlaceholder: "¿Qué te gustaría ver hoy? ¿Qué género?",
    clear: "Borrar",
    notification: "Buscando recomendaciones de películas",
    listTitle: "Películas relevantes",
  },
  german: {
    search: "Suchen",
    gptSearchPlaceholder: "Was möchten Sie heute sehen? Welches Genre?",
    clear: "Löschen",
    notification: "Suche nach Filmempfehlungen",
    listTitle: "Relevante Filme",
  },
  italian: {
    search: "Cerca",
    gptSearchPlaceholder: "Cosa ti piacerebbe guardare oggi? Quale genere?",
    clear: "Cancella",
    notification: "Ricerca di consigli sui film",
    listTitle: "Film rilevanti",
  },
  japanese: {
    search: "検索",
    gptSearchPlaceholder: "今日は何を見たいですか？どんなジャンル？",
    clear: "クリア",
    notification: "映画のおすすめを検索しています",
    listTitle: "関連映画",
  },
  korean: {
    search: "검색",
    gptSearchPlaceholder: "오늘 무엇을 보고 싶으신가요? 어떤 장르?",
    clear: "지우기",
    notification: "영화 추천을 검색 중입니다",
    listTitle: "관련 영화",
  },
  chinese: {
    search: "搜索",
    gptSearchPlaceholder: "您今天想看什么？什么类型？",
    clear: "清除",
    notification: "正在搜索电影推荐",
    listTitle: "相关电影",
  },
  arabic: {
    search: "بحث",
    gptSearchPlaceholder: "ماذا تود أن تشاهد اليوم؟ ما النوع؟",
    clear: "مسح",
    notification: "جارٍ البحث عن توصيات للأفلام",
    listTitle: "أفلام ذات صلة",
  },
};

export default lang;
