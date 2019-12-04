//██╗.....███████╗███████╗....███╗...███╗.█████╗.███╗...██╗.█████╗..██████╗.███████╗██████╗
//██║.....██╔════╝██╔════╝....████╗.████║██╔══██╗████╗..██║██╔══██╗██╔════╝.██╔════╝██╔══██╗
//██║.....███████╗███████╗....██╔████╔██║███████║██╔██╗.██║███████║██║..███╗█████╗..██████╔╝
//██║.....╚════██║╚════██║....██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║...██║██╔══╝..██╔══██╗
//███████╗███████║███████║....██║.╚═╝.██║██║..██║██║.╚████║██║..██║╚██████╔╝███████╗██║..██║
//╚══════╝╚══════╝╚══════╝....╚═╝.....╚═╝╚═╝..╚═╝╚═╝..╚═══╝╚═╝..╚═╝.╚═════╝.╚══════╝╚═╝..╚═╝
/**
 * Tell jQuery to allow caching beforehand!
 */
$.ajaxPrefilter(function (options, originalOptions) {
    if (options.dataType === 'script' || originalOptions.dataType === 'script' ||
        options.dataType === 'stylesheet' || originalOptions.dataType === 'stylesheet') {
        options.cache = true;
    }
});

/**
 * Make case insensetive :contains() possible
 */
jQuery.expr[':'].containsci = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

let lssm = {
    config: {
        //server: "https://localhost/lss-manager-v3",
        server: "https://lss-manager.de/lss-entwicklung", // Domain wo alles liegt
        stats_uri: "https://proxy.lss-manager.de/v3/stat.php",
        forum_link: "https://forum.leitstellenspiel.de/index.php/Thread/11166-LSS-MANAGER-V3/",
        key_link: "/profile/external_secret_key/", // Domain wo alles liegt
        version: "3.3.6",
        github: 'https://github.com/LSS-Manager/lss-manager-v3',
        prefix: 'lssm',
        game: window.location.hostname.toLowerCase().replace("www.",""),
    },
    loadScript: function (link, no_cache=false) {
        try {
            $.getScript(this.getlink(link, no_cache));
        } catch (e) {
            console.error("On script load: " + e.message);
        }
    },
    loadStyle: function (link, no_cache=false) {
        try {
            $('body').append('<link href="' + this.getlink(link, no_cache) + '" rel="stylesheet" type="text/css">');
        } catch (e) {
            console.error("On script load: " + e.message);
        }
    },
    getlink: function (file, no_cache=false) {
        try {
            let uid = "";
            let game = "";
            if (typeof user_id !== "undefined") {
                game = window.location.hostname.toLowerCase().replace("www.", "").split(".")[0];
            }
            uid = "?uid=" + game + user_id;
            return this.config.server + file + uid + (no_cache ? `&_=${new Date().getTime()}` : '');
        } catch (e) {
            console.error("On script load: " + e.message);
        }
    },
    key: null,
    buildings: {},
    vehicles: {},
};


/**
 * Localization
 */
I18n.defaultLocale = 'de';
// Initialize fallbacks
I18n.fallbacks = true;
I18n.locales.de = ['de', 'en', 'eu', 'fj'];
I18n.locales.nl = ['nl', 'en', 'eu', 'fj', 'de'];
I18n.locales.es = ['es', 'en', 'eu', 'fj', 'de'];
I18n.locales.pl_PL = ['pl_PL', 'en', 'eu', 'fj', 'de'];
I18n.locales.sv_SE = ['sv_SE', 'en', 'eu', 'fj', 'de'];
I18n.locales.it_IT = ['it_IT', 'en', 'eu', 'fj', 'de'];
// en, fj and eu are essentially the same.
I18n.locales.en = ['en', 'eu', 'fj', 'de'];
I18n.locales.fj = ['fj', 'en', 'eu', 'de'];
I18n.locales.eu = ['eu', 'en', 'fj', 'de'];

if (!I18n.translations.hasOwnProperty('de')) I18n.translations.de = {};
if (!I18n.translations.hasOwnProperty('en')) I18n.translations.en = {};
if (!I18n.translations.hasOwnProperty('fj')) I18n.translations.fj = {};
if (!I18n.translations.hasOwnProperty('eu')) I18n.translations.eu = {};
if (!I18n.translations.hasOwnProperty('es')) I18n.translations.es = {};
if (!I18n.translations.hasOwnProperty('pl_PL')) I18n.translations.pl_PL = {};
if (!I18n.translations.hasOwnProperty('sv_SE')) I18n.translations.sv_SE = {};
if (!I18n.translations.hasOwnProperty('it_IT')) I18n.translations.it_IT = {};
if (!I18n.translations.hasOwnProperty('nl')) I18n.translations.nl = {};
I18n.translations.de.lssm = {
    lssm: "LSS-Manager",
    version: "Stable",
    appstore: "APPSTORE",
    appstore_welcome: "Willkommen im Appstore vom LSS Manager",
    appstore_desc: "Hier findest du verschiedene Plugins, die dein Spielerlebnis bereichern sollen. Jedes Plugin " +
        "kann einzeln aktiviert werden, indem du den Hebel auf Grün stellst. Sollte es zu irgendwelchen Problemen " +
        "kommen, kannst du gerne zu uns in den <a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discord</a> " +
"kommen  oder <a href=\"https://forum.leitstellenspiel.de/index.php/Thread/11166-LSS-MANAGER-V3/" +
"\" target=\"blank\">im Forum einen Beitrag verfassen</a>.",
    back_lss: "Zurück zu Leitstellenspiel",
    settings: "Einstellungen",
    saving: "Speichere...",
    save: "Speichern",
    cantactivate: "kann nicht aktiviert werden, da es mit folgenden Modul(en) inkompatibel ist:",
    activated: "Folgende Module wurden aktiviert:",
    cantload: "<h2>LSS-Manager konnte nicht geladen werden</h2>Bitte kontaktiere ein Mitglied vom Entwicklerteam.",
    login: "Bitte zuerst anmelden",
    mapkit: "Dieses Modul unterstützt kein Mapkit",
    apps: {}
};
I18n.translations.en.lssm = {
    appstore_welcome: "Welcome to the Appstore of LSS Manager",
    appstore_desc: "Here you will find various plugins that will enrich your playing experience. Each plugin can be " +
        "activated individually by placing the lever on green. If there are any problems, you can join our " +
        "<a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discord</a> or " +
        "<a href=\"http://board.missionchief.com/index.php/Thread/146-LSS-Manager-for-missionchief/" +
        "\" target=\"blank\">write a message in the forum</a>.",
    back_lss: "Back to missionchief",
    settings: "Settings",
    saving: "Saving...",
    save: "Save",
    activated: "Following Modules have been activated:",
    cantactivate: "can't be activated as it's incompatible with the following modul(es):",
    cantload: "<h2>LSS-Manager could not be loaded</h2>Please contact a member of the development team.",
    login: "Please log in first",
    mapkit: "This module doesn't support Mapkit",
    apps: {}
};
I18n.translations.fj.lssm = {
    apps: {}
};
I18n.translations.eu.lssm = {
    apps: {}
};
I18n.translations.es.lssm = {
    appstore_welcome: "Bienvenido a la Appstore of LSS Manager",
    appstore_desc: "Aquí encontrarás varios plugins que enriquecerán tu experiencia de juego. Cada plugin puede ser " +
        "se activa individualmente colocando la palanca en verde. Si hay algún problema, puedes unirte a nuestro " +
        "<a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discord</a> o " +
        "<a href=\"http://board.missionchief.com/index.php/Thread/146-LSS-Manager-for-missionchief/" +
        "\" target=\"blank\">escribir un mensaje en el foro</a>.",
    back_lss: "Back to cendro de mando",
    settings: "Ajustes",
    saving: "Guardar....",
    save: "Guardar",
    activated: "Se han activado los siguientes módulos:",
    cantactivate: "no se puede activar porque es incompatible con lo siguiente módul(os):",
    cantload: "<h2>El LSS-Manager no se ha podido cargar</h2>Póngase en contacto con un miembro del equipo de desarrollo.",
    login: "Por favor, identifíquese primero",
    mapkit: "Este módulo no soporta Mapkit",
    apps: {}
};
I18n.translations.pl_PL.lssm = {
    appstore_welcome: "Witamy w sklepie Appstore Menadżera LSS.",
    appstore_desc: "Tutaj znajdziesz różne wtyczki, które wzbogacą Twoje wrażenia z gry. Każda wtyczka może być " +
        "aktywowane indywidualnie poprzez umieszczenie dźwigni na zielono. Jeśli są jakieś problemy, możesz przyłączyć się do naszego " +
        "<a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discord</a> lub " +
        "<a href=\"http://board.missionchief.com/index.php/Thread/146-LSS-Manager-for-missionchief/" +
        "\" target=\"blank\">napisać wiadomość na forum</a>.",
    back_lss: "Powrót do gry",
    settings: "Ustawienia",
    saving: "Oszczędzanie....",
    save: "Oszczędzaj.",
    activated: "Następujące moduły zostały aktywowane:",
    cantactivate: "nie może być aktywowany, ponieważ jest niezgodny z poniższymi modułami:",
    cantload: "<h2>LSS-Manager nie może być załadowany.</h2>Prosimy o kontakt z członkiem zespołu ds. rozwoju.",
    login: "Proszę się najpierw zalogować.",
    mapkit: "Ten moduł nie obsługuje pakietu Mapkit.",
    apps: {}
};
I18n.translations.sv_SE.lssm = {
    appstore_welcome: "Välkommen till Appstore of LSS Manager",
    appstore_desc: "Här hittar du olika plugins som berikar din spelupplevelse. Varje plugin kan vara" +
        "aktiveras individuellt genom att placera spaken på grönt. Om det finns några problem kan du gå med i vår" +
        "<a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discord</a> eller " +
        "<a href=\"http://board.missionchief.com/index.php/Thread/146-LSS-Manager-for-missionchief/" +
        "\" target=\"blank\">skriva ett meddelande i forumet</a>.",
    back_lss: "tillbaka till spel",
    settings: "inställningar",
    saving: "Sparande...",
    save: "Spara",
    activated: "Följande moduler har aktiverats:",
    cantactivate: "kan inte aktiveras eftersom det är oförenligt med följande moduler:",
    cantload: "<h2>LSS-Manager kunde inte laddas</h2>Kontakta en medlem i utvecklingsgruppen.",
    login: "Snälla logga in först",
    mapkit: "Den här modulen stöder inte Mapkit",
    apps: {}
};
I18n.translations.it_IT.lssm = {
    appstore_welcome: "Benvenuti nell'Appstore di LSS Manager",
    appstore_desc: "Qui troverete vari plugin che arricchiranno la vostra esperienza di gioco. Ogni plugin può essere " +
        "attivabile singolarmente posizionando la leva su verde. Se ci sono dei problemi, puoi unirti al nostro " +
        "<a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discordia</a> ovvero " +
        "<a href=\"http://board.missionchief.com/index.php/Thread/146-LSS-Manager-for-missionchief/" +
        "\" target=\"blank\">scrivere un messaggio nel forum</a>.",
    back_lss: "Torna al gioco",
    settings: "Impostazioni",
    saving: "Salvataggio...",
    save: "Salva",
    activated: "I seguenti moduli sono stati attivati:",
    cantactivate: "non può essere attivato in quanto incompatibile con i seguenti moduli:",
    cantload: "<h2>LSS-Manager non può essere caricato</h2>Contattare un membro del team di sviluppo.",
    login: "Effettua il login per prima cosa",
    mapkit: "Questo modulo non supporta Mapkit",
    apps: {}
};
I18n.translations.nl.lssm = {
    appstore_welcome: "Welkom bij de App Store van LSS Manager",
    appstore_desc: "Hier vindt u verschillende plug-ins die uw game-ervaring kunnen verbeteren. " +
        "Elke plugin kan individueel worden geactiveerd, de bijbehorende hendel op groen te zetten. Als er problemen zijn, " +
        "bent u van harte welkom om naar ons toe te komen in de <a href=\"https://discord.gg/RcTNjpB\" target=\"blank\">Discord</a>"+
        " of <a href=\"https://forum.meldkamerspel.com/index.php/Thread/52-LSS-Manager-for-meldkamerspel/" +
        "\" target=\"blank\">een bericht te plaatsen in ons onderwerp op het forum.</a>.",
    back_lss: "Terug naar Meldkamerspel",
    settings: "Instellingen",
    saving: "Wijzigingen aan het opslaan...",
    save: "Opslaan",
    activated: "De volgende modules zijn geactiveerd:",
    cantactivate: "Kan niet worden geactiveerd omdat deze lssm_module niet samenwerkt met de volgende lssm_module(s):",
    mapkit: "Deze module ondersteunt Mapkit niet",
    apps: {}
};

/**
 * Add the modules to lssm
 */
lssm.Module = {
    keyboardAlert: {
        name: {
            de: 'Keyboard Alarmierung',
            en: 'Callview control',
            es: 'Control de Callview',
            pl_PL: 'Sterowanie podglądem wywołań',
            sv_SE: 'Samtalskontroll',
            it_IT: 'Controllo Callview',
            nl: 'Besturing met toetsenbord'
        },
        active: false,
        description: {
            de: 'Einsatzmaske mit Tastatur steuern.',
            en: 'Control the mission view with the keyboard.',
            es: 'Controle la vista de misión con el teclado.',
            pl_PL: 'Kontroluj widok misji za pomocą klawiatury.',
            sv_SE: 'Kontrollera uppdragsvyn med tangentbordet.',
            it_IT: 'Controlla la vista missione con la tastiera.',
            nl: 'Bestuur het meldingscherm met het toetsenbord.'
        },
        source: '/modules/lss-keyboardAlert/lss-keyboardAlert.user.js',
        inframe: true
    },
    tailoredTabs: {
        name: {
            de: 'Maßgeschneiderte Tabs'
        },
        active: false,
        description: {
            de: 'Das Plugin ermöglicht es, weitere Tabs zur Trennung von Fahrzeug-Typen im Alarmierungsfenster einzustellen.'
        },
        source: '/modules/lss-TailoredTabs/TailoredTabs.user.js',
        inframe: true,
        supportedLocales: ['de']
    },
    Layout01: {
        name: {
            de: 'Layout 01'
        },
        active: false,
        description: {
            de: 'Ansicht mit großer Karte - Einsätze & Co mit Menu durchschaltbar. Eine Badge wie bei den ' +
                'Nachrichten zeigt die Einsäte/Nachrichten/Funksprüche seit dem letzten Aufruf des jeweiligen ' +
                'Fensters im Menu.',
            en: 'View with main focus on the map. Missions and other windows can be changed using a menu. A badge ' +
                'is telling you how many missions etc. you have since your last visit within that window.',
            es: 'Ver con el foco principal en el mapa. Las misiones y otras ventanas se pueden cambiar usando un menú. Una insignia ' +
                'te dice cuántas misiones, etc. tienes desde tu última visita dentro de esa ventana.',
            pl_PL: 'Widok z głównym naciskiem na mapę. Misje i inne okna można zmieniać za pomocą menu. Odznaka informuje, ile misji itp.' +
                ' masz od ostatniej wizyty w tym oknie.',
            sv_SE: 'Visa med huvudfokus på kartan. Uppdrag och andra fönster kan ändras med en meny. Ett märke säger hur många ' +
                'uppdrag etc. du har sedan ditt senaste besök i det fönstret.',
            it_IT: 'Vista con focus principale sulla mappa. Le missioni e le altre finestre possono essere modificate utilizzando un menu. Un distintivo ' +
                'ti dice quante missioni ecc.hai avuto dall\'ultima visita all\'interno di quella finestra.',
            nl: 'Design met een extra grote kaartweergave aan de linkerkant. Aan de rechterkant van het scherm kan ' +
                'met menuknoppen tussen de andere schermen gewisseld worden. Een teller houdt het aantal bericheten en ' +
                'meldingen voor je bij.'
        },
        source: '/modules/lss-layout-01/layout-01.user.js',
        collisions: ['Layout02', 'Layout03', 'Layout04']
    },
    Layout02: {
        name: {
            de: 'Layout 02'
        },
        active: false,
        description: {
            de: 'Ansicht mit 100% Karte im oberen Bereich - darunter die vier Fenster Einsätze, Gebäude, Chat & ' +
                'Funksprüche.',
            en: 'View with 100% map at the upper area - below that the four windows calls, buildings, chat and radio.',
            es: 'Ver con el mapa 100% en la parte superior - debajo de que las cuatro ventanas de llamadas, edificios, chat y radio.',
            pl_PL: 'Widok z mapą w 100% na górnym obszarze - poniżej, że cztery okna wywołują, budynki, czat i radio.',
            sv_SE: 'Visa med 100% karta i det övre området - nedanför att de fyra fönstren samtal, byggnader, chat och radio.',
            it_IT: 'Visualizza con la mappa al 100% nella parte superiore - sotto che le quattro finestre chiama, edifici, chat e radio.',
            nl: 'Design met een grote kaart bovenaan je scherm. onder de kaart zijn de vier overige schermen; ' +
                'meldingen, gebouwen, chat en statusmeldingen weergegeven.'
        },
        ghuser: 'lostdesign',
        source: '/modules/lss-layout-02/layout-02.user.js',
        collisions: ['Layout01', 'Layout03', 'Layout04']
    },
    Layout03: {
        name: {
            de: 'Layout 03'
        },
        active: false,
        description: {
            de: 'Layout ohne Karte. Die vier Fenster werden über die ganze Höhe dargestellt.',
            en: 'Layout without map. The four windows are using 100% of the given browser height.',
            es: 'Plano sin mapa. Las cuatro ventanas utilizan el 100% de la altura del navegador.',
            pl_PL: 'Układ bez mapy. Cztery okna korzystają w 100% z danej wysokości przeglądarki.',
            sv_SE: 'Layout utan karta. De fyra fönstren använder 100% av den angivna webbläsarens höjd.',
            it_IT: 'Layout senza mappa. Le quattro finestre utilizzano il 100% dell\'altezza del browser.',
            nl: 'Design zonder kaart. De vier overige schermen vullen het gehele scherm.'
        },
        source: '/modules/lss-layout-03/layout-03.user.js',
        collisions: ['Layout01', 'Layout02', 'Layout04', 'FMS5InMap']
    },
    Layout04: {
        name: {
            de: 'Layout 04'
        },
        active: false,
        description: {
            de: 'Karte im linken Bereich auf 100% Höhe. Rechts davon die Einsätze auf voller breite - alle ' +
                'Einsatzarten werden in jeweils einer Spalte dargestellt. Darunter Gebäude, Chat und Funk.',
            en: 'Map with 100% height on the left side. Next to it the calls, each category in its own column. ' +
                'Below that the buildings, chat and radio.',
            es: 'Mapa con 100% de altura a la izquierda. A su lado las llamadas, cada categoría en su propia columna. ' +
                'Debajo de los edificios, chat y radio.',
            pl_PL: 'Mapa z 100% wysokością po lewej stronie. Obok znajdują się wywołania, każda kategoria w swojej własnej ' +
                'kolumnie. Poniżej znajdują się budynki, czat i radio.',
            sv_SE: 'Karta med 100% höjd på vänster sida. Bredvid den samtal, varje kategori i sin egen kolumn. Under det finns byggnaderna, chatten och radio.',
            it_IT: 'Mappa con il 100% di altezza sul lato sinistro. Accanto ad esso le chiamate, ogni categoria nella propria colonna. ' +
                'Sotto gli edifici, chiacchierata e radio.',
            nl: 'Design met een langwerpige kaart aan de linkerzijde van het scherm. Daarnaast een groot overzicht ' +
                'van de meldingen en daaronder hebben de overige schermen een eigen kolom'
        },
        source: '/modules/lss-layout-04/layout-04.user.js',
        collisions: ['Layout01', 'Layout02', 'Layout03']
    },
    DoctorRadioCall: {
        name: {
            de: 'NEF Nachforderung per FMS',
            en: 'HEMS request in radio',
            nl: 'Spraakaanvraag voor MMT'
        },
        active: false,
        description: {
            de: 'Bei NEF Nachforderung wird ein Sprechwunsch im Funk angezeigt.',
            en: 'Issues a radio call if HEMS is required.',
            nl: 'Spraakaanvraag weergeven indien MMT benodigd is.'
        },
        source: '/modules/lss-doctor-radio-call/DoctorRadioCall.user.js',
        develop: false
    },
    MissionOut: {
        name: {
            de: 'MissionOut',
            pl_PL: 'MisjaOut',
            it_IT: 'MissioneOut',
            nl: 'Meldingen inklappen'
        },
        active: false,
        description: {
            de: 'Alle Einsätze ein/ausklappen oder für jeden Einsatz einzeln.',
            en: 'Minimize mission list entries. You can either expand or minimize all calls at once or do it for ' +
                'each one.',
            es: 'Minimizar las entradas de la lista de misiones. Puede desglosar o minimizar todas las llamadas a ' +
                'la vez o hacerlo para cada una de ellas.',
            pl_PL: 'Minimalizacja wpisów na liście misji. Możesz albo rozszerzyć lub zminimalizować wszystkie połączenia' +
                ' jednocześnie, albo zrobić to dla każdego z nich.',
            sv_SE: 'Minimera poster i uppdragslistan. Du kan antingen expandera eller minimera alla samtal samtidigt eller göra det för var och en.',
            it_IT: 'Ridurre al minimo le voci dell\'elenco delle missioni.È possibile espandere o ridurre al minimo tutte ' +
                'le chiamate in una sola volta o farlo per ciascuna di esse.',
            nl: 'Verkleint de meldingen in de lijst. Je kunt alle meldingen verkleint weergeven of per melding kiezen.'
        },
        source: '/modules/lss-MissionOut/MissionOut.user.js',
        develop: false
    },
    saveVGE: {
        name: {
            de: 'Eigene VGE speichern',
            en: 'Save created alliance calls',
            es: 'Guardar llamadas de alianza creadas',
            pl_PL: 'Zapisz utworzone połączenia sojusznicze',
            sv_SE: 'Spara skapade allianssamtal',
            it_IT: 'Salvare le chiamate all\'alleanza create',
            nl: 'Zelfgemaakte inzetten opslaan.'
        },
        active: false,
        description: {
            de: 'Funktion um selbst erstellte VGE zu speichern.',
            en: 'Enables a function to save own created mission calls to use them as template.',
            es: 'Habilita una función para guardar las llamadas de misión creadas por el usuario y utilizarlas como plantilla.',
            pl_PL: 'Umożliwia zapisywanie własnych wywołań misji w celu wykorzystania ich jako szablonu.',
            sv_SE: 'Aktiverar en funktion för att spara egna skapade uppdragssamtal för att använda dem som mall.',
            it_IT: 'Abilita una funzione per salvare le proprie chiamate di missione create per usarle come modello.',
            nl: 'Maakt het mogelijk om zelfgemaakte inzetten op te slaan als sjabloon om ze later te gebruiken.'
        },
        source: '/modules/lss-saveVGE/saveVGE.user.js',
        develop: false
    },
    releaseNotes: {
        name: {
            de: 'Release Notes',
            en: 'Release Notes'
        },
        active: false,
        inframe: false,
        description: {
            de: 'Informiert immer über die Neusten Updates im LSSM',
            en: 'Provides information about the latest updates in LSSM'
        },
        source: '/modules/lss-releasenotes/Releasenotes.user.js',
        develop: false
    },
    vonginator: {
        name: {
            de: 'Vonginator',
            en: 'Vonginator'
        },
        active: false,
        inframe: true,
        description: {
            de: 'Hallo i bims. 1 total sinnlose Skript vong Bedeutung her. lol',
            en: 'Not seriously meant script for german language only.'
        },
        source: '/modules/lss-vonginator/Vonginator.user.js',
        supportedLocales: ['de'],
        develop: false
    },
    Notification_Alert: {
        name: {
            de: 'Notification Alert',
            es: 'Alerta de notificación',
            pl_PL: 'Powiadomienie o zagrożeniu',
            sv_SE: 'Meddelande varning',
            it_IT: 'Allarme di notifica',
            nl: 'Browsermeldingen'
        },
        active: false,
        description: {
            de: 'Zeigt eine HTML-5 Notification an sobald ein Status oder eine Nachricht eingegangen ist. ' +
                '(ChatPoput included)',
            en: 'HTML5 Chatnotifications using the browser notificationsystem.',
            es: 'Chatnotificaciones HTML5 utilizando el sistema de notificaciones del navegador.',
            pl_PL: 'HTML5 Powiadomienia czatowe z wykorzystaniem systemu powiadamiania w przeglądarce.',
            sv_SE: 'HTML5 Chatnotifieringar med hjälp av webbläsarens aviseringssystem.',
            it_IT: 'Chatnotifications HTML5 utilizzando il sistema di notifiche del browser.',
            nl: 'Toon HTML5 chatnotificaties met behulp van het notificatiesysteem van je browser zodat je nooit ' +
                'meer een chat of melding hoeft te missen.'
        },
        source: '/modules/lss-notification_alert/Notification_alarm.user.js',
        develop: false
    },
    Redesign01: {
        name: {
            de: 'Redesign 01'
        },
        active: false,
        description: {
            de: 'Neues Design für die Oberfläche',
            en: 'New design for the game.',
            es: 'Nuevo diseño para el juego.',
            pl_PL: 'Nowy projekt gry.',
            sv_SE: 'Ny design för spelet.',
            it_IT: 'Nuovo design per il gioco',
            nl: 'Een nieuw uiterlijk voor het spel.'
        },
        source: '/modules/lss-redesign-01/redesign-01.user.js',
        develop: false
    },
    Eventsmission: {
        name: {
            de: 'Markiert Eventeinsätze',
            en: 'Marked events',
            es: 'Eventos marcados',
            pl_PL: 'Zdarzenia oznaczone',
            sv_SE: 'Markerade händelser',
            it_IT: 'Eventi contrassegnati',
            nl: 'Merken gebeurtenissen'
        },
        active: false,
        inframe: true,
        description: {
            de: 'Zeigt die Aktuellen Eventeinsätze an mit Großgeschriebenen ZEILEN!',
            en: 'Displays the current events with capitalized LINE!',
            es: 'Muestra los eventos actuales con LÍNEA en mayúsculas!',
            pl_PL: 'Wyświetla bieżące zdarzenia z skapitalizowaną linią!',
            sv_SE: 'Visar aktuella händelser med aktiverad LINE!',
            it_IT: 'Visualizza gli eventi attuali con LINEA maiuscola!',
            nl: 'Toont de actuele gebeurtenissen met hoofdlettercode LINE!'
        },
        source: '/modules/lss-eventmissions/eventmission.user.js',
        develop: false
    },
    DestinationFilter: {
        name: {
            de: 'Zielort Filter',
            en: 'Destination filter',
            es: 'Filtro de destino',
            pl_PL: 'Filtr miejsca przeznaczenia',
            sv_SE: 'Destinationsfilter',
            it_IT: 'Filtro di destinazione',
            nl: 'Bestemming Filter'
        },
        active: false,
        description: {
            de: 'Ermöglicht es, belegte oder ungeeignete Zielorte bei Sprechwünschen auszublenden',
            en: 'Allows you to hide busy or inappropriate destinations for speech requests',
            es: 'Le permite ocultar destinos ocupados o inapropiados para las peticiones de voz.',
            pl_PL: 'Umożliwia ukrywanie zajętych lub nieodpowiednich miejsc docelowych dla zapytań głosowych.',
            sv_SE: 'Gör att du kan dölja upptagen eller olämpliga destinationer för talbegäranden',
            it_IT: 'Consente di nascondere le destinazioni occupate o inappropriate per le richieste vocali.',
            nl: 'Hiermee kunt u drukke of ongeschikte bestemmingen voor spraakverzoeken verbergen.'
        },
        source: '/modules/lss-destinationFilter/DestinationFilter.user.js',
        inframe: true
    },
    FMS5InMap: {
        name: {
            de: 'FMS 5 in der Karte',
            en: 'Request transport in map',
            es: 'Solicitar transporte en el mapa',
            pl_PL: 'Żądanie transportu na mapie',
            sv_SE: 'Begär transport på kartan',
            it_IT: 'Richiedi trasporto sulla mappa',
            nl: 'Spraakaanvragen op de kaart weergeven.'
        },
        active: false,
        description: {
            de: 'Zeigt alle FMS 5 in der Karte an.',
            en: 'Shows request transports within the map lower left corner.',
            es: 'Muestra los transportes de la solicitud en la esquina inferior izquierda del mapa.',
            pl_PL: 'Pokazuje transporty żądań w lewym dolnym rogu mapy.',
            sv_SE: 'Visar begärtransporter inom kartan nedre vänstra hörnet.',
            it_IT: 'Mostra la richiesta di trasporto all\'interno della mappa in basso a sinistra.',
            nl: 'Toont alle spraakaanvragen op de kaart.'
        },
        source: '/modules/lss-FMS5InMap/FMS5InMap.user.js',
        collisions: ['Layout03', 'WachenplanungOnMap'],
        nomapkit: true,
    },
    Clock: {
        name: {
            de: 'Clock',
            pl_PL: 'Zegar',
            sv_SE: 'Klocka',
            it_IT: 'orologio',
            nl: 'Klok'
        },
        active: false,
        description: {
            de: 'Zeigt eine Uhr in der Karte an.',
            en: 'Enables a small clock within the map.',
            es: 'Activa un pequeño reloj dentro del mapa.',
            pl_PL: 'Włącza mały zegar na mapie.',
            sv_SE: 'Aktiverar en liten klocka på kartan.',
            it_IT: 'Abilita un piccolo orologio all\'interno della mappa.',
            nl: 'Toont een kleine klok op de kaart.'
        },
        source: '/modules/lss-clock/clock.user.js',
        nomapkit: true,
    },
    WachenplanungOnMap: {
        name: {
            de: 'Wachenplanung auf der Karte',
            en: 'Station management on map',
            nl: 'Gebouwplanning op de kaart.'
        },
        active: false,
        description: {
            de: 'Zeichnet Kreise im Radius X um deine Wachen. Der Radius kann selbst bestimmt werden & die ' +
                'Gebäude sind wählbar.',
            en: 'Draws circles around buildings with your chosen radius in kilometer. You can also filter for ' +
                'specific buildings.',
            nl: 'Toont cirkels met een zelf in te stellen radius rondom gebouwen. Je kunt ook filteren op specifieke ' +
                'gebouwen.'
        },
        source: '/modules/lss-WachenplanungOnMap/WachenplanungOnMap.user.js',
        collisions: ['Layout03', 'FMS5InMap', 'heatmap'],
        nomapkit: true,
        supportedLocales: ['de']
    },
    allianceMissionlistShare: {
        name: {
            de: 'Einsätze freigeben',
            en: 'Mission share',
            es: 'Porcentaje correspondiente a la misión',
            pl_PL: 'Udział w misji',
            sv_SE: 'Uppdragsandel',
            it_IT: 'Quota di missione',
            nl: 'Meldingen vrijgeven'
        },
        active: false,
        description: {
            de: 'Mit einem klick in der Übersicht, ohne den Einsatz zu öffnen, freigeben.',
            en: 'Instantly share missions without opening the call by clicking a button in the overview.',
            es: 'Comparte misiones al instante sin abrir la llamada haciendo clic en un botón de la vista general.',
            pl_PL: 'Natychmiast udostępniaj misje bez otwierania połączenia, klikając przycisk w przeglądzie.',
            sv_SE: 'Dela direkt uppdrag utan att öppna samtalet genom att klicka på en knapp i översikten.',
            it_IT: 'Condividi immediatamente le missioni senza aprire la chiamata cliccando su un pulsante nella panoramica.',
            nl: 'Vanuit het hoofdscherm gemakkelijk meldingen vrijgeven in je team met behulp van een extra knop in ' +
                'de meldingenlijst.'
        },
        source: '/modules/lss-allianceMissionlistShare/allianceMissionlistShare.user.js',
        develop: false
    },
	ShareAlliancePost: {
        name: {
            de: 'Alarmieren, Teilen & Posten',
            en: 'Alert, Share & Post',
            es: 'Alerta, Compartir y Publicar',
            pl_PL: 'Alerty, akcje i poczta',
            it_IT: 'Allarme, condivisione e pubblicazione',
            nl: 'Alarmeren, delen & Posten'
        },
        active: false,
        description: {
            de: 'Fügt einen zusätzlichen Button ein, mit dem man Alarmieren, Freizugeben und vordefinierte Nachrichten im Chat posten kann. In nur einem Schritt!',
            en: 'Adds a new button for alerting, sharing and posting predefined messages to the chat. In just one step!',
            es: 'Añade un nuevo botón para alertar, compartir y publicar mensajes predefinidos en el chat. En un solo paso!',
            pl_PL: 'Dodaje nowy przycisk ostrzegania, udostępniania i publikowania predefiniowanych wiadomości na czacie. W jednym kroku!',
            sv_SE: 'Lägger till en ny knapp för att varna, dela och posta fördefinierade meddelanden till chatten. På bara ett steg!',
            it_IT: 'Aggiunge un nuovo pulsante per avvisare, condividere e inviare messaggi predefiniti alla chat. In un solo passo!',
            nl: 'Voeg een nieuwe knop toe voor alarmeren, delen en een vooraf ingesteld bericht in de chat posten. In slechts één stap!'
        },
        source: '/modules/lss-shareAlliancePost/ShareAlliancePost.js',
        inframe: true
    },
    searchMissions: {
        name: {
            de: 'Einsätze suchen',
            en: 'Mission search',
            es: 'Búsqueda de misiones',
            pl_PL: 'Poszukiwanie misji',
            sv_SE: 'Uppdragssökning',
            it_IT: 'Ricerca per missione',
            nl: 'Meldingen doorzoeken'
        },
        active: false,
        description: {
            de: 'In der Übersicht Einsätze suchen & filtern. In der Alarmmaske diese Liste mit Buttons durchgehen.',
            en: 'Search for calls & filter them - a group of buttons on the bottom lets you change searched missions ' +
                'quickly.',
            es: 'Buscar llamadas y filtrarlas - un grupo de botones en la parte inferior le permite cambiar rápidamente ' +
                ' las misiones buscadas.',
            pl_PL: 'Wyszukiwanie połączeń i filtrowanie ich - grupa przycisków na dole pozwala szybko zmieniać wyszukiwane misje.',
            sv_SE: 'Sök efter samtal och filtrera dem - en grupp knappar längst ner låter dig snabbt ändra sökta uppdrag.',
            it_IT: 'Cerca le chiamate e filtrale - un gruppo di pulsanti in basso ti permette di cambiare rapidamente le missioni cercate.',
            nl: 'In het overzicht meldingen zoeken en filteren. Een rij knoppen aan de onderkant van het scherm laat ' +
                'je snel door je meldingen bladeren.'
        },
        source: '/modules/lss-searchMissions/searchMissions.user.js',
        develop: false
    },
    dashboard: {
        name: {
            de: 'Dashboard'
        },
        active: false,
        description: {
            de: 'Dashboard',
            en: 'Dashboard',
            nl: 'Een Dashboard waarin je een duidelijk overzicht krijgt van je gebouwen en voertuigen.'
        },
        source: '/modules/lss-dashboard/dashboard.user.js',
        develop: false
    },
    WachenHoverStati: {
        name: {
            de: 'Wachen Status',
            en: 'Station status',
            es: 'Estado de la estación',
            pl_PL: 'Status stacji',
            sv_SE: 'Stationsstatus',
            it_IT: 'Stato stazione',
            nl: 'Voertuigstatus bij gebouwen'
        },
        active: false,
        description: {
            de: 'Zeigt beim drüberfahren einer Wache auf der Karte die Status der Fahrzeuge an.',
            en: 'Shows the code of vehicles on station hover on the map.',
            es: 'Muestra el código de los vehículos en la estación y pasa el puntero del ratón sobre el mapa.',
            pl_PL: 'Pokazuje kod pojazdów na stacji na mapie.',
            sv_SE: 'Visar fordonskoden på stationen på muspekaren på kartan.',
            it_IT: 'Mostra il codice dei veicoli sulla stazione di hover stazione sulla mappa',
            nl: 'Toont de status van voertuigen van een gebouw als je je muis boven het gebouw houdt.'
        },
        source: '/modules/lss-WachenHoverStati/WachenHoverStati.user.js',
        nomapkit: true,
    },
    RenameFZ: {
        name: {
            de: 'Fahrzeuge umbenennen',
            en: 'Rename vehicle',
            es: 'Renombrar vehículo',
            pl_PL: 'Zmiana nazwy pojazdu',
            sv_SE: 'Byt namn på fordon',
            it_IT: 'Rinominare il veicolo',
            nl: 'Voertuigen herbenoemen'
        },
        active: false,
        description: {
            de: 'Alle Fahrzeuge einer Wache oder einer Leitstelle nach dem selben System benennen.',
            en: 'Rename vehicles in bulk using tags.',
            es: 'Cambie el nombre de los vehículos a granel utilizando etiquetas.',
            pl_PL: 'Zmiana nazwy pojazdów luzem za pomocą identyfikatorów.',
            sv_SE: 'Byt namn på fordon i bulk med taggar.',
            it_IT: 'Rinominare i veicoli alla rinfusa utilizzando i tag',
            nl: 'Maakt het makkelijk om grote hoeveelheiden voertuigen snel van een nieuwe naam te voorzien met ' +
                'behulp van tags.'
        },
        source: '/modules/lss-RenameFZ/renameFZ.user.js',
        inframe: true,
        develop: false,
        needVehicles: true,
        needBuildings: true
    },
    telemetry: {
        name: {
            de: 'Telemetrie',
            en: 'Telemetry',
            pl_PL: 'Telemetria',
            nl: 'Telemetrie'
        },
        active: true,
        description: {
            de: 'Sendet Daten an das Entwicklerteam zur Erstellung einer Statistik',
            en: 'Sends data to the developer team for the purpose of creating a statistic',
            es: 'Envía datos al equipo de desarrolladores con el fin de crear una estadística.',
            pl_PL: 'Wysyła dane do zespołu programistów w celu stworzenia statystyk.',
            sv_SE: 'Skickar data till utvecklargruppen i syfte att skapa en statistik',
            it_IT: 'Invia i dati al team di sviluppo allo scopo di creare una statistica.',
            nl: 'Stuurt gegevens naar het developmentteam om statistieken te kunnen gebruiken.'
        },
        source: '/modules/telemetry/telemetry.user.js',
        noapp: true, // Nicht im App-Store auflisten
        develop: false
    },
    mapreload: {
        name: {
            de: 'Map Reload',
            nl: 'Kaart opnieuw laden'
        },
        active: true,
        description: {
            de: '-',
        },
        source: '/modules/lss-mapReload/mapreload.user.js',
        noapp: true, // Nicht im App-Store auflisten
        develop: false
    },
    showBackAlarmAbove: {
        name: {
            de: 'show Back Alarm Above',
            en: 'show Back Alarm Above',
            es: 'Mostrar atrás Alarma Arriba',
            pl_PL: 'pokażemy Wsteczny Alarm Powyżej',
            sv_SE: 'visa Tillbaka larm ovan',
            it_IT: 'mostra l\'allarme posteriore soprastante',
            nl: 'Extra annuleerknop'
        },
        active: false,
        description: {
            de: 'Zeigt den Alle Rückalarmieren Button auch überhalb der Fahrzeuge an',
            en: 'Shows the All back alarm button also above the vehicles',
            es: 'Muestra el botón de alarma All back también por encima de los vehículos',
            pl_PL: 'Pokazuje przycisk Wszystkie wsteczne alarmy również nad pojazdami.',
            sv_SE: 'Visar larmknappen bakåt också ovanför fordonen',
            it_IT: 'Shows the All back alarm button also above the vehicles',
            nl: 'Voegt een extra annuleerknop toe bovenaan de voertuiglijst.'
        },
        source: '/modules/lss-showBackAlarmAbove/showBackAlarmAbove.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: true,
        develop: false
    },
    AaoSearch: {
        name: {
            de: 'AAO-Suche',
            en: 'AAO-Search',
            es: 'AAO-Buscar',
            pl_PL: 'AAO-Szukanie',
            it_IT: 'Ricerca AAO',
            nl: 'AUR-zoekfuncties'
        },
        active: false,
        description: {
            de: 'Packt alle AAO\'s in ein durchsuchbares dropdown',
            en: 'Packs all AAO\'s into a searchable dropdown',
            es: 'Empaqueta todos los AAO en un menú desplegable que permite realizar búsquedas',
            pl_PL: 'Pakuje wszystkie AAO w przeszukiwalny dropdown',
            sv_SE: 'Packar alla AAO: er i en sökbar rullgardinsmeny',
            it_IT: 'Confeziona tutti gli AAO in un menu a tendina ricercabile.',
            nl: 'Maakt het mogelijk om de Alarm en Uitrukregels te doorzoeken met een dropdownmenu.'
        },
        source: '/modules/lss-aao-search/aao-search.user.js',
        inframe: true,
        develop: false
    },
    heatmap: {
        name: {
            de: 'LS-Heatmap',
            en: 'LS-Heatmap',
            nl: 'Voertuigspreiding weergeven'
        },
        active: false,
        description: {
            de: 'Zeigt die Dichte bestimmter Fahrzeugtypen auf der Karte an, um Versorgungslücken zu identifizieren.',
            en: 'Shows the density of selectable vehicle types on map to identify supply gaps.',
            es: 'Muestra la densidad de los tipos de vehículos seleccionables en el mapa para identificar las brechas de suministro.',
            pl_PL: 'Pokazuje gęstość wybranych typów pojazdów na mapie w celu identyfikacji luk w dostawach.',
            sv_SE: 'Visar tätheten för valbara fordonstyper på kartan för att identifiera tillförselgap.',
            it_IT: 'Mostra la densità dei tipi di veicoli selezionabili sulla mappa per identificare i vuoti di approvvigionamento',
            nl: 'Maakt het mogelijk om de verspreiding per voertuigsoort te zien. Hiermee kun je zien waar je nog ' +
                'extra voertuigen nodig hebt voor optimale dekking van je inzetgebied.'
        },
        source: '/modules/lss-heatmap/LSHeatmap.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: false,
        collisions: ['Layout03', 'WachenplanungOnMap'],
        nomapkit: true,
    },
    centermap: {
        name: {
            de: 'Center-Map',
            en: 'Center-Map',
            pl_PL: 'Centrum-Mapa',
            it_IT: 'Centro-Mappa',
            nl: 'KAART CENTREREN'
        },
        active: false,
        description: {
            de: 'Zentriert die Karte beim Aufruf des Spiels und bei Knopfdruck. Genau so wie du es möchtest.',
            en: 'Centers the map on page load and on click. Just as you prefer.',
            es: 'Centra el mapa en la carga de la página y en el clic. Como usted prefiera.',
            pl_PL: 'Wyśrodkowuje mapę na stronie obciążenia i na kliknięciu. Tak jak sobie życzysz.',
            sv_SE: 'Centrerar kartan på sidladdningen och klickar. Precis som du föredrar.',
            it_IT: 'Centra la mappa sul caricamento della pagina e sul click. Proprio come preferisci.',
            nl: 'Maakt het mogelijk zelf de zoom en het bereik van de kaart in te stellen als je het spel opstart of door gebruik van de Centreer-knop'
        },
        source: '/modules/lss-centermap/Centermap.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: false,
        nomapkit: true,
    },
    missionHelper: {
        name: {
            de: 'Einsatzhelfer',
            en: 'Missionhelper',
            es: 'Missionhelper',
            pl_PL: 'Pomocnik misjonarza',
            nl: 'Meldinghelper'
        },
        active: false,
        description: {
            de: 'Zeigt benötigte Fahrzeuge an!.',
            en: 'Shows required vehicles in mission mask.',
            es: 'Muestra los vehículos requeridos en la máscara de la misión.',
            pl_PL: 'Pokazuje wymagane pojazdy w masce misji.',
            sv_SE: 'Visar nödvändiga fordon i uppdragsmask.',
            it_IT: 'Mostra i veicoli richiesti nella maschera di missione.',
            nl: 'Toont de benodigde voertuigen in het meldingscherm.'
        },
        source: '/modules/lss-missionHelper/missionHelper.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: true,
        develop: false
    },
    statusDispatching: {
        name: {
            de: 'Verbesserte Status 5',
            en: 'Enhanced transport requests',
            es: 'Solicitudes de transporte mejoradas',
            pl_PL: 'Zwiększone zapotrzebowanie na transport',
            sv_SE: 'Förbättrade transportförfrågningar',
            it_IT: 'Maggiori richieste di trasporto',
            nl: 'Verbeterde spraakaanvragen'
        },
        active: false,
        description: {
            de: 'Schnellere Abarbeitung von Status 5 Meldungen.',
            en: 'Faster processing of transport requests.',
            es: 'Procesamiento más rápido de las solicitudes de transporte.',
            pl_PL: 'Szybsze przetwarzanie wniosków transportowych.',
            sv_SE: 'Snabbare behandling av transportförfrågningar.',
            it_IT: 'Elaborazione più rapida delle richieste di trasporto.',
            nl: 'Sneller verwerken van spraakaanvragen.'
        },
        source: '/modules/lss-statusDispatching/statusDispatching.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: true,
        settings: {
            has: false,
            function_code: "statusDispatching_show_settings"
        }
    },
    managedSettings: {
        name: {
            de: 'Einstellungen',
            en: 'Settings',
            pl_PL: 'Ustawienia',
            sv_SE: 'inställningar',
            it_IT: 'Impostazioni',
            es: 'Ajustes',
        },
        active: true,
        description: {
            de: 'Globale Einstellungen',
            en: 'Global Settings',
            pl_PL: 'Ustawienia globalne',
            sv_SE: 'Globala inställningar',
            it_IT: 'Impostazioni globali',
            es: 'Parametrizaciones globales',
        },
        source: '/modules/lss-managedsettings/ManagedSettings.user.js',
        noapp: true, // Nicht im App-Store auflisten
        inframe: true,
        develop: false
    },
    missionKeyword: {
        name: {
            de: 'Einsatzstichworte',
            en: 'Mission Keywords',
            es: 'Palabras clave de la misión',
            pl_PL: 'Słowa kluczowe misji',
            sv_SE: 'Uppdrag Nyckelord',
            it_IT: 'Parole chiave della missione',
            nl: 'Steekwoorden bij meldingen'
        },
        active: false,
        description: {
            de: 'Anzeige von Stichworten bei Einsätzen. Die Stichworte orientieren sich weitgehend an denen ' +
                'für Bayern.',
            en: 'Shows keywords for missions. The keywords are oriented to those used in Bavaria.',
            es: 'Muestra las palabras clave de las misiones. Las palabras clave están orientadas a las que se utilizan en Baviera.',
            pl_PL: 'Pokazuje słowa kluczowe dla misji. Słowa kluczowe są zorientowane na słowa kluczowe używane w Bawarii.',
            sv_SE: 'Visar nyckelord för uppdrag. Nyckelorden är inriktade på de som används i Bayern.',
            it_IT: 'Mostra le parole chiave per le missioni. Le parole chiave sono orientate a quelle usate in Baviera.',
            nl: 'Toont steekwoorden bij de meldingen. Deze steekwoorden zijn grotendeels gebaseerd op de ' +
                'steekwoorden die in Nederlandse hulpverlening gebruikt worden.'
        },
        source: '/modules/lss-missionKeyword/missionKeyword.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: true,
        develop: false
    },
    missionDate: {
        name: {
            de: 'Meldedatum für Einsätze',
            en: 'Mission Date',
            es: 'Fecha de la misión',
            pl_PL: 'Data wyjazdu służbowego',
            sv_SE: 'Uppdragsdatum',
            it_IT: 'Data della missione',
            nl: 'Begintijd melding weergeven'
        },
        active: false,
        description: {
            de: 'Zeigt das Meldedatum und die vergangene Zeit seit Eingang an.',
            en: 'Shows the date when the mission was generated and the hours/minutes since then',
            es: 'Muestra la fecha en que se generó la misión y las horas/minutos transcurridos desde entonces.',
            pl_PL: 'Pokazuje datę wygenerowania misji i godziny/minutę od tego czasu.',
            sv_SE: 'Visar datum då uppdraget genererades och timmar / minuter sedan dess',
            it_IT: 'Mostra la data in cui la missione è stata generata e le ore/minuti da allora.',
            nl: 'Deze module toont de begintijd en -datum van je melding en laat daarnaast zien hoeveel tijd er ' +
                'verstreken is sinds de melding binnenkwam.'
        },
        source: '/modules/lss-missionDate/missionDate.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: true,
        develop: false
    },
    iconFilter: {
        name: {
            de: 'Icon Gebäude Filter',
            en: 'Icon building filter',
            es: 'Filtro de construcción de iconos',
            pl_PL: 'Filtr budowlany z ikonami',
            sv_SE: 'Ikonbyggnadsfilter',
            it_IT: 'Filtro per la costruzione di icone',
            nl: 'REDESIGN FILTERKNOPPEN GEBOUWEN'
        },
        active: false,
        description: {
            de: 'Tauscht den Gebäude Filter mit Icons aus.',
            en: 'Replaces the building filter with icons.',
            es: 'Sustituye el filtro del edificio por iconos.',
            pl_PL: 'Zastępuje filtr budowlany ikonami.',
            sv_SE: 'Ersätter byggfiltret med ikoner.',
            it_IT: 'Sostituisce il filtro dell\'edificio con icone.',
            nl: 'Vervangt de gebouwfilter met nieuwe iconen.'
        },
        source: '/modules/lss-iconFilter/iconFilter.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: false,
        develop: false
    },
    sumDailyMissions: {
        name: {
            de: 'Summe für die tägliche Zusammenfassung',
            en: 'Sum for daily stats',
            es: 'Suma de las estadísticas diarias',
            pl_PL: 'Suma dla statystyk dziennych',
            sv_SE: 'Summa för daglig statistik',
            it_IT: 'Somma per le statistiche giornaliere',
            nl: 'Totaalweergave in dagsamenvatting'
        },
        active: false,
        description: {
            de: 'Zeigt eine Summe über Anzahl Einsätze, Patienten, Gefangene und Verbandseinlieferungen in der ' +
                'täglichen Zusammenfassung an.',
            en: 'Shows sums over missions, patients, prisoners and alliance in the daily stats page',
            es: 'Muestra sumas sobre misiones, pacientes, prisioneros y alianzas en la página de estadísticas diarias.',
            pl_PL: 'Pokazuje sumy nad misjami, pacjentami, więźniami i sojusznikami na stronie statystyk dziennych.',
            sv_SE: 'Visar summor över uppdrag, patienter, fångar och allians på den dagliga statistik-sidan',
            it_IT: 'Mostra le somme sulle missioni, i pazienti, i prigionieri e l\'alleanza nella pagina delle statistiche quotidiane.',
            nl: 'Geeft een totaaloverzicht van het aantal meldingen, patienten, gevangenen en teamopnames.'
        },
        source: '/modules/lss-sumDailyMissions/sumDailyMissions.user.js',
        noapp: false, // Nicht im App-Store auflisten
        inframe: true,
        develop: false
    },
    aaoZaehler: {
        name: {
            de: 'AAO-Klick-Zähler',
            en: 'Alarm-Regulations-Counter',
            es: 'Alarmas-Regulaciones-Contador',
            pl_PL: 'Reguły alarmowe - licznik alarmów',
            sv_SE: 'Larm-förordningarna-Counter',
            it_IT: 'Allarme-Regolamenti-Contatore',
            nl: 'AUR-Klik-Teller'
        },
        active: false,
        description: {
            de: 'Zählt die Klicks auf einen AAO-Button',
            en: 'Counts the clicks on an alarm-regulations-button',
            es: 'Cuenta los clics en un botón de regulación de alarma',
            pl_PL: 'Zlicza kliknięcia na przycisk regulacji alarmu.',
            sv_SE: 'Räknar klick på en larmregler-knapp',
            it_IT: 'Conta i clic su un pulsante di regolazione dell\'allarme',
            nl: 'Telt het aantal keer dat een AUR aangeklikt is.'
        },
        source: '/modules/lss-AAO-Zaehler/aao-zaehler.js',
        inframe: true,
        develop: false
    },
    creditserweiterung: {
        name: {
            de: 'Creditserweiterung',
            en: 'Credit expansion',
            es: 'Expansión del crédito',
            pl_PL: 'Ekspansja kredytowa',
            sv_SE: 'Kreditutvidgning',
            it_IT: 'Espansione del credito',
            nl: 'Credits-uitbreiding'
        },
        active: false,
        description: {
            de: 'Fügt ein paar spezielle Informationen zu den Credits in einem Dropdown hinzu',
            en: 'Add some special information about the credits in a drop-down list',
            es: 'Agregar información especial sobre los créditos en una lista desplegable',
            pl_PL: 'Dodaj kilka specjalnych informacji na temat kredytów z rozwijanej listy',
            sv_SE: 'Lägg till speciell information om krediterna i en listruta',
            it_IT: 'Aggiungere alcune informazioni speciali sui crediti in un elenco a discesa',
            nl: 'Voegt wat speciale informatie over de credits toe in een vervolgkeuzelijst'
        },
        source: '/modules/lss-creditserweiterung/creditserweiterung.user.js',
        inframe: false,
        develop: false
    },
    displayUserId: {
        name: {
            de: 'User-ID',
            en: 'User-ID',
            pl_PL: 'Identyfikacja użytkownika',
            sv_SE: 'Användar ID',
            it_IT: 'ID utente',
            nl: 'User-ID'
        },
        active: false,
        description: {
            de: 'Zeigt die eigene ID in der Kopfzeile, und die jeweilige User-ID im Profil an.',
            en: 'Shows the own ID in the header line, and the respective user ID in the profile.',
            es: 'Muestra el ID propio en la línea de cabecera y el ID de usuario correspondiente en el perfil.',
            pl_PL: 'Pokazuje własny identyfikator w linii nagłówka oraz odpowiedni identyfikator użytkownika w profilu.',
            sv_SE: 'Visar eget ID i rubrikraden och respektive användar-ID i profilen.',
            it_IT: 'Mostra il proprio ID nella riga di intestazione e il rispettivo ID utente nel profilo.',
            nl: 'Toont de eigen ID in de kopregel en de betreffende gebruikers-ID in het profiel.'
        },
        source: '/modules/lss-userid/lss-userId.user.js',
        inframe: true,
        develop: false
    },
    showChatButtonAbove: {
        name: {
            de: 'show Chatbutton Above',
            en: 'show Chatbutton Above',
            es: 'Mostrar Chatbutton Arriba',
            pl_PL: 'pokazać przycisk "Chatbutton Above".',
            sv_SE: 'visa Chatbutton ovan',
            it_IT: 'mostra Chatbutton Sopra',
            nl: 'Toon boven chat-knop'
        },
        active: false,
        description: {
            de: 'Zeigt den Chatverlauf-Knopf auch in der Kopfzeile des Chats an.',
            en: 'Displays the Chat History button in the chat header.',
            es: 'Muestra el botón Historial de chat en el encabezado del chat.',
            pl_PL: 'Wyświetla przycisk Historia rozmowy w nagłówku rozmowy.',
            sv_SE: 'Visar knappen Chatthistorik i chatthuvudet.',
            it_IT: 'Visualizza il pulsante Cronologia chat nell\'intestazione della chat.',
            nl: 'Toont de chatgeschiedenisknop  in de chatheader.'
        },
        source: '/modules/lss-showChatbuttonAbove/showChatbuttonAbove.user.js',
        inframe: false,
        develop: false
    },
    showNotTransportButtonAbove: {
        name: {
            de: 'show Patient entlassen Above',
        },
        active: false,
        description: {
            de: 'Zeigt den Patient-Entlassen-Knopf bei einem Sprechwunsch unter dem Fahrzeugnamen an.'
        },
        source: '/modules/lss-show-notTransportPatientButtonAbove/show-notTransportPatientButtonAbove.user.js',
        supportedLocales: ['de'],
        inframe: true,
        develop: false
    },
    verbandsverwaltung: {
        name: {
            de: "Verbandsverwaltung",
            en: "Alliance-extension",
            es: "Extensión de la alianza",
            pl_PL: "Rozszerzenie sojuszu",
            it_IT: "Alleanza-estensione",
            nl: "Team-uitbreiding"
        },
        active: false,
        description: {
            de: "Verbandsübersicht auf einen Blick im Hauptfenster",
            en: "Alliance overview at a glance in the main window",
            es: "Vista general de la alianza de un vistazo en la ventana principal",
            pl_PL: "Przegląd sojuszy na pierwszy rzut oka w oknie głównym",
            sv_SE: "Alliansöversikt överblick i huvudfönstret",
            it_IT: "Panoramica dell'alleanza in sintesi nella finestra principale",
            nl: "Teamoverzicht in een oogopslag in het hoofdvenster"
        },
        source: "/modules/lss-verbandsverwaltung/verbandsverwaltung.js",
        inframe: false,
        develop: false
    },
    overview: {
        name: {
            de: "Übersicht",
            en: "overview",
            es: "visión de conjunto",
            pl_PL: "przegląd",
            sv_SE: "Översikt",
            it_IT: "riepilogo",
            nl: "overzicht"
        },
        active: false,
        description: {
            de: "Übersicht über alle Fahrzeuge sowie auch Wachen.",
            en: "Overview of all vehicles as well as buildings.",
            es: "Vista general de todos los vehículos así como de los edificios.",
            pl_PL: "Przegląd wszystkich pojazdów i budynków.",
            sv_SE: "Översikt över alla fordon och byggnader.",
            it_IT: "Panoramica di tutti i veicoli e degli edifici.",
            nl: "Overzicht van alle voertuigen, later ook gebouwen."
        },
        source: "/modules/lss-overview/overview.js",
        inframe: true,
        nomapkit: true,
    },
    extendedBuilding: {
        name: {
            de: "Erweiterte Gebäudeansicht",
            en: "Extended building view",
            es: "Vista ampliada del edificio",
            pl_PL: "Rozszerzony widok budynku",
            sv_SE: "Utökad byggnadsvy",
            it_IT: "Vista estesa dell'edificio",
            nl: "Uitgebreide bouwweergave"
        },
        active: false,
        description: {
            de: "Übersicht über Ausbauten und Personalbedarf",
            en: "Overview of extensions and personnel requirements",
            es: "Resumen de las ampliaciones y de las necesidades de personal",
            pl_PL: "Przegląd rozszerzeń i wymagań dotyczących personelu",
            sv_SE: "Översikt över tillägg och personalkrav",
            it_IT: "Panoramica delle estensioni e del fabbisogno di personale",
            nl: "Overzicht van uitbreidingen en personeelsvereisten"
        },
        source: "/modules/lss-extendedBuilding/extendedBuilding.js",
        inframe: true,
    },
    statusCount: {
        name: {
            de: "Status-Zähler",
            en: "Status Counter",
            es: "Contador de estado",
            pl_PL: "Licznik statusu",
            sv_SE: "Statusräknare",
            it_IT: "Stato Contatore",
            nl: "Statusteller"
        },
        active: false,
        description: {
            de: "Gibt die Zahl der einzelnen Status aus.",
            en: "Displays the number of individual statuses.",
            es: "Muestra el número de status individuales.",
            pl_PL: "Wyświetla liczbę poszczególnych statusów.",
            sv_SE: "Visar antalet enskilda statuser.",
            it_IT: "Visualizza il numero di stati individuali.",
            nl: "Geeft het aantal van ten individuele statussen."
        },
        source: "/modules/lss-statuscount/statuscount.js",
        inframe: false,
        needVehicles: true
    }
};

/**
 * Add the appstore to LSSM
 */
lssm.appstore = {
    /**
     * Checks if a lssm_module collides with other modules
     * @param mod
     * @returns {boolean}
     */
    canActivate: function (mod) {
        let ca = true;
        // TODO: Sprechendere Variablennamen
        if ('collisions' in mod) {
            for (let c in mod.collisions) {
                let d = mod.collisions[c];
                if (lssm.Module[d].active) {
                    ca = false;
                }
            }
        }
        return ca;
    },

    hideAllForSettings: function () {
        $('.' + lssm.config.prefix + '__appstore_hideForSettings').hide();
    },
    // Erstellen der Pandels
    createModulePanels: function () {
        let panels = $('<div class="row">' +
            '<div class="col-sm-4" id="apps_col_0"></div>' +
            '<div class="col-sm-4" id="apps_col_1"></div>' +
            '<div class="col-sm-4" id="apps_col_2"></div>' +
            '</div>');
        let col = 0;
        // Get all the keys of the modules
        let mods = $.map(lssm.Module, function (value, index) {
            return [index];
        });
        // Sort the lssm_module keys
        mods.sort(function (a, b) {
            "use strict";
            let aName = I18n.t("lssm.apps." + a + ".name").toLowerCase();
            let bName = I18n.t("lssm.apps." + b + ".name").toLowerCase();
            if (aName < bName) {
                return -1;
            } else {
                return (aName > bName) ? 1 : 0;
            }
        });
        for (let i in mods) {
            let mod = lssm.Module[mods[i]];
            let isSupportedLocale = !('supportedLocales' in mod) ||
                mod.supportedLocales.indexOf(I18n.currentLocale()) >= 0;
            // Do not show certain modules in the lssm.appstore or is not supported with this locale
            if ('noapp' in mod && mod.noapp === true || !isSupportedLocale) {
                continue;
            }
            let nomapkit = (typeof mapkit !== "undefined" && 'nomapkit' in mod && mod.nomapkit === true);
            let dom = '<div style="margin-top:10px;" class="lssm_module' +
                (mod.develop ? ' lssm_module_develop' : '') + '">' +
                '<div class="panel panel-default" style="display: inline-block;width:100%;">' +
                '<div class="panel-body">' +
                '<span class="pull-right">';
            if(!nomapkit)
                dom += '<div class="onoffswitch">' +
                    '<input class="onoffswitch-checkbox" id="lssm.modules_' + mods[i] + '" ' +
                    (mod.active ? 'checked="true"' : '') + ' value="' + mods[i] +
                    '" name="onoffswitch" type="checkbox">' +
                    '<label class="onoffswitch-label" for="lssm.modules_' + mods[i] + '"></label>' +
                    '</div>';
            dom += '</span>' +
                '<h4>' + I18n.t('lssm.apps.' + mods[i] + '.name') + '</h4>';
            if(!nomapkit)
                dom += '<small style="display:none">' + I18n.t('lssm.apps.' + mods[i] + '.description');
            else
                dom += '<small style="color:darkred">' +I18n.t('lssm.mapkit');

            dom += '</small>' +
                '</div>' +
                '</div>' +
                '</div>';
            let panel = $(dom);
            panels.find("#apps_col_" + col).append(panel);
            col++;
            if (col > 2) {
                col = 0;
            }
        }
        return panels;
    },

    // Packt alle ModulPanels in ein Div zudem werden beim an und ausschalten die Einstellungen ge?ndert  & gespeichert;
    // TODO: DIV mit ID so wie CSS ausstatten & festlegen wo es eingebettet werden soll
    createModuleMain: function () {
        let prefix = lssm.config.prefix + '_appstore';
        let div = $(
            '<div class="col-md-12 lssm.appstore" id="' + prefix + '">' +
            '<div class="row">' +
            '<h2>' + I18n.t('lssm.appstore') + '</h2>' +
            '<p class="lead">' + I18n.t('lssm.appstore_welcome') + '.</p>' +
            '<p>' + I18n.t('lssm.appstore_desc') + '</p>' +
            '<input type="text" class="form-control pull-right" id="' + prefix +
            '_search" placeholder="Suche" style=" width:25%;display:inline-block;">' +
            '</div>' +
            '</div>'
        );
        div.append(this.createModulePanels());
        return div;
    },

    // Menüpunkt zu den Modulen / Einstellungen / Dashboard
    appendAppstore: function () {
        // Variablen setzen für weitere Verwendung
        let prefix = lssm.config.prefix + '_appstore';
        let settingButton = $('<li role="presentation" id="' + prefix + '"><a id="' + prefix +
            '_activate" href="#">' +
            I18n.t('lssm.appstore') + '</a></li>');

        let content = $('#navbar-mobile-footer').prev();
        content.attr('id', 'content');

        settingButton.click(function () {
            let div = $('<div class="row" id="' + prefix + '_row"></div>').append(lssm.appstore.createModuleMain());
            let dom = lssm.modal.show(div.html(), lssm.appstore.closeAppstore);
            $(dom).on('keyup', '#' + prefix + '_search', function () {
                "use strict";
                let ss = $(this).val();
                if (ss.length > 0) {
                    $(dom).find(".lssm_module:containsci(" + ss + ")").show();
                    $(dom).find(".lssm_module:not(:containsci(" + ss + "))").hide();
                } else {
                    $(dom).find(".lssm_module").show();
                }
            });
            $(dom).on('change', '.onoffswitch-checkbox', function (ev) {
                let e = ev.target;
                if (e.checked && !lssm.appstore.canActivate(lssm.Module[e.value])) {
                    $(e).prop('checked', false);
                    let warn = "\"" + I18n.t('lssm.apps.' + e.value + '.name') + "\" " + I18n.t(
                        'lssm.cantactivate');
                    // TODO: Sprechendere Variablennamen
                    for (let c in lssm.Module[e.value].collisions) {
                        let d = lssm.Module[e.value].collisions[c];
                        if (lssm.Module[d].active) {
                            warn += "\r\n" + I18n.t('lssm.apps.' + d + '.name');
                        }
                    }
                    alert(warn);
                    return;
                }
                lssm.Module[e.value].active = e.checked;
            });
            $(dom).find("h4").on("click", function () {
                "use strict";
                let next = $(this).next();
                if (next.is(":hidden")) {
                    next.slideDown("slow");
                } else {
                    next.slideUp("slow");
                }
            });
        });
        // einhängen des Buttons in der Navi
        $('#' + lssm.config.prefix + '_menu').append(settingButton);
    },
    closeAppstore: function () {
        "use strict";
        let action = lssm.appstore.checkModChanges();
        lssm.modules.saveall();
        if (action === "Reload") {
            location.reload();
        } else {
            $(document).unbind(lssm.hook.prename("lightboxClose"),lssm.appstore.closeAppstore);
            // Inform the user about activated modules.
            let activated = "";
            for (let m in action) {
                lssm.modules.load(action[m]);
                activated += I18n.t('lssm.apps.' + action[m] + '.name') + ', ';
            }
            activated = activated.substring(0, activated.length - 2);
            if (activated.length > 0) {
                let msg = I18n.t('lssm.activated') + ' ' + activated;
                lssm.notification(msg);
            }
        }
    },

    /**
     * Check if modules have been activated/deactivated and tell the caller what to do.
     * Returns: "Reload" or a array of modules to load
     */
    checkModChanges: function () {
        "use strict";
        let activated = [];
        let deactivated = [];
        let modules = lssm.settings.get("Modules", {});
        for (let m in lssm.Module) {
            if (modules[m] && !lssm.Module[m].active) {
                deactivated.push(m);
            } else if ((!modules[m]) && lssm.Module[m].active) {
                activated.push(m);
            }
        }
        if (deactivated.length > 0) {
            return "Reload";
        }
        return activated;
    },

    createDropDown: function () {
        let lssm_dropdown = $(' <li class="dropdown" id="' + lssm.config.prefix + '_dropdown">' +
            '<a href="#" id="' + lssm.config.prefix +
            '_menu_switch" role="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' +
            '<span class="label label-success">' + I18n.t('lssm.lssm') + '</span> <b class="caret"></b>' +
            '</a>' +
            '<ul id="' + lssm.config.prefix + '_menu"class="dropdown-menu" role="menu" aria-labelledby="' +
            lssm.config.prefix + '_menu_switch"> </ul>' +
            '</li>');
        $('#navbar-main-collapse > ul').append(lssm_dropdown);
    }
};

/**
 * Add the settings-functions to lssm
 */
lssm.settings = {
    // Set a value to the localstorage
    set: function (key, value) {
        "use strict";
        if (typeof value === "object")
        // We have a object, parse it to json and save it.
        {
            localStorage.setItem(lssm.config.prefix + '_' + key, JSON.stringify(value));
        } else
        // Otherwise we save the raw value
        {
            localStorage.setItem(lssm.config.prefix + '_' + key, value);
        }
    },

    exists: function(key)
    {
        return localStorage.getItem(lssm.config.prefix + '_' + key) !== null;
    },

    // Get a config value from localstorage
    get: function (key, defaultvalue) {
        "use strict";
        if (typeof defaultvalue === "undefined")
        // defaultvalue is not set, return null if nothing found
        {
            defaultvalue = null;
        }
        let data;
        try {
            // Try to parse the config string as json
            data = JSON.parse(localStorage.getItem(lssm.config.prefix + '_' + key)) || defaultvalue;
        } catch (e) {
            // Couldn't parse the config value as json. Return the raw value
            data = (localStorage.getItem(lssm.config.prefix + '_' + key)) || defaultvalue;
        }
        return data;
    },

    // Remove a config value from localstorage
    remove: function (key) {
        "use strict";
        localStorage.removeItem(`${lssm.config.prefix}_${key}`);
    }
};

/**
 * Add the managed settings-functions to lssm
 */
lssm.managedSettings = {
    registeredModules: {},

    register: function (moduleSettings) {
        "use strict";
        let moduleId = moduleSettings.id;
        let settingsKey;
        // If settings don't exist, overwrite with defaults
        if (!lssm.settings.get(moduleId)) {
            for (settingsKey in moduleSettings.settings) {
                moduleSettings.settings[settingsKey].value = moduleSettings.settings[settingsKey].default;
            }
            // If we have values use them
        } else {
            let storedSettings = lssm.settings.get(moduleId);
            for (settingsKey in moduleSettings.settings) {
                if (storedSettings[settingsKey] != null) {
                    moduleSettings.settings[settingsKey].value = storedSettings[settingsKey];
                } else {
                    moduleSettings.settings[settingsKey].value = moduleSettings.settings[settingsKey].default;
                }
            }
        }
        lssm.managedSettings.registeredModules[moduleId] = moduleSettings;
    },

    reset: function (moduleId) {
        if (!lssm.settings.get(moduleId) || !lssm.managedSettings.registeredModules[moduleId]) {
            return;
        }
        lssm.settings.remove(lssm.config.prefix + '_' + moduleId);
        lssm.managedSettings.register(lssm.managedSettings.registeredModules[moduleId]);
    },

    getSetting: function (module, field) {
        "use strict";
        let settings = this.getSettings(module);
        if (settings && settings[field] !== undefined) {
            return settings[field].value;
        } else {
            return null;
        }
    },

    getSettings: function (module) {
        "use strict";
        if (lssm.managedSettings.registeredModules[module]) {
            return lssm.managedSettings.registeredModules[module].settings;
        } else {
            return null;
        }
    },

    update: function (moduleSettings) {
        "use strict";

        // Store managedSettings for runtime
        let moduleId = moduleSettings.id;
        lssm.managedSettings.registeredModules[moduleId] = moduleSettings;

        // Strip down settings object to values only and persist them
        let storeSettings = {};
        let settingsKey;
        for (settingsKey in moduleSettings.settings) {
            storeSettings[settingsKey] = moduleSettings.settings[settingsKey].value;
        }
        lssm.settings.set(moduleId, storeSettings);
    }

};

/**
 * Add the module-handler to LSSM
 */
lssm.modules = {
    saveall: function () {
        "use strict";
        let arr = {};
        for (let i in lssm.Module) {
            if(lssm.Module[i].active)
                arr[i] = lssm.Module[i].active;
        }
        lssm.settings.set("Modules", arr);
    },
    // Zum zwischenspeichern der schon geladenen Module
    addLocales: function (module) {
        let mod = module.toString();
        if (mod in lssm.Module) {
            let keys = ['name', 'description'];
            // TODO: sprechendere Variablennamen
            for (let k in keys) {
                k = keys[k];
                if (!(k in lssm.Module[mod])) {
                    continue;
                }
                for (let l in lssm.Module[mod][k]) {
                    l = l.toString();
                    if (!(mod in I18n.translations[l].lssm.apps)) {
                        I18n.translations[l].lssm.apps[mod] = {};
                    }
                    I18n.translations[l].lssm.apps[mod][k] = lssm.Module[mod][k][l];
                }
            }
        }
    },
    loadall: function () {
        "use strict";
        try {
            for (let m in lssm.Module) {
                this.load(m);
            }
        } catch (e) {
            console.error("LOADALL: " + e.message);
        }
    },

    load: function (module) {
        try {
            let path = window.location.pathname.length;
            let uid = "";
            let game = "";
            if (typeof user_id !== "undefined") {
                game = window.location.hostname.toLowerCase().replace("www.", "").split(".")[0];
            }
            uid = "?uid=" + game + user_id;
            this.addLocales(module);
            if (lssm.Module[module].active && lssm.Module.status !== 'develop' &&
                lssm.appstore.canActivate(lssm.Module[module])) {
                if (path <= 2 || ("inframe" in lssm.Module[module] && lssm.Module[module].inframe ===
                    true)) {
                    if (lssm.Module[module].source) {
                        $.getScript(lssm.getlink(lssm.Module[module].source));
                    }
                }
            }
        } catch (e) {
            console.error("On lssm_module load: " + e.message);
        }
    },
    isActive: function(e) {
        return lssm.Module[e].active;
    }
};

/**
 * Add hooks to lssm
 */
lssm.hook = {
    orgfunctions: {},
    prename: function (event) {
        "use strict";
        let self = this;
        if (!this.orgfunctions.hasOwnProperty(event)) {
            this.orgfunctions[event] = window[event];
            window[event] = function () {
                $(document).trigger("lssm_" + event + "_before", arguments);
                self.orgfunctions[event].apply(window, arguments);
                $(document).trigger("lssm_" + event + "_after", arguments);
            };
        }
        return "lssm_" + event + "_before";
    },
    postname: function (event) {
        "use strict";
        let self = this;
        if (!this.orgfunctions.hasOwnProperty(event)) {
            this.orgfunctions[event] = window[event];
            window[event] = function () {
                $(document).trigger("lssm_" + event + "_before", arguments);
                self.orgfunctions[event].apply(window, arguments);
                $(document).trigger("lssm_" + event + "_after", arguments);
            };
        }
        return "lssm_" + event + "_after";
    }
};

lssm.modal = {
    /**
     * Creates a new modal
     * @param content The content
     * @param closefunc Function to call when closed
     * @returns {string} The ID of the modal
     */
    show: function (content, closefunc) {
        "use strict";
        let e = parseInt($("#lightbox_background").css("width")),
            i = parseInt($("#lightbox_background").css("height")),
            n = i - 100;
        if (592 > n) {
            n = i - 30;
        }
        let s = e - 70;
        if (862 > s) {
            s = e - 0;
        }
        let o = s - 2,
            a = n - 34,
            r = (e - s) / 2;
        $("#lightbox_box").css("width", s + "px")
            .css("height", n + "px")
            .show();
        $("#lightbox_box")
            .append('<div class="lightbox_iframe" style="width:' + o + "px;height:" + a +
                'px" id="lightbox_iframe_' +
                iframe_lightbox_number + '"><div id="iframe-inside-container">' + content + '</div></div>');
        $("#lightbox_background").show();
        $("#lightbox_box").css("left", r + "px");
        $("#lightbox_box").css("top", (i - n) / 2 + "px");
        $("#lightbox_iframe_" + iframe_lightbox_number + " #iframe-inside-container").css("height", a).css(
            "width", o);
        setTimeout(function () {
            $("#lightbox_iframe_" + iframe_lightbox_number).show().focus();
            if (typeof closefunc !== "undefined") {
                $(document).bind(lssm.hook.prename("lightboxClose"), closefunc);
            }
        }, 100);
        return "#lightbox_iframe_" + iframe_lightbox_number + " #iframe-inside-container";
    }
};

/**
 * Lets roll!
 */
(function (I18n, $) {
    // Append our main css
    $("head")
        .prepend('<link href="' + lssm.getlink('/lss-manager-v3/css/main.css') +
            '" rel="stylesheet" type="text/css">');
    // Create the lssm dropdown menu
    lssm.appstore.createDropDown();
    // And append the version to it
    $('#' + lssm.config.prefix + '_menu')
        .prepend('<li class="menu-center"><a href="' + lssm.config.github + '" target="_blank">' +
            I18n.t('lssm.version') + ': ' + lssm.config.version + '</a></li><li class="divider"></li>');
    // Only execute everything else if user is logged in
    if (typeof user_id === "undefined") {
        $('#' + lssm.config.prefix + '_menu').append('<li class="menu-center">' + I18n.t('lssm.login') +
            '</li>');
    } else {
        // Oh, and don't forget the helperfunctions
        $.getScript(lssm.getlink('/lss-manager-v3/helperfunctions.js'))
            .fail(function () {
                $("#map_outer")
                    .before(
                        '<div class="alert alert-danger alert-dismissable" style="text-align:center"><a href="#" ' +
                        'class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                        I18n.t('lssm.cantload') + '</div>');
            })
            .done(function () {
                // There goes the core
                let loadCore = function () {
                    // Load required library's
                    $("head")
                        .append(
                            '<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" ' +
                            'integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous">' +
                            '</script>')
                        .append('<script src="' + lssm.getlink('/lss-manager-v3/js/highcharts.min.js') +
                            '" type="text/javascript"></script>')
                        .append(
                            '<link rel="stylesheet" ' +
                            'href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css">'
                        );
                    let modules = lssm.settings.get('Modules') || {};
                    // Get the last activated modules
                    let deact = 0;
                    for (let i in modules) {
                        let modname = i.toString();
                        let nomapkit = (typeof mapkit !== "undefined" && 'nomapkit' in lssm.Module[i] && lssm.Module[i].nomapkit === true);
                        if (nomapkit && modules[i]) {
                            console.error(modname + " is not compatible with mapkit.");
                            lssm.Module[i].active = false;
                            deact++;
                        } else if ((modname in lssm.Module) === false) {
                            console.error(modname + " is not a valid app. Skipping.");
                            deact++;
                        } else if (lssm.Module[i].active === false) {
                            lssm.Module[i].active = modules[i];
                        }
                    }
                    if (deact > 0)
                        lssm.modules.saveall();
                    let overwriteLoadVehicles = false;
                    let overwriteLoadBuildings = false;
                    for (let i in modules) {
                        let module = lssm.Module[i];
                        if (module.needVehicles && module.active) {
                            overwriteLoadVehicles = true;
                            break;
                        }
                    }
                    for (let i in modules) {
                        let module = lssm.Module[i];
                        if (module.needBuildings && module.active) {
                            overwriteLoadBuildings = true;
                            break;
                        }
                    }
                    lssm.get_vehicles(false, overwriteLoadVehicles);
                    lssm.get_buildings(false, overwriteLoadBuildings);
                    setInterval(function () {
                        lssm.get_buildings(true, overwriteLoadVehicles);
                        lssm.get_vehicles(true, overwriteLoadBuildings);
                    }, 300000);
                    // Let's load all the modules
                    lssm.modules.loadall();
                    // Oh, we also need a appstore
                    lssm.appstore.appendAppstore();
                };
                loadCore();
            });
    }
})(I18n, jQuery);
