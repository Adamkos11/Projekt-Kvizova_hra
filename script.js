    const DEFAULT_SETTINGS = {
      language: "cs",
      theme: "dark",
      accent: "violet",
      questionCount: 10,
      questionTime: 15,
      sound: false
    };
    const SETTINGS_KEY = "quiz-app-settings";
    let settings = { ...DEFAULT_SETTINGS };
    try {
      const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      settings = {
        language: ["cs", "en"].includes(savedSettings.language) ? savedSettings.language : DEFAULT_SETTINGS.language,
        theme: ["dark", "light"].includes(savedSettings.theme) ? savedSettings.theme : DEFAULT_SETTINGS.theme,
        accent: ["violet", "blue", "green", "pink", "orange"].includes(savedSettings.accent) ? savedSettings.accent : DEFAULT_SETTINGS.accent,
        questionCount: [5, 10, 15].includes(savedSettings.questionCount) ? savedSettings.questionCount : DEFAULT_SETTINGS.questionCount,
        questionTime: [10, 15, 20].includes(savedSettings.questionTime) ? savedSettings.questionTime : DEFAULT_SETTINGS.questionTime,
        sound: typeof savedSettings.sound === "boolean" ? savedSettings.sound : DEFAULT_SETTINGS.sound
      };
    } catch (error) {
      console.warn("Nastavení se nepodařilo načíst z úložiště prohlížeče.", error);
    }

    const translations = {
      cs: {
        brand: "Kvízová hra", topNote: "MALÁ VÝZVA PRO TVOU HLAVU", settingsButton: "Nastavení", settingsTitle: "Nastavení",
        introEyebrow: "Jsi připraven/a?", introTitle: "Kolik toho víš?", introSubtitle: "Otestuj své znalosti v rychlém kvízu. Vyber si obtížnost a ukaž, co v tobě je.",
        difficultyLabel: "Vyber si obtížnost", difficultyGroup: "Obtížnost kvízu", easy: "Lehká", easyDetail: "Na rozehřátí",
        medium: "Střední", mediumDetail: "Tak akorát", hard: "Těžká", hardDetail: "Pro znalce", quizFacts: "Informace o kvízu",
        perQuestion: "na otázku", questions: "otázek", start: "Jdeme na to", randomHint: "Otázky se losují náhodně a v této relaci se neopakují, dokud není sada vyčerpaná.",
        questionLabel: "OTÁZKA", remainingTime: "Zbývající čas", quizProgress: "Postup kvízem", seconds: "s", quit: "Vzdát kvíz",
        quizCompleted: "Kvíz dokončen", points: "BODŮ", correct: "SPRÁVNĚ", accuracy: "ÚSPĚŠNOST",
        playAgain: "Zahrát znovu", changeDifficulty: "Změnit obtížnost", backHome: "Zpět na úvod", footer: "Každá otázka je nová šance zazářit ✨",
        preferences: "PŘIZPŮSOBENÍ", closeSettings: "Zavřít nastavení", language: "Jazyk rozhraní",
        languageHelp: "Otázky jsou zatím pouze v češtině.", theme: "Motiv", themeHelp: "Vyber si vzhled aplikace.",
        dark: "Tmavý", light: "Světlý", accentColor: "Barva motivu", violet: "Fialová", blue: "Modrá", green: "Zelená",
        pink: "Růžová", orange: "Oranžová", questionCount: "Počet otázek", questionCountHelp: "Délka jednoho kola.",
        timeLimit: "Čas na otázku", timeLimitHelp: "Kolik času máš na odpověď.", soundEffects: "Zvukové efekty",
        soundHelp: "Krátký zvuk po odpovědi.", resetSettings: "Obnovit výchozí", done: "Hotovo",
        nextQuestion: "Další otázka", showResult: "Zobrazit výsledek", abandoned: "Kvíz ukončen",
        quitBeforeAnswer: "Kvíz jsi ukončil/a před první odpovědí. Zkus to znovu, až budeš připraven/a.",
        abandonedResult: (level, count) => `Ukončil/a jsi kvíz na obtížnost „${level}“. Výsledek zahrnuje jen ${count} zodpovězených otázek.`,
        completedResult: (level, praise) => `Dokončil/a jsi kvíz na obtížnost „${level}“. ${praise}`,
        flawless: "Bez jediné chyby!", great: "Skvělá práce!", good: "Dobrá práce!", keepGoing: "Jen tak dál!",
        praise: "Tvoje znalosti jsou opravdu skvělé.", encouragement: "Každý pokus tě posune o kousek dál.",
        correctFast: (points) => `Správně a rychle! Získáváš ${points} bodů včetně bonusu.`,
        correctAnswer: (points) => `Správně! Získáváš ${points} bodů.`,
        timeout: (answer) => `Čas vypršel. Správná odpověď: ${answer}.`,
        wrongAnswer: (answer) => `To není ono. Správná odpověď: ${answer}.`,
        scoreHint: (seconds) => `Za správnou odpověď získáš 100 bodů a dalších 100 bodů za odpověď do ${seconds} sekund.`,
        resultIcon: "Kvíz dokončen"
      },
      en: {
        brand: "Quiz game", topNote: "A LITTLE CHALLENGE FOR YOUR MIND", settingsButton: "Settings", settingsTitle: "Settings",
        introEyebrow: "Are you ready?", introTitle: "How much do you know?", introSubtitle: "Test your knowledge in a quick quiz. Pick a difficulty and show us what you know.",
        difficultyLabel: "Choose your difficulty", difficultyGroup: "Quiz difficulty", easy: "Easy", easyDetail: "A warm-up",
        medium: "Medium", mediumDetail: "Just right", hard: "Hard", hardDetail: "For the experts", quizFacts: "Quiz information",
        perQuestion: "per question", questions: "questions", start: "Let's go", randomHint: "Questions are random and won't repeat in this session until the pool is used up.",
        questionLabel: "QUESTION", remainingTime: "Time remaining", quizProgress: "Quiz progress", seconds: "sec", quit: "Quit quiz",
        quizCompleted: "Quiz completed", points: "POINTS", correct: "CORRECT", accuracy: "ACCURACY",
        playAgain: "Play again", changeDifficulty: "Change difficulty", backHome: "Back to start", footer: "Every question is a new chance to shine ✨",
        preferences: "PERSONALIZE", closeSettings: "Close settings", language: "Interface language",
        languageHelp: "Quiz questions are currently available in Czech only.", theme: "Theme", themeHelp: "Choose how the app looks.",
        dark: "Dark", light: "Light", accentColor: "Accent color", violet: "Violet", blue: "Blue", green: "Green",
        pink: "Pink", orange: "Orange", questionCount: "Number of questions", questionCountHelp: "Choose the length of a round.",
        timeLimit: "Time per question", timeLimitHelp: "How long you have to answer.", soundEffects: "Sound effects",
        soundHelp: "A short sound after each answer.", resetSettings: "Reset defaults", done: "Done",
        nextQuestion: "Next question", showResult: "Show result", abandoned: "Quiz ended",
        quitBeforeAnswer: "You ended the quiz before answering the first question. Come back when you're ready.",
        abandonedResult: (level, count) => `You ended the ${level.toLowerCase()} quiz. Your result includes only the ${count} questions you answered.`,
        completedResult: (level, praise) => `You completed the ${level.toLowerCase()} quiz. ${praise}`,
        flawless: "A perfect score!", great: "Great job!", good: "Well done!", keepGoing: "Keep it up!",
        praise: "Your knowledge is impressive.", encouragement: "Every try helps you improve.",
        correctFast: (points) => `Correct and fast! You earned ${points} points, including the speed bonus.`,
        correctAnswer: (points) => `Correct! You earned ${points} points.`,
        timeout: (answer) => `Time's up. The correct answer was: ${answer}.`,
        wrongAnswer: (answer) => `Not quite. The correct answer was: ${answer}.`,
        scoreHint: (seconds) => `Earn 100 points for a correct answer, plus 100 bonus points for answering within ${seconds} seconds.`,
        resultIcon: "Quiz completed"
      }
    };

    const questionBank = {
      easy: [
        { category: "Věda", question: "Která planeta je nejblíže Slunci?", answers: ["Venuše", "Merkur", "Mars", "Země"], correct: 1 },
        { category: "Příroda", question: "Které zvíře je největší na světě?", answers: ["Slon africký", "Žralok bílý", "Plejtvák obrovský", "Žirafa"], correct: 2 },
        { category: "Zeměpis", question: "Jaké je hlavní město Francie?", answers: ["Lyon", "Paříž", "Marseille", "Nice"], correct: 1 },
        { category: "Lidské tělo", question: "Kolik nohou má pavouk?", answers: ["Šest", "Osm", "Deset", "Čtyři"], correct: 1 },
        { category: "Vesmír", question: "Jak se jmenuje přirozená družice Země?", answers: ["Měsíc", "Phobos", "Titan", "Europa"], correct: 0 },
        { category: "Zeměpis", question: "Na kterém kontinentu leží Egypt?", answers: ["Asie", "Evropa", "Afrika", "Jižní Amerika"], correct: 2 },
        { category: "Příroda", question: "Která barva vznikne smícháním modré a žluté?", answers: ["Fialová", "Oranžová", "Zelená", "Růžová"], correct: 2 },
        { category: "Sport", question: "Kolik hráčů má jeden fotbalový tým na hřišti?", answers: ["9", "10", "11", "12"], correct: 2 },
        { category: "Jídlo", question: "Z čeho se vyrábí guacamole?", answers: ["Z avokáda", "Z okurky", "Z hrášku", "Z oliv"], correct: 0 },
        { category: "Věda", question: "V jakém skupenství je voda při běžné pokojové teplotě?", answers: ["Pevném", "Kapalném", "Plynném", "Plazmatickém"], correct: 1 },
        { category: "Kultura", question: "Kdo napsal pohádku Malá mořská víla?", answers: ["Karel Čapek", "Hans Christian Andersen", "Božena Němcová", "Astrid Lindgren"], correct: 1 },
        { category: "Zeměpis", question: "Jak se jmenuje nejvyšší hora České republiky?", answers: ["Praděd", "Sněžka", "Lysá hora", "Klínovec"], correct: 1 },
        { category: "Věda", question: "Který plyn rostliny přijímají ze vzduchu při fotosyntéze?", answers: ["Kyslík", "Oxid uhličitý", "Vodík", "Helium"], correct: 1 },
        { category: "Zeměpis", question: "Jaké je hlavní město Itálie?", answers: ["Milán", "Benátky", "Řím", "Neapol"], correct: 2 },
        { category: "Každodenní život", question: "Kolik minut má jedna hodina?", answers: ["30", "45", "60", "100"], correct: 2 },
        { category: "Příroda", question: "Jaké je největší suchozemské zvíře?", answers: ["Nosorožec", "Slon africký", "Hroch", "Žirafa"], correct: 1 },
        { category: "Lidské tělo", question: "Který orgán pumpuje krev do těla?", answers: ["Plíce", "Játra", "Srdce", "Ledviny"], correct: 2 },
        { category: "Zeměpis", question: "Který oceán je největší?", answers: ["Atlantský", "Indický", "Tichý", "Severní ledový"], correct: 2 },
        { category: "Zeměpis", question: "Jaké je hlavní město Japonska?", answers: ["Kjóto", "Osaka", "Tokio", "Hirošima"], correct: 2 },
        { category: "Každodenní život", question: "Kolik dní má běžný týden?", answers: ["Pět", "Šest", "Sedm", "Osm"], correct: 2 },
        { category: "Jídlo", question: "Z čeho se vyrábí čokoláda?", answers: ["Z kávových zrn", "Z kakaových bobů", "Z lískových oříšků", "Z vanilkových lusků"], correct: 1 },
        { category: "Vesmír", question: "Jak se jmenuje hvězda nejbližší Zemi?", answers: ["Sirius", "Polárka", "Slunce", "Proxima Centauri"], correct: 2 },
        { category: "Příroda", question: "Jak se nazývá mládě žáby?", answers: ["Pulec", "Larva", "Nymfa", "Kukla"], correct: 0 }
      ],
      medium: [
        { category: "Věda", question: "Který chemický prvek má značku Fe?", answers: ["Fluor", "Fosfor", "Železo", "Francium"], correct: 2 },
        { category: "Zeměpis", question: "Která řeka protéká městem Budapešť?", answers: ["Dunaj", "Tisa", "Labe", "Rýn"], correct: 0 },
        { category: "Historie", question: "Ve kterém roce přistáli lidé poprvé na Měsíci?", answers: ["1965", "1969", "1972", "1975"], correct: 1 },
        { category: "Věda", question: "Jaká je přibližná rychlost světla ve vakuu?", answers: ["30 000 km/s", "150 000 km/s", "300 000 km/s", "1 000 000 km/s"], correct: 2 },
        { category: "Kultura", question: "Kdo namaloval obraz Hvězdná noc?", answers: ["Claude Monet", "Pablo Picasso", "Vincent van Gogh", "Salvador Dalí"], correct: 2 },
        { category: "Zeměpis", question: "Který stát má největší rozlohu na světě?", answers: ["Kanada", "Čína", "Spojené státy", "Rusko"], correct: 3 },
        { category: "Literatura", question: "Kdo je autorem románu 1984?", answers: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "J. R. R. Tolkien"], correct: 1 },
        { category: "Věda", question: "Kolik kostí má přibližně dospělý člověk?", answers: ["106", "206", "306", "406"], correct: 1 },
        { category: "Zeměpis", question: "Jaké je hlavní město Austrálie?", answers: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
        { category: "Vesmír", question: "Která planeta Sluneční soustavy je největší?", answers: ["Saturn", "Neptun", "Země", "Jupiter"], correct: 3 },
        { category: "Historie", question: "Která civilizace postavila Machu Picchu?", answers: ["Mayové", "Inkové", "Aztékové", "Olmékové"], correct: 1 },
        { category: "Věda", question: "Jaké pH má čistá voda při pokojové teplotě?", answers: ["Přibližně 3", "Přibližně 5", "Přibližně 7", "Přibližně 10"], correct: 2 },
        { category: "Zeměpis", question: "Který ostrov je největší na světě, pokud nepočítáme kontinenty?", answers: ["Madagaskar", "Grónsko", "Borneo", "Nová Guinea"], correct: 1 },
        { category: "Věda", question: "Ve kterých buněčných organelách probíhá fotosyntéza?", answers: ["V mitochondriích", "V chloroplastech", "V ribozomech", "V lysozomech"], correct: 1 },
        { category: "Literatura", question: "Kdo napsal tragédii Hamlet?", answers: ["William Shakespeare", "Charles Dickens", "Oscar Wilde", "Geoffrey Chaucer"], correct: 0 },
        { category: "Zeměpis", question: "Jaká je měna Japonska?", answers: ["Jüan", "Won", "Jen", "Rupie"], correct: 2 },
        { category: "Matematika", question: "Jak se nazývá mnohoúhelník s osmi stranami?", answers: ["Šestiúhelník", "Sedmiúhelník", "Osmiúhelník", "Desetiúhelník"], correct: 2 },
        { category: "Věda", question: "Při jaké teplotě přibližně vře voda za normálního tlaku?", answers: ["50 °C", "75 °C", "100 °C", "125 °C"], correct: 2 },
        { category: "Věda", question: "Jaký je nejlehčí chemický prvek?", answers: ["Helium", "Vodík", "Lithium", "Kyslík"], correct: 1 },
        { category: "Lidské tělo", question: "Jak se nazývá nejdelší kost v lidském těle?", answers: ["Holenní kost", "Pažní kost", "Stehenní kost", "Vřetenní kost"], correct: 2 },
        { category: "Historie", question: "Ve které zemi leží pyramidy v Gíze?", answers: ["Mexiko", "Egypt", "Súdán", "Irák"], correct: 1 },
        { category: "Zeměpis", question: "Která řeka protéká Prahou?", answers: ["Labe", "Morava", "Vltava", "Ohře"], correct: 2 },
        { category: "Příroda", question: "Který z těchto živočichů je savec?", answers: ["Krokodýl", "Delfín", "Tučňák", "Želva"], correct: 1 },
        { category: "Zeměpis", question: "Které pohoří odděluje Francii a Španělsko?", answers: ["Alpy", "Pyreneje", "Karpaty", "Apeniny"], correct: 1 }
      ],
      hard: [
        { category: "Věda", question: "Který astronom jako první formuloval tři zákony pohybu planet?", answers: ["Galileo Galilei", "Johannes Kepler", "Mikuláš Koperník", "Tycho Brahe"], correct: 1 },
        { category: "Zeměpis", question: "Který průliv odděluje Asii od Severní Ameriky?", answers: ["Gibraltarský průliv", "Beringův průliv", "Drakeův průliv", "Hormuzský průliv"], correct: 1 },
        { category: "Literatura", question: "Kdo napsal román Jméno růže?", answers: ["Italo Calvino", "Umberto Eco", "Primo Levi", "Alberto Moravia"], correct: 1 },
        { category: "Věda", question: "Jaká je chemická značka wolframu?", answers: ["Wo", "W", "Tu", "Wt"], correct: 1 },
        { category: "Historie", question: "Která smlouva ukončila třicetiletou válku?", answers: ["Utrechtský mír", "Vestfálský mír", "Vídeňský kongres", "Augsburský mír"], correct: 1 },
        { category: "Zeměpis", question: "Která země má nejvíce časových pásem včetně zámořských území?", answers: ["Rusko", "Spojené státy", "Francie", "Spojené království"], correct: 2 },
        { category: "Věda", question: "Jak se nazývá hranice, za kterou už z černé díry neunikne ani světlo?", answers: ["Singularita", "Akreační disk", "Horizont událostí", "Rocheova mez"], correct: 2 },
        { category: "Kultura", question: "Který skladatel složil operu Kouzelná flétna?", answers: ["Ludwig van Beethoven", "Joseph Haydn", "Wolfgang Amadeus Mozart", "Franz Schubert"], correct: 2 },
        { category: "Zeměpis", question: "Jaké je nejhlubší jezero na světě?", answers: ["Tanganika", "Kaspické moře", "Bajkal", "Hořejší jezero"], correct: 2 },
        { category: "Věda", question: "Která část buňky je hlavním místem tvorby ATP při buněčném dýchání?", answers: ["Ribozom", "Mitochondrie", "Golgiho aparát", "Lysozom"], correct: 1 },
        { category: "Historie", question: "Ve kterém roce padla Konstantinopol do rukou Osmanů?", answers: ["1299", "1415", "1453", "1492"], correct: 2 },
        { category: "Zeměpis", question: "Která poušť je největší na světě, započítáme-li i polární oblasti?", answers: ["Sahara", "Arabská poušť", "Antarktická poušť", "Gobi"], correct: 2 },
        { category: "Věda", question: "Jaká je chemická značka zlata?", answers: ["Ag", "Au", "Gd", "Go"], correct: 1 },
        { category: "Věda", question: "Na kterých rostlinách prováděl Gregor Mendel své pokusy s dědičností?", answers: ["Na hrachu", "Na kukuřici", "Na růžích", "Na pšenici"], correct: 0 },
        { category: "Literatura", question: "Kdo napsal Božskou komedii?", answers: ["Francesco Petrarca", "Dante Alighieri", "Giovanni Boccaccio", "Ludovico Ariosto"], correct: 1 },
        { category: "Zeměpis", question: "Jaké je hlavní město Mongolska?", answers: ["Astana", "Biškek", "Ulánbátar", "Taškent"], correct: 2 },
        { category: "Vesmír", question: "Jak se jmenuje největší měsíc planety Saturn?", answers: ["Europa", "Titan", "Ganymed", "Enceladus"], correct: 1 },
        { category: "Matematika", question: "Kolik stěn má pravidelný dvanáctistěn?", answers: ["8", "10", "12", "20"], correct: 2 },
        { category: "Matematika", question: "Která věta popisuje vztah mezi stranami pravoúhlého trojúhelníku?", answers: ["Thaletova věta", "Pythagorova věta", "Eukleidova věta", "Viètova věta"], correct: 1 },
        { category: "Fyzika", question: "Jak se nazývá změna frekvence vlny způsobená pohybem zdroje nebo pozorovatele?", answers: ["Fotoelektrický jev", "Dopplerův jev", "Comptonův jev", "Hallův jev"], correct: 1 },
        { category: "Historie", question: "Jak se dnes jmenuje město, které bylo známé jako Konstantinopol?", answers: ["Atény", "Istanbul", "Ankara", "Soluň"], correct: 1 },
        { category: "Věda", question: "Jaké protonové číslo má sodík?", answers: ["8", "10", "11", "12"], correct: 2 },
        { category: "Zeměpis", question: "Který poledník slouží jako základní nultý poledník?", answers: ["Pařížský", "Greenwichský", "Berlínský", "Římský"], correct: 1 },
        { category: "Věda", question: "Který fyzik je spojován se vznikem kvantové teorie?", answers: ["Max Planck", "Niels Bohr", "Erwin Schrödinger", "Michael Faraday"], correct: 0 }
      ]
    };

    const intro = document.querySelector("#intro");
    const setup = document.querySelector("#setup");
    const quiz = document.querySelector("#quiz");
    const results = document.querySelector("#results");
    const startButton = document.querySelector("#start-button");
    const nextButton = document.querySelector("#next-button");
    const quitButton = document.querySelector("#quit-button");
    const homeButton = document.querySelector("#home-button");
    const answerContainer = document.querySelector("#answers");
    const timer = document.querySelector("#timer");
    const progressTrack = document.querySelector(".progress-track");
    const scoreHint = document.querySelector("#score-hint");
    const settingsButton = document.querySelector("#open-settings");
    const settingsDialog = document.querySelector("#settings-dialog");
    const languageSetting = document.querySelector("#language-setting");
    const themeSetting = document.querySelector("#theme-setting");
    const questionCountSetting = document.querySelector("#question-count-setting");
    const timerSetting = document.querySelector("#timer-setting");
    const soundSetting = document.querySelector("#sound-setting");

    let difficulty = "medium";
    let questions = [];
    let questionIndex = 0;
    let score = 0;
    let correctAnswers = 0;
    let answeredQuestions = 0;
    let secondsLeft = settings.questionTime;
    let timerId = null;
    let answered = false;
    let questionStartedAt = 0;
    let abandoned = false;
    const usedQuestions = {
      easy: new Set(),
      medium: new Set(),
      hard: new Set()
    };

    function translate(key, ...args) {
      const value = translations[settings.language][key];
      return typeof value === "function" ? value(...args) : value;
    }

    function difficultyName(level) {
      return translate(level);
    }

    function applyLanguage() {
      document.documentElement.lang = settings.language;
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = translate(element.dataset.i18n);
      });
      document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        element.setAttribute("aria-label", translate(element.dataset.i18nAria));
      });
      document.querySelector("#score-hint").textContent = translate("scoreHint", difficulty === "hard" ? 5 : 3);
      document.title = settings.language === "en" ? "Quiz game — Test your knowledge" : "Kvízová hra — Otestuj své znalosti";
    }

    function updateSetupFacts() {
      document.querySelector("#setup-time").textContent = `${settings.questionTime} ${translate("seconds")}`;
      document.querySelector("#setup-count").textContent = settings.questionCount;
      document.querySelector("#time-left").nextElementSibling.textContent = translate("seconds");
      document.querySelector("#score-hint").textContent = translate("scoreHint", difficulty === "hard" ? 5 : 3);
    }

    function applySettings() {
      document.body.dataset.theme = settings.theme;
      document.body.dataset.accent = settings.accent;
      document.querySelector('meta[name="theme-color"]').content = settings.theme === "light" ? "#f3f2fa" : "#11142a";
      languageSetting.value = settings.language;
      themeSetting.value = settings.theme;
      questionCountSetting.value = String(settings.questionCount);
      timerSetting.value = String(settings.questionTime);
      soundSetting.checked = settings.sound;
      document.querySelectorAll(".color-option").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.accent === settings.accent));
      });
      applyLanguage();
      updateSetupFacts();
    }

    function saveSettings() {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        console.warn("Nastavení se nepodařilo uložit do úložiště prohlížeče.", error);
      }
    }

    function updateSetting(key, value) {
      settings[key] = value;
      applySettings();
      saveSettings();
      if (!results.hidden) showResults(abandoned);
    }

    function playAnswerSound(isCorrect) {
      if (!settings.sound) return;
      try {
        const audio = new AudioContext();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = isCorrect ? 660 : 220;
        gain.gain.setValueAtTime(0.12, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.18);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start();
        oscillator.stop(audio.currentTime + 0.18);
        oscillator.addEventListener("ended", () => audio.close(), { once: true });
      } catch (error) {
        console.warn("Zvukový efekt se nepodařilo přehrát.", error);
      }
    }

    applySettings();

    document.querySelectorAll(".difficulty-option").forEach((button) => {
      button.addEventListener("click", () => {
        difficulty = button.dataset.difficulty;
        document.querySelectorAll(".difficulty-option").forEach((option) => {
          option.setAttribute("aria-pressed", String(option === button));
        });
        updateSetupFacts();
      });
    });

    settingsButton.addEventListener("click", () => settingsDialog.showModal());
    document.querySelector("#close-settings").addEventListener("click", () => settingsDialog.close());
    document.querySelector("#done-settings").addEventListener("click", () => settingsDialog.close());
    languageSetting.addEventListener("change", () => updateSetting("language", languageSetting.value));
    themeSetting.addEventListener("change", () => updateSetting("theme", themeSetting.value));
    questionCountSetting.addEventListener("change", () => updateSetting("questionCount", Number(questionCountSetting.value)));
    timerSetting.addEventListener("change", () => updateSetting("questionTime", Number(timerSetting.value)));
    soundSetting.addEventListener("change", () => updateSetting("sound", soundSetting.checked));
    document.querySelectorAll(".color-option").forEach((button) => {
      button.addEventListener("click", () => updateSetting("accent", button.dataset.accent));
    });
    document.querySelector("#reset-settings").addEventListener("click", () => {
      settings = { ...DEFAULT_SETTINGS };
      applySettings();
      saveSettings();
    });
    settingsDialog.addEventListener("click", (event) => {
      if (event.target === settingsDialog) settingsDialog.close();
    });

    function shuffled(items) {
      const copy = [...items];
      for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
      }
      return copy;
    }

    function selectQuestions(level) {
      const pool = questionBank[level];
      const used = usedQuestions[level];
      const unseen = shuffled(pool.filter((question) => !used.has(question.question)));
      const selection = unseen.slice(0, settings.questionCount);

      if (selection.length < settings.questionCount) {
        const selectedTexts = new Set(selection.map((question) => question.question));
        const previouslyUsed = shuffled(pool.filter((question) => !selectedTexts.has(question.question)));
        selection.push(...previouslyUsed.slice(0, settings.questionCount - selection.length));
        used.clear();
      }

      selection.forEach((question) => used.add(question.question));
      return shuffled(selection);
    }

    function startQuiz() {
      questions = selectQuestions(difficulty);
      questionIndex = 0;
      score = 0;
      correctAnswers = 0;
      answeredQuestions = 0;
      abandoned = false;
      settingsButton.hidden = true;
      intro.hidden = true;
      setup.hidden = true;
      results.hidden = true;
      quiz.hidden = false;
      renderQuestion();
    }

    function renderQuestion() {
      clearInterval(timerId);
      answered = false;
      secondsLeft = settings.questionTime;
      questionStartedAt = performance.now();
      const question = questions[questionIndex];
      document.querySelector("#question-number").textContent = `${questionIndex + 1} / ${questions.length}`;
      document.querySelector("#question-category").textContent = settings.language === "en"
        ? `${difficultyName(difficulty)} difficulty · ${question.category}`
        : `${difficultyName(difficulty)} obtížnost · ${question.category}`;
      document.querySelector("#question-title").textContent = question.question;
      document.querySelector("#time-left").textContent = secondsLeft;
      timer.classList.remove("urgent");
      document.querySelector("#feedback").textContent = "";
      document.querySelector("#feedback").className = "feedback";
      nextButton.hidden = true;
      progressTrack.setAttribute("aria-valuenow", questionIndex);
      progressTrack.setAttribute("aria-valuemax", questions.length);
      document.querySelector("#progress-fill").style.width = `${(questionIndex / questions.length) * 100}%`;
      answerContainer.replaceChildren();

      question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer";
        button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
        button.querySelector("span:last-child").textContent = answer;
        button.addEventListener("click", () => selectAnswer(index));
        answerContainer.append(button);
      });

      timerId = setInterval(() => {
        secondsLeft -= 1;
        document.querySelector("#time-left").textContent = secondsLeft;
        if (secondsLeft <= 5) timer.classList.add("urgent");
        if (secondsLeft <= 0) {
          clearInterval(timerId);
          selectAnswer(-1);
        }
      }, 1000);
    }

    function selectAnswer(selectedIndex) {
      if (answered) return;
      const elapsedSeconds = (performance.now() - questionStartedAt) / 1000;
      if (selectedIndex !== -1 && elapsedSeconds >= settings.questionTime) selectedIndex = -1;
      answered = true;
      clearInterval(timerId);
      answeredQuestions += 1;
      const question = questions[questionIndex];
      const buttons = answerContainer.querySelectorAll(".answer");
      buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correct) button.classList.add("correct");
        if (index === selectedIndex && selectedIndex !== question.correct) button.classList.add("incorrect");
      });

      const feedback = document.querySelector("#feedback");
      if (selectedIndex === question.correct) {
        correctAnswers += 1;
        const speedThreshold = difficulty === "hard" ? 5 : 3;
        const speedBonus = elapsedSeconds <= speedThreshold;
        const earned = speedBonus ? 200 : 100;
        score += earned;
        feedback.textContent = speedBonus ? translate("correctFast", earned) : translate("correctAnswer", earned);
        feedback.classList.add("good");
      } else if (selectedIndex === -1) {
        feedback.textContent = translate("timeout", question.answers[question.correct]);
        feedback.classList.add("bad");
      } else {
        feedback.textContent = translate("wrongAnswer", question.answers[question.correct]);
        feedback.classList.add("bad");
      }
      playAnswerSound(selectedIndex === question.correct);

      nextButton.innerHTML = `${questionIndex === questions.length - 1 ? translate("showResult") : translate("nextQuestion")} <span aria-hidden="true">→</span>`;
      nextButton.hidden = false;
      nextButton.focus();
    }

    function showResults(wasAbandoned = false) {
      clearInterval(timerId);
      abandoned = wasAbandoned;
      quiz.hidden = true;
      results.hidden = false;
      settingsButton.hidden = false;
      progressTrack.setAttribute("aria-valuemax", settings.questionCount);
      progressTrack.setAttribute("aria-valuenow", questions.length);
      const resultQuestionCount = abandoned ? answeredQuestions : questions.length;
      const percentage = resultQuestionCount === 0 ? 0 : Math.round((correctAnswers / resultQuestionCount) * 100);
      const title = percentage === 100 ? translate("flawless") : percentage >= 70 ? translate("great") : percentage >= 40 ? translate("good") : translate("keepGoing");
      document.querySelector("#result-title").textContent = abandoned ? translate("abandoned") : title;
      document.querySelector("#result-copy").textContent = abandoned
        ? answeredQuestions === 0
          ? translate("quitBeforeAnswer")
          : translate("abandonedResult", difficultyName(difficulty), answeredQuestions)
        : translate("completedResult", difficultyName(difficulty), percentage >= 70 ? translate("praise") : translate("encouragement"));
      document.querySelector("#result-icon").textContent = abandoned ? "⏸️" : percentage >= 70 ? "🏆" : percentage >= 40 ? "✨" : "💪";
      document.querySelector("#final-score").textContent = score.toLocaleString(settings.language === "en" ? "en-US" : "cs-CZ");
      document.querySelector("#correct-count").textContent = `${correctAnswers}/${resultQuestionCount}`;
      document.querySelector("#accuracy").textContent = `${percentage} %`;
      document.querySelector("#again-button").hidden = abandoned;
      document.querySelector("#change-difficulty-button").hidden = abandoned;
      homeButton.hidden = !abandoned;
      (abandoned ? homeButton : document.querySelector("#again-button")).focus();
    }

    startButton.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", () => {
      questionIndex += 1;
      if (questionIndex >= questions.length) showResults();
      else renderQuestion();
    });
    quitButton.addEventListener("click", () => showResults(true));
    document.querySelector("#again-button").addEventListener("click", startQuiz);
    homeButton.addEventListener("click", () => {
      results.hidden = true;
      intro.hidden = false;
      setup.hidden = false;
      document.querySelector(".difficulty-option[aria-pressed='true']").focus();
    });
    document.querySelector("#change-difficulty-button").addEventListener("click", () => {
      results.hidden = true;
      setup.hidden = false;
      intro.hidden = false;
      document.querySelector(".difficulty-option[aria-pressed='true']").focus();
    });
