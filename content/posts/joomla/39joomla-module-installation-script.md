---
date: 2020-01-08
title: 'Module - Installationsskript'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-module-installation-script
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen Namespace und Helper.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t33...t34) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt erstellen wir ein Skript, welches bei der Installation zu bestimmten Ereignissen ausgeführt wird.

### Neue Dateien

#### Module

##### []()

> Vieles kannst du genauso anwenden, wie in der Komponente. Beispielsweise den Updateserver, das Changelog, Hilfeseiten ...

```php

```

## Teste dein Joomla-Module

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `modules` Ordner in den `modules` Ordner deiner Joomla! 4 Installation.

Installiere dein Module wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine Datei und Namespaces hinzugekommen sind, ist dies erforderlich.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t33...t34.diff

diff --git a/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini
index e20c4602..6fb3825e 100644
--- a/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini
+++ b/src/modules/mod_foo/language/en-GB/en-GB.mod_foo.sys.ini
@@ -1,2 +1,8 @@
 MOD_FOO="[PROJECT_NAME]"
 MOD_FOO_XML_DESCRIPTION="Foo Module"
+MOD_FOO_INSTALLERSCRIPT_PREFLIGHT="<p>Anything here happens before the installation/update/uninstallation of the module</p>"
+MOD_FOO_INSTALLERSCRIPT_UPDATE="<p>The module has been updated</p>"
+MOD_FOO_INSTALLERSCRIPT_UNINSTALL="<p>The module has been uninstalled</p>"
+MOD_FOO_INSTALLERSCRIPT_INSTALL="<p>The module has been installed</p>"
+MOD_FOO_INSTALLERSCRIPT_POSTFLIGHT="<p>Anything here happens after the installation/update/uninstallation of the module</p>"
+
diff --git a/src/modules/mod_foo/mod_foo.xml b/src/modules/mod_foo/mod_foo.xml
index 826039ad..eb14c9c5 100644
--- a/src/modules/mod_foo/mod_foo.xml
+++ b/src/modules/mod_foo/mod_foo.xml
@@ -9,6 +9,7 @@
 	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
 	<version>__BUMP_VERSION__</version>
 	<description>MOD_FOO_XML_DESCRIPTION</description>
+	<scriptfile>script.php</scriptfile>
 	<namespace>FooNamespace\Module\Foo</namespace>
 	<files>
 		<filename module="mod_foo">mod_foo.php</filename>
diff --git a/src/modules/mod_foo/script.php b/src/modules/mod_foo/script.php
new file mode 100644
index 00000000..bd57bcd7
--- /dev/null
+++ b/src/modules/mod_foo/script.php
@@ -0,0 +1,120 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+// No direct access to this file
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Log\Log;
+
+/**
+ * Script file of Foo module
+ */
+class mod_fooInstallerScript
+{
+
+	/**
+	 * Extension script constructor.
+	 *
+	 * @return  void
+	 */
+	public function __construct()
+	{
+		$this->minimumJoomla = '4.0';
+		$this->minimumPhp = JOOMLA_MINIMUM_PHP;
+	}
+
+	/**
+	 * Method to install the extension
+	 *
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 */
+	function install($parent)
+	{
+		echo Text::_('MOD_FOO_INSTALLERSCRIPT_UNINSTALL');
+
+		return true;
+	}
+
+	/**
+	 * Method to uninstall the extension
+	 *
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 */
+	function uninstall($parent)
+	{
+		echo Text::_('MOD_FOO_INSTALLERSCRIPT_UNINSTALL');
+
+		return true;
+	}
+
+	/**
+	 * Method to update the extension
+	 *
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 */
+	function update($parent)
+	{
+		echo Text::_('MOD_FOO_INSTALLERSCRIPT_UPDATE');
+
+		return true;
+	}
+
+	/**
+	 * Function called before extension installation/update/removal procedure commences
+	 *
+	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 */
+	function preflight($type, $parent)
+	{
+		// Check for the minimum PHP version before continuing
+		if (!empty($this->minimumPhp) && version_compare(PHP_VERSION, $this->minimumPhp, '<'))
+		{
+			Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPhp), Log::WARNING, 'jerror');
+
+			return false;
+		}
+
+		// Check for the minimum Joomla version before continuing
+		if (!empty($this->minimumJoomla) && version_compare(JVERSION, $this->minimumJoomla, '<'))
+		{
+			Log::add(Text::sprintf('JLIB_INSTALLER_MINIMUM_JOOMLA', $this->minimumJoomla), Log::WARNING, 'jerror');
+
+			return false;
+		}
+
+		echo Text::_('MOD_FOO_INSTALLERSCRIPT_PREFLIGHT');
+
+		return true;
+	}
+
+	/**
+	 * Function called after extension installation/update/removal procedure commences
+	 *
+	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
+	 * @param   InstallerAdapter  $parent  The class calling this method
+	 *
+	 * @return  boolean  True on success
+	 */
+	function postflight($type, $parent)
+	{
+		echo Text::_('MOD_FOO_INSTALLERSCRIPT_POSTFLIGHT');
+
+		return true;
+	}
+}

```

## Links

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Creating_a_Simple_Module/de)