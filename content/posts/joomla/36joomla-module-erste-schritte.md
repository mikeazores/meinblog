langKey: de
##### [modules/mod_foo/language/en-GB/en-GB.mod_foo.ini](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini)
Diese Datei stellt die Texte für für die allgemeine Übersetzung bereit bereit.
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.ini -->

##### [modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini)
Diese Datei stellt die Texte für Menü und Installationsroutine bereit.
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini -->


##### [modules/mod_foo/mod_foo.php](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/mod_foo.php)
`mod_foo.php` ist der Haupteinstiegspunkt ins Modul. Die Datei führt die Initialisierungsroutinen aus, ruft Hilfsroutinen auf, um alle erforderlichen Daten zu erfassen, und ruft das Template auf, in dem die Modulausgabe angezeigt wird.
// https://github.com/astridx/boilerplate/raw/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/mod_foo.php

<?php
/**
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */


> In Joomla 3x war eine Zeile wie `$ moduleclass_sfx = htmlspecialchars ($ params-> get ('moduleclass_sfx'));` notwendig. Diese Zeile ist nicht mehr erforderlich. Siehe [PR 17447](https://github.com/joomla/joomla-cms/pull/17447).
##### [modules/mod_foo/mod_foo.xml](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/mod_foo.xml)
`mod_foo.xml` definiert die Dateien, die von der Installationsroutine kopiert werden und gibt Konfigurationsparameter für das Modul an. Du kennst dies bereits von den vorher erstellten Erweiterungen.
<!-- https://raw.githubusercontent.com/astridx/boilerplate/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/mod_foo.xml -->


##### [modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/51a02d3706fbf64b023e242def2086b1529cfe8d/src/modules/mod_foo/tmpl/default.php)
`default.php` ist das Template. Diese Datei nimmt die von `mod_foo.php` gesammelten Daten und generiert den HTML-Code, der auf der Seite angezeigt wird.
// https://github.com/astridx/boilerplate/raw/a45646218b9814967123a5fdbea27cbabc8a6293/src/modules/mod_foo/tmpl/default.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */


> Beachte: In der Templatedatei ist es möglich, alle in `mod_foo.php` definierten Variablen zu verwenden.
1. Installiere dein Modul in Joomla Version 4, um es zu testen. Am Anfang ist es das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:
Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.
2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu dem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

3. Teste als Nächstes, ob dein Modul fehlerfrei arbeitet. Öffne das Menü `Content | Site Modules` und klicke im sich öffnenden Fenster in der Werkzeugleiste `New`.

![Joomla Modul testen](/images/j4x36x1.png)

4. Trage einen Titel im entsprechenden Feld ein und wähle eine Position. Stelle im Tabulator `Menu Assignment` sicher, dass das Modul auf allen Seiten angezeigt wird. Klicke am Ende in der Werkzeugleiste die Schaltfläche `Save`.

![Joomla Modul erstellen](/images/j4x36x3.png)

5. Und das ist es. Wechsel in die Frontendansicht deines Modules und überzeuge dich davon, dass alles richtig angezeigt wird.

![Joomla Modul im Frontend](/images/j4x36x4.png)

> Alternativ ist es möglich, dass Modul in einen Beitrag einzufügen. ![Joomla Modul im Frontend](/images/j4x36x5.png)

Wir haben eine solide Grundlage für die weiteren Schritte.
github.com/astridx/boilerplate/compare/t30...t31.diff