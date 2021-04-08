---
date: 2018-12-15
title: 'GeoJSON'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: geojson-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

Im letzten Kapitel haben Sie Punkte, Marker, Linien und Polygone kennengelernt.
Sie können diese nun auf eine Leaflet-Karte zeichnen und wissen, wann welches
Objekt das Richtige ist.
Sie können [Layer-Gruppen](https://leafletjs.com/reference.html#layergroup)[^1] und
[Feature-Gruppen](https://leafletjs.com/reference.html#featuregroup)[^2]
voneinander abgrenzen und Sie wissen, was bei der Anzeige einer Leaflet Karten auf
einem kleinen Display zu beachten ist.
Außerdem können Sie nun auf einen Mausklick oder ein anderes Ereignis
entsprechend reagieren.  
Im nächsten Kapitel geht es um das Format
[GeoJson](https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442)[^3] und darum, wie
Sie Daten auch in großen Mengen gut handhaben können.

GeoJSON ist ein offenes Format,
welches es einfach macht,
geografische Daten zu beschreiben. Dabei richtet es sich nach einer Spezifikation –
nämlich nach der
[Simple-Feature-Access-Spezifikation](https://de.wikipedia.org/w/index.php?title=Simple_Feature_Access&oldid=171319596)[^4].
Für die Beschreibung der Geodaten verwendet GeoJSON
die [JavaScript Objekt Notation (JSON)](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)[^5].

> Hinter dem Begriff \*Simple-Feature-Access-Spezifikation versteckt sich eine Spezifikation des
> [Open Geospatial Consortium (OGC)](https://de.wikipedia.org/w/index.php?title=Open_Geospatial_Consortium&oldid=180537320)[^6].
> Diese Spezifikation beinhaltet eine allgemein gültige Beschreibung für
> Geodaten und deren Geometrien. Dadurch, dass die Spezifikation allgemeingültig ist,
> können diese Daten gut ausgetauscht werden. Das OGC ist eine gemeinnützige Organisation,
> die die Entwicklung von allgemeingültigen Standards für Geodaten zum Ziel hat.

## In diesem Kapitel werden wir …

Als Erstes sehen wir uns an, warum GeoJSON entwickelt wurde.
Als Nächstes vergleichen wir die einzelnen GeoJSON Elemente mit den Objekten, die uns
Leaflet zur Verfügung stellt.
Und zu guter Letzt probieren wir die Methoden aus, die Leaflet uns spezielle für
das Verarbeiten von GeoJSON-Daten anbietet.

## Die Entwicklungsgeschichte von GeoJSON

[](#){#inEntwicklungsgeschichteGejson}

[GeoJSON](https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442)[^3] baut auf
[JSON](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070)[^5] auf.
Bevor JSON als Datenformat spezifiziert wurde, gab es die erweiterbare
Auszeichnungssprache [XML](https://de.wikipedia.org/w/index.php?title=Extensible_Markup_Language&oldid=183475842)[^8]
(englisch: Extensible Markup Language).

Immer wenn etwas Neues entsteht, gibt es einen Grund dafür!

XML wurde [1998 veröffentlicht](https://www.w3.org/TR/1998/REC-xml-19980210)[^9],
um Daten zwischen Maschinen austauschen zu können,
ohne das Menschen nacharbeiten müssen.
Dies wurde in Zeiten des Internets immer wichtiger.
Nun muss es auch einen Grund geben, warum neben XML erst JSON – und später GeoJSON entstanden ist.

### Warum ist das Format GeoJSON entstanden?

Warum ist das Format GeoJSON entstanden? Offensichtlich gab es Dinge, bei denen XML für den
Austausch von Daten nicht optimal war.
Warum war dies so und welche Vorteile bietet JSON, beziehungsweise GeoJSON?
Zunächst einmal bieten alle drei Formate folgendes:

- Alle drei Formate können von einem Menschen gelesen und verstanden werden.
- Alle drei Formate sind hierarchisch gegliedert. Das bedeutet, das Werte innerhalb von anderen Werten dargestellt werden können.
- Alle drei Formate sind relativ leicht zu erlernen.
- Alle drei Formate können von vielen Programmiersprachen analysiert und genutzt werden.
- Alle drei Formate sind mit mithilfe des Hypertext Transfer Protokolls (HTTP) – also über das Internet – austauschbar.

Sehen wir uns in diesem Kapitel die einzelnen Formate einmal genauer an um zu erkennen,
welche Vorteile das Format JSON – beim Arbeiten mit
[Geodaten](https://de.wikipedia.org/w/index.php?title=Geodaten&oldid=181076558)[^10] das Format GeoJSON – gegenüber XML bringt.

#### XML

XML beschreibt die Struktur von Daten.
Anhand der _Tags_ wird den Daten eine Bedeutung – eine
[Semantik](https://de.wikipedia.org/w/index.php?title=Semantik&oldid=184048296)[^11] – gegeben.
Durch das Tag-System von XML werden oft kleine Datenbestände sehr aufgebläht und
dadurch unübersichtlich.
Außerdem ist das Ansprechen einzelner Tags in einer XML-Datei teilweise recht kompliziert.

#### JSON

JSON ist im Grunde genommen nichts anderes als die Festlegung auf eine bestimmte Syntax –
also eine _Syntax-Konvention_. Den Daten wird keine bestimmte Bedeutung geben,
vielmehr geht es um die syntaktische Anordnung.
Da JSON Daten strukturiert, können leicht Objekte aus diesen Daten definiert werden.
JSON wird fortwährend weiterentwickelt. Im Dezember 1999 wurde die erste JSON Format-Spezifikation verabschiedet.
Aktuell wird es durch zwei konkurrierende Standards spezifiziert,
[RFC 8259](https://tools.ietf.org/html/rfc8259)[^12] und
[ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)[^13].

Der große Vorteil von JSON im Vergleich zu XML liegt in der einfachen Handhabung.
Da JSON selbst gültiges Javascript darstellt, kann es direkt ausgeführt und somit
in ein Javascript-Objekt überführt werden.
Auf die einzelnen Eigenschaften dieser Objekte kann dann über die Attribute zugegriffen werden.
Im Kapitel [Heatmaps in Leaflet – Dichte](#HeatmapsundChoroplethenkarten)
werden wir eine Datei, die GeoJSON Objekte enthält, als Skript einbinden.
Allein durch das Einbinden der Datei können wir innerhalb anderer Skripte
auf die GeoJSON Objekte der eingebundenen Datei zugreifen.
Im Gegensatz dazu muss eine XML-Datei erst mit einem XML-Parser analysiert werden.

Ein weiterer Vorteil von JSON: In JSON gibt es kein Ende-Tag.
Hauptsächlich deshalb ist JSON kompakter. Dies hat nämlich zur Folge,
dass JSON schneller gelesen und verarbeitet werden kann.

> Die Daten einer
> jeden GeoJson-Datei, die sich in einem GitHub Repository befindet,
> werden – wenn man die Datei im Repository anklickt – automatisch
> auf einer interaktiven Karte angezeigt.
> [Github](https://github.com/blog/1528-there-s-a-map-for-that)
> erstellt diese Karten schon seit 2013 mit Leaflet. Dies können Sie
> sich beispielsweise im Repository
> [world.geo.json](https://github.com/astridx/world.geo.json/blob/master/countries.geo.json)[^14] ansehen.

Schon ein kleines Beispiel veranschaulicht,
dass XML für das Beschreiben des gleichen Objektes mehr Zeichen benötigt als JSON.
Ein, in XML mit 95 Zeichen kodiertes, Objekt benötigt in JSON gerade einmal
73 Zeichen. Bei einem Objekt ist dieser Unterschied vernachlässigbar.
In der Regel werden aber eine Vielzahl von Objekten digital beschrieben.
Bei einer Vielzahl von Objekten kann dieser Unterschied stark ins Gewicht fallen.

Hier sehen Sie zunächst den aus 95 Zeichen bestehende XML Ausschnitt.

```
<joomlers>
  <number>1721</number>
  <vorname>Astrid</vorname>
  <nachname>Günther</nachname>
</joomlers>
```

Das gleiche Objekt kann mit 73 Zeichen im JSON Format beschrieben werden.

```
„joomlers“: {
„number“: „1721“,
„vorname“: „Astrid“,
„nachname“: „Günther“
},
```

#### Und warum nach JSON nun auch noch GeoJSON?

Geodaten könnten in JSON beschrieben und verarbeitet werden.
Welchen Vorteil bringt das spezielle **Geo**JSON-Format?
GeoJSON ist JSON – allerdings auf Geodaten spezialisiert.
GeoJSON gibt den Geodaten wieder eine Semantik – also eine Bedeutung.
Nun fragen Sie sich sicher, was dieses Hin und Her soll. Macht das Sinn?
Ja, es macht Sinn: GeoJSON pickt sich nur die positiven Eigenschaften der
Formate JSON und XML heraus.

GeoJSON beschreibt Punkte, Linien und Polygone und kann gut mit diesen
Formen in einem Koordinatensystem gut umgehen.
Im vorausgehenden Kapitel haben wir gesehen,
dass das Arbeiten mit Geodaten im Grunde genommen nichts anderes ist.  
GeoJSON hat sich zu einem sehr beliebten Datenformat vieler
Geoninformationssysteme entwickelt. In diesem Buch erwähne ich GeoJSON speziell,
weil auch Leaflet sehr gut im Umgang mit Daten im GeoJSON Format ist.
Hier sehen wir uns zunächst die GeoJSON Objekte einmal genauer an.
Wenn Sie lieber sofort praktisch arbeiten möchten, dann Blättern Sie am besten
ein Kapitel weiter. Im Kapitel [GeoJSON in Leaflet](#GeoJsoninLeaflet)
erfahren Sie, wie Sie GeoJSON-Elemente auf Ihrer Karte anzeigen und weiter
bearbeiten können.

Zur zeitlichen Einordnung: GoeJSON ist noch recht jung.

- Im Juni 2008 wurde die erste GeoJSON Format-Spezifikation verabschiedet.
- Im August 2016 wurde die [RFC (Requests for Comments) 7946](http://geojson.org/)[^15] veröffentlicht.

> Die formale Spezifikation des GeoJSON Formates finden Sie unter der
> Adresse [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)
> im Internet.

### GeoJSON erkunden

Sie wissen nun, dass Sie mit GeoJSON viele geografische Datenstrukturen
in einer maschinenlesbaren Sprache kodieren können.
Ein GeoJSON-Objekt kann dabei eine einfache Geometrie,
zum Beispiel einen Punkt eine Linie oder ein Polygon, darstellen.
Zusätzlich können Sie einer Geometrie aber auch eine Bedeutung geben.
Sie können jedem Element Eigenschaften zuordnen. Zum Beispiel können Sie einer
Linie die Eigenschaft `typ=straße` oder `name=Kirchstraße` mitgeben.
In diesem Fall erstellen Sie ein GeoJSON Objekt vom Typ
[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)[^17].
Wenn Sie mehrere Feature-Objekte zu einer Gruppe zusammen fassen möchten,
können Sie diese zu einer Sammlung von Features zusammen fassen.
Hierfür gibt es den GeoJSON Typ
[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)[^18].
Das Verständnis dieser Konzepte bringt viele Vorteile.
Es hilft Ihnen auch, die Arbeit mit Geodaten im Allgemeinen zu verstehen:
Die Grundkonzepte, die in GeoJSON angewandt werden,
sind schon seit vielen Jahren ein Teil
von [Geoinformationssystemen](https://de.wikipedia.org/w/index.php?title=Geoinformationssystem&oldid=183596912)[^19].
Beginnen wir aber von vorne.

#### Eine Geometrie

Eine [Geometrie](https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442#Geometrien)[^20]
ist eine Form.
Alle Formen in GeoJSON werden mit einer oder mehrerer Koordinaten beschrieben.
Eine Koordinate heißt in GeoJSON _Position_.

GeoJSON unterstützt die Geometriearten

1. Point,
2. LineString,
3. Polygon,
4. MultiPoint,
5. MultiLineString, und
6. MultiPolygon

– und eine jede dieser Geometriearten beinhaltet Positionen.

##### Position

Das wichtigste Element beim Arbeiten mit Geodaten ist die Beschreibung des
Punktes auf der Erde.
Der Punkt auf der Erde ist der, dem die Geodaten zugeordnet werden.
Diesen Wert kennen wir auch unter dem Namen Koordinate.
Im Kapitel [Das Koordinatensystem der Erde](#DasKoordinatensystemderErde)
habe ich schon eine ganze Menge zum Thema Koordinaten auf der Erde geschrieben.
Hier noch einmal kurz: Eine Koordinate ist eine Zahlenkombination.
Jede Zahl einer Koordinate steht für eine Dimension.
Wir beschränken uns in diesem Buch auf zwei Dimensionen,
nämlich die geografische Längen und die geografische Breite.
GeoJSON unterstützt drei Dimensionen – neben der geografischen Länge
und der geografischen Breite können Sie zusätzlich die Höhe auf der Erde angeben.

> Beim [globalen Navigationssatellitensystem (GPS)](https://wiki.openstreetmap.org/w/index.php?title=DE:Genauigkeit_von_GPS-Daten&oldid=1581004)[^21]
> ist noch eine vierte Große relevant.
> Neben der horizontalen Position und der Höhe spielt auch
> die aktuelle Zeit eine Rolle.

Die Koordinaten werden in GeoJSON im Dezimalformat formatiert.
Die erste Zahl steht für die Longitude – also die geografische Länge –
und die zweite Zahl für die Latitude – also die geografische Breite.
Konkret sieht eine Position in GeoJSON so aus:

```
[Länge, Breite, Höhe]
```

oder

```
[50.254, 7.5847, 324.1]
```

[](#){#ReihenfolgeKoordinaten}

> Vielleicht haben Sie in der Vergangenheit schon öfter mit Geodaten
> gearbeitet und wundern sich nun über die Reihenfolge, in der die
> Dimensionen im Format GeoJSON stehen?
> Viele Systeme geben zuerst die geografische Länge und erst dann die
> geografische Breite an.  
> Auch in Leaflet wird bei der Koordinate zuerst die
> Latitude - also die geografische Breite - und erste dann die Longitude -
> also die geografische Länge - angegeben:  
> `Breitengrad | Längengrad`.  
> Um dieses Durcheinander zu
> verstehen, müssen Sie das Folgende bedenken: Früher war es üblich,
> dass die erste Stelle einer Koordinate den Breitengrad und die zweite
> Stelle den Längengrad beschrieb. In der Mathematik ist die übliche
> Reihenfolge beim Arbeiten mit Koordinatensystemen: `X-Wert | Y-Wert`.
> Wenn man eine Landkarte mit einem Koordinatensystem vergleicht,
> erkennt man schnell, dass der Breitengrad dem `X-Wert` und der
> Längengrad der dem `Y-Wert` entspricht. Dies hat zur Folge, dass es
> beim Rechnen mit einem Computer viele Vorteile bringt, wenn man die
> Reihenfolge `Längengrad | Breitengrad` einhält.  
> In der digitalen Welt gibt es momentan noch keine Einigkeit über die Reihenfolge.
> Es sieht so aus, als ob wir mitten in einem Umbruch stecken. Eine Übersicht,
> die zeigt, welche Anwendung die Dimensionen in welcher Reihenfolge verwendet
> finden Sie unter anderem unter der Adresse https://macwright.org/lonlat/.

Früher erlaubte GeoJSON die Speicherung von mehr als drei Zahlen pro Position.
Diese Möglichkeit wurde auch genutzt.
Es wurden beispielsweise Sportdaten wie die Herzfrequenz zusammen
mit der Position gespeichert. So konnte ein Sportler später nachsehen, wie
sich sein Puls am Berg und im Tal unterscheidet. Da dies nicht der Sinn
einer Position ist, führte dieses Vorgehen teilweise zu Problemen
in anderen GeoJSON Anwendungen.
In der [neuen GeoJSON Spezifikation](https://tools.ietf.org/html/rfc7946#section-3.1.1)[^22]
ist das Speichern von mehr als drei Werten pro Position nun nicht mehr zulässig.

##### Point

Der Typ Point – also Punkt – ist die einfachste Geometrie in GeoJSON.
Er gibt die Koordinaten einer bestimmten Position im Raum an.
Die genaue Schreibweise sehen Sie nachfolgend.

```
{
    "type": "Point",
    "coordinates": [30.0, 10.0]
}
```

In Leaflet wird der Typ [Point](https://tools.ietf.org/html/rfc7946#section-3.1.2)[^23]
als [Marker](https://leafletjs.com/reference.html#marker)[^24] zur Karte hinzugefügt.

##### Multipoint

Der Typ MultiPoint wird mit einem Array von Positionen beschrieben.
Mit ihm können mehrere Punkte auf der Erde angegeben werden.

```
{
    "type": "MultiPoint",
    "coordinates": [
        [100.0, 2.0],
        [50.0, 21.0],
        [101.0, 1.0]
    ]
}
```

Mit dem Typ Multipoint können Sie mehrere Marker auf einen Schlag zu
Ihrer Leaflet Karte hinzufügen.

##### LineString

Um eine Linie darzustellen, benötigen Sie mindestens zwei Punkte.
Die Linie ist die Verbindung zwischen diesen Punkten.
Eine Linie wird mit einem Array von zwei oder mehr Positionen gebildet.
In GeoJSON wird eine Linie mit dem Typ LineString dargestellt.

```
{
    "type": "LineString",
    "coordinates": [
        [100.0, 0.0],
        [20.0, 5.0],
        [101.0, 1.0]
    ]
}
```

Ein GeoJSON Objekt vom Typ [LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4)[^25] entspricht einem
[Polyline Objekt](https://leafletjs.com/reference.html#polyline)[^26] in Leaflet.

##### MultiLineString

Beim Typ MultiLineString werden die Koordinaten mit einem Array von
LineString-Koordinaten-Arrays angegeben.

```
{
    "type": "MultiLineString",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 1.0]
        ],
        [
            [10.0, 5.0],
            [11.0, 1.1]
        ],
        [
            [102.0, 2.0],
            [103.0, 3.0]
        ]
    ]
}
```

Ein GeoJSON Objekt vom Typ
[MultiLineString](https://tools.ietf.org/html/rfc7946#section-3.1.5)[^27]
entspricht einem Leaflet [Polyline Objekt](https://leafletjs.com/reference.html#polyline)[^26], welches mehr als eine abgeschlossene
Linie definiert.
Das bedeute, dass alle Linien zusammen auf einem Layer gezeichnet werden.

> Wie bei den Objekten in Leaflet gilt auch hier: Linien und Punkte
> sind die einfachsten Geometrieformen. Bei beiden müssen Sie nicht
> viele geometrische Regeln beachten. Ein Punkt kann irgendwo an einem
> Ort liegen und eine Linie kann eine beliebige Anzahl an Punkten
> enthalten. Eine Linie darf sich selbst überqueren. Punkte und Linien
> haben keine Fläche – somit gibt es auch kein _Außen_ und kein
> _Innen_.

##### Polygone

Im Vergleich zu Linien sind Polygone komplexe Geometrien.
Polygone verfügen über eine Fläche.
Es gibt also einen Innenbereich, der sich von einem Außenbereich unterscheidet.
Und hinzu kommt: Der Innenbereich kann Löcher haben!
Wie die Löcher in einem Polygon entstehen, habe ich Ihnen im Kapitel
[Die Karte mit Daten bestücken](#DieKarteMitDatenBestuecken)
im Unterkapitel
[Polygone](#DieKarteMitDatenBestueckenPolygone)
erklärt. Ein GeoJSON Objekt vom Typ
[Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6)[^29]
entspricht einem [Polygon Objekt](https://leafletjs.com/reference.html#polygon)[^30] in Leaflet.
Die Koordinatenliste enthält bei einem Polygon – analog zu Leaflets Polygon –
eine Ebene mehr als die Koordinatenliste des Typs LineString.
Ich habe die relevante Klammerung im nachfolgenden Beispiel mit einem Stern markiert.

```
    {
        "type": "Polygon",
        "coordinates": [
*           [
                [30.0, 10.0],
                [40.0, 40.0],
                [20.0, 40.0],
                [10.0, 20.0],
                [30.0, 10.0]
*           ]
        ]
    }
```

Bei einem einfachen Polygon ist der Sinn dieser Ebene nicht offensichtlich.
Auf den ersten Blick könnten Sie der Meinung sein, dass es einfacher wäre,
das Polygon genau wie die Linie zu erstellen.
Dass es sich um ein Polygon handelt, ist über den Eintrag bei der Eigenschaft
Typ klar. Und, wenn es sich um den Typ Polygon handelt,
wird die Linie einfach geschlossen!
Der erste Blick ist oft trügerisch.
Wir benötigen diese zusätzliche Möglichkeit der Klammerung oder
Verschachtelung um Löcher in die Fläche zeichnen zu können.
Polygone sind in GeoJSON mehr als nur geschlossene Linien.
Ich wiederhole mich.
Polygone haben einen Innenbereich, und dieser Innenbereich kann Löcher haben.
Aus diesem Grund ist beim Typ Polygone in der GeoJSON Spezifikation ein
neuer Begriff zu lesen, nämlich der Begriff
[LinearRing](https://tools.ietf.org/html/rfc7946#section-3.1.6)[^29].
Ein LinearRing ist ein geschlossener LineString mit vier oder mehr Positionen.
Obwohl ein LinearRing nicht explizit als GeoJSON-Geometrie-Typ eingeführt ist,
wird der Begriff in der
[Polygon-Geometrie-Typ-Definition](https://tools.ietf.org/html/rfc7946#section-3.1.6)[^29]
der Spezifikation erwähnt.

Ein _LinearRing_ ist entweder die äußere Ringposition,
die die äußere Kante des Polygons bildet und definiert,
welche Flächen gefüllt sind.
Ein _LinearRing_ kann aber auch ein Innenring sein,
der die Flächen des Polygons definieren,
die leer sind.
Es kann eine beliebige Anzahl von Innenringen geben,
einschließlich null Innenringe.
Wenn das Polygon über keinen Innenring verfügt bedeutet dies,
dass das Polygon nur einen Innenbereich und einen Außenbereich hat –
also keine Löcher hat.

---

```
{
    "type": "Polygon",
    "coordinates": [
        [
            [1.0, 1.0],
            [1.0, 10.0],
            [10.0, 10.0],
            [10.0, 1.0],
            [1.0, 1.0]
        ]
        [
            [2.0, 2.0],
            [2.0, 5.0],
            [5.0, 5.0],
            [5.0, 2.0],
            [2.0, 2.0]
        ]
    ]
}

```

![Ein Polygon mit zwei Innenringen](/images/928b.png)

_Abbildung: Ein Polygon mit einem Innenring. Der Innenring definiert einen Außenbereich im Polygon – er schneidet quasi ein Loch in das Polygon ._

---

```
{
    "type": "Polygon",
    "coordinates": [
        [
            [1.0, 1.0],
            [1.0, 10.0],
            [10.0, 10.0],
            [10.0, 1.0],
            [1.0, 1.0]
        ]
        [
            [2.0, 2.0],
            [2.0, 5.0],
            [5.0, 5.0],
            [5.0, 2.0],
            [2.0, 2.0]
        ]
        [
            [3.0, 3.0],
            [3.0, 4.0],
            [4.0, 4.0],
            [4.0, 3.0],
            [3.0, 3.0]
        ]
    ]
}

```

![Ein Polygon mit zwei Innenringen](/images/928c.png)

_Abbildung: Ein Polygon mit zwei Innenringen – der zweite Innenring wird innerhalb des ersten Innenringes gezeichnet. Dieser zweite Innenring zeichnet einen neuen Innenbereich in den Außenbereich der durch den ersten Innenring entstanden ist._

---

> Vielleicht
> ist Ihnen aufgefallen, das die erste und die letzte Koordinate jedes
> LinearRings gleich ist. Die Wiederholung der Koordinate ist bei einem
> Leaflet Objekt nicht erwünscht. Hier werden die Ringe eines Polygone
> automatisch geschlossen. Die erste und letzte Position eines GeoJSON
> LinearRing muss im Gegensatz dazu identisch sein.

##### MultiPolygon

Beim Typ MultiPolygon werden die Koordinaten mit einem Array von
Polygon-Koordinaten-Arrays angegeben.
Hier sehen Sie zunächst ein Beispiel, dass zwei einfache Polygone darstellt.

```
{
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
            ]
        ],
        [
            [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2]
            ]
        ]
    ]
}
```

Es geht aber auch komplizierter.
Sie können auch mehr als ein Polygon mit Löchern –
also mehr als einem LinearString – zusammen als MultiPolygon gruppieren.

```
{
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
            ]
        ],
        [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0]
            ],
            [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2]
            ]
        ]
    ]
}
```

Ein GeoJSON Objekt vom Typ
[MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7)[^33] entspricht einem
[Leaflet Polygon Objekt](https://leafletjs.com/reference.html#polygon)[^30],
welches mehr als ein Polygon definiert.
Das bedeute, dass alle Formen zusammen auf einen Layer gezeichnet werden.

##### Mehrere Geometrien zusammenfassen - GeometryCollection

Geodaten wollen die Welt beschreiben.
Jeder der grundlegenden GeoJSON Typen ist ideal für die Darstellung
eines Objektes auf der Erde. Unsere Welt enthält eine Menge Objekte,
die gemeinsame Eigenschaften haben.
Wenn wir diesen Objekten diese gemeinsamen Eigenschaften auf einen
Schlag zuordnen möchten, können wir diese Objekte mit dem
Typ [GeometryCollection](https://tools.ietf.org/html/rfc7946#section-3.1.8)[^35]
zusammenfassen. Zum Beispiel haben die beiden Geometrien im nachfolgenden Beispiel
denselben Namen.

```
{
    "type": "Feature",
    "geometry": {
        "type": "GeometryCollection",
        "geometries": [{
            "type": "Point",
            "coordinates": [100.0, 0.0]
        }, {
            "type": "LineString",
            "coordinates": [
                [101.0, 0.0],
                [102.0, 1.0]
            ]
        }]
    },
    "properties": {
        "name": "Der Name dieser GeometryCollection"
    }
}
```

Einen Anwendungsfall für eine Geometriekollektion gibt es in der
Praxis allerdings nur sehr selten: Meist ist es so,
dass jede Geometrie auch eigene Eigenschaften besitzt.
Im nächsten Kapitel werden Sie lesen, dass Sie eine Geometrie mit
eigenen Eigenschaften im Typ Feature beschreiben können
und Feature Objekte werden mit dem Typ FeatureCollection zusammengefasst.

#### Einer GeoJSON Geometrie Eigenschaften zuordnen

Geometrien sind Formen – nicht mehr und nicht weniger.
Sie sind ein zentraler Teil von GeoJSON, aber die meisten Daten,
die etwas mit der Welt zu tun haben, sind nicht einfach nur eine Form.
Die Formen haben auch eine Identität und Attribute.
Ein Polygon stellt beispielsweise den Reichstag dar.
Ein anderes Polygone ist die Grenze von Deutschland.
Und bei der Arbeit mit den Geometrien ist es wichtig zu wissen,
welche Geometrie was ist und, welche Eigenschaften die Geometrie hat.
In GeoJSON kann genau dies mit einem Objekt des Typs Feature erreicht werden.

Das nachfolgende Programmcodebeispiel enthält ein ganz einfaches Feature Element.

```
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [0, 0]
  },
  "properties": {
    "name": "Der Name des Punktes"
  }
}
```

Im nächsten Beispiel sehen Sie ein etwas komplexeres
Feature. Sie erkennen hier, dass eine Eigenschaft eines Feature Elements
mit jedem [JSON-Objekt Datentyp](https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070#Datenstruktur_und_Formatdefinition)[^36]
beschrieben werden kann.

```
  {
  "type": "Feature",
  "geometry": {
  "type": "Polygon",
  "coordinates": [
                    [30, 20],
                    [45, 40],
                    [10, 40],
                    [30, 20]
                 ]
  },
  "properties": {
  "prop0": "value0",
  "prop1": {"this": "that"},
  "prop2": true,
  "prop3": null,
  "prop4": ["wert1", "wert2", "wert3"],
  "prop5": 0.0
  }
  }

```

> JSON kennt folgende Datentypen:

- Nullwert  
  Ein Nullwert wird durch das Schlüsselwort `null` dargestellt.
- Boolescher Wert  
  Ein Boolescher Wert wird durch die Schlüsselwörter `true` und `false` dargestellt.
- Zahl  
  Eine Zahl ist eine Folge der Ziffern `0`–`9`.
- Zeichenkette  
  Eine Zeichenkette beginnt und endet mit doppelten geraden Anführungszeichen `"`.
- Array  
  Ein Array beginnt mit `[` und endet mit `]`.
- Objekt  
  Ein Objekt beginnt mit `{` und endet mit `}`.

#### FeatureCollection

So nun haben wir jede Menge Typen kennen gelernt.
Den Typ, den Sie sicherlich am meisten nutzen werden,
habe ich für den Schluss aufgehoben. Die Syntax einer FeatureCollection
können Sie im nachfolgenden Beispiel ablesen.

```
{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [102.0, 0.5]
        },
        "properties": {
            "prop0": "value0"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [102.0, 0.0],
                [103.0, 1.0],
                [104.0, 0.0],
                [105.0, 1.0]
            ]
        },
        "properties": {
            "prop0": "value0",
            "prop1": 0.0
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [50.0, 7.0],
                    [60.0, 8.0],
                    [70.0, 9.0]
                ]
            ]
        },
        "properties": {
            "name": "Luisenturm",
            "prop1": {
                "this": "that"
            }
        }
    }]
}
```

Ein Objekt vom Typ
[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)[^18]
enthält ein Schlüssel-Wert-Paar.
Der Wert ist ein Array das aus Feature Objekten besteht und der Schlüssel
lautet Features. Wie der Name schon sagt, darf das Array ausschließlich
Objekte vom Typ Feature enthalten.

Welche Vorteile bring ein Objekt vom Typ FeatureCollection zusätzlich zu
den einzelnen Feature Objekten? Ein Objekt vom Typ FeatureCollections ist
sehr sinnvoll, wenn Sie mit GeoJSON-Typen arbeiten,
die gemeinsame Eigenschaften haben.
Im nächsten Kapitel wird Ihnen dies anhand von praktischen Beispielen klar werden.

> **Hinweis:**  
> Sie möchten gerne GeoJSON nutzen und
> haben auch schon die ersten Dateien erstellt.
> Vielleicht sind Sie auch schon auf das ein oder andere Problem
> gestoßen oder möchten einfach nur mit der Syntax vertraut werden.
> Auf der Website [http://geojsonlint.com](http://geojsonlint.com)[^38]
> können Sie Ihre GeoJSON Daten testen.

### Die Grenzen von GeoJSON

Die Vorteile von GeoJSON hatte ich Ihnen weiter vorne in diesem
Kapitel näher gebracht. Wie jedes andere Format hat GeoJSON aber auch seine Grenzen.
Diese sind nun Thema dieses Kapitels.

- GeoJSON hat kein Konstrukt das eine Komprimierung unterstützt
  wie beispielsweise [TopoJSON](https://github.com/topojson/topojson)[^39]
  oder [OSM XML](https://wiki.openstreetmap.org/w/index.php?title=OSM_XML&oldid=1419416)[^40].
- GeoJSON unterstützt die gleichen Datentypen wie JSON.
  JSON unterstützt nicht jeden Datentyp. Zum Beispiel gibt es keinen Typ
  für Datumswerte in JSON.
- GeoJSON hat kein Konstrukt für die Anzeige von Pop-up Fenstern wie Titel
  oder Beschreibung.
- GeoJSON hat keine Geometrie vom Typ Kreis – oder irgendeine andere Art von Kurve.
- In GeoJSON können Sie den einzelnen Koordinaten – also den Positionen –
  keine eigene Eigenschaft zuweisen. Wenn Sie die _LineString_ Darstellung
  eines Trainingslaufs haben und Ihr GPS Gerät mehr als 1000 verschiedene
  Punkte während dieses Laufs zusammen mit Ihrer Herzfrequenz protokolliert hat,
  bietet GeoJSON keine klare Antwort auf die Frage, wie Sie diese Daten am
  besten darstellen. Sie könnten eine zusätzliche Eigenschafte als
  Array mit der gleichen Länge wie das Array der Koordinaten speichern –
  eine klare und einheitliche Regelung gibt es aber nicht. Jeder muss für sich selbst
  das Rad neu erfinden.

## GeoJson in Leaflet

[](#){#GeoJsoninLeaflet}

Leaflet unterstützt alle GeoJSON-Typen.
In der Regel werden Sie überwiegend den Typ _Feature_ und
_FeatureCollection_ nutzen.
Sie möchten ja sicher nicht nur Geometrie Objekte auf Ihrer Karte anzeigen,
sondern auch die Eigenschaften – also weitere Informationen – zu diesen Objekten.

### Ein GeoJSON Feature in Leaflet einbinden

Beginnen wir mit einem übersichtlichen Beispiel:
Die einfachste Art GeoJSON in Ihrer Karte zu nutzen,
ist die Verwendung als Variable direkt – fest programmiert.
So etwas sollte man in der Praxis nicht machen. Ein Programm mit fix
programmierten Variablen ist in der Regel starr und unflexibel. Etwas größere
Anwendungen werden so auch schnell unübersichtlich, weil alles durcheinander
geschrieben ist.  
Übungsbeispiele sollen aber nur einen bestimmten Punkt hervorheben.
Außerdem lassen sich die Beispiele so möglichst einfach darstellen.
Deshalb nutze ich in den Programmcodebeispielen in
diesem Buch fest programmierte Variablen.

> Eine andere alternative Art GeoJSON Daten in ein HTML-Dokument einzubinden
> finden Sie im Kapitel [Choroplethenkarte](#HeatmapsundChoroplethenkarten) im Unterkapitel
> [Open Data](#ChoroplethenkarteOpenData).

Das nachfolgende Programmcodebeispiel enthält einen _Punkt_.
Sobald Sie diesen – in GeoJSON formatierten – Punkt in einer
JSON-Variablen gespeichert haben, können Sie diesen ganz einfach
zur Karte hinzufügen.
Leaflet zeigt auf der Karte als Ergebnis einen Marker an.

> Wir haben im Kapitel [GeoJSON erkunden](#ReihenfolgeKoordinaten) festgestellt,
> dass Leaflet Koordinaten in einer anderen
> Reihenfolge als GeoJSON schreibt.
> Wenn Sie die Standardfunktionen in Leaflet verwenden,
> müssen Sie sich hierüber aber keine Sorgen machen.
> Leaflet setzt die Koordinaten selbständig in die passende Form.

Hier also nun das erste praktische Beispiel zum Thema GeoJSON und Leaflet.
Die relevanten Programmcodestellen habe ich mit einem Stern markiert.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*var geojsonFeature1 = {
*"type": "Feature",
*"geometry": {
*"type": "Point",
*"coordinates": [7.26469, 50.27264]
*},
*"properties": {
*"name": "Gering"
*}
*};
*L.geoJSON(geojsonFeature1).addTo(mymap);
 </script>
 </body>
 </html>
 <!--index_973.html-->
```

Was passiert hier genau? Als erste haben wir den GeoJSON Code fest
in der Variablen `geojsonFeature1` gespeichert.
Als nächstes haben wir ein Leaflet Objekt vom Typ GeoJSON erstellt und
diesem unseren GeoJSON Code, also die Variable `geojsonFeature1`, übergeben.
Das GeoJSON Objekt haben wir gleichzeitig mithilfe der Methode `addTo()`
zum Leaflet-Kartenobjekt hinzugefügt.  
Mehr mussten wir nicht tun! Das Ergebnis ist ein Standard Marker
an der Stelle auf der Erde, die das GeoJSON Point Element beschreibt.

> Das Leaflet-Objekt [GeoJSON](http://leafletjs.com/reference#geojson)[^41]
> ist ein Leaflet-Layer. Also eine Ebene.
> Ganz konkret erweitert die Klasse GeoJSON die Klasse
> [FeatureGroup](http://leafletjs.com/reference#featuregroup)[^2].

Auf der nachfolgenden Abbildung können Sie sich das Ergebnis ansehen.

![Ein Marker auf einer Leaflet Karte mithilfe von GeoJSON eingefügt.](/images/955.png)

_Abbildung: Ein Marker auf einer Leaflet Karte mithilfe von GeoJSON eingefügt._

> Wenn Sie an die Zeile  
> `L.geoJSON(geojsonFeature1).addTo(mymap);`  
> den Text  
> `.bindPopup('Pop-up Text');`  
> anhängen, also  
> `L.geoJSON(geojsonFeature1).addTo(mymap).bindPopup('Pop-up Text');`  
> schreiben, öffnet sich ein Pop-up Fenster, wenn Sie den Marker anklicken.

### Eine GeoJSON FeatureCollection in Leaflet einbinden

Das Beispiel des letzten Kapitels enthielt ausschließlich einen Punkt –
also ein Feature. Geodaten bestehen in der Regel aus mehreren Geometrien
mit dazugehörigen Eigenschaften – also FeatureCollections.
Leaflet liest eine FeatureCollection genauso ein, wie Sie es im letzten Beispiel
anhand des einen Features gesehen haben. Das nächste Beispiel zeigt Ihnen,
wie Sie einen Punkt, ein Polygon und eine Linie in einem Schritt auf
Ihrer Karte anzeigen könnten.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*var geojsonFeatureCollection =
*{
*"type": "FeatureCollection",
*"features":
*[
*{
*"type": "Feature",
*"geometry": {"type": "Point", "coordinates": [7, 50]},
*"properties": {"prop0": "value0"}
*},
*{
*"type": "Feature",
*"geometry": { "type": "LineString", "coordinates": [
*[7, 50], [7, 51], [6, 51], [6, 52]
*]},
*"properties": { "prop0": "value0", "prop1": 0.0 }
*},
*{ "type": "Feature",
*"geometry": { "type": "Polygon", "coordinates": [
*[ [6, 49], [5, 49], [5, 48], [4, 49], [4, 50] ]
*]
*},
*"properties": { "prop0": "value0", "prop1": {"this": "that"}
*}
*}
*]
*}
*L.geoJSON(geojsonFeatureCollection).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_972.html-->
```

Voila! Drei Elemente mit Standardeigenschaften auf der Leaflet Karte.

![Drei Element auf einer Leaflet Karte mithilfe von GeoJSON eingefügt.](/images/961.png)

_Abbildung: Drei Elemente auf einer Leaflet Karte mithilfe von GeoJSON eingefügt._

### GeoJSON aus Leaflet exportieren

So, und nun machen wir genau das Gegenteil.
Ein jedes Leaflet Objekt, das wir uns im Kapitel
[Die Karte mit Daten bestücken](#DieKarteMitDatenBestuecken) angesehen haben,
verfügt über eine Leaflet Methode mit dem Namen `toGeoJson()`.
Und diese Methode tut genau das, was der Name schon vermuten lässt:
Das übergebene Leaflet Objekt wird in ein GeoJSON Objekt umgewandelt und ausgegeben.
Sehen Sie sich im nächsten Beispiel die Anwendung der Methode `toGeoJson()` an.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*var myMarker=L.marker([50.27264, 7.26469]);
*var markerAsGeoJSON = myMarker.toGeoJSON();
*var geoJsonLayer = L.geoJson().addTo(mymap);
*geoJsonLayer
* .addData(markerAsGeoJSON)
* .bindPopup("Ich bin .... so aus:<br> " + JSON.stringify(markerAsGeoJSON));
 </script>
 </body>
 </html>
<!--index_971.html-->
```

Was zeigt Ihnen dieses Beispiel genau?
Das folgende Beispiel zeigt Ihnen, wie Sie einen Marker ins GeoJSON
Format konvertieren können.
Dazu erstellen Sie zunächst mit var `myMarker=L.marker([50.27264, 7.26469])`
einen Leaflet Marker. Danach rufen Sie die Methode `toGeoJSON()`
des Markers auf und speichern das zurückgegeben GeoJSON Objekt in der Variablen
`markerAsGeoJSON`. Als Nächstes erstellen Sie einen leeren GeoJSON Layer
und fügen diesen zum Kartenobjekt hinzu:
`var geoJsonLayer = L.geoJson().addTo(mymap)`.
Sie hätten den GeoJSON Code in der Variablen `markerAsGeoJSON`
wie in vorherigen Beispielen sofort beim Erstellen des Layers als
Parameter mitgeben können. Hier wollte ich ihnen aber die Methode `addData()`
zeigen, mit der Sie auch nachträglich noch GeoJSON Objekte zur GeoJSON Ebene
hinzufügen können.

> Im vorausgehenden Beispiel habe ich die Methode `JSON.stringify()`
> beim Erstellen des Textes im Pop-up Fenster angewandt. Mit
> der Methode [JSON.stringify()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)[^43]
> können Sie eine JavaScript Variable in einen Text im JSON-Format
> konvertieren.

Die nachfolgende Abbildung zeigt das Bild, welches Sie im Browser sehen,
wenn Sie die HTML-Datei des vorausgehenden Beispiels im Browser öffnen.

![Ein Marker auf einer Leaflet Karte, der seinen eigenen - ins GeoJSON Format konvertieren - Programmcode zeigt.](/images/960.png)

_Abbildung: Ein Marker auf einer Leaflet Karte, der seinen eigenen - ins GeoJSON Format konvertieren - Programmcode zeigt._

Sie werden nun sicher mein Beispiel als umständlich ansehen.
Ich habe einen Marker, denn ich ohne zusätzliche Schritte auf der Karten hätte
anzeigen könnte, vorher umgewandelt dann in umgewandelter Form zur
Karte hinzugefügt. Diese Vorgehensweise ist nicht Sinn und Zweck der Leaflet
Methode `toGeoJSON()`. Sinn und Zweck ist es eher, Daten
der Karte zum Export anzubieten.

> Wenn Sie möchten, dass die Methode `toGeoJSON()` Eigenschaften zu
> Ihren eigenen Leaflet Objekten exportiert, müssen Sie diese
> in einer bestimmten Form mit Ihrem Leaflet Objekt speichern. Möchten
> Sie beispielsweise ein `Polyline` Objekt exportieren, dann müssen
> Sie mit diesem Polyline-Objekt eine Variable `feature` speichern.
> Die Variablen `feature` enthält den Text Feature in der Variablen `type` und
> die zu exportierenden Eigenschaften in der Variablen `properties`.  
> `var polyline = L.polyline([`  
> `[50.27264, 7.26469], [51.27264, 7.26469], [51.27264, 6.26469]`  
> `]);`  
> `polyline.`**`feature`**`= {};`  
> `polyline.`**`feature.type`**`= "Feature";`  
> `polyline.`**`feature.properties`**`= {};`  
> `polyline.feature.properties["Foo"] = "Bar";`  
> Der Export des Polyline Objektes würde wie folgt aussehen:  
> `{"type":"FeatureCollection",`  
> `"features":[`  
> `{`  
> `"type":"Feature",`  
> `"properties":{"Foo":"Bar"}`  
> `"geometry":{"type":"LineString",`  
> `"coordinates":[[7.26469,50.27264],[7.26469,51.27264],[6.26469,51.27264]]`  
> `}}`  
> `]`  
> `}`

### Stylen

Ein GeoJSON Layer biete Ihnen mit der
[Methode `setStyle()`](https://leafletjs.com/reference.html#geojson-setstyle)[^44]
die Möglichkeit das Aussehen der Kartenschicht zu gestalten.

Sie können neben den hier beschriebenen Optionen auf eine große Auswahl
weitere Stil Optionen zugreifen.
Die vollständige Liste finden Sie in der
Dokumentation von Leaflet.
Sehen Sie sich dazu die Optionen zur
[Klasse `Path`](http://leafletjs.com/reference.html#path)[^45] an.

#### Beim Erstellen eines GeoJSON Layer einen Stil mitgeben

Der nachfolgende Programmcode zeigt Ihnen, wie Sie
Stylesheets beim Erstellen eines GeoJSON Layer als Parameter mitgeben können.
Im nachfolgenden Programmcode finden Sie eine Funktion,
die je nach GeoJSON Objekt eine andere Farbe zurück gibt.
Wenn es sich um den Typ LineString handelt,
gibt die Funktion die Farbe Rot zurück, falls ein Polygon vorliegt,
antwortet die Funktion mit der Farbe Violett.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([49.3264, 7.26469], 6);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
*function styleFunction(feature)
*{
*switch (feature.geometry.type)
*{
*case 'LineString': return {color: "red"};
*case 'Polygon':   return {color: "purple"};
*}
*}
*var geojsonFeatureCollection =
*{
*"type": "FeatureCollection",
*"features":
*[
*{
*"type": "Feature",
*"geometry": {"type": "Point", "coordinates": [7, 50]},
*"properties": {"prop0": "value0"}
*},
*{
*"type": "Feature",
*"geometry": { "type": "LineString", "coordinates": [
*[7, 50], [7, 51], [6, 51], [6, 52]
*]},
*"properties": { "prop0": "value0", "prop1": 0.0 }
*},
*{ "type": "Feature",
*"geometry": { "type": "Polygon", "coordinates": [
*[ [6, 49], [5, 49], [5, 48], [4, 49], [4, 50] ]
*]
*},
*"properties": { "prop0": "value0", "prop1": {"this": "that"}
*}
*}
*]
*}
*var geoJsonLayer =
* L.geoJson(geojsonFeatureCollection,{style:styleFunction}).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_970.html-->
```

> Wenn Sie einen Stil auf alle Objekte
> anwenden möchten, dann ist es nicht notwendig eine Funktion zu
> erstellen. Die Zeile  
> `var geoJsonLayer =`
> `L.geoJson(geojsonFeatureCollection,{color: "purple"}).addTo(mymap);`  
> reicht völlig aus.

Auf der Karte sehen Sie nun die Objekte in der für sie bestimmten Farbe.

![Drei Element auf einer Karte in unterschiedlichen Farben.](/images/959.png)

_Abbildung: Drei Element auf einer Karte in unterschiedlichen Farben mithilfe der Option `style`._

#### Ein komplexeres Beispiel: Eine andere Farbe beim Überrollen mit der Maus

Im vorherigen Kapitel haben Sie gelernt, wie Sie mit der Option
`style` des GeoJSON Layers ein Aussehen festlegen können.
Sicherlich ändert sich das Aussehen Ihrer Objekte im Laufe der Zeit.
Ganz häufig kommt es vor, dass man Objekte, die anklickbar sind und angeklickt
wurden, als schon besucht kennzeichnen möchte. Oder Sie möchten ein Objekt,
über dem sich die Maus gerade befindet, hervorheben.
Genau diese beiden Anwendungsfälle sind Thema im nachfolgenden Beispielcode.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([49.27264, 7.26469], 6);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 function styleFunction(feature)
 {
 switch (feature.geometry.type)
 {
 case 'LineString': return {color: "red"};
 case 'Polygon':   return {color: "purple"};
 }
 }
 var geojsonFeatureCollection =
 {
 "type": "FeatureCollection",
 "features":
 [
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 50]},
 "properties": {"prop0": "value0"}
 },
 {
 "type": "Feature",
 "geometry": { "type": "LineString", "coordinates": [
 [7, 50], [7, 51], [6, 51], [6, 52]
 ]},
 "properties": { "prop0": "value0", "prop1": 0.0 }
 },
 { "type": "Feature",
 "geometry": { "type": "Polygon", "coordinates": [
 [ [6, 49], [5, 49], [5, 48], [4, 49], [4, 50] ]
 ]
 },
 "properties": { "prop0": "value0", "prop1": {"this": "that"}
 }
 }
 ]
 }
 var geoJsonLayer = L.geoJson(geojsonFeatureCollection,{style:styleFunction}).addTo(mymap);
*geoJsonLayer.on('mouseover', styleWhenMouseOver);
*geoJsonLayer.on('mouseout', styleWhenMouseOut);
*function styleWhenMouseOver(e){
*geoJsonLayer.setStyle({color:"green"});
*}
*function styleWhenMouseOut(e){
*geoJsonLayer.eachLayer(function (layer) {
*geoJsonLayer.resetStyle(layer);
*});
*}
 </script>
 </body>
 </html>
<!--index_969.html-->
```

Auf den ersten Blick hat sich im Vergleich zum vorherigen Beispiel nichts geändert.
Wenn Sie allerdings die Maus über ein Objekt bewegen, sehen Sie eine Änderung.
Das Polygon und die Linie verfärben sich nun grün.
Der Marker kann seine Farbe nicht ändern.
Im Grunde genommen handelt sich bei dem Marker um ein Image.
Das HTML-Element Image verfügt nicht über die CSS Eigenschaft `color`.
Wenn Sie das Aussehen des Markers ändern möchten,
dann müssten Sie diesem eine andere Bilddatei zuordnen.

![Drei Element auf einer Karte die sich grün färben, wenn man die Maus über sie bewegt.](/images/958.png)

_Abbildung: Drei Element auf einer Karte die sich grün färben, wenn man die Maus über sie bewegt._

Wenn Sie ein schon angeklicktes Element
mit der Farbe Grau einfärben möchten, dann könnten Sie dies über
die Funktion

```
function styleWhenMouseOut(e){
geoJsonLayer.setStyle({color:"gray"});
});
}
```

anstelle von

```
function styleWhenMouseOut(e){
geoJsonLayer.eachLayer(function (layer) {
geoJsonLayer.resetStyle(layer);
});
}
```

erreichen.

> **Achtung:**  
> Wenn Sie  
> `function styleWhenMouseOut(e){`  
> `geoJsonLayer.eachLayer(function (layer) {`  
> `geoJsonLayer.resetStyle(layer);`  
> `});`  
> `}`  
> anstelle von  
> `geoJsonLayer.on('mouseout',function(e){`  
> `geoJsonLayer.resetStyle(e.layer);`  
> `});`  
> schreiben würden, würde nur ein Layer – nämlich der, der gerade
> überrollt wird – geändert.

### Iterieren

Interessant werden Karten, wenn Sie viele Informationen bieten.
Eine Karte mit vielen Informationen setzt die Arbeit mit vielen Daten
für den Kartenersteller voraus. Und, beim Arbeiten mit vielen Daten werden
Sie die Möglichkeit, alle Features mit einem Schlag zu bearbeiten,
zu schätzen lernen.
Iterieren können sie in Leaflet durch GeoJSON Objekte mithilfe der
[Methode `onEachFeature()`](http://leafletjs.com/reference.html#geojson-oneachfeature)[^46].

#### OnEachFeature() – Bearbeite jedes Feature

[`onEachFeature()`](http://leafletjs.com/reference.html#geojson-oneachfeature)[^46]
ist eine Methode, die einmal für jedes im Layer vorhandene GeoJSON Objekt
vom Typ Feature aufgerufen wird.
Nützlich ist diese Option zum Anhängen von Ereignissen oder Pop-up Fenstern
an jedes Feature Objekt.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var geojsonFeatureCollection =
 {
 "type": "FeatureCollection",
 "features":
 [
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [6, 50]},
 "properties": {"name": "Dorf 1"}
 },
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 50]},
 "properties": {"name": "Dorf 2"}
 },
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 51]},
 "properties": {"name": "Dorf 3"}
 }
 ]
 };
*L.geoJson(geojsonFeatureCollection, {
*onEachFeature: function(feature, layer) {
*layer.bindPopup(feature.properties.name);
*}
*}).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_968.html-->
```

Der vorhergehende Programmcode zeigt Ihnen, wie Sie jedem Feature Objekt,
das über die hart kodiert eingefügten GeoJSON Daten eingelesen wird,
ein Pop-up anhängen können – und zwar jedem ein individuelles.
Der Text für das Pop-up wird aus den GeoJSON Daten ausgelesen,
er versteckt sich in der Eigenschaft `feature.properties.name`.

Das nachfolgende Bild stellt die drei Marker dar.

![Drei Marker mit individuellem Pop-up Text.](/images/957.png)

_Abbildung: Drei Marker mit individuellem Pop-up Text._

Nun würden wir dem Marker aber vielleicht auch gerne ein spezielles Aussehen geben.
Vielleicht möchten Sie sogar jeden Marker unterschiedlich gestalten.
`onEachFeature()` bietet Ihnen hierzu keine Möglichkeit.
Der Marker wird automatisch mit Standardwerten erstellt.
Aber Leaflet wäre nicht Leaflet, wenn es hierfür keine Lösung hätte.
Leaflet bietet Ihnen eine andere Methode für diesen Zweck an.
Die [Methode heißt `pointtoLayer()`](https://leafletjs.com/reference.html#geojson-pointtolayer)[^48] und ein Beispiel dazu,
wie Sie mit dieser Methode einen eigenen Marker erstellen und
mit individuellen Optionen versehen können, finden Sie im nächsten Kapitel.

#### PointToLayer – Punkt zu Ebene

Die [Methode `pointtoLayer()`](https://leafletjs.com/reference.html#geojson-pointtolayer)[^48],
die wir uns in diesem Kapitel ansehen,
ist spezielle für die Arbeit mit einem GeoJSON Objekten vom Typ `Point` gemacht.
Dieses Objekt ist das GeoJSON Pendant zum Leaflet-Marker.
Wenn wir einen Point beim Erstellen des GeoJSON Layers als Parameter übergeben,
dann wird ein Standard Marker erstellt.
Wollen wir diesen Marker individuell gestalten,
dann brauchten wir entweder einen Variablennamen,
den wir ansprechen können,
oder wir müssen den Marker selbst instanziieren.
Für das Instanziieren brauchen wir eine Position oder einen Point.
Und nun schließt sich der Kreis. Die Option `pointtoLayer` gibt uns Zugriff
auf die Koordinaten. Sehen Sie sich das nächste Beispiel an.
Ein Beispiel erklärt oft mehr als viele Worte.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var geojsonFeatureCollection =
 {
 "type": "FeatureCollection",
 "features":
 [
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [6, 50]},
 "properties": {"name": "Dorf 1"}
 },
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 50]},
 "properties": {"name": "Dorf 2"}
 },
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 51]},
 "properties": {"name": "Dorf 3"}
 }
 ]
 };
 var options_draggable = {
 draggable: true,
 title: "Ein Ort in der Nähe von Gering"
 };
 var options_notdraggable = {
 draggable: false,
 title: "Ein Ort in der Nähe von Gering"
 };
*L.geoJson(geojsonFeatureCollection, {
*pointToLayer: function(feature, latlng) {
*switch(feature.properties.name)
*{
*case "Dorf 1": return L.marker(latlng, options_draggable)
* .bindPopup(feature.properties.name);
*case "Dorf 2": return L.marker(latlng, options_notdraggable)
* .bindPopup(feature.properties.name);
*case "Dorf 3": return L.marker(latlng, options_notdraggable)
* .bindPopup(feature.properties.name);
*}
*}
*}).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_967.html-->
```

Im vorhergehenden Programmcodebeispiel sehen Sie,
wie ein Marker erstellt und mit einem individuellen Pop-up Text versehen wird.
Das Ergebnis ist auf den ersten Blick genau das Gleiche,
wie im vorhergehenden Kapitel.
Welcher Pop-up Text dem Marker genau zugewiesen wird,
ist in dem Beispiel auch von der Eigenschaft `feature.properties.name` abhängig.
Zusätzlich werden in diesem Beispiel Optionen von dem Namen abhängig gemacht.
Nur der Marker von Dorf 1 kann auf der Karte verschoben werden.
Der größte Unterschied ist aber, dass wir den Marker hier selbst erstellen
und deshalb Einfluss auf die Optionen haben.

Sehen Sie sich die Karte, die Sie in der folgenden Abbildung sehen,
in Ihrem Browser an.
Auf den ersten Blick hat sich nichts zu dem Beispiel des vorherigen Kapitels geändert.
Auf den zweiten Blick werden Sie feststellen, dass Sie nur den Marker von
Dorf 1 auf der Karte verschieben können.

![Drei Marker auf einer Karte. Sie können nur einen Marker mit der Maus bewegen.](/images/956.png)

_Abbildung: Drei Marker auf einer Karte. Sie können nur einen Marker mit der Maus bewegen._

#### Filtern mit der Option filter

Mithilfe der Option `filter` können Sie große Datenbestände auf das
Wesentliche beschränken. Sehen Sie sich dies _im Kleinen_ im nächsten Beispiel an.

```
 <!DOCTYPE HTML>
 <html lang="de">
 <head>
 <meta charset="utf-8"/>
 <title>Eine OSM Karte mit Leaflet</title>
 <link rel="stylesheet" href="../leaflet/leaflet.css" />
 <script src="../leaflet/leaflet.js"></script>
 </head>
 <body>
 <div style="height: 700px;" id="mapid"></div>
 <script>
 var mymap = L.map('mapid').setView([50.27264, 7.26469], 7);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
 var geojsonFeatureCollection =
 {
 "type": "FeatureCollection",
 "features":
 [
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [6, 50]},
 "properties": {"name": "Dorf 1"}
 },
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 50]},
 "properties": {"name": "Dorf 2"}
 },
 {
 "type": "Feature",
 "geometry": {"type": "Point", "coordinates": [7, 51]},
 "properties": {"name": "Dorf 3"}
 }
 ]
 };
 var options = {
 draggable: true,
 title: "Ein Ort in der Nähe von Gering"
 };
*L.geoJson(geojsonFeatureCollection, {
*filter: function(feature, latlng) {
*switch (feature.properties.name) {
*case "Dorf 1": return true;
*default:  return false;
*}
*}
*}).addTo(mymap);
 </script>
 </body>
 </html>
<!--index_966.html-->
```

Im Beispiel sehen Sie, dass auf einem GeoJSON Layer nur die Elemente angezeigt werden,
deren Rückgabewert beim Filtern positiv oder `true` ist. Im Beispiel bedeutet dies genau,
das nur die Marker angezeigt werden, bei den
`feature.properties.name` gleich `Dorf 1` ist. Nur hier wird, wegen  
`case "Dorf 1": return true` ein positiver Wert, also `true`, zurück gegeben.
Ansonsten, ist die Ausgabe der Filterfunktion wegen `default: return false;` gleich `false`.

Die nachfolgende Abbildung zeigt es Ihnen: Nur Dorf 1 wird angezeigt.
Die beiden anderen Orte, die sich in den GeoJSON Daten befinden,
werden heraus gefiltert. Sie sehen nur einen Marker.

![Nur ein Marker wird angezeigt! Alle anderen Marker werden herausgefiltert.](/images/955.png)

_Abbildung: Nur ein Marker wird angezeigt! Alle anderen Marker werden herausgefiltert._

## In diesem Kapitel haben wir …

In diesem Kapitel haben wir uns das Format GeoJSON genau angesehen.
Wir haben die GeoJSON Typen mit den Objekten, die wir mit Leaflet erstellen können, verglichen.
Außerdem haben wir viele der Methoden und Optionen, die Leaflet zum Arbeiten mit GeoJSON bietet,
angewandt.
Wir können nun eine Karte mit Daten füllen! Im nächsten Kapitel sehen wir uns an,
wie wir mit den Daten auch

- Aussagen treffen oder
- Fragen beantworten

können.

[^1]: https://leafletjs.com/reference.html#layergroup
[^2]: https://leafletjs.com/reference.html#featuregroup
[^3]: https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442 (https://bit.ly/2VkXTca)
[^4]: https://de.wikipedia.org/w/index.php?title=Simple_Feature_Access&oldid=171319596 (https://bit.ly/2SrASSX)
[^5]: https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070 (https://bit.ly/2Tc84hc)
[^6]: https://de.wikipedia.org/w/index.php?title=Open_Geospatial_Consortium&oldid=180537320 (https://bit.ly/2CFhNHj)
[^8]: https://de.wikipedia.org/w/index.php?title=Extensible_Markup_Language&oldid=183475842 (https://bit.ly/2Tgs16p)
[^9]: https://www.w3.org/TR/1998/REC-xml-19980210
[^10]: https://de.wikipedia.org/w/index.php?title=Geodaten&oldid=181076558 (https://bit.ly/2RkeBZT)
[^11]: https://de.wikipedia.org/w/index.php?title=Semantik&oldid=184048296 (https://bit.ly/2BOes7i)
[^12]: https://tools.ietf.org/html/rfc8259
[^13]: http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf (https://bit.ly/2PF27HE)
[^14]: https://github.com/astridx/world.geo.json/blob/master/countries.geo.json (https://bit.ly/2GNF5yL)
[^15]: http://geojson.org/
[^17]: https://tools.ietf.org/html/rfc7946#section-3.2
[^18]: https://tools.ietf.org/html/rfc7946#section-3.3
[^19]: https://de.wikipedia.org/w/index.php?title=Geoinformationssystem&oldid=183596912 (https://bit.ly/2EXsUOo)
[^20]: https://de.wikipedia.org/w/index.php?title=GeoJSON&oldid=183228442#Geometrien (https://bit.ly/2ApdXR5)
[^21]: https://wiki.openstreetmap.org/w/index.php?title=DE:Genauigkeit_von_GPS-Daten&oldid=1581004 (https://bit.ly/2CHnbtL)
[^22]: https://tools.ietf.org/html/rfc7946#section-3.1.1
[^23]: https://tools.ietf.org/html/rfc7946#section-3.1.2
[^24]: https://leafletjs.com/reference.html#marker
[^25]: https://tools.ietf.org/html/rfc7946#section-3.1.4
[^26]: https://leafletjs.com/reference.html#polyline
[^27]: https://tools.ietf.org/html/rfc7946#section-3.1.5
[^29]: https://tools.ietf.org/html/rfc7946#section-3.1.6
[^30]: https://leafletjs.com/reference.html#polygon
[^33]: https://tools.ietf.org/html/rfc7946#section-3.1.7
[^35]: https://tools.ietf.org/html/rfc7946#section-3.1.8
[^36]: https://de.wikipedia.org/w/index.php?title=JavaScript_Object_Notation&oldid=183718070#Datenstruktur_und_Formatdefinition (https://bit.ly/2s0QAZt)
[^38]: http://geojsonlint.com
[^39]: https://github.com/topojson/topojson
[^40]: https://wiki.openstreetmap.org/w/index.php?title=OSM_XML&oldid=1419416 (https://bit.ly/2VhEdpn)
[^41]: http://leafletjs.com/reference#geojson
[^43]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify (https://mzl.la/2GMQZck)
[^44]: https://leafletjs.com/reference.html#geojson-setstyle
[^45]: http://leafletjs.com/reference.html#path
[^46]: http://leafletjs.com/reference.html#geojson-oneachfeature
[^48]: https://leafletjs.com/reference.html#geojson-pointtolayer