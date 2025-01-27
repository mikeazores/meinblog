---
date: 2021-01-14
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Dark Mode'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-dark-mode
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Das Thema Dark Mode hat für viel Wirbel gesorgt. So hat zum Beispiel Apple den Dark Mode in seine Betriebssysteme integriert. Windows und Google haben das Gleiche getan. Der Dark Mode ist in Mode. Und nicht nur das. Er bietet Vorteile. Ob dunklere Displays gut für die Augen sind, ist umstritten. Klar ist hingegen, dass bei weniger Licht Energie gespart wird.<!-- \index{Template!Dark Mode} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t39...t40)[^github.com/astridx/boilerplate/compare/t39...t40] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt ermöglichen wir einen Dark Mode mithilfe einer eigens dafür erstellten CSS-Datei. Welcher Modus aktiv ist, fragen wir über die Eigenschaft `prefers-color-scheme` ab. Diese erkennt, welche Variante der Benutzer im Betriebssystem eingestellt hat.

Das nachfolgende Schnippet nutze ich, um mir im Vorfeld die Angaben in der Konsole des Browsers ausgeben zu lassen. So bin ich sicher, dass die Eigenschaft `prefers-color-scheme` unterstützt wird und wie sie gesetzt ist.

```js
    <script>
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        console.log('Dark mode is supported');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Dark mode');
    } else {
        console.log('Light mode');
    }
    </script>
```

Fragst du dich, was `window.matchMedia` bedeutet? `window.variableName` bedeutet, dass die Variable `variableName` im globalen Bereich deklariert ist. Das bedeutet, dass jeder JavaScript-Code Zugriff auf diese Variable hat. Die Verwendung von `window` ist nicht zwingend erforderlich. [`window`](https://developer.mozilla.org/de/docs/Web/API/Window)[^developer.mozilla.org/de/docs/web/api/window] wird aber häufig als Konvention verwendet, um zu kennzeichnen, dass eine Variable global ist. Globale Variablen sind zu vermeiden. Sicherer ist es, wenn möglich eigene Variablen zu definieren.

> Eine einfache Lösung ist, alles in Schwarzweiß darzustellen. Der Eintrag `@media (prefers-color-scheme: dark) { body { background: #333!important; color: white !important; }}` in der CSS-Datei würde dies bewirken. Ein passendes Farbschema ist qualitativ besser.

### Neue Dateien

Hinzugekommen ist die CSS-Datei `templates/assets/css/main.dark.css`. Dieses Stylesheet enthält die Regeln für den dunklen Modus. Es unterscheidet sich von `templates/assets/css/main.css` nur in Bezug auf Farbcodes.

> Die Systemnachrichten erscheinen im Dark Mode auffällig hell. Diese haben wir bisher unverändert übernommen. Im Dark Mode passe ich diese nun an. Es handelt sich um die [Webkomponente](https://developer.mozilla.org/de/docs/Web/Web_Components) `joomla-alert`. Das Erscheinungsbild ist via `joomla-alert { ..}` in der CSS-Datei änderbar.

### Geänderte Dateien

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/661edd39e639f8b76fa73f7d00054fcff61f5351/src/templates/facile/index.php)

Die Datei `templates/facile/ index.php` lädt jetzt die CSS-Datei in Abhängigkeit vom _bevorzugten Farbschema_. Zusätzlich integriert sie in der linken oberen Ecke einen Schieberegler, der den Modus ebenfalls umschaltet. Die hierzu notwendigen Änderungen findest du im nachfolgenden Codebeispiel.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/661edd39e639f8b76fa73f7d00054fcff61f5351/src/templates/facile/index.php)

```php {diff}
 $templatePath = 'templates/' . $this->template;
 $wa  = $this->getWebAssetManager();
-$wa->registerAndUseStyle('main', $templatePath . '/assets/css/main.css');
+$wa->registerAndUseStyle('main_dark', $templatePath . '/assets/css/main.dark.css', [], ['media' => '(prefers-color-scheme: dark)']);
+$wa->registerAndUseStyle('main_light', $templatePath . '/assets/css/main.css', [], ['media' => '(prefers-color-scheme: no-preference), (prefers-color-scheme: light)']);
 HTMLHelper::_('jquery.framework');
 $wa->registerAndUseScript('dropotron', $templatePath . '/assets/js/jquery.dropotron.min.js', [], ['defer' => true], []);
 $wa->registerAndUseScript('scrolly', $templatePath . '/assets/js/jquery.scrolly.min.js', [], ['defer' => true], []);

     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <jdoc:include type="styles" />
     <jdoc:include type="scripts" />
+    <script type="module" src="https://unpkg.com/dark-mode-toggle"></script>
 </head>

 <body class="homepage is-preload">
     <div id="page-wrapper">
-
+
+        <dark-mode-toggle></dark-mode-toggle>
+
         <?php if ($this->countModules('menu', true)) : ?>
         <nav id="nav">
             <jdoc:include type="modules" name="menu" />
 class="button scrolly"><?php echo htmlspecialchars($this->params->get('bannerBut

         <jdoc:include type="modules" name="debug" />
     </div>
-</body>
+    <script>
+    /*
+        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
+            console.log('Dark mode is supported');
+        }
+        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
+            console.log('Dark mode');
+        } else {
+            console.log('Light  mode');
+        }
+    */
+    </script>
+    </body>

 </html>
```

## Exkurs: Dark Mode abhängig vom Sonnenstand

Eine interessante Idee ist es, den Dark Mode abhängig vom Sonnenstand beim Betrachters umzuschalten: Sobald bei dem Betrachter die Sonne untergeht soll der Dark Mode anspringen. Es spielt nicht nur Zeit und Datum eine Rolle, sondern auch die Geoposition. Eine mögliche Umsetzung fand ich auf [Codepen](https://codepen.io/ljardin/pen/jOyzwbN).

Zunächst werden in der CSS-Variablen gesetzt.

```css
html {
  --text-color: #2f2f2f;
  --bg-color: #fff;
}

html[data-theme='dark'] {
  --text-color: #fff;
  --bg-color: #2f2f2f;
}

body {
  color: var(--text-color);
  background: var(--bg-color);
}
```

Diese CSS-Variablen werden via JavaScript, welches die Zeitzone abfragt, ein- und ausgeschaltet.

```js
// Get Current ClientTime
let clientTimes = new Date()
let currentTime = clientTimes.getHours() + clientTimes.getMinutes() / 100

let options = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 30000,
}

let success = (pos) => {
  // Get Location
  let lat = pos.coords.latitude
  let long = pos.coords.longitude

  // Get Sunset && Sunrise Time for Location based on SunsetCalc (https://github.com/mourner/suncalc)
  let sunTimes = SunCalc.getTimes(new Date(), lat, long)
  let sunsetTime =
    sunTimes.sunset.getHours() + sunTimes.sunset.getMinutes() / 100
  let sunriseTime =
    sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes() / 100

  // Add Data-Attribut to HTMl if sunsetTime < curentTime
  if (currentTime > sunsetTime || currentTime < sunriseTime) {
    document.querySelector('html').dataset.theme = 'dark'
  }
}

let error = (err) => {
  if (currentTime > 20) {
    // Set Fallback if GeoLocation is not supported
    document.querySelector('html').dataset.theme = 'dark'
  }
}

navigator.geolocation.getCurrentPosition(success, error, options)
```

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter. Deine Website sollte nun den Dark Mode unterstützen. Im linken oberen Bereich sollte sich ein Schalter zum Umschalten des Modus befinden.

![Joomla Template erstellen - Dark Mode](/images/j4x45x1.png)

## Links

[prefers-color-scheme](https://web.dev/prefers-color-scheme/)[^https://web.dev/prefers-color-scheme]

[dark-mode-toggle-Element](https://github.com/GoogleChromeLabs/dark-mode-toggle)[^https://github.com/googlechromelabs/dark-mode-toggle]
<img src="https://vg08.met.vgwort.de/na/68cd159f117e4bcd9558f6e19800ce48" width="1" height="1" alt="">
