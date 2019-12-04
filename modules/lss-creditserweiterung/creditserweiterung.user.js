(($, win, I18n) => {
    if (!document.URL.match(/(leitstellenspiel|missionchief|missionchief-australia|centro-de-mando|meldkamerspel|larmcentralen-spelet|operatorratunkowy|operatore112)(\.de|\.com|\.co\.uk|\.es|\.se|\.pl|\.it)\/#?$/)) return;

    I18n.translations.de.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9\.]*)? verdiente Credits(.*)/i,
        ranks: {
            0: 'Anwärter(in)',
            200: 'Feuerwehrmann / Feuerwehrfrau',
            10000: 'Oberfeuerwehrmann / Oberfeuerwehrfrau',
            100000: 'Hauptfeuerwehrmann / Hauptfeuerwehrfrau',
            1000000: 'Stv. Gruppenführer(in)',
            5000000: 'Gruppenführer(in)',
            10000000: 'Stv. Zugführer(in)',
            20000000: 'Zugführer(in)',
            50000000: 'Stv. Wehrführer(in)',
            100000000: 'Wehrführer(in)',
            200000000: 'Stv. Kreisbrandmeister(in)',
            500000000: 'Kreisbrandmeister(in)',
            1000000000: 'Stv. Landesbrandmeister(in)',
            2000000000: 'Landesbrandmeister(in)',
            5000000000: 'Ehrenmitglied'
        },
        texts:{
            dropdownName: 'Creditserweiterung',
            creditsOverview: 'Credits-Übersicht',
            coinsProtokoll: 'Coinsprotokoll',
            earnedCredits: 'Gesamtcredits',
            creditsToNextRank: 'Credits zum nächsten Dienstgrad',
            updateMessage: 'Werte aktualisieren sich<br>automatisch alle 5 Minuten.<br>Credits und Coins sind<br>ständig aktuell.',
            allianceFunds: 'Verbandskasse',
            noFurtherRank: 'Keine Höheren Ränge'
        }
    };
    I18n.translations.en.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? earned Credits.*/i,
        ranks: {
            0: 'Probie',
            200: 'Firefighter',
            10000: 'Senior Firefighter',
            100000: 'Fire Apparatus Operator',
            1000000: 'Lieutenant',
            5000000: 'Captain',
            20000000: 'Staff Captain',
            50000000: 'Battalion Chief',
            1000000000: 'Division Chief',
            2000000000: 'Deputy Chief',
            5000000000: 'Fire Chief'
        },
        texts:{
            reloadMessage: 'Please open your profile<br>and reload the website!',
            dropdownName: 'Creditsextension',
            creditsOverview: 'Overview',
            coinsProtokoll: 'Coins List',
            earnedCredits: 'Totally earned Credits',
            creditsToNextRank: 'Credits to next rank',
            updateMessage: 'Values update automatically<br>every 5 minutes.<br>Credits and Coins are<br>continuously up to date.',
            allianceFunds: 'Alliance Funds',
            noFurtherRank: 'There are no further ranks'
        }
    };
    I18n.translations.fj.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? earned Credits.*/i,
        ranks: {
            0: 'Probie',
            200: 'Firefighter',
            10000: 'Senior Firefighter',
            100000: 'Fire Apparatus Operator',
            1000000: 'Lieutenant',
            5000000: 'Captain',
            20000000: 'Staff Captain',
            50000000: 'Battalion Chief',
            1000000000: 'Division Chief',
            2000000000: 'Deputy Chief',
            5000000000: 'Fire Chief'
        },
        texts: {
            reloadMessage: 'Please open your profile<br>and reload the website!',
            dropdownName: 'Creditsextension',
            creditsOverview: 'Overview',
            coinsProtokoll: 'Coins List',
            earnedCredits: 'Totally earned Credits',
            creditsToNextRank: 'Credits to next rank',
            updateMessage: 'Values update automatically<br>every 5 minutes.<br>Credits and Coins are<br>continuously up to date.',
            allianceFunds: 'Alliance Funds',
            noFurtherRank: 'There are no further ranks'
        }
    };
    I18n.translations.eu.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? earned Credits.*/i,
        ranks: {
            0: 'Probie',
            200: 'Firefighter',
            10000: 'Senior Firefighter',
            100000: 'Fire Apparatus Operator',
            1000000: 'Lieutenant',
            5000000: 'Captain',
            20000000: 'Staff Captain',
            50000000: 'Battalion Chief',
            1000000000: 'Division Chief',
            2000000000: 'Deputy Chief',
            5000000000: 'Fire Chief'
        },
        texts: {
            reloadMessage: 'Please open your profile<br>and reload the website!',
            dropdownName: 'Creditsextension',
            creditsOverview: 'Overview',
            coinsProtokoll: 'Coins List',
            earnedCredits: 'Totally earned Credits',
            creditsToNextRank: 'Credits to next rank',
            updateMessage: 'Values update automatically<br>every 5 minutes.<br>Credits and Coins are<br>continuously up to date.',
            allianceFunds: 'Alliance Funds',
            noFurtherRank: 'There are no further ranks'
        }
    };
    I18n.translations.pl_PL.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? Otrzymane kredyty.*/i,
        ranks: {
            0: 'Nowy',
            200: 'Strażak',
            10000: 'Starszy strażak',
            100000: 'Ogniomistrz',
            1000000: 'Aspirant',
            5000000: 'Kapitan',
            20000000: 'Starszy kapitan',
            50000000: 'Szef brygady',
            1000000000: 'Nadbrygadier',
            2000000000: 'Zastępca komendanta głównego',
            5000000000: 'Komendant główny'
        },
        texts: {
            reloadMessage: 'Proszę otworzyć swój profil<br>i przeładować stronę internetową!',
            dropdownName: 'Przedłużenie kredytu',
            creditsOverview: 'Przegląd',
            coinsProtokoll: 'Coins List',
            earnedCredits: 'Całkowicie zarobione Kredyty',
            creditsToNextRank: 'Kredyty do następnej rangi',
            updateMessage: 'Automatyczna aktualizacja wartości<br>co 5 minut.<br>Kredyty i monety są stale aktualizowane.',
            allianceFunds: 'Fundusze sojusznicze',
            noFurtherRank: 'Nie ma dalszych szeregów.'
        }
    };
    I18n.translations.sv_SE.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? intjänade krediter.*/i,
        ranks: {
            0: 'Nybörjare',
            200: 'Brandman',
            10000: 'Brandveteran',
            100000: 'Brandoperatör',
            1000000: 'Inspektör',
            5000000: 'Kommissarie',
            20000000: 'Gruppchef',
            50000000: 'Bataljonschef',
            1000000000: 'Divisionschef',
            2000000000: 'Vicechef',
            5000000000: 'Brandchef'
        },
        texts: {
            reloadMessage: 'Öppna din profil och ladda om webbplatsen!',
            dropdownName: 'Creditsextension',
            creditsOverview: 'Översikt',
            coinsProtokoll: 'Myntlista',
            earnedCredits: 'Totalt intjänade krediter',
            creditsToNextRank: 'Krediter till nästa rang',
            updateMessage: 'Värden uppdateras automatiskt <br> var femte minut.<br>Krediter och mynt är<br>kontinuerligt uppdaterat.',
            allianceFunds: 'Alliansfonder',
            noFurtherRank: 'Det finns inga ytterligare rangordningar'
        }
    };
    I18n.translations.es.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? créditos conseguidos.*/i,
        ranks: {
            0: 'Novato',
            200: 'Bombero',
            10000: 'Bombero sénior',
            100000: 'Operador de vehículos antiincendios',
            1000000: 'Teniente',
            5000000: 'Capitán',
            20000000: 'Capitán de personal',
            50000000: 'Jefe de batallón',
            1000000000: 'Jefe de división',
            2000000000: 'Subjefe',
            5000000000: 'Jefe de bomberos'
        },
        texts: {
            reloadMessage: 'Por favor, abra su perfil <br>y vuelva a cargar el sitio web!',
            dropdownName: 'Extensión de crédito',
            creditsOverview: 'Panorama general',
            coinsProtokoll: 'Lista de monedas',
            earnedCredits: 'Créditos Totalmente Obtenidos',
            creditsToNextRank: 'Créditos al siguiente rango',
            updateMessage: 'Los valores se actualizan automáticamente<br>cada 5 minutos.<brLos Créditos y Monedas son <br>continuamente actualizados.',
            allianceFunds: 'Fondos de la Alianza',
            noFurtherRank: 'No hay más rangos'
        }
    };
    I18n.translations.it_IT.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9],)? crediti guadagnati.*/i,
        ranks: {
            0: 'Recluta',
            200: 'Vigile del fuoco',
            10000: 'Vigile del fuoco senior',
            100000: 'Operatore di apparecchi antincendio',
            1000000: 'Tenente',
            5000000: 'Capitano',
            20000000: 'Stato maggiore',
            50000000: 'Capo-pattuglia',
            1000000000: 'Capo divisione',
            2000000000: 'Vice capo',
            5000000000: 'Capo dei pompieri'
        },
        texts: {
            reloadMessage: 'Apri il tuo profilo<br>e ricarica il sito web!',
            dropdownName: 'Estensione del credito',
            creditsOverview: 'Panoramica',
            coinsProtokoll: 'Elenco monete',
            earnedCredits: 'Crediti Totalmente guadagnati',
            creditsToNextRank: 'Crediti al rango successivo',
            updateMessage: 'Aggiornamento automatico dei valori<br>ogni 5 minuti.<br>Crediti e Monete sono costantemente aggiornati.',
            allianceFunds: 'Fondi dell\'Alleanza',
            noFurtherRank: 'Non ci sono altre classifiche'
        }
    };
    I18n.translations.nl.lssm.creditserweiterung = {
        earnedCreditsRegEx: /(.*)([0-9]\.)? verdiende Credits.*/i,
        ranks: {
            0: 'Aspirant',
            200: 'Brandwacht (Manschap A)',
            10000: 'Hoofdbrandwacht (Manschap B)',
            100000: 'Brandmeester',
            1000000: 'Hoofdbrandmeester',
            5000000: 'Commandeur',
            50000000: 'Adjunct-Hoofdcommandeur',
            500000000: 'Hoofdcommandeur',
            5000000000: 'Erelid'
        },
        texts:{
            reloadMessage: 'Open uw profiel<br>en herlaad de website!',
            dropdownName: 'Credits-uitbreiding',
            creditsOverview: 'Overzicht statistiek',
            coinsProtokoll: 'Coin protocol',
            earnedCredits: 'Totaal verdiende credits',
            creditsToNextRank: 'Credits tot volgende rang',
            updateMessage: 'Waarden worden elke<br>5 minuten automatisch bijgewerkt.<br>Credits en coins zijn<br>continu up to date.',
            allianceFunds: 'Teamkas',
            noFurtherRank: 'Geen verdere rangen meer'
        }
    };

    let updateable = false;

    function getCreditsOfNextRank(earnedCredits){
        let ranks = I18n.t('lssm.creditserweiterung.ranks');
        for (let key in ranks) { if(earnedCredits <= key){ return key; } }
        return null;
    }

    function createExtension() {
        $.get("/api/credits")
            .then(response => {
                let earnedCredits = response.credits_user_total;
                let creditsOfNextRank = getCreditsOfNextRank(earnedCredits);
                if (creditsOfNextRank === null) {
                    nextRank = I18n.t('lssm.creditserweiterung.texts.noFurtherRank');
                    creditsToNextRank = "&infin;";
                } else {
                    nextRank = I18n.t('lssm.creditserweiterung.ranks')[creditsOfNextRank];
                    creditsToNextRank = creditsOfNextRank - earnedCredits;
                }
                let allianceFundsCredits = response.credits_alliance_current;

                let markup = '<li><a id="menu_creditsverwaltung" class="dropdown_toggle href="#" role="button" data-toggle="dropdown" aria-expanded="false">';
                markup += '<img id="ls-credits-money-img" style="height: 19px; width: 19px; cursor: pointer;" src="';
                markup += lssm.getlink("/modules/lss-creditserweiterung/img/icons8-money-box-150.png") + '">';
                markup += '<span class="visible-xs">' + I18n.t('lssm.creditserweiterung.texts.dropdownName') + '</span>';
                markup += '<b class="caret"></b></a><ul class="dropdown-menu" role="menu" aria-labelledby="menu_Creditsverwaltung">';
                markup += '<li role="presentation" id="creditserweiterungCredits"></li>';
                markup += '<li id="creditsOverview" role="presentation"><a href="/credits/overview" class="lightbox-open" target="blank">' + I18n.t('lssm.creditserweiterung.texts.creditsOverview') + '</a></li>';
                markup += '<li role="presentation" id="creditserweiterungCoins"></li>';
                markup += '<li role="presentation"><a href="/coins/list" class="lightbox-open" target="blank">' + I18n.t('lssm.creditserweiterung.texts.coinsProtokoll') + '</a></li>';
                markup += '<li class="divider" role="presentation"></li><li role="presentation"><a id="creditsextensionEarnedCredits">' + I18n.t('lssm.creditserweiterung.texts.earnedCredits') + ': ' + earnedCredits.toLocaleString() + '</a>';
                markup += '<a id="creditsextensionNextRank">' + I18n.t('lssm.creditserweiterung.texts.creditsToNextRank') + '<br>(' + nextRank + '):<br>' + creditsToNextRank.toLocaleString() + '</a></li>';
                if (response.credits_alliance_active) {
                    markup += '<li class="divider" role="presentation"></li><li><a href="./verband/kasse" class="lightbox-open" id="creditsextensionAllianceFunds">';
                    markup += I18n.t('lssm.creditserweiterung.texts.allianceFunds') + ': ' + allianceFundsCredits.toLocaleString() + ' Credits' + '</a></li>';
                }
                markup += '<li class="divider" role="presentation"></li><li role="presentation"><a>' + I18n.t('lssm.creditserweiterung.texts.updateMessage') + '</a></li></ul></li>';

                $('#menu_creditsverwaltung').remove();
                $('#lssm_dropdown').before(markup);

                $('#creditserweiterungCredits').append($('#navigation_top'));
                $('#creditserweiterungCoins').append($('#coins_top'));

                $('#menu_creditsverwaltung').attr('title', 'Credits: ' + $('#navigation_top').text().replace(/[\D.]*/, '') + '\nCoins: ' + $('#coins_top').text().replace(/[\D.]*/, ''));

                $('#menu_creditsverwaltung').click(function() {
                    updateValues();
                });
            });
    }

    function updateValues() {
        if (updateable) {
            $.get("/api/credits")
                .then(response => {
                    let earnedCredits = response.credits_user_total;
                    let creditsOfNextRank = getCreditsOfNextRank(earnedCredits);
                    if (creditsOfNextRank === null) {
                        nextRank = I18n.t('lssm.creditserweiterung.texts.noFurtherRank');
                        creditsToNextRank = "&infin;";
                    } else {
                        nextRank = I18n.t('lssm.creditserweiterung.ranks')[creditsOfNextRank];
                        creditsToNextRank = creditsOfNextRank - earnedCredits;
                    }
                    let allianceFundsCredits = response.credits_alliance_current;

                    $("#creditsextensionEarnedCredits").html(I18n.t('lssm.creditserweiterung.texts.earnedCredits') + ': ' + earnedCredits.toLocaleString());

                    $("#creditsextensionNextRank").html(I18n.t('lssm.creditserweiterung.texts.creditsToNextRank') + '<br>(' + nextRank + '):<br>' + creditsToNextRank.toLocaleString());

                    if (allianceFundsCredits) {
                        $("#creditsextensionAllianceFunds").html(I18n.t('lssm.creditserweiterung.texts.allianceFunds') + ': ' + allianceFundsCredits.toLocaleString() + ' Credits');
                    }
                    updateable = false;
                    setTimeout(function() {
                        updateable = true;
                    }, 300000);
                });
        }
    }

    let creditsUpdateOrigin = creditsUpdate;

    creditsUpdate = function(a) {
        creditsUpdateOrigin(a);
        $('#menu_creditsverwaltung').attr('title', 'Credits: ' + $('#navigation_top').text().replace(/[\D.]*/, '') + '\nCoins: ' + $('#coins_top').text().replace(/[\D.]*/, ''));
    };

    let coinsUpdateOrigin = coinsUpdate;

    coinsUpdate = function(a) {
        coinsUpdateOrigin(a);
        $('#menu_creditsverwaltung').attr('title', 'Credits: ' + $('#navigation_top').text().replace(/[\D.]*/, '') + '\nCoins: ' + $('#coins_top').text().replace(/[\D.]*/, ''));
    };

    if (location.pathname.match(/\/missions\/\d+/)) return;
    if (location.pathname.match(/\/profile\/\d+/)) return;
    if (location.pathname.match(/\/vehicles\/\d+/)) return;
    if (location.pathname.match(/\/buildings\/\d+/)) return;
    if (location.pathname.match(/\/alliances\/\d+/)) return;
    if (location.pathname.match(/\/verband\/\d+/)) return;

    createExtension();
    setTimeout(function() {
        updateable = true;
    }, 300000);
})($, window, I18n);
