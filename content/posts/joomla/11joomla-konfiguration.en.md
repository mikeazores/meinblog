---
date: 2020-12-11
title: 'Joomla 4.x Tutorial - Extension Development - Configuration'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-konfiguration
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Gibt es Dinge, die du konfigurierbar anzubieten planst? Dann ist dieser Teil wichtig für dich. Hier zeige ich dir, wie du eine Konfiguration auf die Joomla typische Art und Weise zu deiner Komponente hinzufügst.

![Joomla Konfiguration](/images/j4x11x2.png)

## For impatient people

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t8...t9) an und übernimm diese Änderungen in deine Entwicklungsversion.

### Neue Dateien

#### [administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-e5092e959d796cdfa6ef6301d9b819ad13c851b4925d5fd20047e197e5139b39)

Wir ergänzen die Konfigurationsdatei.

[administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/52cb451c657729ff06d3cf35c6c8f9cabc86b809/src/administrator/components/com_foos/config.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/52cb451c657729ff06d3cf35c6c8f9cabc86b809/src/administrator/components/com_foos/config.xml -->

<?xml version="1.0" encoding="utf-8"?>
<config>
	<fieldset
		name="foo"
		label="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY"
		description="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC"
		>
		<field
			name="show_foo_name_label"
			type="list"
			label="COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL"
			default="1"
			>
			<option value="0">JNO</option>
			<option value="1">JYES</option>
		</field>
	</fieldset>
</config>

```

### Modified files

#### [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-1ff20be1dacde6c4c8e68e90161e0578)

[administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
+			<filename>config.xml</filename>
 			<folder>forms</folder>
 			<folder>language</folder>
 			<folder>services</folder>

```

#### [administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-8e3d37bbd99544f976bf8fd323eb5250)

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

 		$toolbar->addNew('foo.add');
+
+		$toolbar->preferences('com_foos');
 	}

 }

```

#### [components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-599caddf64a6ed0c335bc9c9f828f029)

Die `populateState`-Methode stellt sicher, dass das `State`-Objekt gefüllt ist und für den gesamten Code zugänglich ist. Wir ergänzen hier für den Site-Bereich den neuen Parameter.

`populateState()` wird automatisch aufgerufen, wenn wir `getState()` zum ersten Mal verwenden. Wenn wir etwas Besonderes in der Methode benötigen, überschreiben wir sie im eigenen Modell - so wie in unserem Beispiel.

[components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
 		return $this->_item[$pk];
 	}
+
+	/**
+	 * Method to auto-populate the model state.
+	 *
+	 * Note. Calling getState in this method will result in recursion.
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function populateState()
+	{
+		$app = Factory::getApplication();
+
+		$this->setState('foo.id', $app->input->getInt('id'));
+		$this->setState('params', $app->getParams());
+	}
 }

```

#### [components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-a33732ebd6992540b8adca5615b51a1f)

Zum Schluss ersetzen `echo Text::_('COM_FOOS_NAME') . $this->item->name;` mit dem Text, der den Status prüft.

[components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 use Joomla\CMS\Language\Text;

-echo Text::_('COM_FOOS_NAME') . $this->item->name;
+if ($this->get('State')->get('params')->get('show_foo_name_label'))
+{
+	echo Text::_('COM_FOOS_NAME');
+}
+
+echo $this->item->name;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass dir rechts oben die Schaltfläche `Options` angezeigt wird.

![Joomla Konfiguration](/images/j4x11x1.png)

3. Klicke auf `Options` und stelle die Anzeige des Labels nach deinen wünschen ein.

![Joomla Konfiguration](/images/j4x11x2.png)

4. Öffne als Letztes, die Ansicht im Frontend. Verhält die Anzeige des Labels sich so, wie du das im Administrationsbereich eingestellt hast?

![Joomla Konfiguration](/images/j4x11x3.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t8...t9.diff

## Links