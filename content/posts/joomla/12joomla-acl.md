Ziel ist es, dass nicht jeder das Recht hat, alle Inhalte zu bearbeiten. Dazu bietet Joomla! eine Zugriffskontrollliste, die ACL. Mit dieser handhabst du Benutzerrechte in deiner Komponente.
```xml {numberLines}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/access.xml -->

```xml {numberLines diff}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql -->

```xml {diff}
diff --git a/src/administrator/components/com_foos/config.xml b/src/administrator/components/com_foos/config.xml
index bbd807ae..241609ff 100644
--- a/src/administrator/components/com_foos/config.xml
+++ b/src/administrator/components/com_foos/config.xml
@@ -15,4 +15,19 @@
 			<option value="1">JYES</option>
 		</field>
 	</fieldset>
+	<fieldset
+		name="permissions"
+		label="JCONFIG_PERMISSIONS_LABEL"
+		description="JCONFIG_PERMISSIONS_DESC"
+		>
+		<field
+			name="rules"
+			type="rules"
+			label="JCONFIG_PERMISSIONS_LABEL"
+			validate="rules"
+			filter="rules"
+			component="com_foos"
+			section="component"
+		/>
+	</fieldset>
 </config>
[src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/config.xml)

```xml {diff}
diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index a9d7b587..da9849dc 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -21,6 +21,11 @@
 			<file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
 		</sql>
 	</uninstall>
+	<update>  <!-- Runs on update -->
+		<schemas>
+			<schemapath type="mysql">sql/updates/mysql</schemapath>
+		</schemas>
+	</update>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
 		<folder>language</folder>
@@ -38,6 +43,7 @@
 			<menu link="option=com_foos">COM_FOOS</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
+			<filename>access.xml</filename>
 			<filename>foos.xml</filename>
 			<filename>config.xml</filename>
 			<folder>forms</folder>
```
Damit bei der Installation alles glatt läuft, ergänzen wir die hier neu hinzukommenden Dateien `sql/updates/mysql` und `access.xml`.
[https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/foos.xml)
Das Formular zum Erstellen eines neuen Foo-Items wird um die Möglichkeit erweitert, Berechtigungen für ein einzelnes Element zu setzten. Wir ergänzen das Feld `name="access"`.

```xml {diff}
diff --git a/src/administrator/components/com_foos/forms/foo.xml b/src/administrator/components/com_foos/forms/foo.xml
index 827d7946..15615cf6 100644
--- a/src/administrator/components/com_foos/forms/foo.xml
+++ b/src/administrator/components/com_foos/forms/foo.xml
@@ -25,5 +25,12 @@
 			size="45"
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>
+
+		<field
+			name="access"
+			type="accesslevel"
+			label="JFIELD_ACCESS_LABEL"
+			size="1"
+		/>
 	</fieldset>
 </form>
```
```xml {diff}
diff --git a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
index 634065b8..4c925493 100644
--- a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
+++ b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
@@ -9,3 +9,7 @@ INSERT INTO `#__foos_details` (`name`) VALUES
 ('Nina'),
 ('Astrid'),
 ('Elmar');
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```php {diff}
diff --git a/src/administrator/components/com_foos/src/Model/FoosModel.php b/src/administrator/components/com_foos/src/Model/FoosModel.php
index 4767b474..0038575c 100644
--- a/src/administrator/components/com_foos/src/Model/FoosModel.php
+++ b/src/administrator/components/com_foos/src/Model/FoosModel.php
@@ -48,9 +48,17 @@ protected function getListQuery()

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('id', 'name', 'alias'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
 		);
-		$query->from($db->quoteName('#__foos_details'));
+
+		$query->from($db->quoteName('#__foos_details', 'a'));
+
+		// Join over the asset groups.
+		$query->select($db->quoteName('ag.title', 'access_level'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
+			);

 		return $query;
 	}
[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/src/Model/FoosModel.php)

Eine Schaltfläche zum Erstellen eines Elementes ist nur sinnvoll, wenn dies erlaubt ist. Deshalb ändern wir die View ab - `$canDo` kommt hinzu.

```php {diff}
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
index 29a8871f..4748083d 100644
--- a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
@@ -11,6 +11,7 @@

 \defined('_JEXEC') or die;

+use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Toolbar\Toolbar;
@@ -57,14 +58,21 @@ public function display($tpl = null): void
 	 */
 	protected function addToolbar()
 	{
+		$canDo = ContentHelper::getActions('com_foos');
+
 		// Get the toolbar object instance
 		$toolbar = Toolbar::getInstance('toolbar');

 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

-		$toolbar->addNew('foo.add');
+		if ($canDo->get('core.create'))
+		{
+			$toolbar->addNew('foo.add');
+		}

-		$toolbar->preferences('com_foos');
+		if ($canDo->get('core.options'))
+		{
+			$toolbar->preferences('com_foos');
+		}
 	}
-
 }
```
```php {diff}
diff --git a/src/administrator/components/com_foos/tmpl/foo/edit.php b/src/administrator/components/com_foos/tmpl/foo/edit.php
index 93e36b40..1531aec6 100644
--- a/src/administrator/components/com_foos/tmpl/foo/edit.php
+++ b/src/administrator/components/com_foos/tmpl/foo/edit.php
@@ -27,6 +27,7 @@
 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
+	<?php echo $this->getForm()->renderField('access'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>
[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
diff --git a/src/administrator/components/com_foos/tmpl/foos/default.php b/src/administrator/components/com_foos/tmpl/foos/default.php
index f2c891bd..e597fc4c 100644
--- a/src/administrator/components/com_foos/tmpl/foos/default.php
+++ b/src/administrator/components/com_foos/tmpl/foos/default.php
@@ -27,6 +27,9 @@
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
 								</th>
+								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
+									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
+								</th>
 								<th scope="col">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
 								</th>
@@ -47,6 +50,9 @@
 										<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>

 								</th>
+								<td class="small d-none d-md-table-cell">
+									<?php echo $item->access_level; ?>
+								</td>
 								<td class="d-none d-md-table-cell">
 									<?php echo $item->id; ?>
 								</td>
[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/tmpl/foos/default.php)


### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t9...t10.diff

diff --git a/src/administrator/components/com_foos/access.xml b/src/administrator/components/com_foos/access.xml
new file mode 100644
index 00000000..fa1d9b04
--- /dev/null
+++ b/src/administrator/components/com_foos/access.xml
@@ -0,0 +1,13 @@
+<?xml version="1.0" encoding="utf-8"?>
+<access component="com_foos">
+	<section name="component">
+		<action name="core.admin" title="JACTION_ADMIN" />
+		<action name="core.options" title="JACTION_OPTIONS" />
+		<action name="core.manage" title="JACTION_MANAGE" />
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
+	</section>
+</access>
diff --git a/src/administrator/components/com_foos/config.xml b/src/administrator/components/com_foos/config.xml
index bbd807ae..241609ff 100644
--- a/src/administrator/components/com_foos/config.xml
+++ b/src/administrator/components/com_foos/config.xml
@@ -15,4 +15,19 @@
 			<option value="1">JYES</option>
 		</field>
 	</fieldset>
+	<fieldset
+		name="permissions"
+		label="JCONFIG_PERMISSIONS_LABEL"
+		description="JCONFIG_PERMISSIONS_DESC"
+		>
+		<field
+			name="rules"
+			type="rules"
+			label="JCONFIG_PERMISSIONS_LABEL"
+			validate="rules"
+			filter="rules"
+			component="com_foos"
+			section="component"
+		/>
+	</fieldset>
 </config>
diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index a9d7b587..da9849dc 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -21,6 +21,11 @@
 			<file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
 		</sql>
 	</uninstall>
+	<update>  <!-- Runs on update -->
+		<schemas>
+			<schemapath type="mysql">sql/updates/mysql</schemapath>
+		</schemas>
+	</update>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
 		<folder>language</folder>
@@ -38,6 +43,7 @@
 			<menu link="option=com_foos">COM_FOOS</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
+			<filename>access.xml</filename>
 			<filename>foos.xml</filename>
 			<filename>config.xml</filename>
 			<folder>forms</folder>
diff --git a/src/administrator/components/com_foos/forms/foo.xml b/src/administrator/components/com_foos/forms/foo.xml
index 827d7946..15615cf6 100644
--- a/src/administrator/components/com_foos/forms/foo.xml
+++ b/src/administrator/components/com_foos/forms/foo.xml
@@ -25,5 +25,12 @@
 			size="45"
 			hint="JFIELD_ALIAS_PLACEHOLDER"
 		/>
+
+		<field
+			name="access"
+			type="accesslevel"
+			label="JFIELD_ACCESS_LABEL"
+			size="1"
+		/>
 	</fieldset>
 </form>
diff --git a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
index 634065b8..4c925493 100644
--- a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
+++ b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
@@ -9,3 +9,7 @@ INSERT INTO `#__foos_details` (`name`) VALUES
 ('Nina'),
 ('Astrid'),
 ('Elmar');
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
diff --git a/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql b/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql
new file mode 100644
index 00000000..fd5b6cc0
--- /dev/null
+++ b/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql
@@ -0,0 +1,3 @@
+ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
diff --git a/src/administrator/components/com_foos/src/Model/FoosModel.php b/src/administrator/components/com_foos/src/Model/FoosModel.php
index 4767b474..0038575c 100644
--- a/src/administrator/components/com_foos/src/Model/FoosModel.php
+++ b/src/administrator/components/com_foos/src/Model/FoosModel.php
@@ -48,9 +48,17 @@ protected function getListQuery()

 		// Select the required fields from the table.
 		$query->select(
-			$db->quoteName(array('id', 'name', 'alias'))
+			$db->quoteName(array('a.id', 'a.name', 'a.alias', 'a.access'))
 		);
-		$query->from($db->quoteName('#__foos_details'));
+
+		$query->from($db->quoteName('#__foos_details', 'a'));
+
+		// Join over the asset groups.
+		$query->select($db->quoteName('ag.title', 'access_level'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
+			);

 		return $query;
 	}
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
index 29a8871f..4748083d 100644
--- a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
@@ -11,6 +11,7 @@

 \defined('_JEXEC') or die;

+use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Toolbar\Toolbar;
@@ -57,14 +58,21 @@ public function display($tpl = null): void
 	 */
 	protected function addToolbar()
 	{
+		$canDo = ContentHelper::getActions('com_foos');
+
 		// Get the toolbar object instance
 		$toolbar = Toolbar::getInstance('toolbar');

 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

-		$toolbar->addNew('foo.add');
+		if ($canDo->get('core.create'))
+		{
+			$toolbar->addNew('foo.add');
+		}

-		$toolbar->preferences('com_foos');
+		if ($canDo->get('core.options'))
+		{
+			$toolbar->preferences('com_foos');
+		}
 	}
-
 }
diff --git a/src/administrator/components/com_foos/tmpl/foo/edit.php b/src/administrator/components/com_foos/tmpl/foo/edit.php
index 93e36b40..1531aec6 100644
--- a/src/administrator/components/com_foos/tmpl/foo/edit.php
+++ b/src/administrator/components/com_foos/tmpl/foo/edit.php
@@ -27,6 +27,7 @@
 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
 	<?php echo $this->getForm()->renderField('name'); ?>
 	<?php echo $this->getForm()->renderField('alias'); ?>
+	<?php echo $this->getForm()->renderField('access'); ?>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>
diff --git a/src/administrator/components/com_foos/tmpl/foos/default.php b/src/administrator/components/com_foos/tmpl/foos/default.php
index f2c891bd..e597fc4c 100644
--- a/src/administrator/components/com_foos/tmpl/foos/default.php
+++ b/src/administrator/components/com_foos/tmpl/foos/default.php
@@ -27,6 +27,9 @@
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
 								</th>
+								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
+									<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
+								</th>
 								<th scope="col">
 									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
 								</th>
@@ -47,6 +50,9 @@
 										<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>

 								</th>
+								<td class="small d-none d-md-table-cell">
+									<?php echo $item->access_level; ?>
+								</td>
 								<td class="d-none d-md-table-cell">
 									<?php echo $item->id; ?>
 								</td>

```

## Links