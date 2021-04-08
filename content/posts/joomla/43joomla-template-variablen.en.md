---
date: 2021-01-12
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Parameters and Variables'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-variablen
langKey: en
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Parameters make the template flexibly configurable in the backend. Perhaps a colour selection should be possible? The standard template Cassiopeia offers, among others, `logoFile`, `siteTitle` and `siteDescription` as parameters. We add a banner and social media icons.

## For the impatient

Take a look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t37...t38) and incorporate these changes into your development version.

## Step by step

In this section we will look at parameters and see that there are circumstances where they work more intuitively than modules.

### New files

In diesem Kapitel wird lediglich das Bild `templates/facile/images/banner.jpg` hinzugefügt, welches im Banner via CSS angezeigt wird. Dieses habe ich den Demo Images von [html5up.net](https://html5up.net/txt) entnommen und es ist von [unsplash.com](https://unsplash.com/).

#### Template

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

In der Datei `templates/facile/ index.php` ergänzen wir so, dass über Parameter ein Banner und Social Media Icons einfügbar sind.

> In HTML haben manche Zeichen wie die spitzen Klammern `< >` eine besondere Bedeutung. Sie werden daher als HTML-Entities geschrieben, wenn sie als Text dargestellt werden sollen. Beispielsweise steht `&lt;` statt `<` und `&gt;` statt `>`. Bei der Verarbeitung von Zeichenketten kann es vorkommen, dass solch spezifische Zeichen enthalten sind und daher umgewandelt werden müssen. Wir bieten im Backend eine Texteingabemöglichkeit über ein Formular. Wir möchten aber nicht, dass darüber HTML-Code einschleust wird. Um das zu verhindern, nutzen wir die Funktion `htmlspecialchars()`. Die sorgt dafür, dass die Zeichen, die in HTML eine besondere Bedeutung haben, umgewandelt werden.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

```php {diff}
         </nav>
         <?php endif; ?>

+        <?php if ($this->params->get('showBanner')) : ?>
+        <section id="banner">
+            <div class="content">
+                <h2><?php echo htmlspecialchars($this->params->get('bannerTitle')); ?></h2>
+                <p><?php echo htmlspecialchars($this->params->get('bannerDescription')); ?></p>
+                <a href="#main"
+                    class="button scrolly"><?php echo htmlspecialchars($this->params->get('bannerButton')); ?></a>
+            </div>
+        </section>
+        <?php endif; ?>
+
         <section id="main">
             <div class="container">
                 <div class="row gtr-200">

         </section>

         <footer id="footer">
+            <?php if ($this->params->get('showFooter')) : ?>
+            <div class="col-12">
+                <section>
+                    <?php
+                        $fieldValues = $this->params->get('showFooterTouchFields');
+
+                        if (empty($fieldValues))
+                        {
+                            return;
+                        }
+
+                        $html = '<ul class="contact">';
+
+                        foreach ($fieldValues as $value)
+                        {
+                            $html .= '<li><a class="icon brands ' . $value->touchsubicon . '" href="' . $value->touchsuburl . '"><span class="label">' . $value->touchsubname . '</span></a></li>';
+
+                        }
+
+                        $html .= '</ul>';
+
+                        echo $html;
+
+                    ?>
+                </section>
+            </div>
+            <?php endif; ?>
+
+
             <?php if ($this->countModules('footer', true)) : ?>
             <div id="copyright">
                 <jdoc:include type="modules" name="footer" />
```

##### [templates/facile/language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t37...t38#diff-e46f43df955f9c24f237c461cd835bdfc8dde798943f6999e8675d4045334d6f)

Wir nutzen die Sprachdateien für die Beschriftung unseres Backendformulares. So sind die Texte in unterschiedliche Spachen übersetzbar.

[templates/facile/language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t37...t38#diff-e46f43df955f9c24f237c461cd835bdfc8dde798943f6999e8675d4045334d6f)

```xml {diff}
 TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."
+;params
+TPL_FACILE_BANNER_FIELDSET_LABEL="Banner"
+TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /templates/facile/images/banner.jpg"
+TPL_FACILE_BANNER_LABEL="Show Banner"
+TPL_FACILE_BANNER_TITLE="Title text"
+TPL_FACILE_BANNER_TAGLINE="Tagline text"
+TPL_FACILE_BANNER_BUTTON="Button text"
+TPL_FACILE_FOOTER_FIELDSET_LABEL="Social Footer"
+TPL_FACILE_FOOTER_FIELDSET_DESC="For example: https://fontawesome.com/icons/facebook?style=brands"
+TPL_FACILE_FOOTER_LABEL="Show Social Footer"
+TPL_FACILE_GET_IN_TOUCH="Social Link"
+TPL_FACILE_GET_IN_TOUCH_SUBNAME="Name"
+TPL_FACILE_GET_IN_TOUCH_SUBICON="Icon"
+TPL_FACILE_GET_IN_TOUCH_SUBURL="URL"
```

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Da Joomla uns beim Erstellen der Formularfelder unterstützt, reicht es aus, die Felder über eine XML-Datei zu definieren.

Damit ein Formularfeld in Anhängigkeit zu einem anderen angezeigt wird, nutzen wir `showon`. `showon="showBanner:1"` bewirkt, dass das aktuelle Feld nur eingeblendet wird, wenn das Feld `showBanner` den Wert `1` hat.

Das Feld des Typs `type="subform"` biete die Möglichkeit, die Anzahl der Wert im Backendformular flexibel zu gestalten. So ist möglich, lediglich einen Link zu Facebook einzufügen oder viele Social Media Kanäle anzuzeigen.

[templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

```xml {diff}
 		<position>footer</position>
 		<position>debug</position>
 	</positions>
+	<config>
+		<fields name="params">
+			<fieldset name="banner" label="TPL_FACILE_BANNER_FIELDSET_LABEL" description="TPL_FACILE_BANNER_FIELDSET_DESC">
+				<field
+					name="showBanner"
+					type="radio"
+					label="TPL_FACILE_BANNER_LABEL"
+					layout="joomla.form.field.radio.switcher"
+					default="0"
+					filter="integer"
+					>
+					<option value="0">JNO</option>
+					<option value="1">JYES</option>
+				</field>
+
+				<field
+					name="bannerTitle"
+					type="text"
+					default="Welcome to the Joomla version of TXT by HTML5 UP"
+					label="TPL_FACILE_BANNER_TITLE"
+					filter="string"
+					showon="showBanner:1"
+				/>
+
+				<field
+					name="bannerDescription"
+					type="text"
+					default="A free responsive site template built on HTML5, CSS3, and some other stuff"
+					label="TPL_FACILE_BANNER_TAGLINE"
+					filter="string"
+					showon="showBanner:1"
+				/>
+
+				<field
+					name="bannerButton"
+					type="text"
+					default="Alright let's go"
+					label="TPL_FACILE_BANNER_BUTTON"
+					filter="string"
+					showon="showBanner:1"
+				/>
+			</fieldset>
+			<fieldset name="footer" label="TPL_FACILE_FOOTER_FIELDSET_LABEL" description="TPL_FACILE_FOOTER_FIELDSET_DESC">
+				<field
+					name="showFooter"
+					type="radio"
+					label="TPL_FACILE_FOOTER_LABEL"
+					layout="joomla.form.field.radio.switcher"
+					default="0"
+					filter="integer"
+					>
+					<option value="0">JNO</option>
+					<option value="1">JYES</option>
+				</field>
+
+				<field
+					name="showFooterTouchFields"
+					type="subform"
+					label="TPL_FACILE_GET_IN_TOUCH"
+					multiple="true"
+					max="10"
+					showon="showFooter:1"
+					>
+					<form>
+						<field
+							name="touchsubname"
+							type="text"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBNAME"
+							/>
+						<field
+							name="touchsubicon"
+							type="text"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBICON"
+							/>
+						<field
+							name="touchsuburl"
+							type="url"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBURL"
+							size="30"
+							filter="url"
+							validate="url"
+							/>
+					</form>
+				</field>
+			</fieldset>
+		</fields>
+	</config>
 </extension>
```

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter. Auf alle Fälle solltest du sicherstellen, dass der Template Style Facile aktiv ist. In meinen Beispielen sind die Blog Beispieldateien installiert.

2. Aktiviere im Template Style von Facile das Banner und sieh dir das Ergebnis im Frontend an.

![Joomla Template erstellen - Banner über Parameter im Frontend](/images/j4x43x1.png)

![Joomla Template erstellen - Banner über Parameter im Backend](/images/j4x43x2.png)

2. Aktiviere im Template Style von Facile die Social Media Anzeige und sieh dir das Ergebnis im Frontend an.

![Joomla Template erstellen - Social Media Backend](/images/j4x43x3.png)

![Joomla Template erstellen - Social Media Frontend](/images/j4x43x4.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t36...t37.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)