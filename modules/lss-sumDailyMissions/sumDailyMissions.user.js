(function () {
    let site_location = window.location.href;
    if (site_location.match('daily')) {
        I18n.translations.de_DE.lssm.sumDailyMissions = {
            patient_treatment: 'Patienten Behandlung',
            patient_treatment1: 'Patienten Behandlung und Transport',
            education: 'Ausbildung',
            dailyl: 'Täglicher',
            purchase: 'gekauft',
            cancelled: 'Abgebrochen',
            cancelled2: 'Rückerstattung',
            cancelled3: 'abgebrochen',
            extended: 'ausgebaut',
            extended2: 'erweitert',
            built: 'gebaut',
            teame: 'Verbandse',
            team: '\\[Verband\\]',
            shit: 'An den Gebäudekomplex angehängte Gebäude',
            shit1: 'Ausbau zu einem Gebäudekomplex',
            shit2: 'Ausgebaut zu einem Gebäudekomplex',
            prisoner: 'Gefangenen transportiert',
            num_missions: 'Anzahl / Credits Einsätze',
            num_patients: 'Anzahl / Credits Patienten',
            num_prisoners: 'Anzahl / Credits Gefangene',
            num_team: 'Anzahl / Credits Verbandseinsätze',
            num_teame: 'Anzahl / Credits Verbandseinlieferungen'
        };

        I18n.translations.en_US.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment and Transport',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Cancelled',
            cancelled2: 'Refund',
            cancelled3: 'demolished',
            extended: 'constructed',
            extended2: 'Extended',
            built: 'constructed',
            teame: ' Alliance',
            team: '\\[Alliance\\]',
            shit: 'Upgraded to Building Complex Base',
            prisoner: 'Prisoner Transported',
            num_missions: 'Sum / Credits Missions',
            num_patients: 'Sum / Credits Patients',
            num_prisoners: 'Sum / Credits Prisoners',
            num_team: 'Sum / Credits Alliance Missions',
            num_teame: 'Sum / Credits Alliance Treatment'
        };

        I18n.translations.pt_PT.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'education',
            purchase: 'comprado',
            cancelled: 'Cancelled',
            extended: 'construida',
            extended2: 'Extended',
            built: 'construído',
            team: '\\[Aliança\\]',
            teame: ' Aliança',
            prisoner: 'A transportar detido',
            num_missions: 'Soma / Créditos missões',
            num_patients: 'Soma / Créditos pacientes',
            num_prisoners: 'Soma / Créditos prisioneiros',
            num_team: 'Soma / Créditos missões da aliança',
            num_teame: 'Soma / Créditos aliança tratamento'
        };

        I18n.translations.pl_PL.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Zwrot',
            extended: 'Postawiono',
            extended2: 'Extended',
            built: 'Postawiono',
            teame: ' Sojusz',
            team: '\\[Sojusz\\]',
            prisoner: 'Prisoner Transported',
            num_missions: 'Suma / Kredyty misji',
            num_patients: 'Suma / Kredyty pacjentów',
            num_prisoners: 'Suma / Kredyty więźniów',
            num_team: 'Suma / Kredyty misji sojuszu',
            num_teame: 'Suma / Kredyty traktowania sojuszu'
        };

        I18n.translations.sv_SE.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Återlämna',
            extended: 'uppförd',
            extended2: 'Extended',
            built: 'uppförd',
            teame: ' Allians',
            team: '\\[Allians\\]',
            prisoner: 'Prisoner Transported',
            num_missions: 'Summa / Krediter uppdrag',
            num_patients: 'Summa / Krediter patienter',
            num_prisoners: 'Summa / Krediter fångar',
            num_team: 'Summa / Krediter alliansuppdrag',
            num_teame: 'Summa / Krediter alliansbehandling'
        };

        I18n.translations.da_DK.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'Uddannelse',
            purchase: 'købt',
            cancelled: 'Återlämna',
            extended: 'uppförd',
            extended2: 'bygget',
            built: 'bygget',
            teame: ' Alliance',
            team: '\\[Alliance\\]',
            prisoner: 'Prisoner Transported',
            num_missions: 'Sum / Kreditter missioner',
            num_patients: 'Sum / Kreditter patienten',
            num_prisoners: 'Sum / Kreditter fanger',
            num_team: 'Sum / Kreditter alliance missioner',
            num_teame: 'Sum / Kreditter alliansebehandling'
        };

        I18n.translations.nb_NO.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Återlämna',
            extended: 'uppförd',
            extended2: 'Extended',
            built: 'uppförd',
            teame: ' Allianse',
            team: '\\[Allianse\\]',
            prisoner: 'Prisoner Transported',
            num_missions: 'Sum / Kreditter oppdrag',
            num_patients: 'Sum / Kreditter pasienter',
            num_prisoners: 'Sum / Kreditter fanger',
            num_team: 'Sum / Kreditter allianse oppdrag',
            num_teame: 'Sum / Kreditter alliansebehandling'
        };

        I18n.translations.it_IT.lssm.sumDailyMissions = {
            patient_treatment: 'Trattamento e trasporto pazienti',
            patient_treatment1: 'Trattamento pazienti',
            education: 'educazione',
            purchase: 'acquistato',
            cancelled: 'Annullato',
            cancelled2: 'Rimborsa',
            extended: 'estesa',
            extended2: 'aggiornata',
            built: 'costruito',
            teame: ' Alleanza',
            team: '\\[Alleanza\\]',
            prisoner: 'Detenuto trasportato',
            num_missions: 'Somma / Crediti missioni',
            num_patients: 'Somma / Crediti pazienti',
            num_prisoners: 'Somma / Crediti i prigionieri',
            num_team: 'Somma / Crediti le missioni dell\'alleanza',
            num_teame: 'Somma / Crediti trattamento dell\'alleanza'
        };

        I18n.translations.es_ES.lssm.sumDailyMissions = {
            patient_treatment: 'Tratamiento de pacientes',
            patient_treatment1: 'Tratamiento y transporte de pacientes',
            education: 'Formación',
            education2: 'entrenamiento',
            purchase: 'comprado',
            dailyl: 'Recompensa diaria',
            cancelled: 'Cancelado',
            cancelled2: 'Solicitar devolución',
            cancelled3: 'cancelado',
            extended: 'construida',
            extended2: 'Extendido',
            built: 'construido',
            teame: '\\(alianza\\)',
            team: '\\[Alianza\\]',
            shit: 'Mejorado a base de complejo de edificios',
            shit1: 'Edificio añadido a base de complejo de edificios',
            shit2: 'Mejorado a complejo de edificios',
            prisoner: 'Preso transportado',
            num_missions: 'Suma / Créditos Misiones',
            num_patients: 'Suma / Créditos Pacientes',
            num_prisoners: 'Suma / Créditos de Presos',
            num_team: 'Suma / Créditos de misiones de alianza',
            num_teame: 'Suma / Créditos de tratamiento de alianza'
        };

        I18n.translations.fr_FR.lssm.sumDailyMissions = {
            patient_treatment: 'Traitement de patient',
            patient_treatment1: 'Traitement de patient et transport',
            education: 'education',
            purchase: 'acheté',
            cancelled: 'Cancelled',
            cancelled2: 'bâtiment',
            extended: 'construit',
            extended2: 'prolongée',
            built: 'construit',
            teame: ' Alliance',
            team: '\\[Alliance\\]',
            prisoner: 'Prisoner Transported',
            num_missions: 'Somme / Crédits des missions',
            num_patients: 'Somme / Crédits des patients',
            num_prisoners: 'Somme / Crédits des prisonniers',
            num_team: 'Missions de l\'alliance Sum / Crédits',
            num_teame: 'Traitement Sum / Crédits Alliance'
        };

        I18n.translations.cs_CZ.lssm.sumDailyMissions = {
            patient_treatment: 'šetření pacienta',
            patient_treatment1: 'šetření pacienta',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Cancelled',
            extended: 'constructed',
            extended2: 'Extended',
            built: 'constructed',
            teame: ' aliance',
            team: '\\[Aliance\\]',
            prisoner: 'Vězeň převezen',
            num_missions: 'Součet / kreditů misí',
            num_patients: 'Součet / kreditů pacientů',
            num_prisoners: 'Součet / kreditů vězňů',
            num_team: 'Sečtěte / kreditů alianční mise',
            num_teame: 'Součet / kreditů alianční léčby'
        };

        I18n.translations.ko_KR.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Cancelled',
            extended: 'constructed',
            extended2: 'Extended',
            built: '건설한',
            teame: ' 동맹',
            team: '\\[동맹\\]',
            prisoner: 'Prisoner Transported',
            num_missions: '총 / 크레딧 미션',
            num_patients: '환자 총 / 크레딧',
            num_prisoners: '총 / 크레딧 죄수',
            num_team: '얼라이언스 미션 총계 / 크레딧',
            num_teame: '총 / 크레딧 제휴 처리'
        };

        I18n.translations.ro_RO.lssm.sumDailyMissions = {
            patient_treatment: 'Patient Treatment',
            patient_treatment1: 'Patient Treatment',
            education: 'education',
            purchase: 'bought',
            cancelled: 'Cancelled',
            extended: 'constructed',
            extended2: 'Extended',
            built: 'construită',
            teame: ' Alianță',
            team: '\\[Alianță\\]',
            prisoner: 'Prisoner Transported',
            num_missions: 'Sume / credite misiuni',
            num_patients: 'Sumați / credite pacienți',
            num_prisoners: 'Suma / credite prizonieri',
            num_team: 'Sume / credite misiuni de alianță',
            num_teame: 'Suma / credite tratamentului alianței'
        };

        I18n.translations.nl_NL.lssm.sumDailyMissions = {
            patient_treatment: 'Patiënten behandeling',
            patient_treatment1: 'Patiënten behandeling en transport',
            education: 'Opleiding',
            purchase: 'gekocht',
            cancelled: 'Afgebroken',
            cancelled2: 'Terugbetaald',
            cancelled3: 'gesloopt',
            extended: 'uitgebreid',
            extended2: 'uitgebreid',
            built: 'gebouwd',
            teame: 'Teamopname',
            team: '\\[Team\\]',
            shit: 'Gebouw bevestigd aan Gebouwencomplexbasis',
            shit1: 'Upgraded to Building Complex Base',
            shit2: 'Geüpgraded naar Gebouwencomplex',
            prisoner: 'Arrestanten getransporteerd',
            num_missions: 'Aantal / Credits meldingen',
            num_patients: 'Aantal / Credits patiënten',
            num_prisoners: 'Aantal / Credits gevangenen',
            num_team: 'Aantal / Credits Teammeldingen',
            num_teame: 'Aantal / Credits Teamopnames'
        };
        let css = ''+
            '#num_label {margin-right: 5px;padding: 5px 0px 5px 5px;border: 1.5px solid black;font-size: inherit;border-radius: 5px;}'+
            '#num_anzahl {background: #333;padding: 4.5px;margin-left: 5px;margin-right: 1px;}'+
            '#num_icon {margin-right: 5px;}',

            head = document.head || document.getElementsByTagName('head')[0],
            style=document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) style.styleSheet.cssText = css;
        else style.appendChild(document.createTextNode(css));
        head.appendChild(style);


let sum_einsaetze = 0;
let cre_einsaetze = 0;
let sum_patienten = 0;
let cre_patienten = 0;
let sum_gefangene = 0;
let cre_gefangene = 0;
let sum_verband = 0;
let cre_verband = 0;
let sum_verbande = 0;
let cre_verbande = 0;
document.querySelectorAll('#iframe-inside-container > table > tbody > tr').forEach(row => {
    const amount = parseInt(row.children[2].textContent.trim().match(/-?\d{1,3}([.,]?\d{3})*/)[0].replace(/[.,]/g, ''));
    const credits = parseInt(row.children[0].textContent.trim().match(/-?\d{1,3}([.,]\d{3})*/)[0].replace(/[.,]/g, ''));
    const title = row.children[3].textContent.trim();

if(title.match(I18n.t('lssm.sumDailyMissions.patient_treatment')) ||
                    title.match(I18n.t('lssm.sumDailyMissions.patient_treatment1')))
                {
                    sum_patienten += amount;
                    cre_patienten += credits;
                }
                //Zähle Ausbauten, abgebrochene Einsätze, Verbandseinlieferungen und Ausbildung nicht dazu
                else if(title.match(I18n.t('lssm.sumDailyMissions.extended')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.purchase')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.dailyl')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.cancelled')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.education')) ||
                        (I18n.locale === 'es_ES' && title.match(I18n.t('lssm.sumDailyMissions.education2'))) ||
                        title.match(I18n.t('lssm.sumDailyMissions.extended2')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.built')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.shit')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.shit1')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.shit2')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.cancelled2')) ||
                        title.match(I18n.t('lssm.sumDailyMissions.cancelled3')))
                {
                }
                else if(title.match(I18n.t('lssm.sumDailyMissions.prisoner')))
                {
                    sum_gefangene += amount;
                    cre_gefangene += credits;
                }
                else if(title.match(I18n.t('lssm.sumDailyMissions.teame')))
                {
                    sum_verbande += amount;
                    cre_verbande += credits;
                }
                else if (title.match(I18n.t('lssm.sumDailyMissions.team'))) 
                {
                    sum_verband += amount;
                    cre_verband += credits;
                }
                //Alles andere sind normale Einsätze und können gezählt werden
                else
                {
                    sum_einsaetze += amount;
                    cre_einsaetze += credits;
                }
});
            let tables = document.querySelectorAll("#iframe-inside-container > table");
            let table = tables[0];
            if(typeof table !== 'undefined' && table !== null)
                table.insertAdjacentHTML('beforebegin',
                    '<div class="label label-danger" id="num_label"><i class="glyphicon glyphicon-fire" id="num_icon"></i>'+
                    I18n.t('lssm.sumDailyMissions.num_missions') + '<span id="num_anzahl">' + sum_einsaetze.toLocaleString() + ' / ' + cre_einsaetze.toLocaleString() + '</span></div>' +

                    '<div class="label label-warning" id="num_label"><i class="glyphicon glyphicon-plus" id="num_icon"></i>' +
                    I18n.t('lssm.sumDailyMissions.num_patients') + '<span id="num_anzahl">' + sum_patienten.toLocaleString() + ' / ' + cre_patienten.toLocaleString() + '</span></div>' +

                    '<div class="label label-success" id="num_label"><i class="glyphicon glyphicon-plus" id="num_icon"></i>' +
                    I18n.t('lssm.sumDailyMissions.num_prisoners') + '<span id="num_anzahl">' + sum_gefangene.toLocaleString() + ' / ' + cre_gefangene.toLocaleString() + '</span></div>' +

                    '<div class="label label-danger" id="num_label"><i class="glyphicon glyphicon-fire" id="num_icon"></i>' +
                    I18n.t('lssm.sumDailyMissions.num_team') + '<span id="num_anzahl">' + sum_verband.toLocaleString() + ' / ' + cre_verband.toLocaleString() + '</span></div>' +

                    '<div class="label label-info" id="num_label"><i class="glyphicon glyphicon-plus" id="num_icon"></i>' +
                    I18n.t('lssm.sumDailyMissions.num_teame') + '<span id="num_anzahl">' + sum_verbande.toLocaleString() + ' / ' + cre_verbande.toLocaleString() + '</span></div><br><br>');
}})();
