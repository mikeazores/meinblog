langKey: de
In diesem Teil kommt keine neue Funktion hinzu. Wir verbessern den bisherigen Aufbau. Jede Web-Anwendung besteht aus

- Logik,
- Daten und
- der Darstellung.

Problematisch ist es, diese drei Elemente in einer Klasse zusammenzufassen. Vor allem bei größeren Projekten.

Joomla verwendet das [Model-View-Controller-Konzept (MVC)](https://de.wikipedia.org/wiki/Model_View_Controller) für die Unterteilung.
#### [components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-599caddf64a6ed0c335bc9c9f828f029)
Beim Model ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du erweiterst die Joomla Klasse `BaseDatabaseModel`. Implementiere dann nur das, was du speziell einsetzt. In unserem Fall ist es die Ausgabe `$this->message = 'Hello Foo!';`, für die wir die Methode `getMsg()` erstellen.
[components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/src/Model/FooModel.php)
#### [components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-c77adeff4ff9e321c996e0e12c54b656)
Die Daten des Models holen wir uns in der View mit `$this->msg = $this->get('Msg');`. Das wirkt hier umständlich. In komplexen Anwendungen hat sich diese Verfahrensweise bewährt. Die Datenberechnung geschieht im Model. Die Gestaltung der Ansicht mithilfe der berechneten Daten übernimmt die View.
[components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/src/View/Foo/HtmlView.php)
> Unter Umständen verwirrt dich der Aufruf `$this->get('Msg');` genauso wie mich, als ich Joomla das erste Mal nutzte. Die Methode im Model heißt `getMsg()`, wir rufst sie hier aber über `get('Msg')` auf. Das passt nicht. Wenn du dich vorher schon mit objektorientierter Programmierung befasst hast, dann bist du versucht, den Aufruf über `getMsg()` zu tätigen. Verwendest du Joomla, hast du es leichter, wenn du die Dinge so nutzt, wie es für dich vorbereitet ist. [Getter](https://de.wikipedia.org/w/index.php?title=Zugriffsfunktion&oldid=196247734) im Model rufst du über die Methode `get()` mit dem entsprechenden Parameter auf.
#### [components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-a33732ebd6992540b8adca5615b51a1f)
We output the data via the template. Here, everything will be properly packed into HTML tags later.
[components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/tmpl/foo/default.php)
1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:
Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.
2. Sieh dir die Frontendansicht deiner Komponente an. Überzeuge dich davon, dass die Daten für die Ausgabe vom Model erzeugt werden.
github.com/astridx/boilerplate/compare/t3...t4.diff