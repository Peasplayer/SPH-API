//const {fetch, CookieJar} = require("node-fetch-cookies");
import {fetch, CookieJar} from "node-fetch-cookies";
import Crypto from './api/lib/Crypto.js';
import Session from "./api/Session.js";
import HTMLParser from "fast-html-parser";

var session = new Session();
session.login(***REMOVED***)
    .then(result => {
        console.log(result)
        //session.fetchApps().then(result => console.log(result))
        session.test()
    })


/*Session.fetchSchoolData(6289).then(data => {
    console.log(data)
    console.log(Session._cache.schoolData)
})*/

var test = "<html lang=\"de\"><head> <title>11BGd - Stundenplan - Schulportal Hessen - Pädagogische Organisation</title> <meta charset=\"utf-8\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <link rel=\"stylesheet\" href=\"css/bootstrap.min.css\"> <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/img/favicon-32x32.png\"> <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/img/favicon-32x32.png\"> <link href=\"css/responsive-text.css\" rel=\"stylesheet\"> <link href=\"css/own.css\" rel=\"stylesheet\"> <link href=\"import/fontawesome/css/all.min.css\" rel=\"stylesheet\"> <link href=\"import/fontawesome/css/solid.min.css\" rel=\"stylesheet\"> <link href=\"import/fontawesome/css/v4-shims.min.css\" rel=\"stylesheet\"> <script src=\"js/jquery-1.11.2.min.js\"></script> <link rel=\"stylesheet\" href=\"css/theme.css\"> <link rel=\"stylesheet\" href=\"css/jquery-ui.min.css\"> <script src=\"js/jquery-ui.min.js\"></script> <script src=\"js/stickynav.js\"></script> <meta name=\"description\" content=\"Schulportal Hessen\"> <script src=\"js/bootstrap.min.js\"></script> <link href=\"css/bootstrap.submenue.css\" rel=\"stylesheet\"> <link href=\"css/schulnavbar/6289/2c6ec48f62db2ddf75d848a82da06071.css\" rel=\"stylesheet\"> <script src=\"js/jquery.cookie.js\"></script> <script src=\"module/startseite/js/topapps.js\"></script> <script src=\"js/jquery.logoutTimer.js\"></script> <script src=\"js/allPages.js\"></script> <script src=\"module/matheretter/js/matheretter.js\"></script> <meta name=\"theme-color\" content=\"#00bcd4\"></head> <body> <div class=\"allButFooter\"> <div class=\"hidden-print\"> <nav class=\"navbar navbar-default visible-lg visible-md navbar-custom navbar-first\"> <div class=\"container\"> <div class=\"navbar-header\"> <a class=\"navbar-brand\" href=\"index.php\"> <img src=\"img/logo-schulportal-topbar.svg\" title=\"Schulportal Hessen\" style=\"position: relative; left: -13px; top: -16px\" width=\"300\"> </a> </div> </div> </nav> </div> <div class=\"hidden-print\" style=\"background-color: #ffffff;\" id=\"headlogo\"> <div class=\"container visible-lg visible-md\"> <div class=\"masthead\"> <div class=\"row headlogo\"> <div class=\"col-md-12\"> <img src=\"img/schullogo/6289/8c843291c570f152b548e6ef6952d7f1.png\" class=\"hidden-phone img-responsive pull-left\" style=\"padding-right: 10px; display: inline;vertical-align: middle;\"> <div style=\"padding-top: 15px;\"> <p class=\"headtitle\">Johann-Philipp-Reis-Schule <small>Friedberg</small><span id=\"institutionsid\" data-bezeichnung=\"Johann-Philipp-Reis-Schule\" class=\"hidden\">6289</span></p> <div class=\"hidden-phone tiny\">\"Schulportal Hessen - Pädagogische Organisation\"</div> </div> </div> </div> </div> </div> </div> <div class=\"sticky-wrapper\" style=\"height: 105px;\"></div><div class=\"navbar navbar-default navbar-custom navbar-last hidden-print sticky is-sticky\" role=\"navigation\" data-toggle=\"sticky-onscroll\"> <div class=\"container\"> <div class=\"navbar-header visible-sm visible-xs\"> <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <a class=\"navbar-brand\" href=\"index.php\"> Johann-Philipp-Reis-Schule</a> </div> <div class=\"navbar-collapse collapse\"> <ul class=\"nav navbar-nav\" id=\"menueband\"> <li><a href=\"index.php\" data-wx=\"no\" title=\"Startseite\"><i class=\"fa fa-home fa-fw\" aria-hidden=\"true\"></i> Start</a> </li> <li class=\"dropdown\"> <a aria-expanded=\"false\" role=\"button\" data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\" id=\"topapps\"><span class=\"fa fa-bars\"></span> Apps <span class=\"caret\"></span></a> <ul role=\"menu\" class=\"dropdown-menu\"> <li><a href=\"#\"><i class=\"fa fa-spinner fa-spin fa-fw\"></i> Lade ...</a></li> </ul> </li> <li class=\"dropdown\" id=\"toolmenue\"> <a aria-expanded=\"false\" role=\"button\" data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\" style=\"background: radial-gradient(rgba(255,255,255,0.5) 10%, rgba(0,0,0,0) 70%);\"> <span class=\"fa fa-hourglass-half\"></span>\n" +
    "                                    Stundenplan\n" +
    "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span class=\"caret\"></span> </a> <ul role=\"menu\" class=\"dropdown-menu\"> <li> <a href=\"stundenplan.php?a=detail_klasse&amp;e=1&amp;k=11BGd&amp;date=2024-06-24\"> <span class=\"fa fa-list-ul fa-fw\"></span>\n" +
    "                                                    11BGd\n" +
    "                                                                                                    </a> </li> <li role=\"separator\" class=\"divider\"></li> <li> <a href=\"https://support.schulportal.hessen.de/knowledgebase.php?category=89\" target=\"_blank\"> <span class=\"fa fa-question-circle fa-fw\"></span>\n" +
    "                                                    FAQ\n" +
    "                                                                                                    </a> </li> <li> <a href=\"stundenplan.php?a=dsgvo\"> <span class=\"fa fa-user-secret fa-fw\"></span>\n" +
    "                                                    Datenschutz\n" +
    "                                                                                                    </a> </li> <li> <a href=\"https://info.schulportal.hessen.de/das-sph/sph-paedorg/stundenplan/\" target=\"_blank\"> <span class=\"fa fa-info-circle fa-fw\"></span>\n" +
    "                                                    Weitere Informationen\n" +
    "                                                                                                    </a> </li> </ul> </li> </ul> <ul class=\"nav navbar-nav navbar-right\"> <li class=\"dropdown\"> <a aria-expanded=\"false\" role=\"button\" data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\"> <i class=\"fa-solid fa-child\"></i> Störmer, Tom  (11BGd)\n" +
    "                                                                                                                <span class=\"caret\"></span> </a> <ul role=\"menu\" class=\"dropdown-menu\"> <li><a href=\"benutzerverwaltung.php?a=userChangePassword\" data-wx=\"no\"><span class=\"fa fa-key fa-fw\"></span> Passwort ändern</a></li> <li><a href=\"benutzerverwaltung.php?a=userMail\" data-wx=\"no\"><span class=\"fa fa-at fa-fw\"></span> E-Mail &amp; Benachrichtigungen</a> </li> <li><a href=\"benutzerverwaltung.php?a=userFoto\" data-wx=\"no\"><span class=\"fa fa-image fa-fw\"></span> Foto</a></li> <li role=\"separator\" class=\"divider\"></li> <li><a href=\"benutzerverwaltung.php?a=userData\" data-wx=\"no\"><span class=\"fa fa-list fa-fw\"></span> Benutzerdaten</a></li> <li role=\"separator\" class=\"divider\"></li> <li><a href=\"benutzerverwaltung.php?a=userAutologins\" data-wx=\"no\"><span class=\"fa fa-sign-in fa-fw\"></span> Automatische Anmeldungen</a> </li> </ul> </li> <li class=\"dropdown\"> <a aria-expanded=\"false\" role=\"button\" data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\"><span class=\"fa-solid fa-headset\"></span> Support<span class=\"caret\"></span></a> <ul role=\"menu\" class=\"dropdown-menu\"> <li><a href=\"lanis-support.php\" data-click=\"support\" target=\"_blank\"><span class=\"fa-solid fa-headset\"></span> Support</a></li> <li> <a href=\"benutzerverwaltung.php?a=userDSGVO\"><span class=\"glyphicon glyphicon-eye-open\"></span> Datenschutz</a></li> <li><a href=\"https://support.schulportal.hessen.de/knowledgebase.php?category=45\" target=\"_blank\"><span class=\"glyphicon glyphicon-question-sign\"></span> Hilfe/FAQ</a> </li> <li class=\"divider\"></li> <li><a href=\"verwaltung.php?a=impressum\" target=\"_blank\"><span class=\"glyphicon glyphicon-info-sign\"></span> Impressum</a></li> </ul> </li> <li><a href=\"index.php?logout=all\" data-wx=\"no\"><span title=\"Abmeldung aus allen angebundenen Systemen\"><span class=\"fa fa-power-off fw\"></span> Logout</span></a></li> </ul> </div> </div> </div> <div class=\"container\"> <div class=\"row clearfix hidden-print\"> <div class=\"col-md-12 column logoutTimer\"><div class=\"alert alert-danger\" id=\"logoutTimer\" style=\"display: none;\"><b>Automatischer Logout:</b> Es konnte längere Zeit keine Aktion auf dieser Seite festgestellt werden. <br>Der automatische Logout erfolgt daher in <span id=\"timer\"></span> Sekunden! <a class=\"btn btn-danger\" onclick=\"$.breaklogoutTimer();\" data-wx=\"no\">Ich möchte weiter arbeiten, bitte nicht ausloggen</a></div></div> </div> <div id=\"content\"> <div class=\"row\"> <div class=\"col-md-12\"> <h1 data-exemplar=\"1\">\n" +
    "                    11BGd                 \n" +
    "                        <small>Stundenplan</small></h1> </div> </div> <div> <ul class=\"nav nav-tabs hidden-print\" role=\"tablist\"> <li role=\"presentation\" class=\"active\"><a href=\"#all\" aria-controls=\"all\" role=\"tab\" data-toggle=\"tab\">Gesamtplan 11BGd</a></li> <li role=\"presentation\"><a href=\"#own\" aria-controls=\"own\" role=\"tab\" data-toggle=\"tab\">Persönlicher Plan</a></li> </ul> <div class=\"tab-content\"> <div role=\"tabpanel\" class=\"tab-pane active allPlan\" id=\"all\"> <h2>Gesamtplan der 11BGd</h2> <script>\n" +
    "        function dateBack(){\n" +
    "            $('option:selected', 'select').removeAttr('selected').next('option').attr('selected', 'selected');\n" +
    "            $('#dateSelect').change();\n" +
    "        }\n" +
    "        function dateForward(){\n" +
    "            $('option:selected', 'select').removeAttr('selected').prev('option').attr('selected', 'selected');\n" +
    "            $('#dateSelect').change();\n" +
    "        }\n" +
    "    </script> <div class=\"plan\" data-date=\"2024-06-24\"> <div class=\"row alert alert-warning hidden-pdf hidden-print\" style=\"padding-bottom: 3px;\"> <form class=\"form-inline\"> <button id=\"dateback\" onclick=\"dateBack()\" type=\"button\" class=\"col-md-1 btn btn-primary  btn-xs\"><i class=\"fas fa-arrow-left\"></i>  Zurück</button> <div class=\" col-md-10 column form-group\"> <label for=\"exampleInputName2\">Stundenplan gültig</label> <select class=\"form-control\" id=\"dateSelect\"> <option value=\"2024-07-08\">ab 08.07.2024</option> <option value=\"2024-07-01\">ab 01.07.2024 (bis 07.07.2024)</option> <option value=\"2024-06-24\" selected=\"selected\">ab 24.06.2024 (bis 30.06.2024)</option> </select> </div> <button id=\"dateforward\" onclick=\"dateForward()\" type=\"button\" class=\"col-md-1 btn btn-primary  btn-xs pull-right\">Vor <i class=\"fas fa-arrow-right\"></i></button> </form> </div> <div class=\"row\"> <div class=\"col-md-6\"> <span class=\"hidden-lg hidden-md hidden-sm hidden-xs print-show\">\n" +
    "                            Stundenplan gültig&nbsp;\n" +
    "                                                                                                                                                                                                                        ab 24.06.2024 (bis 30.06.2024)                                                                                    </span> </div> <div class=\"col-md-6 hidden-pdf hidden-print\"> <div class=\"pull-right hidden-pdf\">28.06.2024: Diese Woche ist eine <span class=\"badge badge-success\" id=\"aktuelleWoche\">G</span>-Woche.</div> </div> <span class=\"hidden-pdf\"> <br> </span> <div class=\"col-md-12\"> <table class=\"table table-hoverRowspan table-condensed table-bordered table-centered\"> <thead> <tr> <th style=\"width:16%\">Stunde</th> <th style=\"width:16%\">Montag</th> <th style=\"width:16%\">Dienstag</th> <th style=\"width:16%\">Mittwoch</th> <th style=\"width:16%\">Donnerstag</th> <th style=\"width:16%\">Freitag</th> </tr> </thead> <tbody> <tr class=\"\"> <td> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> </tr> <tr class=\"\"> <td> <span class=\"hidden-xs print-show\"> <b>1. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"1. Stunde\">\n" +
    "                                                1.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s01ed122ba6d9ee61b516354d37bb5dba\" title=\"Mathe im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s27dcb337711d5bd452eb160f33194d8d\" title=\"PWK im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa8d610dae83a7c2dba78fe92927cb7e1\" title=\"Eng im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s7cd424572476b7b736fb2fa3f6168c3b\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5365156746db0723b1ae5ddceca2051e\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s654dee3631097c24d212433d19bb14e6\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0648cd8b51ae51d0de6e321c1932c239\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6589f617c7f4feecb200bf27bcdab75d\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s056e21c4acd93599297565b6a1341f01\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s93b55056df51916b0dc44ad46a662070\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc877c5a98d8cb1dc5d8481f44768f85d\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc6d955834ec975f1b8cf85e75251142b\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4c3b754b33642257ee614c0fe3312859\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc94a45afdb82300ec38702672a4e2913\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s3c625782f6d1f69f96c780ae8b92408a\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca2be2cfdeb84d698ca3f1bba63abc1e\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca2be2cfdeb84d698ca3f1bba63abc1e\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s52bde6d83c04b0939eb8f8393d8478fc\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s52bde6d83c04b0939eb8f8393d8478fc\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s82ed8fbd2fa190807e3d1aea531ded38\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s82ed8fbd2fa190807e3d1aea531ded38\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa62cfc5e866f9a388974aa439303431a\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa62cfc5e866f9a388974aa439303431a\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s963e2a8d9f64ba727f443d8f14ee4e40\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s45fbc87a47400a9654013a84489b54e2\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd3cc279c1e86a40591803281671edef8\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5994e035ef46e7e46a9a3a055b12428a\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7cc74974b97dc40c5e6d3e6faad9c88f\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1fa4d71e66410c966c90b0e6f5287e07\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se6fe04ca55f4675d41b52b4444a7b79e\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7e6fc34020be2565ebe6412a51abddf1\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sfffe752541cfacd164b9c7c9296d3515\" title=\"Deu im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s67de8cf234770f84d107dbf7dd9bfc4f\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa279844a3c0140912311f729b404818f\" title=\"Deu im Raum C 22 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 22\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VO\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s2dec36d10ed3bce8237c28ecca0dcf6b\" title=\"G im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KUS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa279844a3c0140912311f729b404818f\" title=\"Deu im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s47e61291d58b08b6c9395ac626d43020\" title=\"G im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            ZF\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s5a7ca61f12f1412f113fad2e5288a948\" title=\"Mathe im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scd23776e920f32d546fa254d9ce45dbb\" title=\"Deu im Raum C 23 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 23\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s2dcf2f83c3a143ccc1771749386feccf\" title=\"Mathe im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfcbe02444f141c264f0f8efb5b711c34\" title=\"Spa 3 im Raum C 22 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Spa 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 22\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>2. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"2. Stunde\">\n" +
    "                                                2.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s01ed122ba6d9ee61b516354d37bb5dba\" title=\"Mathe im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s27dcb337711d5bd452eb160f33194d8d\" title=\"PWK im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa8d610dae83a7c2dba78fe92927cb7e1\" title=\"Eng im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s7cd424572476b7b736fb2fa3f6168c3b\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5365156746db0723b1ae5ddceca2051e\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s654dee3631097c24d212433d19bb14e6\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0648cd8b51ae51d0de6e321c1932c239\" title=\"TeKo PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TeKo PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6589f617c7f4feecb200bf27bcdab75d\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s056e21c4acd93599297565b6a1341f01\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s93b55056df51916b0dc44ad46a662070\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc877c5a98d8cb1dc5d8481f44768f85d\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc6d955834ec975f1b8cf85e75251142b\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4c3b754b33642257ee614c0fe3312859\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc94a45afdb82300ec38702672a4e2913\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s3c625782f6d1f69f96c780ae8b92408a\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            OS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca2be2cfdeb84d698ca3f1bba63abc1e\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca2be2cfdeb84d698ca3f1bba63abc1e\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s52bde6d83c04b0939eb8f8393d8478fc\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s52bde6d83c04b0939eb8f8393d8478fc\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s82ed8fbd2fa190807e3d1aea531ded38\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s82ed8fbd2fa190807e3d1aea531ded38\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa62cfc5e866f9a388974aa439303431a\" title=\"TW B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa62cfc5e866f9a388974aa439303431a\" title=\"TW B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s963e2a8d9f64ba727f443d8f14ee4e40\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s45fbc87a47400a9654013a84489b54e2\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd3cc279c1e86a40591803281671edef8\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5994e035ef46e7e46a9a3a055b12428a\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7cc74974b97dc40c5e6d3e6faad9c88f\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1fa4d71e66410c966c90b0e6f5287e07\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se6fe04ca55f4675d41b52b4444a7b79e\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7e6fc34020be2565ebe6412a51abddf1\" title=\"Tec M im Raum B 106 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 106\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sfffe752541cfacd164b9c7c9296d3515\" title=\"Deu im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s67de8cf234770f84d107dbf7dd9bfc4f\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa279844a3c0140912311f729b404818f\" title=\"Deu im Raum C 22 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 22\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VO\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s2dec36d10ed3bce8237c28ecca0dcf6b\" title=\"G im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KUS\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa279844a3c0140912311f729b404818f\" title=\"Deu im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s47e61291d58b08b6c9395ac626d43020\" title=\"G im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            ZF\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s5a7ca61f12f1412f113fad2e5288a948\" title=\"Mathe im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scd23776e920f32d546fa254d9ce45dbb\" title=\"Deu im Raum C 23 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 23\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s2dcf2f83c3a143ccc1771749386feccf\" title=\"Mathe im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfcbe02444f141c264f0f8efb5b711c34\" title=\"Spa 3 im Raum C 22 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Spa 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 22\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>3. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"3. Stunde\">\n" +
    "                                                3.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s508be2dd9f1774c46b40590bc5ac9bb4\" title=\"Deu im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HC\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5a7ca61f12f1412f113fad2e5288a948\" title=\"Mathe im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s62a77fbeb04a7deefa87991b046b7d3c\" title=\"PWK im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s634cc5371c9f6b18ed23ccd8ce20fd91\" title=\"Eng im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s5b932425827acb95794e30bcd01690b6\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s639b7ac281e5a6e624635508cf1f5003\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa91053635549caec3b619d7d5d0dfdf9\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s37992d04873beece54b5eb87495bb672\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s28507d68cb796bf2e32a2b102a0de852\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"seed5fb1f1bfcad9d90fa01cb6fcf0b56\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9e1b3daaf259389df0b67ada101b3ff4\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se768cafe6d939b8fa0e485f92c189f11\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15a867bb70f50f2d2aaee8f115a7aac7\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15092d118c49c33ccbf564dacd2105c7\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4fca1a73b13bd0b6bcfbae5ecc407559\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s29977d69e9b8a013b7e0659a6ba908e6\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s963e2a8d9f64ba727f443d8f14ee4e40\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s45fbc87a47400a9654013a84489b54e2\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd3cc279c1e86a40591803281671edef8\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5994e035ef46e7e46a9a3a055b12428a\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7cc74974b97dc40c5e6d3e6faad9c88f\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1fa4d71e66410c966c90b0e6f5287e07\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se6fe04ca55f4675d41b52b4444a7b79e\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7e6fc34020be2565ebe6412a51abddf1\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s7249ab737a55d217425ce8e51c89378a\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s986d32311f805c7a49003bbc113d2610\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4e13a838d18b072b9b4fdf500bf68597\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0edcd084baf0cc7dc7569d63b1a4c0bf\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1f8b108a86fc88c2722d9e3df99ea19a\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf31631ae10484621075250680c5fde1d\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc7591f7dad27c508af4180f94798e881\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6e4e3de5a5f669ee8c78df83b1b552e0\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8d06bcd7fa860457094a97ff5b47a742\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s119360fdcc28cef2a96cbb2a797ca690\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s377b381ad91f4ccfba8daf3010e3a60b\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7ef4eed77a92b9bee0da632f3258d46c\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8238ffeef28a7bec75a6b7738ebd4ae7\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s337f71f98bd4ceeaedc8b02112b38d88\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd43c8194b40b66d1d048658a61cd5e91\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s62ae0857a7226b02da0a647fb731d8c8\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s11f3a6c14e236dfb171e9bfec7a350a6\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s3b43a82453942d87e611b605df7c9981\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0d304d87401d87a72dcd7a0de7d2d829\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s11342bc6d5d2b8d2a4d74874402f7e7b\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sa78343bf9dc7ee67cb6c6a65ec952f78\" title=\"Eng im Raum C 23 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 23\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s508be2dd9f1774c46b40590bc5ac9bb4\" title=\"Deu im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HC\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s88cf7022b9e1059fa590755b8a9fd25e\" title=\"Eng im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s634cc5371c9f6b18ed23ccd8ce20fd91\" title=\"Eng im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sb8c0c4e7619deb5347ad8cd7896d1cc5\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb51694b946f4c993efeb65e14cd0903c\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd5c812806eb2140cb7119043aeb6810f\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sbc3f8a18738f2dd88682957aaee0fe00\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s662970dc086f85b365bdf6d2fa819e2b\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s99eea80c89eda8db87188ff0551f8320\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s91adc90a7581d58867fc5403e770e822\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4a879cdd1c9428c45e1b0062c58b8642\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s61144897be7961819852be0fda135458\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb4794424bec4a62e1d560035ead8aa75\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s03ae03c9522b0013bf5c18299f09c5b8\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa7b31c7bf1e19288e508a7e6481f91fe\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd8ea0e44602b2ec63f560af27ab91770\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ffc10737d64b7a6521abebe90945e79\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9f41c48ab1ee6edb6d84dcd270f46d0a\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd893cbcb0dd6911d0d4e0f0e792a2416\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"safe88754ba0deed725ce4f9d858f6168\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s53bf184de80d8e54ae2b2f2273427b9d\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8176951ad4f0de9e28702965cd3e8b87\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca72f45155c32a1b30263360c6274973\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>4. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"4. Stunde\">\n" +
    "                                                4.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s508be2dd9f1774c46b40590bc5ac9bb4\" title=\"Deu im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HC\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5a7ca61f12f1412f113fad2e5288a948\" title=\"Mathe im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s62a77fbeb04a7deefa87991b046b7d3c\" title=\"PWK im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s634cc5371c9f6b18ed23ccd8ce20fd91\" title=\"Eng im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s5b932425827acb95794e30bcd01690b6\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s639b7ac281e5a6e624635508cf1f5003\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa91053635549caec3b619d7d5d0dfdf9\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s37992d04873beece54b5eb87495bb672\" title=\"ReWe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>ReWe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s28507d68cb796bf2e32a2b102a0de852\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"seed5fb1f1bfcad9d90fa01cb6fcf0b56\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9e1b3daaf259389df0b67ada101b3ff4\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se768cafe6d939b8fa0e485f92c189f11\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15a867bb70f50f2d2aaee8f115a7aac7\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15092d118c49c33ccbf564dacd2105c7\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4fca1a73b13bd0b6bcfbae5ecc407559\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s29977d69e9b8a013b7e0659a6ba908e6\" title=\"WI DV 2 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s963e2a8d9f64ba727f443d8f14ee4e40\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s45fbc87a47400a9654013a84489b54e2\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd3cc279c1e86a40591803281671edef8\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5994e035ef46e7e46a9a3a055b12428a\" title=\"Tec M im Raum B 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SF\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7cc74974b97dc40c5e6d3e6faad9c88f\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1fa4d71e66410c966c90b0e6f5287e07\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se6fe04ca55f4675d41b52b4444a7b79e\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7e6fc34020be2565ebe6412a51abddf1\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SZ\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s7249ab737a55d217425ce8e51c89378a\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s986d32311f805c7a49003bbc113d2610\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4e13a838d18b072b9b4fdf500bf68597\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0edcd084baf0cc7dc7569d63b1a4c0bf\" title=\"Phy 1 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Phy 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1f8b108a86fc88c2722d9e3df99ea19a\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf31631ae10484621075250680c5fde1d\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc7591f7dad27c508af4180f94798e881\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6e4e3de5a5f669ee8c78df83b1b552e0\" title=\"Bio 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Bio 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8d06bcd7fa860457094a97ff5b47a742\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s119360fdcc28cef2a96cbb2a797ca690\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s377b381ad91f4ccfba8daf3010e3a60b\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7ef4eed77a92b9bee0da632f3258d46c\" title=\"Phy 2 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Phy 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8238ffeef28a7bec75a6b7738ebd4ae7\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s337f71f98bd4ceeaedc8b02112b38d88\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd43c8194b40b66d1d048658a61cd5e91\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s62ae0857a7226b02da0a647fb731d8c8\" title=\"Ch 1 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ch 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s11f3a6c14e236dfb171e9bfec7a350a6\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s3b43a82453942d87e611b605df7c9981\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0d304d87401d87a72dcd7a0de7d2d829\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s11342bc6d5d2b8d2a4d74874402f7e7b\" title=\"Bio 1 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Bio 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sa78343bf9dc7ee67cb6c6a65ec952f78\" title=\"Eng im Raum C 23 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 23\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s508be2dd9f1774c46b40590bc5ac9bb4\" title=\"Deu im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HC\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s88cf7022b9e1059fa590755b8a9fd25e\" title=\"Eng im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s634cc5371c9f6b18ed23ccd8ce20fd91\" title=\"Eng im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sb8c0c4e7619deb5347ad8cd7896d1cc5\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb51694b946f4c993efeb65e14cd0903c\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd5c812806eb2140cb7119043aeb6810f\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sbc3f8a18738f2dd88682957aaee0fe00\" title=\"Rel Ka im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Rel Ka</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s662970dc086f85b365bdf6d2fa819e2b\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s99eea80c89eda8db87188ff0551f8320\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s91adc90a7581d58867fc5403e770e822\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4a879cdd1c9428c45e1b0062c58b8642\" title=\"Ethik im Raum C 121 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 121\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s61144897be7961819852be0fda135458\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb4794424bec4a62e1d560035ead8aa75\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s03ae03c9522b0013bf5c18299f09c5b8\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa7b31c7bf1e19288e508a7e6481f91fe\" title=\"Ethik im Raum C 29 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 29\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd8ea0e44602b2ec63f560af27ab91770\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ffc10737d64b7a6521abebe90945e79\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9f41c48ab1ee6edb6d84dcd270f46d0a\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd893cbcb0dd6911d0d4e0f0e792a2416\" title=\"Ethik im Raum C 122 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ethik</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 122\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"safe88754ba0deed725ce4f9d858f6168\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s53bf184de80d8e54ae2b2f2273427b9d\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8176951ad4f0de9e28702965cd3e8b87\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca72f45155c32a1b30263360c6274973\" title=\"Rel Ev 1 im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Rel Ev 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WM\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>5. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"5. Stunde\">\n" +
    "                                                5.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sc15f963e1ecf1b1a15770f2796ff88c0\" title=\"PWK im Raum D-E 20 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scd23776e920f32d546fa254d9ce45dbb\" title=\"Deu im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s88cf7022b9e1059fa590755b8a9fd25e\" title=\"Eng im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s2dcf2f83c3a143ccc1771749386feccf\" title=\"Mathe im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s3c2cda8c0dfe0f4412ba7db20e32a941\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8066f0eac97393f9818af7703593f2f6\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc318638964e744356fe96b1b6241e627\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7e650f60b4342e6d49cf3e1b8f41cc6b\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s28507d68cb796bf2e32a2b102a0de852\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"seed5fb1f1bfcad9d90fa01cb6fcf0b56\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9e1b3daaf259389df0b67ada101b3ff4\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se768cafe6d939b8fa0e485f92c189f11\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa1abe1531cb001de6c38576bb31ac8f4\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s48bd17038881f8a6854af3c05fbdac34\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s113bbd51162201da2cfe0f5d2d5360ae\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfd99a12e41da0f9d7f201f8d3bbbed71\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s37d618d77b1c9a0a5e72e24afed4dc81\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc5c76be17b04699a2b7822f8fef65ab9\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8e36d39972ec38a47577e0226ba8c609\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa56d74340dfc8d1b94482be268c913d7\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sb202e39d55bad70d897d1af10e0e3a34\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa5c180cfc9ed1aaad42244a31fd69624\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s63e0cb6fdc359327167945c91f4c4afd\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sbc8ac53e1ba9e679de9d8c017d5d59c6\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s385c430d85e97372f8ad54b464fdcecd\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s94544542491f1243327bf06e103221e0\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca7e5c4a7996f3c0c59def3f0ecffc5e\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5ca17643d4a5ba30beb5d555688dfc74\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s686dce13994103a669c9dcfcf9a675c1\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"saa98c922f44dbae409a2b4638ca13394\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9ada2b89141c21c4b029d295cc953e15\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sbce74e668eb744da0f00bd39b25992a2\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s2d07daeb6fd3458bbe7a5300780ba28d\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s480ea0bff2dc7a6c7d765e2ff9192502\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd129e832ca17ce06f078504c4439cde2\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5658a5642f6e604781f856d794a132a9\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"se6164bbfa000bb0f22156d16d0913ec4\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s10a23502599b55d7020c7d157a31b850\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa87fdb8c8bfba6c2e9d0931ea2d8621d\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc327b11be4c32e087621292c27c6f343\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s710adf67ddaf19df1e9eed356736b941\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"saf4b0a9498d211f7674c0707fea0db8c\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s243ba94f02140673da75d0025506fdc8\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scffd5c829f937378bd5cede8a8bd36ab\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sce499906fc6a18d8d7b6a4543180420b\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9fb8b65ffad84b197947835eaca3d625\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1261550c5705680e9399703bca71a311\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s3cb83c17ed9644f5de74a770af5081c4\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd272a1bf15823eaaf2288d2f9a479690\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc04669ed31daaf957645e2d048debcb3\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf73d11b9db4d4696f698781d5fbd7152\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0a43c2673719994a088e9af452e3665c\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scf9945cb06da89926619e06414fac8a9\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s64cd76bb62bc53ea7b17c586e09c52d5\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7607e747d94186dee5dd7a3c7516d100\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf9b0127e96052185ca482321c49b6a8e\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sa78343bf9dc7ee67cb6c6a65ec952f78\" title=\"Eng im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s01ed122ba6d9ee61b516354d37bb5dba\" title=\"Mathe im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5397d25ceda6b2174abf38e5cccbd068\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfffe752541cfacd164b9c7c9296d3515\" title=\"Deu im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0f080a90f2c051f77a6b444aaf5204d8\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NU\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>6. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"6. Stunde\">\n" +
    "                                                6.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sc15f963e1ecf1b1a15770f2796ff88c0\" title=\"PWK im Raum D-E 20 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scd23776e920f32d546fa254d9ce45dbb\" title=\"Deu im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s88cf7022b9e1059fa590755b8a9fd25e\" title=\"Eng im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s2dcf2f83c3a143ccc1771749386feccf\" title=\"Mathe im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s3c2cda8c0dfe0f4412ba7db20e32a941\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8066f0eac97393f9818af7703593f2f6\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc318638964e744356fe96b1b6241e627\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7e650f60b4342e6d49cf3e1b8f41cc6b\" title=\"ReWe 2 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>ReWe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BLAD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s28507d68cb796bf2e32a2b102a0de852\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"seed5fb1f1bfcad9d90fa01cb6fcf0b56\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9e1b3daaf259389df0b67ada101b3ff4\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se768cafe6d939b8fa0e485f92c189f11\" title=\"TW PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FA\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6ec0396b642b4ba6fc268db15fcfb183\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0e03794d878dca426c38d186844af48e\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"se17d1b07f505a0650d18a39dd8e61313\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 10 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 10\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sb7993142a182821aa44666fcf02c6dbd\" title=\"Tec B im Raum B 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa1abe1531cb001de6c38576bb31ac8f4\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s48bd17038881f8a6854af3c05fbdac34\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s113bbd51162201da2cfe0f5d2d5360ae\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfd99a12e41da0f9d7f201f8d3bbbed71\" title=\"TeKo M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TeKo M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s37d618d77b1c9a0a5e72e24afed4dc81\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc5c76be17b04699a2b7822f8fef65ab9\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8e36d39972ec38a47577e0226ba8c609\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa56d74340dfc8d1b94482be268c913d7\" title=\"WI DV 1 im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WI DV 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WO\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sb202e39d55bad70d897d1af10e0e3a34\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa5c180cfc9ed1aaad42244a31fd69624\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s63e0cb6fdc359327167945c91f4c4afd\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sbc8ac53e1ba9e679de9d8c017d5d59c6\" title=\"Ch 3 im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ch 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s385c430d85e97372f8ad54b464fdcecd\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s94544542491f1243327bf06e103221e0\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sca7e5c4a7996f3c0c59def3f0ecffc5e\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5ca17643d4a5ba30beb5d555688dfc74\" title=\"Phy 3 im Raum C 20 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Phy 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 20\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            MK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s686dce13994103a669c9dcfcf9a675c1\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"saa98c922f44dbae409a2b4638ca13394\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9ada2b89141c21c4b029d295cc953e15\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sbce74e668eb744da0f00bd39b25992a2\" title=\"Ch 2 im Raum C 17 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Ch 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 17\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s2d07daeb6fd3458bbe7a5300780ba28d\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s480ea0bff2dc7a6c7d765e2ff9192502\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd129e832ca17ce06f078504c4439cde2\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5658a5642f6e604781f856d794a132a9\" title=\"Bio 3 im Raum C 19 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Bio 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 19\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            STU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"se6164bbfa000bb0f22156d16d0913ec4\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s10a23502599b55d7020c7d157a31b850\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa87fdb8c8bfba6c2e9d0931ea2d8621d\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc327b11be4c32e087621292c27c6f343\" title=\"Tec PI im Raum C 12 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 12\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s710adf67ddaf19df1e9eed356736b941\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"saf4b0a9498d211f7674c0707fea0db8c\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s243ba94f02140673da75d0025506fdc8\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scffd5c829f937378bd5cede8a8bd36ab\" title=\"TeKo B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TeKo B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sce499906fc6a18d8d7b6a4543180420b\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s9fb8b65ffad84b197947835eaca3d625\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1261550c5705680e9399703bca71a311\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s3cb83c17ed9644f5de74a770af5081c4\" title=\"Tec M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HE\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd272a1bf15823eaaf2288d2f9a479690\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc04669ed31daaf957645e2d048debcb3\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf73d11b9db4d4696f698781d5fbd7152\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0a43c2673719994a088e9af452e3665c\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"scf9945cb06da89926619e06414fac8a9\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s64cd76bb62bc53ea7b17c586e09c52d5\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s7607e747d94186dee5dd7a3c7516d100\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf9b0127e96052185ca482321c49b6a8e\" title=\"WiLe 2 im Raum D 204 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 204\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            WD\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sa78343bf9dc7ee67cb6c6a65ec952f78\" title=\"Eng im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            FT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s01ed122ba6d9ee61b516354d37bb5dba\" title=\"Mathe im Raum C 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HZ\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s5397d25ceda6b2174abf38e5cccbd068\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfffe752541cfacd164b9c7c9296d3515\" title=\"Deu im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Deu</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            LI\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0f080a90f2c051f77a6b444aaf5204d8\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            NU\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>7. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"7. Stunde\">\n" +
    "                                                7.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s99499f390a19a485097d8c98f5d1ae06\" title=\"G im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            EG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa017426ff228daa14c0db114841ddbb0\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfcbe02444f141c264f0f8efb5b711c34\" title=\"Spa 3 im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Spa 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s0da895df3a4f8f577bc5158b2d060bdf\" title=\"G im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4bccd3814d94280bfe6481688fe9e15f\" title=\"PWK im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HC\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc1b4ecfda46030b15a945fa9edb7b888\" title=\"Mathe im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VT\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sa8d610dae83a7c2dba78fe92927cb7e1\" title=\"Eng im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"se6164bbfa000bb0f22156d16d0913ec4\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s10a23502599b55d7020c7d157a31b850\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa87fdb8c8bfba6c2e9d0931ea2d8621d\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc327b11be4c32e087621292c27c6f343\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s176b7b8880d5ff3589e8869d7e48232f\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8870b077385ca552194492436ec1215e\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc1c2fe84a2a2c337c8ad159efe83c6df\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0f6fb4f876e3146d478ccf029a06e278\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15a867bb70f50f2d2aaee8f115a7aac7\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15092d118c49c33ccbf564dacd2105c7\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4fca1a73b13bd0b6bcfbae5ecc407559\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s29977d69e9b8a013b7e0659a6ba908e6\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1e7822bf15192659d1367eb1936a5215\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s24a9f3a58cd5c5b73c4020bf01667c3e\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s223deddf873cbbd81f2fefd625753a9e\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s56d6b97845108688da898e4194ce2ab9\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd272a1bf15823eaaf2288d2f9a479690\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc04669ed31daaf957645e2d048debcb3\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf73d11b9db4d4696f698781d5fbd7152\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0a43c2673719994a088e9af452e3665c\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s4d6cf5b964584ba24ed25ac346660261\" title=\"Spa 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Spa 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BECK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s461b868926a866fce89c67ebba0e42e5\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc1b4ecfda46030b15a945fa9edb7b888\" title=\"Mathe im Raum C 22 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 22\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VT\n" +
    "    </small> </div> </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>8. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"8. Stunde\">\n" +
    "                                                8.\n" +
    "                                            </span> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s99499f390a19a485097d8c98f5d1ae06\" title=\"G im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            EG\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa017426ff228daa14c0db114841ddbb0\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sfcbe02444f141c264f0f8efb5b711c34\" title=\"Spa 3 im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Spa 3</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SU\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s0da895df3a4f8f577bc5158b2d060bdf\" title=\"G im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>G</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4bccd3814d94280bfe6481688fe9e15f\" title=\"PWK im Raum D 205 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>PWK</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 205\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HC\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc1b4ecfda46030b15a945fa9edb7b888\" title=\"Mathe im Raum C 26 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 26\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VT\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"sa8d610dae83a7c2dba78fe92927cb7e1\" title=\"Eng im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Eng</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            PV\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"se6164bbfa000bb0f22156d16d0913ec4\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s10a23502599b55d7020c7d157a31b850\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sa87fdb8c8bfba6c2e9d0931ea2d8621d\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc327b11be4c32e087621292c27c6f343\" title=\"Tec PI im Raum C 13 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Tec PI</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 13\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            CR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s176b7b8880d5ff3589e8869d7e48232f\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s8870b077385ca552194492436ec1215e\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc1c2fe84a2a2c337c8ad159efe83c6df\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0f6fb4f876e3146d478ccf029a06e278\" title=\"TW B im Raum D-E 16 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW B</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D-E 16\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            GR\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15a867bb70f50f2d2aaee8f115a7aac7\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s15092d118c49c33ccbf564dacd2105c7\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4fca1a73b13bd0b6bcfbae5ecc407559\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s29977d69e9b8a013b7e0659a6ba908e6\" title=\"WI DV 2 im Raum C 11 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WI DV 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 11\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            HAM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s1e7822bf15192659d1367eb1936a5215\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s24a9f3a58cd5c5b73c4020bf01667c3e\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s223deddf873cbbd81f2fefd625753a9e\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s56d6b97845108688da898e4194ce2ab9\" title=\"TW M im Raum B 116 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>TW M</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        B 116\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SCH\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sd272a1bf15823eaaf2288d2f9a479690\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc04669ed31daaf957645e2d048debcb3\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sf73d11b9db4d4696f698781d5fbd7152\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s0a43c2673719994a088e9af452e3665c\" title=\"WiLe 1 im Raum D 203 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>WiLe 1</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        D 203\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SHMT\n" +
    "    </small> </div> </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s4d6cf5b964584ba24ed25ac346660261\" title=\"Spa 2 im Raum C 24 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Spa 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 24\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BECK\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s461b868926a866fce89c67ebba0e42e5\" title=\"Spo im Raum H 1 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Spo</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        H 1\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            KM\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sc1b4ecfda46030b15a945fa9edb7b888\" title=\"Mathe im Raum C 22 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Mathe</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 22\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            VT\n" +
    "    </small> </div> </td> </tr> <tr class=\"\"> <td> <span class=\"hidden-xs print-show\"> <b>9. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"9. Stunde\">\n" +
    "                                                9.\n" +
    "                                            </span> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s78e4b8c944c9ff50fc4fb744ee19c580\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s01cabeb57fa2545ed609b5174a9bc26e\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s26c6ac59525cb7b592c2924f7eb3c21a\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4953e5605aa61b2cd5ca8f425187f363\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6f43e13ada0061fefc906ed7b8d19059\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s494f275af34a214bfbd87a05084e57d5\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s496c02909e634ecb9423e60c275f5485\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sae9d24ec3fe8d5966cf97214d35a47d6\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s4d6cf5b964584ba24ed25ac346660261\" title=\"Spa 2 im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Spa 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BECK\n" +
    "    </small> </div> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> </tr> <tr> <td> <span class=\"hidden-xs print-show\"> <b>10. Stunde</b><br> </span> <span class=\"hidden-sm hidden-lg hidden-md hidden-print\" title=\"10. Stunde\">\n" +
    "                                                10.\n" +
    "                                            </span> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s78e4b8c944c9ff50fc4fb744ee19c580\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s01cabeb57fa2545ed609b5174a9bc26e\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s26c6ac59525cb7b592c2924f7eb3c21a\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s4953e5605aa61b2cd5ca8f425187f363\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            RO\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s6f43e13ada0061fefc906ed7b8d19059\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGa  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s494f275af34a214bfbd87a05084e57d5\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"s496c02909e634ecb9423e60c275f5485\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGc  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> <div class=\"stunde\" data-mix=\"sae9d24ec3fe8d5966cf97214d35a47d6\" title=\"Nachhilfe Ma im Raum C 28 bei der Klasse/Stufe/Lerngruppe 11BGd  \"> <b>Nachhilfe Ma</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 28\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            SP\n" +
    "    </small> </div> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> <td rowspan=\"1\"> <div class=\"stunde\" data-mix=\"s4d6cf5b964584ba24ed25ac346660261\" title=\"Spa 2 im Raum C 25 bei der Klasse/Stufe/Lerngruppe 11BGb  \"> <b>Spa 2</b>\n" +
    "\n" +
    "                                                                                                                                                                                                                        C 25\n" +
    "                                                                                                                                                                                                                \n" +
    "                                                                                                                                                                                                                        <br><small>\n" +
    "            BECK\n" +
    "    </small> </div> </td> <td>\n" +
    "                                                                            &nbsp;                                    </td> </tr> </tbody> </table> </div> </div> <link rel=\"stylesheet\" type=\"text/css\" href=\"./module/stundenplan/css/drawPlan.css\"> <script src=\"./module/stundenplan/js/drawPlan.js\"></script> </div> <div class=\"row allPlan\"> <div class=\"col-md-6 hidden-print\"> <a href=\"#\" id=\"printAll\" class=\"btn btn-primary\"><i class=\"fa fa-print\"></i> drucken</a> <a href=\"stundenplan.php?e=1&amp;a=detail_klasse&amp;k=11BGd&amp;pdf=1&amp;date=2024-06-24\" data-wx=\"no\" class=\"btn btn-primary\"><i class=\"fa-solid fa-file-pdf\"></i> PDF</a> </div> </div> </div> <div role=\"tabpanel\" class=\"tab-pane\" id=\"own\"> </div> </div> <script>\n" +
    "    $().ready(function () {                \n" +
    "\n" +
    "        $('#printAll').click(function () {\n" +
    "            if ($('.ownPlan').length>0) \n" +
    "                $('.ownPlan'). hide(); \n" +
    "            window.print(); \n" +
    "            if ($('.ownPlan').length>0) \n" +
    "                $('.ownPlan'). show();            \n" +
    "            return false;\n" +
    "        });\n" +
    "\n" +
    "        $('#printOwn').click(function () {\n" +
    "            $('.allPlan'). hide(); \n" +
    "            window.print(); \n" +
    "            $('.allPlan'). show();            \n" +
    "            return false;\n" +
    "        });\n" +
    "\n" +
    "     });\n" +
    "</script> <span class=\"hidden-print\"><br><br></span> </div> </div> </div> <div class=\"hidden-print footer\"> <div class=\"row visible-lg visible-md\"> <div class=\"cold-md-12\"> <table width=\"100%\"> <tbody><tr> <td width=\"50%\"> <a href=\"index.php\"><img src=\"img/logo-schulportal-footer.svg\" width=\"160\" height=\"29\"></a> </td> <td style=\"text-align: right;\" width=\"50%\"> <a href=\"benutzerverwaltung.php?a=userDSGVO\">Datenschutz</a>&nbsp;|&nbsp;<a href=\"verwaltung.php?a=impressum\">Impressum</a> </td> </tr> </tbody></table> </div> </div> <div class=\"row visible-sm visible-xs\"> <div class=\"col-sm-12 col-xs-12\" style=\"font-size: 8pt; text-align: center;\"> <a href=\"benutzerverwaltung.php?a=userDSGVO\">Datenschutz</a>&nbsp;|&nbsp;<a href=\"verwaltung.php?a=impressum\">Impressum</a> </div> </div> </div> <script src=\"module/pin/js/pagemenue.js\"></script>  </div><div id=\"desktopTest\" class=\"hidden-xs\"></div></body></html>";