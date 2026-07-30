import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  copyright: string;
  selectLanguage: string;
  themeCustomizer: string;
  darkMode: string;
  lightMode: string;
  presetThemes: string;
  customHexColor: string;
  primaryColor: string;
  bgColor: string;
  apply: string;
  coins: string;
  stars: string;
  backToMenu: string;
  next: string;
  prev: string;
  clear: string;
  undo: string;
  redo: string;
  completed: string;
  wellDone: string;
  tryAgain: string;
  
  categories: {
    spelling: {
      title: string;
      subtitle: string;
      desc: string;
    };
    tracing_coloring: {
      title: string;
      subtitle: string;
      desc: string;
    };
    shapes: {
      title: string;
      subtitle: string;
      desc: string;
    };
    math_fishing: {
      title: string;
      subtitle: string;
      desc: string;
    };
    surprises: {
      title: string;
      subtitle: string;
      desc: string;
    };
  };

  spellingGame: {
    title: string;
    matchLetters: string;
    spellTheWord: string;
    connectDotsInstruction: string;
    arrangeLettersInstruction: string;
    spelledSuccess: string;
  };

  tracingColoring: {
    modeTracing: string;
    modeColoring: string;
    traceInstruction: string;
    colorInstruction: string;
    brushSize: string;
    fillTool: string;
    crayons: string;
    eraser: string;
  };

  shapesGame: {
    modeSandbox: string;
    modeMatching: string;
    matchShapesInstruction: string;
    sandboxInstruction: string;
    shapes: {
      circle: string;
      square: string;
      triangle: string;
      star: string;
      oval: string;
      hexagon: string;
      diamond: string;
    };
  };

  mathGame: {
    modeNumbers: string;
    modeFishing: string;
    modeCounting: string;
    fishingTarget: string;
    caughtFish: string;
    catchFishNumber: string;
    countAnimals: string;
  };

  surprisesRoom: {
    title: string;
    shelfTitle: string;
    openGift: string;
    costText: string;
    alreadyUnlocked: string;
    tapToyToPlay: string;
    needMoreCoins: string;
  };
}

export const translations: Record<Language, Translations> = {
  DE: {
    appName: 'Ersenbox - SPIELE LERNEN 26',
    appSubtitle: 'Vorschul-Lernwelt für Kinder',
    copyright: '© 2026 ErsenBox — Ersen Bakıcı',
    selectLanguage: 'Sprache wählen',
    themeCustomizer: 'Design & Farben',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    presetThemes: 'Farbschemas',
    customHexColor: 'Benutzerdefinierte Hex-Farbe',
    primaryColor: 'Hauptfarbe',
    bgColor: 'Hintergrundfarbe',
    apply: 'Übernehmen',
    coins: 'Münzen',
    stars: 'Sterne',
    backToMenu: 'Hauptmenü',
    next: 'Weiter',
    prev: 'Zurück',
    clear: 'Löschen',
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    completed: 'Geschafft!',
    wellDone: 'Super gemacht!',
    tryAgain: 'Versuch es noch einmal!',
    
    categories: {
      spelling: {
        title: 'ABC Spelling & Rätsel',
        subtitle: 'Buchstaben verbinden & Wörter buchstabieren',
        desc: 'Verbinde Linien und löse Wörter-Puzzles mit niedlichen Tieren!',
      },
      tracing_coloring: {
        title: 'Ausmalen & Buchstaben Nachspuren',
        subtitle: 'Malbuch & Alphabet Tracing',
        desc: 'Spure Buchstaben A-Z nach und male bunte Zeichnungen aus!',
      },
      shapes: {
        title: 'Formen & Farben Sandbox',
        subtitle: 'Formen zuordnen & Interaktive Physik',
        desc: 'Lerne Kreise, Sterne und Dreiecke im Holzrahmen und der Sandbox!',
      },
      math_fishing: {
        title: 'Zahlen & Bären-Angelspiel',
        subtitle: 'Mathe, Zählen & Fische fangen',
        desc: 'Hilf dem Bären beim Angeln und lerne Zahlen von 1 bis 10!',
      },
      surprises: {
        title: 'Überraschungs-Spielzeugregal',
        subtitle: 'Geschenke öffnen & Spielzeug sammeln',
        desc: 'Sammle Münzen, öffne Geschenkboxen und fülle dein Holzregal!',
      },
    },

    spellingGame: {
      title: 'ABC Spelling & Holz-Puzzle',
      matchLetters: 'Buchstaben Verbinden',
      spellTheWord: 'Wort Buchstabieren',
      connectDotsInstruction: 'Ziehe eine Linie vom linken Buchstaben zum rechten!',
      arrangeLettersInstruction: 'Setze die Buchstaben in die richtige Reihenfolge!',
      spelledSuccess: 'Perfekt buchstabiert!',
    },

    tracingColoring: {
      modeTracing: 'Buchstaben Nachspuren (A-Z)',
      modeColoring: 'Ausmalbuch',
      traceInstruction: 'Folge den Punkten 1, 2, 3 um den Buchstaben zu schreiben!',
      colorInstruction: 'Wähle deinen Stift oder Farbeimer und male das Bild aus!',
      brushSize: 'Pinselgröße',
      fillTool: 'Farbeimer',
      crayons: 'Buntstifte',
      eraser: 'Radiergummi',
    },

    shapesGame: {
      modeSandbox: 'Formen-Sandbox',
      modeMatching: 'Holzrahmen-Rätsel',
      matchShapesInstruction: 'Ziehe jede Form in den passenden Holzrahmen!',
      sandboxInstruction: 'Klicke auf die spielenden Formen um ihren Namen zu hören!',
      shapes: {
        circle: 'Kreis',
        square: 'Quadrat',
        triangle: 'Dreieck',
        star: 'Stern',
        oval: 'Oval',
        hexagon: 'Sechseck',
        diamond: 'Raute',
      },
    },

    mathGame: {
      modeNumbers: 'Zahlen 1-10',
      modeFishing: 'Bären-Angelspiel',
      modeCounting: 'Tiere Zählen',
      fishingTarget: 'Fange den Fisch mit der Zahl:',
      caughtFish: 'Gefangene Fische:',
      catchFishNumber: 'Tippe auf den Fisch mit Nummer',
      countAnimals: 'Wie viele Tiere siehst du?',
    },

    surprisesRoom: {
      title: 'Dein Spielzimmer & Regal',
      shelfTitle: 'Gesammeltes Spielzeug',
      openGift: 'Geschenk öffnen!',
      costText: 'Kosten: 5 Münzen',
      alreadyUnlocked: 'Freigeschaltet',
      tapToyToPlay: 'Tippe auf ein Spielzeug für Sounds!',
      needMoreCoins: 'Du brauchst mehr Münzen! Spiele Spiele, um Münzen zu verdienen.',
    },
  },

  TR: {
    appName: 'Ersenbox - SPIELE LERNEN 26',
    appSubtitle: 'Çocuklar İçin Okul Öncesi Eğitici Oyunlar',
    copyright: '© 2026 ErsenBox — Ersen Bakıcı',
    selectLanguage: 'Dil Seçin',
    themeCustomizer: 'Tasarım ve Renkler',
    darkMode: 'Karanlık Mod',
    lightMode: 'Aydınlık Mod',
    presetThemes: 'Renk Temaları',
    customHexColor: 'Özel Hex Renk Kodu',
    primaryColor: 'Ana Renk',
    bgColor: 'Arka Plan Rengi',
    apply: 'Uygula',
    coins: 'Jeton',
    stars: 'Yıldız',
    backToMenu: 'Ana Menü',
    next: 'İleri',
    prev: 'Geri',
    clear: 'Temizle',
    undo: 'Geri Al',
    redo: 'Yinele',
    completed: 'Tebrikler!',
    wellDone: 'Harika İş!',
    tryAgain: 'Tekrar Dene!',

    categories: {
      spelling: {
        title: 'ABC Harf & Kelime Bulmacaları',
        subtitle: 'Harfleri Eşleştir & Kelime Yaz',
        desc: 'Çizgileri birleştir ve sevimli hayvanlı kelime bulmacalarını çöz!',
      },
      tracing_coloring: {
        title: 'Boyama & Harf Çizimi (Tracing)',
        subtitle: 'Çizim & Boyama Kitabı',
        desc: 'A-Z harflerini takip ederek yaz ve eğlenceli resimleri boya!',
      },
      shapes: {
        title: 'Şekiller & Renkler Oyunu',
        subtitle: 'Şekil Eşleştirme & İnteraktif Oyun',
        desc: 'Daire, yıldız ve üçgenleri ahşap çerçeveye yerleştir!',
      },
      math_fishing: {
        title: 'Sayılar & Ayıcık Balık Tutma',
        subtitle: 'Matematik & Sayı Sayma',
        desc: 'Ayıcığa balık tutmada yardım et ve 1-10 arası sayıları öğren!',
      },
      surprises: {
        title: 'Sürpriz Oyuncak Rafı',
        subtitle: 'Kutu Aç & Oyuncak Topla',
        desc: 'Jetonları topla, sürpriz hediyeleri aç ve ahşap rafını doldur!',
      },
    },

    spellingGame: {
      title: 'ABC Kelime & Ahşap Bulmaca',
      matchLetters: 'Harf Eşleştirme',
      spellTheWord: 'Kelime Tamamlama',
      connectDotsInstruction: 'Soldaki harften sağdaki doğru harfe çizgi çek!',
      arrangeLettersInstruction: 'Harfleri doğru sıraya dizerek kelimeyi oluştur!',
      spelledSuccess: 'Kelimeler doğru yazıldı!',
    },

    tracingColoring: {
      modeTracing: 'Harf Yazma Çizimi (A-Z)',
      modeColoring: 'Eğlenceli Boyama',
      traceInstruction: 'Harfi yazmak için 1, 2, 3 noktalarını takip et!',
      colorInstruction: 'Boya kalemini veya boya kovasını seçip renklendir!',
      brushSize: 'Fırça Boyutu',
      fillTool: 'Boya Kovası',
      crayons: 'Boya Kalemleri',
      eraser: 'Silgi',
    },

    shapesGame: {
      modeSandbox: 'Şekil Dünyası',
      modeMatching: 'Ahşap Çerçeve Eşleştirme',
      matchShapesInstruction: 'Her şekli ahşap boşluğuna sürükle!',
      sandboxInstruction: 'Şekillerin üzerine tıklayarak isimlerini dinle!',
      shapes: {
        circle: 'Daire',
        square: 'Kare',
        triangle: 'Üçgen',
        star: 'Yıldız',
        oval: 'Oval',
        hexagon: 'Altıgen',
        diamond: 'Baklava Şekli',
      },
    },

    mathGame: {
      modeNumbers: 'Sayılar 1-10',
      modeFishing: 'Ayıcık Balık Tutma',
      modeCounting: 'Hayvan Sayma',
      fishingTarget: 'Bu numaralı balığı yakala:',
      caughtFish: 'Yakalanan Balıklar:',
      catchFishNumber: 'İstenen balığa tıkla:',
      countAnimals: 'Kaç tane hayvan görüyorsun?',
    },

    surprisesRoom: {
      title: 'Oyuncak Odası ve Rafın',
      shelfTitle: 'Topladığın Oyuncaklar',
      openGift: 'Sürpriz Kutuyu Aç!',
      costText: 'Ücret: 5 Jeton',
      alreadyUnlocked: 'Açıldı',
      tapToyToPlay: 'Ses çıkarmak için oyuncağa tıkla!',
      needMoreCoins: 'Daha fazla jetona ihtiyacın var! Oyun oynayarak kazan.',
    },
  },

  EN: {
    appName: 'Ersenbox - SPIELE LERNEN 26',
    appSubtitle: 'Preschool Learning Games for Kids',
    copyright: '© 2026 ErsenBox — Ersen Bakıcı',
    selectLanguage: 'Select Language',
    themeCustomizer: 'Design & Colors',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    presetThemes: 'Color Schemes',
    customHexColor: 'Custom Hex Color Code',
    primaryColor: 'Primary Color',
    bgColor: 'Background Color',
    apply: 'Apply',
    coins: 'Coins',
    stars: 'Stars',
    backToMenu: 'Main Menu',
    next: 'Next',
    prev: 'Previous',
    clear: 'Clear',
    undo: 'Undo',
    redo: 'Redo',
    completed: 'Completed!',
    wellDone: 'Well Done!',
    tryAgain: 'Try Again!',

    categories: {
      spelling: {
        title: 'ABC Spelling & Puzzles',
        subtitle: 'Match letters & spell words',
        desc: 'Connect letter lines and solve animal word puzzles!',
      },
      tracing_coloring: {
        title: 'Coloring & Letter Tracing',
        subtitle: 'Coloring book & Alphabet Tracing',
        desc: 'Trace letters A-Z and paint fun cartoon pictures!',
      },
      shapes: {
        title: 'Shapes & Colors Sandbox',
        subtitle: 'Shape matching & interactive physics',
        desc: 'Match circles, stars, and triangles into wooden frames!',
      },
      math_fishing: {
        title: 'Numbers & Bear Fishing Game',
        subtitle: 'Math, counting & catching fish',
        desc: 'Help the bear catch numbered fish and learn numbers 1 to 10!',
      },
      surprises: {
        title: 'Surprise Toy Collection',
        subtitle: 'Unbox gifts & collect toys',
        desc: 'Earn coins, unbox mystery gifts, and fill your toy shelf!',
      },
    },

    spellingGame: {
      title: 'ABC Spelling & Wooden Puzzle',
      matchLetters: 'Connect Letters',
      spellTheWord: 'Spell Word',
      connectDotsInstruction: 'Draw a line from the left letter to the right matching letter!',
      arrangeLettersInstruction: 'Drag letters into the correct order to spell the word!',
      spelledSuccess: 'Word correctly spelled!',
    },

    tracingColoring: {
      modeTracing: 'Trace Letters (A-Z)',
      modeColoring: 'Coloring Book',
      traceInstruction: 'Follow dots 1, 2, 3 to write the letter!',
      colorInstruction: 'Choose your crayon or paint bucket to color!',
      brushSize: 'Brush Size',
      fillTool: 'Paint Bucket',
      crayons: 'Crayons',
      eraser: 'Eraser',
    },

    shapesGame: {
      modeSandbox: 'Shapes Sandbox',
      modeMatching: 'Wooden Frame Puzzle',
      matchShapesInstruction: 'Drag each shape into its matching wooden cutout!',
      sandboxInstruction: 'Click on shapes to hear their names and see them react!',
      shapes: {
        circle: 'Circle',
        square: 'Square',
        triangle: 'Triangle',
        star: 'Star',
        oval: 'Oval',
        hexagon: 'Hexagon',
        diamond: 'Diamond',
      },
    },

    mathGame: {
      modeNumbers: 'Numbers 1-10',
      modeFishing: 'Bear Fishing Game',
      modeCounting: 'Count Animals',
      fishingTarget: 'Catch the fish with number:',
      caughtFish: 'Caught Fish:',
      catchFishNumber: 'Tap the fish with number',
      countAnimals: 'How many animals do you see?',
    },

    surprisesRoom: {
      title: 'Your Toy Room & Shelf',
      shelfTitle: 'Collected Toys',
      openGift: 'Open Gift Box!',
      costText: 'Cost: 5 Coins',
      alreadyUnlocked: 'Unlocked',
      tapToyToPlay: 'Tap any toy to play its sound!',
      needMoreCoins: 'You need more coins! Play games to earn coins.',
    },
  },

  FR: {
    appName: 'Ersenbox - SPIELE LERNEN 26',
    appSubtitle: 'Jeux d’Apprentissage Pour Enfants',
    copyright: '© 2026 ErsenBox — Ersen Bakıcı',
    selectLanguage: 'Choisir la Langue',
    themeCustomizer: 'Design & Couleurs',
    darkMode: 'Mode Sombre',
    lightMode: 'Mode Clair',
    presetThemes: 'Thèmes de Couleur',
    customHexColor: 'Code Couleur Hex Personnalisé',
    primaryColor: 'Couleur Principale',
    bgColor: 'Couleur de Fond',
    apply: 'Appliquer',
    coins: 'Pièces',
    stars: 'Étoiles',
    backToMenu: 'Menu Principal',
    next: 'Suivant',
    prev: 'Précédent',
    clear: 'Effacer',
    undo: 'Annuler',
    redo: 'Rétablir',
    completed: 'Terminé!',
    wellDone: 'Bravo!',
    tryAgain: 'Ressaye!',

    categories: {
      spelling: {
        title: 'ABC Orthographe & Puzzles',
        subtitle: 'Relier les lettres & composer les mots',
        desc: 'Tracez des lignes et résolvez des puzzles d’animaux!',
      },
      tracing_coloring: {
        title: 'Coloriage & Traçage de Lettres',
        subtitle: 'Livre de Coloriage & Tracé',
        desc: 'Tracer les lettres A-Z et coloriez de magnifiques dessins!',
      },
      shapes: {
        title: 'Formes & Couleurs Sandbox',
        subtitle: 'Associer les formes & Physique interactive',
        desc: 'Associez les formes géométriques dans les cadres en bois!',
      },
      math_fishing: {
        title: 'Chiffres & Jeu de Pêche de l’Ours',
        subtitle: 'Maths, comptage & pêche',
        desc: 'Aidez l’ourson à pécher les poissons et apprenez de 1 à 10!',
      },
      surprises: {
        title: 'Étagère à Jouets Surprises',
        subtitle: 'Ouvrir des cadeaux & collectionner',
        desc: 'Gagnez des pièces, ouvrez des boîtes surprises et remplissez l’étagère!',
      },
    },

    spellingGame: {
      title: 'ABC Orthographe & Puzzle Bois',
      matchLetters: 'Relier les Lettres',
      spellTheWord: 'Épeler le Mot',
      connectDotsInstruction: 'Tracer une ligne entre les lettres identiques!',
      arrangeLettersInstruction: 'Mettez les lettres dans le bon ordre!',
      spelledSuccess: 'Mot parfaitement épelé!',
    },

    tracingColoring: {
      modeTracing: 'Traçage des Lettres (A-Z)',
      modeColoring: 'Livre de Coloriage',
      traceInstruction: 'Suivez les points 1, 2, 3 pour dessiner la lettre!',
      colorInstruction: 'Choisissez vos crayons ou le pot de peinture!',
      brushSize: 'Taille du Pinceau',
      fillTool: 'Pot de Peinture',
      crayons: 'Crayons de Couleur',
      eraser: 'Gomme',
    },

    shapesGame: {
      modeSandbox: 'Monde des Formes',
      modeMatching: 'Puzzle en Bois',
      matchShapesInstruction: 'Faites glisser chaque forme vers son contour!',
      sandboxInstruction: 'Cliquez sur les formes pour entendre leur nom!',
      shapes: {
        circle: 'Cercle',
        square: 'Carré',
        triangle: 'Triangle',
        star: 'Étoile',
        oval: 'Ovale',
        hexagon: 'Hexagone',
        diamond: 'Losange',
      },
    },

    mathGame: {
      modeNumbers: 'Chiffres 1-10',
      modeFishing: 'Pêche avec l’Ours',
      modeCounting: 'Compter les Animaux',
      fishingTarget: 'Attrape le poisson avec le numéro:',
      caughtFish: 'Poissons Attrapés:',
      catchFishNumber: 'Clique sur le poisson numéro',
      countAnimals: 'Combien d’animaux vois-tu?',
    },

    surprisesRoom: {
      title: 'Votre Étagère à Jouets',
      shelfTitle: 'Jouets Collectionnés',
      openGift: 'Ouvrir un Cadeau!',
      costText: 'Coût: 5 Pièces',
      alreadyUnlocked: 'Débloqué',
      tapToyToPlay: 'Touchez un jouet pour jouer son son!',
      needMoreCoins: 'Vous avez besoin de plus de pièces! Jouez aux jeux.',
    },
  },
};
