langKey: de
In diesem Artikel erfährst du, wie du einen Menüpunkt für die Frontend-Ansicht deiner Komponente erstellst. So ist es nicht notwendig, dass du die genaue URL weißt. Später ist eine Umwandlung in suchmaschinenfreundliche URLs automatisch möglich.
#### [components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t2...t3#diff-35fa310ee8efa91ecb0e9f7c604d413f)
> [CDATA](https://de.wikipedia.org/w/index.php?title=CDATA&oldid=189251190) (engl. Character Data) ist ein Schlüsselwort in XML. Mit CDATA werden Zeichendaten gekennzeichnet, deren Inhalt vom Parser nicht analysiert wird. Der CDATA-Abschnitt kann auch Markup-Zeichen (`<`, `>` und `&`) enthalten. Diese werden vom Parser nicht weiter interpretiert.

Das `title`-Attribut im `layout`-Tag hier wird verwendet, wenn wir im Administrationsbereich einen neuen Menüpunkt für diese Komponente erstellen.
> Der Sprachstring bleibt nicht so wie er ist. Er wird in unterschiedliche Sprachen übersetzt. Daran werden wir später arbeiten. Hier bereiten wir alles vor.
1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.
![Joomla Einen Menüpunkt erstellen](/images/j4x4x1.png)

![Joomla Einen Menüpunkt erstellen](/images/j4x4x2.png)
![Joomla Einen Menüpunkt erstellen](/images/j4x4x3.png)
![Joomla Einen Menüpunkt erstellen](/images/j4x4x4.png)
## Alle geänderte Dateien
github.com/astridx/boilerplate/compare/t2...t3.diff