(function (I18n, $) {
	I18n.translations.de.lssm.telemetry = {
		question: "Der LSS-Manager sendet Nicht-Personenbezogene Daten an die Entwickler zur Verbesserung des Skriptes und zum finden von Fehlern.\r\n"+
		"Zu diesen Daten gehören: Deine ID, dein Nutzername, die Anzahl der Wachen, der genutzte Browser und aktivierte Module.\r\n\r\n"+
		"Stimmst zu diesem zu?"
	};
	I18n.translations.en.lssm.telemetry = {
		question: "The LSS Manager sends non-personal data to the developers to improve the script and find errors.\r\n" +
		"These data include: your ID, username, the number of guards, the browser used, and enabled modules.\r\n\r\n" +
		"Do you agree with this?"
	};
	I18n.translations.es.lssm.telemetry = {
		question: "El Administrador LSS envía datos no personales a los desarrolladores para mejorar el script y encontrar errores.\r\n" +
		"Estos datos incluyen: su ID, nombre de usuario, el número de guardias, el navegador utilizado y los módulos habilitados.\r\n\r\n" +
		"¿Está de acuerdo con esto?"
    };
    I18n.translations.pl_PL.lssm.telemetry = {
        question: "LSS Manager wysyła dane nieosobowe do programistów w celu ulepszenia skryptu i znalezienia błędów.\r\n" +
		"Dane te obejmują: Twój identyfikator, nazwę użytkownika, liczbę strażników, używaną przeglądarkę i włączone moduły.\r\n\r\n" +
		"Zgadzasz się z tym?"
    };
    I18n.translations.sv_SE.lssm.telemetry = {
        question: "LSS Manager skickar icke-personlig information till utvecklarna för att förbättra skriptet och hitta fel.\r\n" +
            "Dessa data inkluderar: ditt ID, användarnamn, antalet vakter, den webbläsare som används och aktiverade moduler.\r\n\r\n" +
            "Håller du med om detta?"
    };
    I18n.translations.it_IT.lssm.telemetry = {
        question: "LSS Manager invia dati non personali agli sviluppatori per migliorare lo script e trovare gli errori.\r\n" +
            "Questi dati includono: il tuo ID, il tuo nome utente, il numero di guardie, il browser utilizzato e i moduli abilitati.\r\n\r\n" +
            "Sei d'accordo con questo?"
    };
	I18n.translations.nl.lssm.telemetry = {
		question: "De LSS Manager stuurt niet-persoonlijke gegevens naar de ontwikkelaars om het script te verbeteren en fouten te vinden.\r\n" +
			"Deze gegevens omvatten: uw ID, gebruikersnaam, het aantal bewakers, de gebruikte browser en ingeschakelde modules.\r\n\r\n" +
			"Bent u het hiermee eens?"
	};

    function getModules()
    {
        let active = [];
        for (let m in lssm.Module){
            if (lssm.Module[m].active)
            {
                active.push(m);
            }
        }
        return active;
    }
    function getUserAgent()
    {
        let ua = navigator.userAgent, tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem !== null)
                return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) !== null)
            M.splice(1, 1, tem[1]);
        return M.join(' ');
    }


    let active = false;
    if(!lssm.settings.exists("telemetry"))
    {
        let con = confirm(I18n.t('lssm.telemetry.question'))
        active = con;
        lssm.settings.set("telemetry", (con ? 1 : 0));
    }
    else
    {
        if(lssm.settings.get("telemetry", "0") == "1")
            active = true;
    }
    if (active && typeof user_id !== "undefined" && typeof user_premium !== "undefined")
    {
        let data = {};
        // Lets grab the users key
        $.get(lssm.config.key_link + user_id, function (data) {
            try
            {
                // Try to parse the answer as JSON
                data = JSON.parse(data);
                lssm.key = data.code;
                let name = $.trim($("#navbar_profile_link").text());
                data.bro = getUserAgent();
                data.pro = user_premium;
                data.bui = lssm.buildings.length;
                data.version = lssm.config.version;
                data.mods = getModules();
                data = JSON.stringify(data);
                $.post(lssm.config.stats_uri, {
                    uid: user_id, key: lssm.key, game: lssm.config.game, uname: name, data: data
                });
            } catch (e) {
                lssm.key = null;
            }
        });
    }
})(I18n, $);
