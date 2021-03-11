langKey: de
#### [components/com_foos/src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-6eec124cbd4d68394d1ef4a09898e702) - Einstiegspunkt ins Frontend
Dies ist der Einstiegspunkt für den Model-View-Controller-Teil im Frontend der Foo-Komponente. Nenne die Klasse _DisplayController_. Joomla erwartet das so. Erweitere _BaseController_, um viele Dinge Out-of-the-Box zu nutzen.
#### [components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-c77adeff4ff9e321c996e0e12c54b656) - Die Ansicht
#### [components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-a33732ebd6992540b8adca5615b51a1f) - Template
#### [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-1ff20be1dacde6c4c8e68e90161e0578) - XML-Datei (Manifest)
Dies ist die Datei, die Joomla mitteilt, wie unsere Komponente installiert wird. Deshalb tragen wie die beiden neuen Dateien hier ein, so weiß Joomla bei einer Installatin, dass es die Verzeichnisse `src` und `tmpl` gibt und wo `components/com_foos` es sie hin kopieren soll.
1. Installiere am Ende deine Komponente in Joomla Version 4, um sie zu testen:
Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.
Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla richtet bei der bei der Installation Namespaces für dich ein.
github.com/astridx/boilerplate/compare/t1c...t2.diff