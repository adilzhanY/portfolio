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
    credit: "Von Anfang bis Ende entworfen, gebaut und betrieben.",
  },

  projects: {
    "whale-abyss": {
      summary:
        "E-Commerce-Plattform für Genshin-Impact-Boosting, allein gebaut und veröffentlicht. Bezahlte Bestellungen laufen direkt in einen Telegram-Bot, Zahlungen laufen vollständig durch, CI/CD deployt bei jedem Push.",
      metric: "150+ zahlende Kunden in den ersten 10 Tagen",
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
        "Läuft produktiv auf whaleabyss.ru und wird weiterhin von mir betrieben",
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

    openhyprwhisper: {
      summary:
        "Systemweites Diktieren für Hyprland. Taste drücken, sprechen, und whisper.cpp tippt deine Worte in das Textfeld, das gerade den Fokus hat. Vollständig lokal und privat, mit Spracherkennung pro Äußerung für gemischte EN/RU/DE/KK-Sprache, festen Ersetzungen und einem optionalen LLM-Feinschliff.",
      metric: "~0,2 s pro Satz mit warmem Daemon, vollständig offline",
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
        "Whale Abyss: eine produktive E-Commerce-Plattform für Game-Boosting mit echten Zahlungen, 150+ zahlenden Kunden in den ersten 10 Tagen, live auf whaleabyss.ru und seit dem Start von mir betrieben.",
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
    },
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      telegram: "Telegram",
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
    },
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
  },
};
