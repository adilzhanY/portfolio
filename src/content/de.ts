import type { Content } from "./types";

export const content: Content = {
  name: "Adilzhan Yerzhan",
  tagline: "Full-Stack Web- und Mobile-Entwickler",
  intro:
    "Ich entwerfe, baue, veröffentliche und betreibe meine eigenen Produkte von Anfang bis Ende: einen Onlineshop mit echten zahlenden Kunden und Offline-First-Apps für Training und Gewohnheiten. Ich habe einen B.Sc. in Software Engineering (Februar 2026) und bin offen für Festanstellung, Vertragsarbeit, Freelance und Remote-Arbeit.",
  location: "Potsdam, Deutschland",
  languages: ["Kasachisch", "Russisch", "Englisch", "Deutsch"],
  about: [
    "Mir gefällt der ganze Weg eines Produkts: ein echtes Problem finden, die Lösung entwerfen, sie bauen, sie veröffentlichen und sie danach am Laufen halten, wenn echte Nutzer darauf sind. So lerne ich. Whale Abyss hat mir Zahlungen, Webhooks und den Betrieb beigebracht, weil schon am ersten Tag zahlende Kunden da waren. Torq und Grit haben mir Offline-First-Architektur beigebracht und wie man einen gemeinsamen Domain-Kern zwischen Web und Mobile teilt.",
    "Ich arbeite über den ganzen Stack: TypeScript und React im Frontend, Node.js und Rust im Backend, React Native und Expo auf Mobile, PostgreSQL und SQLite darunter. Ich spreche {{languages}}.",
  ],
  footer: {
    heading: "Lassen Sie uns zusammenarbeiten.",
    blurb:
      "Offen für Festanstellung, Vertragsarbeit, Freelance und Remote-Arbeit. Ich lebe in Potsdam, Deutschland. Ich lese jede Nachricht und antworte richtig.",
    emailLabel: "E-Mail",
    linkedinLabel: "Vernetzen wir uns",
    telegramLabel: "Telegram",
    bookingLabel: "15-Minuten-Gespräch buchen",
    credit: "Von Anfang bis Ende entworfen, gebaut und betrieben.",
  },

  projects: {
    bauwerk: {
      summary:
        "Ein 3D-Gebäudeeditor für deutsche Energieberater, im Browser. Man zeichnet ein Haus und sieht dabei zu, wie sich die U-Werte, die Wärmeverluste, die Energieausweis-Klasse, die Heizlast jedes Raums und die Amortisation jedes Sanierungsschritts bewegen. Danach druckt es den deutschen Bericht.",
      metric: "237 kWh/(m²a) heute, 63 nach der vollen Hülle, 367 Tests",
      postmortem: [
        "Aufgefordert, seine eigene Physik zu prüfen, fand der Agent fünf eigene Fehler, alle unter grünen Tests, weil die Tests seine eigenen Zahlen festgehalten hatten statt die der Norm. Die Gradstunden lagen bei 84 kKh statt bei den 66 des deutschen Referenzklimas, die internen Gewinne fehlten ganz, die EnEV-Korrekturfaktoren für die Bodenplatte und das unbeheizte Treppenhaus wurden nie angewendet, die Berliner Auslegungstemperatur war -12 C statt -14 C, und zwei voreingestellte U-Werte widersprachen ihren eigenen Schichtaufbauten.",
        "Die Korrektur verschob das Beispielhaus um rund 70 kWh pro Quadratmeter und Jahr, in den Bereich, den die IWU-Typologie einem unsanierten Bau vor 1918 gibt. Ein Test, der die Zahl festhält, die der Code ohnehin liefert, ist ein Regressionstest, kein Korrektheitstest. Jede Formel beginnt jetzt mit einem von Hand aus der Norm gerechneten Fall, und der Code muss ihn treffen.",
        "Die kleineren Fehler kamen aus der Arbeit von Hand: Das Rasterfangen ließ an Außenwänden eine Lücke von 8,5 bis 20 cm, die Szene reagierte nach einem Geschosswechsel nicht mehr, weil undefined in den Raycaster geriet, und der Wechsel der Oberfläche auf Deutsch ließ die Dokumentdaten auf Englisch. Jeder bekam einen Test. Jede Stelle, an der ich den Agenten überstimmt habe, steht in DECISIONS.md, 45 Einträge, und das Protokoll gehört zum Projekt.",
      ],
      imageAlt:
        "Bauwerk, das Kreuzberger Demohaus von 1905 auf seinem echten Grundstück, mit Geschossliste und Eigenschaftenpanel",
      problem:
        "Deutschland hat 19 Millionen Wohnhäuser zu sanieren und einen Berufsstand, der zwischen ihnen und dem Gesetz steht. Energieberater zeichnen ein Gebäude in einem Werkzeug und rechnen den Heizwärmebedarf in einem anderen, dazwischen tippen sie Zahlen ab, sodass ein Hausbesitzer, der fragt, ob sich das Dach vor der Wärmepumpe rechnet, tagelang auf die Antwort wartet. Bauwerk hält Zeichnung und Physik in einem Modell.",
      solution: [
        "Grundriss, Geschosse, Wände. Ein Klick mit dem Öffnungswerkzeug auf eine Außenwand gibt ein Fenster, auf eine Innenwand eine Tür, Shift tauscht sie. Zieht man eine Innenwand über ein Geschoss, entstehen die Räume von selbst mit ihren Flächen; löscht man sie, wachsen sie unter ihren alten Namen wieder zusammen. Das ganze Haus lässt sich greifen und die Straße entlangschieben: Es steht auf seinem echten OpenStreetMap-Grundstück, die Koordinaten laufen beim Ziehen mit, und dreht man es, werden aus Südfenstern Westfenster und die solaren Gewinne folgen. Die Geschosse, die man gerade nicht bearbeitet, zeichnen sich als Umriss. Jedes Ziehen, jeder gescrubbte und jeder getippte Wert ist genau ein Undo-Schritt.",
        "Die Bilanz folgt dem Heizperiodenverfahren der DIN V 4108-6: Transmissions- und Lüftungsverluste, die EnEV-Korrekturfaktoren, Wärmebrücken als psi mal Länge, solare Gewinne nach Orientierung und interne Gewinne, gegen 66 kKh des deutschen Referenzklimas. U-Werte werden nach ISO 6946 aus dem Schichtaufbau berechnet und nie getippt, sodass sich der Klassenbuchstabe schon beim Ziehen der Dämmstärke bewegt. Jedes Bauteil wird gegen seinen Grenzwert aus GEG Anlage 7 geprüft, und die Heizlast je Raum folgt der DIN EN 12831 bei minus 14 C für Berlin, mit markierten unterdimensionierten Heizkörpern und der Wärmepumpe, die dabei herauskommt: 62 kW vor der Dämmung.",
        "Szenarien sind Überschreibungen und keine Kopien, also zieht eine Änderung an der Grundlage alle Varianten mit. Beim Demohaus kostet die Fassade 75.418 EUR und bringt es in 16,4 Jahren von Klasse G nach E, die volle Hülle kostet 219.414 EUR und ergibt Klasse B. Nach Amortisation geordnet und drei Jahre auseinandergelegt, ergibt das genau den individuellen Sanierungsfahrplan, den ein Hausbesitzer für den höheren Fördersatz braucht. Ein Klick macht aus dem Modell ein schlichtes deutsches Gebäudedokument, mit einer Methodenseite, die jede Annahme nennt, damit ein zweiter Berater die Zahlen prüfen kann, und der Server liefert dieselbe Seite als PDF.",
      ],
      achievements: [
        "Live unter adilzhany.github.io/bauwerk: nur Browser, ohne Installation, ohne Konto",
        "Das Kreuzberger Demohaus von 1905: 237 kWh/(m²a), Klasse G, 96.422 kWh Wärme im Jahr",
        "Volle Hülle für 219.414 EUR: Klasse B, 63 kWh/(m²a), 25,9 Jahre Amortisation",
        "367 Client-Tests und 8 Server-Tests gegen ein echtes Postgres, striktes TypeScript",
        "IFC4-Export von Hand geschrieben und mit IfcOpenShell geprüft, IFC- und GeoJSON-Import",
        "Ein 18-geschossiger Turm mit 719 Öffnungen auf der Bench-Route, mit Frametime-Graph",
      ],
      gallery: {
        scene: { alt: "Das Demohaus in 3D auf seinem Kreuzberger Grundstück", caption: "Das Haus auf seinem echten Grundstück" },
        openings: { alt: "Das erste Obergeschoss in Bearbeitung, das Erdgeschoss als Umriss darunter", caption: "Nicht bearbeitete Geschosse werden zum Umriss" },
        energy: { alt: "Das Energiepanel mit Klassenskala, Verlusten, Gewinnen und Flächen", caption: "Jeder Verlust und Gewinn, live gerechnet" },
        scenarios: { alt: "Sanierungsszenarien mit Investition und Amortisation und der Fahrplan", caption: "Schnellste Amortisation zuerst, Schritt auf Schritt" },
        report: { alt: "Die erste Seite des deutschen Gebäudeberichts", caption: "Der deutsche Bericht, druckfertig" },
      },
    },

    "berlin-walk": {
      summary:
        "Eine begehbare und befliegbare 3D-Rekonstruktion der Berliner Mitte, die im Browser über einen einzigen Link läuft. Reines WebGL2, echte OpenStreetMap-Daten, keine Engine und keine Bibliothek. Ich habe einen Prompt geschrieben, und Claude Fable 5.1 hat alles in vier Stunden gebaut, während ich die Zahlen beobachtet habe.",
      metric: "7.895 Zeilen, 4 h 08 min, 27,49 $ an Tokens, keine Zeile von Hand",
      postmortem: [
        "Der Boden flackerte: Straßen schimmerten in jeder Entfernung durch die Gehwege. Das Vertexformat speicherte Positionen mit 1/32 m, um Bytes zu sparen, und die sechs Bodenschichten, die nur 0 bis 6 cm auseinanderliegen, fielen auf zwei Höhen zusammen. Der Agent fand das, indem er das von ihm selbst entworfene Binärbündel las, nicht indem er auf das Bild starrte, und stellte 531 der 532 Kacheln auf ein Raster von 1/128 m um. Die eine Kachel mit dem 368 m hohen Fernsehturm bleibt grob, weil sie den Wertebereich braucht.",
        "Der Fernsehturm war vom Brandenburger Tor aus unsichtbar, und genau diese Aufnahme hatte der Prompt verlangt. An der Geometrie lag es nicht: die Kachel war geladen, im Sichtkegel und gezeichnet. Ein Blick in die Pixel zeigte, dass sonnenbeschienener Beton in 2 km Entfernung exakt die Helligkeit des Horizonthimmels dahinter hatte. Die Lösung war die Beleuchtung, eine schwächere Sonne, ein hellerer Himmel und dunklerer Beton, und seitdem steht der Turm am Ende von Unter den Linden so, wie man ihn von Fotos kennt.",
        "Was ich mitnehme: Wenn der Agent nicht prüfen konnte, baute er sich einen Weg zum Prüfen. Headless Chromium hat von einer Seite mit Renderschleife nie einen Screenshot geliefert, also schrieb er einen Client für das DevTools-Protokoll und machte dreißig. Das Debugging war mehr wert als der Code.",
      ],
      imageAlt: "Berlin Walk, das Brandenburger Tor vom Pariser Platz",
      problem:
        "Kann ein Coding-Agent eine echte 3D-Stadt von Grund auf bauen, ohne Engine, aus einem Prompt und ohne Rückfragen? Ich wollte eine gemessene Antwort, keine Demo: Kartenausschnitt, Regeln und Ergebnisse standen vorher fest, und jeder Token, jeder Dollar und jede Minute wurde gezählt.",
      solution: [
        "Die Datenpipeline lädt den Overpass-Auszug für 2,7 mal 1,9 km Mitte, parst das XML mit einem eigenen Tokenizer und extrahiert Gebäude mit Höhen und Dachformen, Straßen mit Breiten und Belägen, die Spree, Parks, Baumreihen, Gleise und Bahnhöfe. Jedes Polygon wird mit eigenem Ear Clipping samt Löchern trianguliert, extrudiert und in 532 Kacheln zu 100 m geschnitten, mit einem 16-Byte-Vertexformat, einer Kollisionsschicht und den Bäumen. Tor, Reichstag, Dom, Fernsehturm und die 2711 Stelen des Denkmals werden aus ihren kartierten Umrissen erzeugt.",
        "Die Laufzeit ist reines WebGL2: Kachelstreaming mit Frustum Culling, zwei kaskadierte Schattenkarten, eine Sonne aus dem echten Datum und Breitengrad, ein prozeduraler Himmel und ein Materialshader, der Fassaden mit Fensterrastern und nachts beleuchteten Fenstern, Fahrbahnmarkierungen, Kopfsteinpflaster, Gras und Wasser mit Himmelsspiegelung zeichnet, alles aus einem Zufallswert pro Gebäude und ohne Texturen. Darüber liegen HDR, Bloom, Tone Mapping und FXAA, mit drei Qualitätsstufen nach gemessener Frametime.",
        "Die Spielschicht hat einen Kapsel-Charaktercontroller, der 60 Mal pro Sekunde gegen die Gebäudewände geprüft wird, einen Flugmodus, eine Drohnenfahrt als Intro, Entdeckungskarten für elf Wahrzeichen, eine Minimap aus denselben Straßendaten, einen Fotomodus, teilbare Links und eine auf der Web Audio API synthetisierte Kulisse: Verkehr, Wasser, Vögel, U-Bahn-Grollen und Schritte, die sich mit dem Belag ändern.",
      ],
      achievements: [
        "Live unter adilzhany.github.io/berlin-walk, 10,5 MB gesamt, 4,5 MB gzip, nur statische Dateien",
        "308.100 Dreiecke aus echten OpenStreetMap-Daten, 5.323 Gebäude, 10.757 Bäume, 47.018 Kollisionskanten",
        "2,3 ms GPU-Zeit pro Frame in 1080p auf einer RTX 5070, 60 fps mit Vsync",
        "Ein Prompt, 137 API-Aufrufe, 34,6 Millionen Tokens, 27,49 $, 4 Stunden und 8 Minuten bis zur öffentlichen URL",
        "Der Agent hat sich selbst geprüft: 30 Headless-Screenshots, geskriptete Kollisionstests, Unit-Tests für die Pipeline",
      ],
      gallery: {
        flight: { alt: "Flug über Unter den Linden Richtung Fernsehturm", caption: "Flugmodus über Unter den Linden" },
        gate: { alt: "Das Brandenburger Tor vom Pariser Platz aus", caption: "Startpunkt, Pariser Platz" },
        linden: { alt: "Unter den Linden mit seinen Linden", caption: "Unter den Linden" },
        memorial: { alt: "Zwischen den Stelen des Holocaust-Mahnmals", caption: "Im Mahnmal, 2711 Stelen" },
        tower: { alt: "Der Fernsehturm von der Karl-Liebknecht-Straße", caption: "Der Fernsehturm" },
        night: { alt: "Pariser Platz bei Nacht mit beleuchteten Fenstern", caption: "Nacht, jedes Fenster nach eigener Regel beleuchtet" },
      },
    },

    "whale-abyss": {
      summary:
        "E-Commerce-Plattform für Genshin-Impact-Boosting, allein gebaut und veröffentlicht. Bezahlte Bestellungen laufen direkt in einen Telegram-Bot, Zahlungen laufen vollständig durch, CI/CD deployt bei jedem Push.",
      metric: "150+ zahlende Kunden in den ersten 10 Tagen",
      postmortem: [
        "Am 12. Juli bezahlte ein Kunde 2000 RUB für eine Leistung, die deklarierte Quests voraussetzt, und die Bestellung erreichte den Booster ganz ohne Deklaration. Ich lieferte einen Fix aus: drei Wiederholungen des Requests und eine Warnung in Telegram. Am 25. Juli passierte es wieder, gleicher Betrag, Bestellung 96162b2e. Der Fix hielt nicht, weil er auf den falschen Code-Pfad zielte.",
        "Also hörte ich auf zu raten und ging in die Daten. Von 27 betroffenen Bestellzeilen waren genau zwei kaputt, und fehlerhafte Warenkörbe gab es überhaupt keine. Die eigentliche Ursache war, dass das übergeordnete Element undefined speicherte, sodass die Auswahl des Kunden nur als separate Warenkorbzeilen existierte, und beim Löschen einer solchen Zeile verschwand die Auswahl stillschweigend, ohne Fehler und ohne Logeintrag. Der Fix war ein expliziter Wert plus eine Serverprüfung, die die Verknüpfungen beim Checkout neu liest und 409 zurückgibt, was die Warenkorbseite abfängt und den Dialog erneut öffnet, sodass nichts verloren geht. Danach spielte ich 50 echte bezahlte Bestellungen dagegen. Die Prüfung blockierte genau die zwei kaputten und ließ die anderen 48 durch.",
        "Zwei Dinge sind geblieben. Eine Prüfung im Client ist gute Bedienbarkeit, keine Garantie, und wenn es um Geld geht, gehört die Regel auf den Server. Und ein Fix ist erst dann ein Fix, wenn die Daten es bestätigen.",
      ],
      imageAlt: "Whale Abyss, die Abyss ist geschafft",
      problem:
        "Boosting-Dienste werden über Discord-Server und Tabellen verkauft. Bestellungen gehen verloren, Zahlungen laufen per Hand, und weder Kunde noch Booster weiß, in welchem Zustand eine Bestellung ist. Whale Abyss ersetzt das durch einen richtigen Shop.",
      solution: [
        "Die Kundenseite ist ein vollständiger Shop: ein Servicekatalog mit Suche und Filtern, ein dauerhafter Warenkorb, der zwischen localStorage und Datenbank synchronisiert, Gutscheincodes, zeitlich begrenzte Aktionen und ein moderiertes Bewertungssystem. Die Kasse läuft über das Zahlungs-Gateway Freekassa, und jeder eingehende Webhook wird auf dem Server per Signatur geprüft, bevor eine Bestellung als bezahlt gilt.",
        "Sobald eine Bestellung bezahlt ist, postet ein Telegram-Bot sie mit Inline-Tastatur in den Arbeitskanal, damit die Booster sie sehen, ohne ein Dashboard zu öffnen. Transaktions-E-Mails decken Bestellbestätigungen, die Verifizierung der Registrierung per Einmalcode und das Zurücksetzen von Passwörtern ab, und Yandex SmartCaptcha schützt den Versand der Codes vor Bots.",
        "Dahinter steht ein vollständiges Admin-Panel: Verwaltung des Bestellablaufs mit Rückerstattungen über die Freekassa-API, Verwaltung von Nutzern und Boostern mit automatischer Provisionsauszahlung nach Abschluss, CRUD für Services und Gutscheincodes, Planung von Aktionen und Moderation der Bewertungen. Die ganze Plattform läuft in der Yandex Cloud, mit einer CI/CD-Pipeline bei jedem Push.",
      ],
      achievements: [
        "150+ zahlende Kunden in den ersten 10 Tagen nach dem Start",
        "Läuft produktiv auf whaleabyss.com und wird weiterhin von mir betrieben",
        "36.000+ Zeilen TypeScript: 80+ Komponenten, 35+ API-Endpunkte, 13 Datenbanktabellen",
        "Echtes Geld auf dem ganzen Weg: Zahlungs-Gateway, signierte Webhooks, Rückerstattungen, Provisionen",
        "Allein entworfen, gebaut, veröffentlicht und betrieben",
      ],
      gallery: {
        hero: { alt: "Startseite von Whale Abyss", caption: "Startseite" },
        services: { alt: "Servicekatalog von Whale Abyss", caption: "Servicekatalog" },
        cart: {
          alt: "Warenkorb und Kasse von Whale Abyss",
          caption: "Warenkorb und Kasse",
        },
        reviews: { alt: "Bewertungen von Whale Abyss", caption: "Moderierte Bewertungen" },
      },
    },

    torq: {
      summary:
        "Eine Gym-App, die dir sagt, wie stark du wirklich bist. Jeder Satz wird mit der DOTS-Formel bewertet, normiert auf Körpergewicht und Geschlecht, und in einen Rang über neun Stufen übersetzt, mit Perzentilen aus über 400.000 OpenPowerlifting-Athleten.",
      metric: "Neun Ränge, 243 Tests, lokal gespeichert mit kostenloser Sync",
      postmortem: [
        "Push-Benachrichtigungen legten die ganze App lahm, und ich habe es wochenlang nicht bemerkt. expo-notifications reexportiert einen Helfer, der addPushTokenListener auf Modulebene aufruft, und dieser Aufruf wirft in Expo Go unter Android eine Exception, weil SDK 53 Remote-Push entfernt hat. Eine Exception während require reißt das gesamte Bundle mit, deshalb zeigte die App eine rote runtime-not-ready-Box und stellte nie ein einziges Bild dar. Meine pushSupported()-Guards waren nutzlos, weil der Absturz zur Importzeit passierte, bevor irgendein Code von mir lief. Gefunden habe ich es am 9. August im Emulator, kaputt war es seit der Einführung von Push. Der Fix ist ein dynamischer Import hinter dem Guard. Die Lehre: ein Guard schützt nur Code, der überhaupt zur Ausführung kommt.",
        "Die zweite Geschichte handelt nicht von Code, sondern von Ehrlichkeit. Ich hatte eine Grundgesamtheit von 2,2 Millionen Athleten angegeben, und diese Zahl war an vier Stellen falsch, auch im Text der Bezahlschranke. Als ich den Datensatz neu aufbaute, lauteten die echten Zahlen: 1,46 Millionen Bestleistungen pro Athlet und zwischen 133.697 und 401.158 für eine einzelne Disziplin. Ich habe jede Stelle korrigiert. Torq schreibt jetzt immer \"unter Wettkampfathleten\" und nennt die Stichprobengröße statt \"die besten N Prozent aller Menschen\", denn alle in dieser Datenbank sind bei offiziellen Wettkämpfen angetreten und damit deutlich stärker als das Publikum im Studio.",
      ],
      imageAlt: "Torq, Stärke im Rang",
      problem:
        "Die meisten Gym-Apps sagen dir, wie viel du gehoben hast, fast keine sagt dir, wie stark dich das macht. Nackte Kilos sagen über Körpergewichte hinweg nichts aus: dieselben 100 kg auf der Bank sind bei 60 kg eine andere Leistung als bei 110 kg. Torq bewertet jeden Satz mit der DOTS-Formel, derselben Normierung, die auch das Powerlifting benutzt, und macht daraus einen Rang, den du hochkletterst.",
      solution: [
        "Der Rang kommt aus deinem besten geschätzten 1RM pro Übung, bewertet mit dem offiziellen DOTS-Polynom und auf neun Stufen verteilt, von Rust bis World Class. Jede Wettkampfübung trägt außerdem ein Perzentil, gemessen an bis zu 401.000 Wettkampfathleten pro Übung in der OpenPowerlifting-Datenbank, und die App ist ehrlich über diese Grundgesamtheit: neben der Zahl steht immer „unter Wettkampfathleten“.",
        "Der Logger ist für die Trainingsfläche gebaut: Gewicht und Wiederholungen mit der letzten Einheit neben jeder Zeile, Vorschläge für das nächste Gewicht über doppelte Progression, ein Pausentimer, der laut mitzählt, Aufwärmsätze, die pro Übung gemerkt werden, und ein durchsuchbarer Katalog mit 1.500 Übungen samt Schritt-für-Schritt-Anleitungen. Die Historie wird als Zeitstrahl gezeichnet, der die Ruhetage benennt, und in den Fortschrittsdiagrammen liegen die Rangbänder hinter deinen Punkten, damit der nächste Rang sichtbar ist.",
        "Die Speicherung ist local-first: ein JSON-Snapshot im AsyncStorage, voll nutzbar ohne Konto. Die Cloud-Sync ist Supabase-Auth plus Delta-Sync nach dem Prinzip „der letzte Schreibvorgang gewinnt“ hinter Row-Level Security, dauerhaft kostenlos. Soziale Funktionen sind strikt freiwillig: Freunde vergleichen sich über Punkte statt über Kilos, globale Ranglisten sind ein eigener Schalter, und unglaubwürdige Leistungen kommen nicht dorthin, wo andere sie sehen.",
      ],
      achievements: [
        "243 Vitest-Tests über der reinen Rang- und Progressionslogik, in der die Aussagen des Produkts stecken",
        "Perzentile berechnet gegen 134.000 bis 401.000 OpenPowerlifting-Athleten pro Übung",
        "Katalog mit 1.500 Übungen, vollständig offline durchsuchbar",
        "Voll nutzbar ohne Konto: der Gastmodus ist ein vollwertiger Weg, die Cloud-Sync ist kostenlos",
        "Expo SDK 57, React Native 0.86, React 19, striktes TypeScript",
      ],
      gallery: {
        home: {
          alt: "Startbildschirm von Torq mit der heutigen Einheit",
          caption: "Die heutige Einheit",
        },
        live: { alt: "Live-Logger für Sätze in Torq", caption: "Live-Logger" },
        ranks: { alt: "Die neun Ränge in Torq", caption: "Neun Stufen" },
        stats: {
          alt: "Fortschrittsdiagramm von Torq mit Rangbändern",
          caption: "Der Aufstieg",
        },
        history: { alt: "Zeitstrahl der Trainingshistorie in Torq", caption: "Historie" },
      },
    },

    sendoku: {
      summary:
        "Eine Sudoku-App für Android, die sagen kann, warum ein Rätsel schwer ist. Jedes Rätsel wird von einem Techniklöser gelöst, bevor du es siehst, deshalb ist die Stufe die schwerste menschliche Regel, die wirklich nötig ist, und derselbe Löser schreibt die Hinweise und den Kurs mit 45 Lektionen.",
      metric: "4.200 bewertete Rätsel, 860 Tests, 3,1 MB, ohne Internet-Berechtigung",
      postmortem: [
        "Der schlimmste Fehler dieser App beendete Partien, die sie längst selbst als verloren erkannt hatte. Eine falsche Ziffer kann gegen keine einzige Regel verstoßen, auf dem Brett war also nichts zu sehen, aber der Fehlerzähler in der Kopfzeile war hochgezählt, die App wusste es und schwieg. Zwanzig Züge später passte in eine Zelle überhaupt keine Ziffer mehr, jeder Versuch dort kostete einen weiteren Fehler, und drei Versuche beendeten ein leichtes Rätsel, das seit jenem verborgenen Ausrutscher nicht mehr zu gewinnen war. Daraus wurden zwei Regeln. Wird ein Fehler berechnet, wird er sofort markiert, bei laufendem Fehlerlimit ist die Markierung deshalb keine Einstellung mehr. Und eine Zelle wird nur so lange berechnet, wie ihre eigene Lösung noch hineingeschrieben werden kann, sonst zahlt jemand zweimal für einen Fehler. Es gibt eine Testdatei, die nach diesen Regeln benannt ist.",
        "Die Hinweise hatten dasselbe Problem in anderer Form. Ein Hinweis schloss eine Ziffer in einer Zelle aus, der Spieler hatte dort keine Notizen, sichtbar änderte sich also nichts, und der nächste Hinweis verkündete, in der Zelle sei nur noch ein Kandidat übrig. Vom Platz des Spielers aus waren es zwei, und die App forderte ihn zum Raten auf. Jetzt behält jede Zelle, die ein Hinweis berührt, ihre echten Notizen, und ein Hinweis, der auf einem früheren aufbaut, sagt das auf der Karte. Was ein Hinweis beweist, muss dort landen, wo der Spieler es sehen kann.",
      ],
      imageAlt: "Sendoku, schwerer als es aussieht",
      problem:
        "Jede Sudoku-App nennt ihre höchste Stufe Extreme, und fast keine kann sagen, warum ein Rätsel schwer ist, weil das Etikett aus der Zahl der vorgegebenen Ziffern kommt und nicht aus der Logik. Sendoku bewertet jedes Rätsel nach der schwersten menschlichen Technik, die zum Lösen nötig ist, und deshalb geht die Leiter dort weiter, wo die kommerziellen Apps aufhören.",
      solution: [
        "Die Engine ist reines Kotlin ganz ohne Android-Importe: ein Löser über Bitmasken, ein Zähler für die Eindeutigkeit, ein Generator und 28 menschliche Techniken plus 4 für Killer, von nackten Einern bis ALS-XZ und Death Blossom. Dieser eine Löser ist gleich drei Funktionen. Er bewertet das Rätsel, er schreibt den Hinweis, und er garantiert, dass in dieser App nie geraten werden muss.",
        "Ein Hinweis gibt nie einfach die Ziffer heraus. Er nennt die Technik, hebt die Zellen hervor, auf denen die Begründung ruht, schreibt die Begründung aus und bietet erst dann den Zug an, und das über vier Hilfestufen, damit der Spieler selbst entscheidet, wie tief er hineinschaut. Hinter jeder Regel steht eine Lektion, einen Tipp entfernt, und der Kurs sind 45 Lektionen in 13 Stufen auf einem echten Brett, von 4x4-Gittern bis zu Ketten, die so notiert sind wie auf Papier. Nach einer Lektion reicht die App ein Rätsel heraus, das genau diese Regel braucht, ausgewählt aus dem Paket von demselben Löser, der es bewertet hat.",
        "Schwere Rätsel sind zu selten, um sie auf dem Telefon zu erzeugen, deshalb liegen 4.000 klassische und 200 Killer fertig bewertet in einem gepackten Paket von 227 KB bei, und die leichten erzeugt der Generator auf dem Gerät, wenn eine Stufe leer läuft. Das Tagesrätsel wird aus dem Datum abgeleitet, alle bekommen dasselbe Gitter ohne Server, und jedes Rätsel trägt einen kurzen Code, den man verschicken kann. Killer wird auf derselben Skala bewertet, weil der Bewerter die Käfigregeln und die gewöhnlichen Regeln gemeinsam durchgeht.",
        "Im Manifest steht keine Internet-Berechtigung, das lässt sich im gebauten APK prüfen statt es zu glauben, und die GPL-3.0-Lizenz ist das, was den Quelltext überhaupt prüfbar macht. Gespeichert wird mit Room auf dem Telefon, ohne Konto und ohne Cloud. Jedes der vier Themes hat eine eigene Schrift, zugeschnitten auf die Zeichen, die die App zeichnen kann, damit acht Schriftdateien in 260 KB passen, und die App spricht 12 Sprachen, darunter Arabisch von rechts nach links.",
      ],
      achievements: [
        "860 Tests: 681 auf der JVM und 179 auf dem Gerät, über Löser und Generator, wo ein stiller Fehler kaputte Rätsel ausliefert",
        "32 menschliche Techniken umgesetzt, 8 Schwierigkeitsstufen und 45 Lektionen, die sie beibringen",
        "3,1 MB installiert, mit R8 geschrumpft, minSdk 26, eine Activity und keine Fragmente",
        "Gar keine Internet-Berechtigung, das Datenschutzversprechen ist also prüfbar statt nur behauptet",
        "12 Sprachen, auch von rechts nach links, und jede Beschriftung bleibt bei 200 Prozent Schriftgröße vollständig",
      ],
      gallery: {
        home: { alt: "Sendoku-Startseite mit laufender Partie", caption: "Startseite" },
        hint: { alt: "Ein Sendoku-Hinweis erklärt ein X-Wing", caption: "Ein Hinweis, der lehrt" },
        learn: { alt: "Die Sendoku-Kurskarte mit 45 Lektionen", caption: "45 Lektionen" },
        killer: { alt: "Killer-Sudoku mit Käfigen", caption: "Killer, dieselbe Skala" },
        you: { alt: "Die Sendoku-Rekordseite", caption: "Dein Rekord" },
      },
    },

    openhyprwhisper: {
      summary:
        "Systemweites Diktieren für Hyprland. Taste drücken, sprechen, und whisper.cpp tippt deine Worte in das Textfeld, das gerade den Fokus hat. Vollständig lokal und privat, mit Spracherkennung pro Äußerung für gemischte EN/RU/DE/KK-Sprache, festen Ersetzungen und einem optionalen LLM-Feinschliff.",
      metric: "~0,2 s pro Satz mit warmem Daemon, vollständig offline",
      postmortem: [
        "Die erste Version lud das Modell für jede Phrase neu, las also rund 600 MB von der Festplatte, bevor überhaupt ein Wort erschien. Es funktionierte, war aber zu langsam für den echten Gebrauch, und ich landete immer wieder auf der Tastatur. Erst der dauerhaft laufende whisper-server-Daemon, der das Modell im VRAM hält, machte aus der Demo ein Werkzeug, das ich täglich benutze, mit etwa 0,2 s pro Satz.",
        "Das seltsamere Problem war, dass auch dann Text entstand, wenn man die Aufnahme beendete, ohne etwas zu sagen. Whisper ist auf Sprache trainiert, also gibt es bei nahezu Stille selbstbewusst das Häufigste aus seinen Trainingsdaten aus, meistens \"Thank you.\" Das im Sprachmodell abzufangen war die falsche Ebene. Die Lösung ist ein Stille-Gate auf dem Signalpegel, bevor die Transkription überhaupt startet, damit Stille nichts ergibt statt etwas Plausibles.",
      ],
      imageAlt: "OpenHyprWhisper, Taste drücken, sprechen, es tippt",
      problem:
        "Linux unter Wayland hat kein systemweites Diktieren, und die Cloud-Alternativen schicken dein Audio auf fremde Server. OpenHyprWhisper ist Diktieren, das in jeder App funktioniert und den Ton nie vom Rechner lässt.",
      solution: [
        "Tastenkürzel drücken, sprechen, noch einmal drücken: PipeWire nimmt auf, whisper.cpp transkribiert auf CUDA oder Vulkan, und die Worte werden in das fokussierte Textfeld getippt, im Browser, im Terminal oder in einer Chat-App. Ein warmer whisper-server-Daemon hält das Modell im VRAM, so beginnt die Transkription sofort, statt pro Satz rund 600 MB neu zu laden.",
        "Drei Korrekturschichten säubern das rohe Transkript: ein Vokabular-Prompt lenkt die Erkennung in Richtung deiner Fachbegriffe, feste Ersetzungen beheben hartnäckige Hörfehler in etwa 10 ms, und ein optionaler LLM-Feinschliff (llama.cpp mit mitgeliefertem Qwen2.5-3B) hat einen vollen Modus für Dokumente und einen leichten, der nur Namen korrigiert, damit Chatnachrichten weiterhin nach dir klingen. Eine Stille-Sperre verhindert das klassische halluzinierte „Thank you.“, wenn du aufhörst, ohne gesprochen zu haben.",
        "Die Aufnahmeanzeige ist eine animierte Quickshell-Pille mit einer Live-Wellenform, die sich an einen Bildschirmrand heften oder an das fokussierte Fenster hängen kann, und sie folgt der Material-Palette auf end-4/dots-hyprland-Setups. Alles wird über ein einziges CLI verwaltet: Mikrofonauswahl, Transkriptionsverlauf, ein dauerhafter Ein- und Ausschalter, der in systemd-User-Units verdrahtet ist, und automatische Spracherkennung pro Äußerung für gemischt englische, russische, deutsche und kasachische Sprache.",
      ],
      achievements: [
        "Etwa 0,2 s pro Satz mit warmem Daemon auf einer RTX 5070",
        "Funktioniert in jeder Anwendung mit einem fokussierten Texteingabefeld",
        "Vollständig lokal: keine Cloud, keine Telemetrie, kein Abo",
        "Automatische Spracherkennung pro Äußerung über EN, RU, DE und KK",
        "Open Source, veröffentlicht mit Installationsdoku und einer Integration für end-4 dots-hyprland",
      ],
      gallery: {
        recording: {
          alt: "Aufnahmezustand mit Live-Wellenform und Timer",
          caption: "Aufnahme, Live-Wellenform",
        },
        transcribing: {
          alt: "Zustand während der Transkription",
          caption: "Transkription auf der GPU",
        },
        polishing: {
          alt: "Zustand während des Feinschliffs",
          caption: "Optionaler LLM-Feinschliff",
        },
        done: {
          alt: "Fertiger Zustand",
          caption: "In das fokussierte Feld getippt",
        },
        light: {
          alt: "Pille im hellen Design",
          caption: "Folgt der Systempalette in Echtzeit",
        },
      },
    },

    grit: {
      summary:
        "Ein Lebens-Tracker, der aufhört, fünf verschiedene Apps zu verlangen. Gewohnheiten, Essen, Schritte, Gewicht und Fokus in einer XP-Ökonomie, wobei Web, Mobile und ein Hyprland-Desktop-Panel denselben Domain-Kern teilen, offline-first mit Delta-Sync.",
      metric: "Eine XP-Ökonomie über Web, Mobile und Desktop",
      postmortem: [
        "Die Synchronisation sah fertig aus, und dann kamen gelöschte Einträge zurück. Die Write-Hooks, die lokale Zeilen mit Zeitstempeln versehen, feuerten auch dann, wenn die Sync-Schicht vom Server geholte Änderungen einspielte. Eine geholte Zeile stempelte ihr eigenes updatedAt neu und sah frisch bearbeitet aus, und ein geholtes Löschen erzeugte einen brandneuen Grabstein. Zwei Geräte konnten dasselbe Löschen endlos hin und her schieben, und jedes meldete ehrlich, es sei gerade eben passiert.",
        "Der Fix ist klein: ein Suppress-Flag, das die Sync-Schicht um das Einspielen entfernter Änderungen herum setzt, damit die Hooks still bleiben, während die Version vom Server geschrieben wird. Gelernt habe ich daraus: das Schwierige an offline-first ist nicht das Zusammenführen, sondern zu wissen, welche Schreibvorgänge Neuigkeit sind und welche Echo.",
      ],
      imageAlt: "Grit, ein Leben, eine XP-Ökonomie",
      problem:
        "Gewohnheiten liegen in einer App, Essen in einer zweiten, Schritte in einer dritten, und jede gibt dir eine eigene Serie, wegen der du dich dann schlecht fühlst. Grit steckt Gewohnheiten, Essen, Schritte, Gewicht und Fokus in eine einzige XP-Ökonomie, damit ein gewöhnlicher Tag trotzdem zu etwas zusammenzählt.",
      solution: [
        "Das Modell ist eine Ökonomie: tägliche Pflichten bringen +10 XP, Dinge, die du dir abgewöhnst, kosten XP und setzen eine saubere Serie zurück, deren Meilensteine Boni zahlen, große persönliche Erfolge bringen +100, Lebensmeilensteine +1000. Ein Tagesprotokoll erfasst Essen als aufgenommene minus verbrannte Kalorien, dazu Schritte und Gewicht, und ein Fokus-Timer speist dasselbe System. Level sind eine reine Funktion der gesamten XP und können fallen, wenn du nachlässt.",
        "Jede XP-Änderung ist ein Eintrag in einem nur anfügbaren Ledger, deshalb lassen sich XP, Level und Serien immer aus der Historie ableiten, und dasselbe Ledger dient als Grundlage für eine konfliktfreie Cloud-Sync. Die Sync ist ein Delta-Abgleich gegen Supabase, pro Zeile nach dem Prinzip „der letzte Schreibvorgang gewinnt“, mit Tombstones für Löschungen und hinter Row-Level Security.",
        "Es ist ein npm-Workspaces-Monorepo: ein reiner TypeScript-Domain-Kern ohne DOM und ohne React Native hält die Regeln genau einmal, und jeder Client hält sich daran. Die Web-App ist Next.js 16 mit React 19, eine installierbare PWA, die ihre Daten local-first in IndexedDB über Dexie speichert. Die Mobile-App ist Expo React Native mit exakt demselben Kern, deshalb leveln beide Plattformen identisch.",
        "Der dritte Client ist ein Quickshell-Panel (QML) für Hyprland: ein Tastendruck schiebt den ganzen Tracker vom Bildschirmrand herein, mit Tagesquests, Fokus-Rängen pro Aufgabe, Serienkarten für schlechte Gewohnheiten, einem Essensprotokoll mit Fastentimer und einem XP-Shop. Es ist tastaturzentriert mit einer vim-Ebene, über IPC skriptbar und speichert seine Daten in einem lokalen JSON-Snapshot.",
      ],
      achievements: [
        "Ein gemeinsames Domain-Paket steuert Web, Mobile und ein natives Desktop-Panel nach identischen Regeln",
        "Local-first auf beiden Plattformen: vollständig offline nutzbar, Deltas synchronisieren, sobald die Verbindung zurück ist",
        "Das nur anfügbare XP-Ledger macht den Zustand ableitbar und Sync-Konflikte selten",
        "Installierbare PWA im Web, native Benachrichtigungen und Ton auf Mobile",
      ],
      gallery: {
        myday: {
          alt: "Die Ansicht „Mein Tag“ in Grit mit Tagesquests",
          caption: "Mein Tag und Quests",
        },
        focus: {
          alt: "Fokus-Timer in Grit mit Rängen pro Aufgabe",
          caption: "Fokus-Ränge",
        },
        bad: {
          alt: "Serienkarten für schlechte Gewohnheiten in Grit",
          caption: "Saubere Serien",
        },
        food: {
          alt: "Tägliches Essensprotokoll in Grit mit Fastentimer",
          caption: "Tagesprotokoll",
        },
        stats: { alt: "XP-Ledger und Statistiken in Grit", caption: "Das Ledger" },
      },
    },
  },

  experience: {
    independent: {
      company: "Eigene Produkte",
      role: "Alleiniger Entwickler und Betreiber",
      date: "2024 bis heute",
      detail:
        "Ich habe meine eigenen Produkte entworfen, gebaut, veröffentlicht und betreibe sie weiterhin: Whale Abyss, Torq, Grit und OpenHyprWhisper.",
      bullets: [
        "Whale Abyss: eine produktive E-Commerce-Plattform für Game-Boosting mit echten Zahlungen, 150+ zahlenden Kunden in den ersten 10 Tagen, live auf whaleabyss.com und seit dem Start von mir betrieben.",
        "Torq: eine Offline-First-Gym-App, die jeden Satz mit der DOTS-Formel bewertet und Stärke über neun Ränge einordnet, abgesichert durch 243 Tests.",
        "Grit: ein spielerischer Lebens-Tracker mit einer XP-Ökonomie, die sich eine Next.js-Web-App, eine Expo-Mobile-App und ein Quickshell-Desktop-Panel teilen.",
        "OpenHyprWhisper: vollständig lokales Diktieren für den Hyprland-Desktop auf Basis von whisper.cpp, als Open Source veröffentlicht.",
      ],
    },
    intuivo: {
      company: "intuivo",
      role: "Praktikant im Software Engineering, remote",
      date: "04.2025 bis 08.2025",
      detail:
        "Full-Stack-Anwendungen in Rust (Actix, Sled) und TypeScript (React, Next.js, Mithril). Ein KI-gestütztes CMS mit Versionierung und Quellenangaben gebaut, Stripe, PayPal und Klarna angebunden.",
      bullets: [
        "Eine Reihe von Full-Stack-Anwendungen in Rust (Actix, Sled DB) und TypeScript-Frameworks wie Mithril.js, React und Next.js entwickelt.",
        "Ein internes KI-gestütztes Content-Management-System mit robuster Versionierung, Exportoptionen und Quellenverwaltung gebaut.",
        "Sichere Zahlungs-APIs von Stripe, PayPal und Klarna in Proof-of-Concept-Anwendungen integriert.",
      ],
    },
    climanova: {
      company: "ClimaNova",
      role: "Teamleitung, Studienprojekt",
      date: "Frühjahr 2024",
      detail:
        "Leitung des Mobile-Teams für eine plattformübergreifende Wetter-App in Flutter. Eine der besten Noten im Kurs.",
      bullets: [
        "Das Mobile-Team für ClimaNova geleitet, eine plattformübergreifende Wetter-App in Flutter.",
        "Ein Entwicklerteam von Anfang bis Ende koordiniert, den Fortschritt verfolgt und regelmäßige Planungsgespräche geführt.",
        "Das Projekt durch klare Aufgabenverteilung und praktische technische Führung zu einer der besten Noten im Kurs gebracht.",
      ],
    },
    degree: {
      company: "B.Sc. Software Engineering",
      role: "University of Europe for Applied Sciences",
      date: "09.2022 bis 02.2026",
      detail:
        "Potsdam, Deutschland. Abschluss im Februar 2026 mit der Note 2,0.",
      bullets: [
        "Abschluss im Februar 2026 mit der Note 2,0.",
        "Studium in Potsdam, Deutschland, und parallel dazu der Großteil meiner Portfolio-Projekte gebaut.",
      ],
    },
  },

  ui: {
    nav: {
      aria: "Hauptnavigation",
      home: "Start",
      projects: "Projekte",
      experience: "Erfahrung",
      blog: "Blog",
      menu: "Menü",
      close: "Menü schließen",
    },
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      xing: "XING",
      telegram: "Telegram",
      reddit: "Reddit",
      x: "X",
      email: "E-Mail",
    },
    theme: { toggle: "Dunkles Design umschalten" },
    language: { label: "Sprache" },
    home: {
      avatarTitle: "Ja, das bin ich",
      verified: "Verifiziert",
      sectionProjects: "Projekte",
      details: "Details",
      seeAllProjects: "Alle Projekte ansehen",
      sectionAbout: "Über mich",
      sectionExperience: "Erfahrung",
      sectionSkills: "Fähigkeiten",
      sectionActivity: "GitHub-Aktivität",
      sectionCertifications: "Zertifikate",
      saveContact: "Kontakt speichern",
    },
    projects: {
      heading: "Projekte",
      intro:
        "Jedes davon ist ein echtes Produkt, kein Tutorial-Projekt. Öffnen Sie eines für die vollständige Fallstudie.",
      readCaseStudy: "Fallstudie lesen",
    },
    project: {
      back: "Alle Projekte",
      github: "GitHub",
      live: "Live-Seite",
      problem: "Das Problem",
      built: "Was ich gebaut habe",
      highlights: "Highlights",
      wentWrong: "Was schiefging",
      stack: "Stack",
      inDetail: "Im Detail",
    },
    experience: {
      heading: "Erfahrung",
      intro: "Was ich in jeder Rolle tatsächlich gemacht habe, neueste zuerst.",
    },
    certifications: { showCredential: "Zertifikat ansehen" },
    resume: {
      open: "Lebenslauf ansehen",
      viewer: "Lebenslauf-Ansicht",
      zoomOut: "Verkleinern",
      zoomIn: "Vergrößern",
      download: "Herunterladen",
      close: "Schließen",
      loading: "Lebenslauf wird geladen…",
      error: "Das PDF konnte nicht geladen werden.",
      errorAction: "Laden Sie es stattdessen herunter.",
    },
    visitors: "Besuche: {{count}}",
    calendar: {
      months: [
        "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
      ],
      weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      less: "Weniger",
      more: "Mehr",
      totalCount: "Beiträge {{year}}: {{count}}",
    },
    notFound: {
      title: "Seite nicht gefunden",
      body: "Diese Seite gibt es nicht, oder sie ist umgezogen.",
      action: "Zurück zur Startseite",
      puzzleIntro:
        "Stattdessen ein Vier mal Vier. Jede Zeile, Spalte und jeder Block enthält 1 bis 4 genau einmal.",
      hint: "Hinweis",
      doIt: "Setzen",
      erase: "Löschen",
      hintSingle:
        "Hier passt nur die {{digit}}. Die anderen Ziffern stehen schon in dieser Zeile, Spalte oder diesem Block.",
      hintWrong: "Eine der Ziffern ist falsch. Sie ist markiert.",
      hintNone: "Nichts mehr zu setzen.",
      solved: "Gelöst. Das war das leichte.",
      solvedAction: "Jetzt zur Startseite",
      boardLabel: "Sudoku vier mal vier",
      cellLabel: "Zeile {{row}}, Spalte {{col}}",
    },
  },

  uses: {
    heading: "Werkzeuge",
    intro:
      "Der Rechner und die Werkzeuge, mit denen ich täglich arbeite. Zwei Dinge in dieser Liste habe ich selbst geschrieben, und ungefähr so sind sie entstanden: ich wollte sie auf diesem Desktop haben.",
    groups: {
      machine: "Rechner",
      desktop: "Desktop",
      editor: "Editor",
      terminal: "Terminal",
      everyday: "Täglich",
    },
    notes: {
      gpu: "Darauf laufen whisper.cpp und lokale Modelle für OpenHyprWhisper.",
      os: "Rolling Release, aktuell mit Kernel 7.1.",
      wm: "Tiling-Compositor für Wayland. Beide meiner Desktop-Werkzeuge sind dafür gebaut.",
      dots: "Die Basis, auf der ich meine eigenen Panels aufsetze.",
      panel: "Mein eigener Life-Tracker, geschrieben in Quickshell und QML.",
      dictation: "Meine eigene Spracheingabe, vollständig lokal, ohne Cloud.",
      nvim: "Eine eigene Konfiguration statt einer fertigen Distribution: LSP für TypeScript, React und Tailwind, fzf-lua, Auto-Session.",
      vscode: "Zum Pairing und wenn ein Projekt es erwartet.",
      fish: "Die Shell, in der ich wirklich tippe.",
      atuin: "Shell-Historie, durchsuchbar und synchronisiert.",
      gh: "Der Großteil meiner GitHub-Arbeit läuft hier statt im Browser.",
      espanso: "Textbausteine für die Sätze, die ich immer wieder tippe.",
      font: "Überall: im Terminal und im Editor.",
    },
  },

  now: {
    heading: "Jetzt",
    intro: "Woran ich gerade arbeite und wo man mich findet. Diese Seite ändert sich mit der Arbeit.",
    updated: "Aktualisiert am {{date}}",
    building: "In Arbeit",
  },
  blog: {
    heading: "Blog",
    intro: "Notes on building and running my own products. Written in English, newest first.",
    read: "Read the post",
    back: "All posts",
    feed: "RSS feed",
    empty: "Noch nichts veröffentlicht. Der erste Beitrag entsteht gerade.",
  },
  meta: {
    siteTitle: "Adilzhan Yerzhan - Software Engineer",
    titleTemplate: "%s - Adilzhan Yerzhan",
    siteDescription:
      "Adilzhan Yerzhan, Software Engineer in Potsdam. Produkte, die ich allein entworfen, gebaut und veröffentlicht habe.",
    ogTitle: "Adilzhan Yerzhan - Full-Stack Web- und Mobile-Entwickler",
    ogDescription:
      "Allein entworfene, gebaute, veröffentlichte und betriebene Produkte: E-Commerce mit echten Kunden, Offline-First-Apps und Open Source.",
    projectsTitle: "Projekte",
    projectsDescription:
      "Allein entworfene, gebaute, veröffentlichte und betriebene Produkte: Whale Abyss, Torq, OpenHyprWhisper und Grit.",
    experienceTitle: "Erfahrung",
    experienceDescription:
      "Beruflicher Werdegang: eigene Produkte im Produktivbetrieb, ein Praktikum als Software Engineer bei intuivo, Teamleitung und ein B.Sc. in Software Engineering.",
    usesTitle: "Werkzeuge",
    usesDescription:
      "Rechner, Desktop, Editor und Werkzeuge, mit denen ich täglich arbeite: Arch Linux, Hyprland, Neovim und zwei selbst geschriebene Desktop-Werkzeuge.",
    nowTitle: "Jetzt",
    nowDescription:
      "Woran Adilzhan Yerzhan gerade arbeitet: Sendoku und Torq, offen für neue Aufgaben.",
    blogTitle: "Blog",
    blogDescription:
      "Notizen von Adilzhan Yerzhan über das Bauen und Betreiben eigener Produkte, auf Englisch.",
  },
};
