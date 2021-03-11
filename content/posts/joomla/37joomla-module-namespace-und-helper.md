langKey: de
Die Logik im Modul ist unter Umständen komplex. Deshalb ist gut, den Code übersichtlich zu strukturieren. Dies geschieht mittels Helper-Dateien. Diese legen wir im Verzeichnis `Helper` an.

> Ich habe die Datei allgemein `FooHelper` benannt. Gute Stil ist es, ihr einen sprechenden Namen zu geben. Jede Hilfsdatei hat eine spezielle Aufgabe und nach ihr sollte sie benannt werden. Die Datei, die die neuesten Artikel lädt, heißt beispielsweise `ArticlesLatestHelper`. So erkennt man auf den ersten Blick, was in der Datei steckt.

Um unkompliziert auf die Datei zuzuigreifen, ergänzen wir den Namespace `namespace FooNamespace\Module\Foo\Site\Helper;`.

##### [modules/mod_foo/Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/Helper/FooHelper.php)
// https://raw.githubusercontent.com/astridx/boilerplate/415dd9b0521abb3e2626309d595c80d2cafb8f30/src/modules/mod_foo/Helper/FooHelper.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_foo
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Helper for mod_foo
 *
 * @since  __BUMP_VERSION__
 */
	/**
	 * Retrieve foo test
	 *
	 * @param   Registry        $params  The module parameters
	 * @param   CMSApplication  $app     The application
	 *
	 * @return  array
	 */
	public static function getText()
### Geänderte Dateien
Um die Inhalte von `FooHelper` im Einstiegspunkt `mod_foo.php` zu nutzen, importieren wir diese mittels `use FooNamespace\Module\Foo\Site\Helper\FooHelper;`. Anschließden rufen wir die Funktion `FooHelper::getText()` auf und speichern das Ergebnis in der Variablen `$test`.
##### [modules/mod_foo/mod_foo.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/mod_foo.php)
```

##### [modules/mod_foo/mod_foo.xml](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/mod_foo.xml)

Den Namespace tragen wir ins Manifest ein. So wird dieser bei der Installation in Joomla registriert. Außerdem ergänzen wir das neue Verzeichnis, damti dieses bei einer Installation an die richtige Stelle kopiert wird.

```xml {diff}
```

##### [modules/mod_foo/tmpl/default.php](https://github.com/astridx/boilerplate/blob/13117ebddfc12db184cd96f3f4db1c794bfa735b/src/modules/mod_foo/tmpl/default.php)

Im Layout greifen wir abschließen auf die Variable zu. Die Logik zum Errechnen des Variablenwertes ist gekapselt. So bleibt das Layout übersichtlich.

```php {diff}
\defined('_JEXEC') or die;
## Teste dein Joomla-Module

1. Installiere das Modul in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla 4 Installation.

Installiere dein Module wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla aktualisiert bei der Installation die Namespaces für dich. Da eine Datei und Namespaces hinzugekommen sind, ist dies erforderlich.

2. Überprüfe, ob der über die Funktion `FooHelper::getText()` errechnete Text im Frontend angezeigt wird.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t31...t32.diff
