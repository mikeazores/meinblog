langKey: de
Update Server klingt kompliziert, im Grunde ist es nur eine URL zu einer XML-Datei, die in der XML-Installationsdatei angegeben ist. Diese XML enthält eine Reihe von Details, einschließlich der neuen Version und der Download-URL. Wenn Joomla eine Aktualisierung findet, wird dies im Administrationsbereich angezeigt.
Im aktuellen Abschnitte kommen zwei Datei hinzu, die außerhalb der Website gespeichert werden. Die Adressen oder URLs unter diesen diesen abgelegt sind, hatten wir im vorherigen Kapitel in der Datei `src/administrator/components/com_foos/foos.xml` eingefügt.
> Wenn deine Erweiterung andere Joomla Versionen unterstütz, erstelle für jede Version eine separate `<update>`-Definitionen.
Das Tag `targetplatform` beschreibt die Joomla Version, für die dieses Update bestimmt ist. Der Wert des Attributs `name` sollte immer auf "joomla" gesetzt werden: `<targetplatform name="joomla" version="4.*"/>`.
> Wenn du dein Update für eine bestimmte Joomla Version erstellst kannst du `min_dev_level` und`max_dev_level` verwenden.
Der Wert des `client` -Tags beschreibt die client_id in der Tabelle #\_\_extension, die Joomla Wenn dies ein Site- (0) oder ein Administrator- (1) Erweiterungstyp ist. Plugins sind immer 0, Komponenten sind immer 1; Module können jedoch variieren, je nachdem, ob es sich um ein Front-End- oder ein Back-End-Modul handelt.
#### [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-1ff20be1dacde6c4c8e68e90161e0578)
[administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/src/administrator/components/com_foos/foos.xml)
1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:
Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.
2. Als Nächstes erstellst du eine weitere Version der Beispiel-Erweiterung. Ändere dazu die Versionsnummer im Manifest. Vorher ist es nicht möglich, den Update Server zu testen. Denn, es gibt bisher keine Aktualisierung. Ich erwähne dies hier trotzdem, was genau nach dem Erstellen der nächsten Versionen passiert.
3. Wenn alles funktioniert siehst du nach der Installation diese Anzeigen vor dir, wenn du links das Menü `System` anklickst und dann rechts `Extension` im Bereich `Updates` auswählst. Das Bild hzeigt den Stand, nachdem die Version 23.0.0 veröffentlicht wurde.
4. Öffne also `System | Update | Extension`. Hier wird dir die Aktualisierung für deine Komponente angeboten. Falls dies nicht der Fall ist, klicke auf die Schaltfläche `Find Updates`.
![Joomla Update Sites](/images/j4x2x2_2.png)

5. Wenn du zurück zu System Update Extension navigierst, ist es dir möglich, eine Aktualisierung anzustoßen oder dir das Changelog anzusehen.

> Die Aktualisierung war vorher nicht möglich, weil der `Download Key` nicht konfiguriert war.

> Klicke die Schaltfläche `Find Updates` in der Werkzeugleiste, falls das Update nicht mehr angezeigt wird.
github.com/astridx/boilerplate/compare/t1...t1b.diff