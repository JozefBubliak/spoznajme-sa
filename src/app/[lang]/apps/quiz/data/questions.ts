export interface QuizQuestion {
  id: number
  question: string
  answers: string[]
  correctAnswer: number
  explanation?: string
}

const englishQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which streaming platform is known for the series 'Stranger Things'?",
    answers: ["Netflix", "Hulu", "Amazon Prime", "Disney+"],
    correctAnswer: 0,
    explanation: "Stranger Things is a Netflix original series that premiered in 2016.",
  },
  {
    id: 2,
    question: "What does 'LOL' commonly stand for in internet slang?",
    answers: ["Lots of Love", "Laugh Out Loud", "Lord of Light", "Level of Learning"],
    correctAnswer: 1,
    explanation: "LOL is widely used internet slang meaning 'Laugh Out Loud'.",
  },
  {
    id: 3,
    question: "Which social media platform is known for its 280-character limit?",
    answers: ["Facebook", "Instagram", "Twitter/X", "TikTok"],
    correctAnswer: 2,
    explanation: "Twitter (now X) is famous for its character limit on posts.",
  },
  {
    id: 4,
    question: "What is the most popular sport in the United States?",
    answers: ["Basketball", "Baseball", "American Football", "Soccer"],
    correctAnswer: 2,
    explanation: "American Football, particularly the NFL, is the most popular sport in the US.",
  },
  {
    id: 5,
    question: "Which company created the iPhone?",
    answers: ["Samsung", "Google", "Apple", "Microsoft"],
    correctAnswer: 2,
    explanation: "Apple Inc. created and manufactures the iPhone.",
  },
]

const spanishQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es el baile tradicional más famoso de Argentina?",
    answers: ["Salsa", "Tango", "Flamenco", "Bachata"],
    correctAnswer: 1,
    explanation: "El tango es el baile tradicional más emblemático de Argentina.",
  },
  {
    id: 2,
    question: "¿Qué país latinoamericano es famoso por el Día de los Muertos?",
    answers: ["Colombia", "México", "Perú", "Chile"],
    correctAnswer: 1,
    explanation: "México es mundialmente conocido por su celebración del Día de los Muertos.",
  },
  {
    id: 3,
    question: "¿Cuál es la moneda oficial de España?",
    answers: ["Peseta", "Euro", "Dólar", "Peso"],
    correctAnswer: 1,
    explanation: "España adoptó el Euro como moneda oficial en 2002.",
  },
  {
    id: 4,
    question: "¿Qué escritor español escribió 'Don Quijote de la Mancha'?",
    answers: ["García Lorca", "Miguel de Cervantes", "Lope de Vega", "Calderón de la Barca"],
    correctAnswer: 1,
    explanation: "Miguel de Cervantes escribió esta obra maestra de la literatura española.",
  },
  {
    id: 5,
    question: "¿Cuál es el plato típico español hecho con arroz?",
    answers: ["Gazpacho", "Tortilla", "Paella", "Jamón"],
    correctAnswer: 2,
    explanation: "La paella es el plato de arroz más famoso de España, originario de Valencia.",
  },
]

const germanQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Welches Fest wird in München jährlich gefeiert?",
    answers: ["Karneval", "Oktoberfest", "Weihnachtsmarkt", "Osterfest"],
    correctAnswer: 1,
    explanation: "Das Oktoberfest ist das weltberühmte Bierfest in München.",
  },
  {
    id: 2,
    question: "Wie heißt die deutsche Autobahn ohne Geschwindigkeitsbegrenzung?",
    answers: ["Bundesstraße", "Landstraße", "Autobahn", "Schnellstraße"],
    correctAnswer: 2,
    explanation: "Die deutsche Autobahn ist berühmt für Abschnitte ohne Geschwindigkeitsbegrenzung.",
  },
  {
    id: 3,
    question: "Welcher deutsche Komponist schrieb die 9. Symphonie?",
    answers: ["Mozart", "Bach", "Beethoven", "Wagner"],
    correctAnswer: 2,
    explanation: "Ludwig van Beethoven komponierte die berühmte 9. Symphonie mit der 'Ode an die Freude'.",
  },
  {
    id: 4,
    question: "Was ist ein typisches deutsches Frühstück?",
    answers: ["Croissant", "Brot mit Wurst und Käse", "Pancakes", "Reis"],
    correctAnswer: 1,
    explanation: "Ein typisches deutsches Frühstück besteht aus Brot mit Wurst, Käse und anderen Aufschnitten.",
  },
  {
    id: 5,
    question: "Welche Stadt war vor Berlin die Hauptstadt von Westdeutschland?",
    answers: ["Hamburg", "München", "Bonn", "Köln"],
    correctAnswer: 2,
    explanation: "Bonn war von 1949 bis 1990 die Hauptstadt der Bundesrepublik Deutschland.",
  },
]

const frenchQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel est le fromage français le plus célèbre?",
    answers: ["Roquefort", "Camembert", "Brie", "Tous sont célèbres"],
    correctAnswer: 3,
    explanation: "La France est célèbre pour ses nombreux fromages, chacun ayant sa propre renommée.",
  },
  {
    id: 2,
    question: "Combien de régions compte la France métropolitaine?",
    answers: ["12", "13", "14", "15"],
    correctAnswer: 1,
    explanation: "La France métropolitaine compte 13 régions depuis la réforme territoriale de 2016.",
  },
  {
    id: 3,
    question: "Quel monument parisien est surnommé la 'Dame de Fer'?",
    answers: ["Arc de Triomphe", "Notre-Dame", "Tour Eiffel", "Sacré-Cœur"],
    correctAnswer: 2,
    explanation: "La Tour Eiffel est surnommée la 'Dame de Fer' en raison de sa structure métallique.",
  },
  {
    id: 4,
    question: "Quelle est la devise de la France?",
    answers: ["Liberté, Égalité, Fraternité", "Honneur et Patrie", "Dieu et mon Droit", "Un pour tous"],
    correctAnswer: 0,
    explanation: "'Liberté, Égalité, Fraternité' est la devise officielle de la République française.",
  },
  {
    id: 5,
    question: "Quel vin français est produit dans la région de Bordeaux?",
    answers: ["Champagne", "Bourgogne", "Bordeaux", "Beaujolais"],
    correctAnswer: 2,
    explanation: "Les vins de Bordeaux sont produits dans la région viticole de Bordeaux.",
  },
]

const italianQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quale città italiana è famosa per i suoi canali?",
    answers: ["Roma", "Milano", "Venezia", "Napoli"],
    correctAnswer: 2,
    explanation: "Venezia è famosa in tutto il mondo per i suoi canali e gondole.",
  },
  {
    id: 2,
    question: "Qual è l'ingrediente principale della pizza Margherita?",
    answers: ["Prosciutto", "Mozzarella", "Salame", "Funghi"],
    correctAnswer: 1,
    explanation: "La pizza Margherita è fatta con pomodoro, mozzarella e basilico.",
  },
  {
    id: 3,
    question: "Chi ha dipinto la Cappella Sistina?",
    answers: ["Leonardo da Vinci", "Raffaello", "Michelangelo", "Donatello"],
    correctAnswer: 2,
    explanation: "Michelangelo Buonarroti dipinse il famoso soffitto della Cappella Sistina.",
  },
  {
    id: 4,
    question: "Quale forma di pasta è tipica di Bologna?",
    answers: ["Spaghetti", "Penne", "Tagliatelle", "Fusilli"],
    correctAnswer: 2,
    explanation: "Le tagliatelle sono la pasta tradizionale di Bologna, spesso servite con ragù.",
  },
  {
    id: 5,
    question: "In quale città si trova il Colosseo?",
    answers: ["Milano", "Roma", "Firenze", "Venezia"],
    correctAnswer: 1,
    explanation: "Il Colosseo si trova a Roma ed è uno dei simboli più famosi d'Italia.",
  },
]

const portugueseQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a dança mais famosa do Brasil?",
    answers: ["Forró", "Samba", "Bossa Nova", "Capoeira"],
    correctAnswer: 1,
    explanation: "O samba é considerado a dança mais emblemática do Brasil.",
  },
  {
    id: 2,
    question: "Em que cidade fica o Cristo Redentor?",
    answers: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correctAnswer: 1,
    explanation: "O Cristo Redentor está localizado no Rio de Janeiro, no Corcovado.",
  },
  {
    id: 3,
    question: "Qual é o maior rio do Brasil?",
    answers: ["Rio São Francisco", "Rio Paraná", "Rio Amazonas", "Rio Tocantins"],
    correctAnswer: 2,
    explanation: "O Rio Amazonas é o maior rio do Brasil e do mundo em volume de água.",
  },
  {
    id: 4,
    question: "Qual é o prato típico brasileiro feito com feijão?",
    answers: ["Feijoada", "Moqueca", "Acarajé", "Brigadeiro"],
    correctAnswer: 0,
    explanation: "A feijoada é considerada o prato nacional do Brasil, feita com feijão preto e carnes.",
  },
  {
    id: 5,
    question: "Quando acontece o Carnaval no Brasil?",
    answers: ["Janeiro", "Fevereiro/Março", "Junho", "Dezembro"],
    correctAnswer: 1,
    explanation: "O Carnaval brasileiro acontece tradicionalmente entre fevereiro e março.",
  },
]

const chineseQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "中国的首都是哪里？",
    answers: ["上海", "北京", "广州", "深圳"],
    correctAnswer: 1,
    explanation: "北京是中华人民共和国的首都。",
  },
  {
    id: 2,
    question: "中国最长的河流是什么？",
    answers: ["黄河", "长江", "珠江", "淮河"],
    correctAnswer: 1,
    explanation: "长江是中国最长的河流，也是世界第三长河。",
  },
  {
    id: 3,
    question: "中国传统节日春节通常在什么时候？",
    answers: ["1月", "2月", "农历正月", "12月"],
    correctAnswer: 2,
    explanation: "春节是农历正月初一，通常在1月底或2月。",
  },
  {
    id: 4,
    question: "中国古代四大发明不包括什么？",
    answers: ["造纸术", "指南针", "火药", "电灯"],
    correctAnswer: 3,
    explanation: "中国古代四大发明是造纸术、指南针、火药和印刷术。",
  },
  {
    id: 5,
    question: "中国最著名的古建筑是什么？",
    answers: ["故宫", "长城", "天坛", "颐和园"],
    correctAnswer: 1,
    explanation: "万里长城是中国最著名的古建筑，被誉为世界奇迹。",
  },
]

const japaneseQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "日本の首都はどこですか？",
    answers: ["大阪", "京都", "東京", "名古屋"],
    correctAnswer: 2,
    explanation: "東京は日本の首都です。",
  },
  {
    id: 2,
    question: "日本の伝統的な着物の帯を何と言いますか？",
    answers: ["おび", "きもの", "ゆかた", "はかま"],
    correctAnswer: 0,
    explanation: "着物の腰に巻く布を「帯（おび）」と言います。",
  },
  {
    id: 3,
    question: "日本で最も有名なアニメキャラクターの一つは？",
    answers: ["ピカチュウ", "ドラえもん", "ナルト", "すべて有名"],
    correctAnswer: 3,
    explanation: "日本には多くの世界的に有名なアニメキャラクターがいます。",
  },
  {
    id: 4,
    question: "日本の伝統的な武道で、竹刀を使うものは？",
    answers: ["柔道", "剣道", "空手", "合気道"],
    correctAnswer: 1,
    explanation: "剣道は竹刀を使う日本の伝統的な武道です。",
  },
  {
    id: 5,
    question: "日本の桜の季節はいつですか？",
    answers: ["冬", "春", "夏", "秋"],
    correctAnswer: 1,
    explanation: "日本の桜は春（3月〜5月）に咲きます。",
  },
]

const koreanQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "한국의 수도는 어디인가요？",
    answers: ["부산", "서울", "대구", "인천"],
    correctAnswer: 1,
    explanation: "서울은 대한민국의 수도입니다.",
  },
  {
    id: 2,
    question: "한국의 전통 음식 중 발효된 채소 요리는？",
    answers: ["불고기", "김치", "비빔밥", "냉면"],
    correctAnswer: 1,
    explanation: "김치는 한국의 대표적인 발효 채소 요리입니다.",
  },
  {
    id: 3,
    question: "K-pop에서 'BTS'는 무엇의 줄임말인가요？",
    answers: ["Bangtan Sonyeondan", "Big Time Stars", "Best Team Seoul", "Bright Top Stars"],
    correctAnswer: 0,
    explanation: "BTS는 '방탄소년단(Bangtan Sonyeondan)'의 줄임말입니다.",
  },
  {
    id: 4,
    question: "한국의 전통 의상은 무엇인가요？",
    answers: ["기모노", "한복", "치파오", "사리"],
    correctAnswer: 1,
    explanation: "한복은 한국의 전통 의상입니다.",
  },
  {
    id: 5,
    question: "한국어 문자 체계의 이름은？",
    answers: ["한자", "한글", "가나", "로마자"],
    correctAnswer: 1,
    explanation: "한글은 한국어의 고유 문자 체계입니다.",
  },
]

const hindiQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "भारत की राजधानी कहाँ है？",
    answers: ["मुंबई", "नई दिल्ली", "कोलकाता", "चेन्नई"],
    correctAnswer: 1,
    explanation: "नई दिल्ली भारत की राजधानी है।",
  },
  {
    id: 2,
    question: "बॉलीवुड फिल्म इंडस्ट्री कहाँ स्थित है？",
    answers: ["दिल्ली", "मुंबई", "बैंगलोर", "हैदराबाद"],
    correctAnswer: 1,
    explanation: "बॉलीवुड मुंबई में स्थित है।",
  },
  {
    id: 3,
    question: "भारत का राष्ट्रीय खेल क्या है？",
    answers: ["क्रिकेट", "हॉकी", "कबड्डी", "बैडमिंटन"],
    correctAnswer: 1,
    explanation: "हॉकी भारत का राष्ट्रीय खेल है।",
  },
  {
    id: 4,
    question: "ताज महल कहाँ स्थित है？",
    answers: ["दिल्ली", "जयपुर", "आगरा", "लखनऊ"],
    correctAnswer: 2,
    explanation: "ताज महल आगरा, उत्तर प्रदेश में स्थित है।",
  },
  {
    id: 5,
    question: "भारत में कितनी आधिकारिक भाषाएं हैं？",
    answers: ["18", "20", "22", "24"],
    correctAnswer: 2,
    explanation: "भारत में 22 आधिकारिक भाषाएं हैं।",
  },
]

const slovakQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Aké je hlavné mesto Slovenska?",
    answers: ["Košice", "Bratislava", "Prešov", "Žilina"],
    correctAnswer: 1,
    explanation: "Bratislava je hlavné mesto Slovenskej republiky.",
  },
  {
    id: 2,
    question: "Ktorá rieka preteká Bratislavou?",
    answers: ["Váh", "Dunaj", "Hron", "Nitra"],
    correctAnswer: 1,
    explanation: "Dunaj je rieka, ktorá preteká Bratislavou.",
  },
  {
    id: 3,
    question: "Aký je najvyšší vrch Slovenska?",
    answers: ["Kriváň", "Gerlachovský štít", "Rysy", "Lomnický štít"],
    correctAnswer: 1,
    explanation: "Gerlachovský štít je najvyšší vrch Slovenska s výškou 2655 m.",
  },
  {
    id: 4,
    question: "Ktoré je tradičné slovenské jedlo?",
    answers: ["Guláš", "Bryndzové halušky", "Schnitzel", "Pizza"],
    correctAnswer: 1,
    explanation: "Bryndzové halušky sú považované za slovenské národné jedlo.",
  },
  {
    id: 5,
    question: "Kedy sa Slovensko stalo nezávislým štátom?",
    answers: ["1989", "1990", "1993", "1995"],
    correctAnswer: 2,
    explanation: "Slovensko sa stalo nezávislým štátom 1. januára 1993.",
  },
]

export const QUESTIONS_BY_LANGUAGE: Record<string, QuizQuestion[]> = {
  en: englishQuestions,
  es: spanishQuestions,
  de: germanQuestions,
  fr: frenchQuestions,
  it: italianQuestions,
  'pt-br': portugueseQuestions,
  zh: chineseQuestions,
  ja: japaneseQuestions,
  ko: koreanQuestions,
  hi: hindiQuestions,
  sk: slovakQuestions,
}

export function getQuestions(languageCode: string): QuizQuestion[] {
  return QUESTIONS_BY_LANGUAGE[languageCode] || englishQuestions
}
