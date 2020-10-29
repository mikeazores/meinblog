
### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t8...t9.diff

diff --git a/src/administrator/components/com_foos/config.xml b/src/administrator/components/com_foos/config.xml
new file mode 100644
index 00000000..bbd807ae
--- /dev/null
+++ b/src/administrator/components/com_foos/config.xml
@@ -0,0 +1,18 @@
+<?xml version="1.0" encoding="utf-8"?>
+<config>
+	<fieldset
+		name="foo"
+		label="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY"
+		description="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC"
+		>
+		<field
+			name="show_foo_name_label"
+			type="list"
+			label="COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL"
+			default="1"
+			>
+			<option value="0">JNO</option>
+			<option value="1">JYES</option>
+		</field>
+	</fieldset>
+</config>
diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index cb47107a..a9d7b587 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -39,6 +39,7 @@
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
+			<filename>config.xml</filename>
 			<folder>forms</folder>
 			<folder>language</folder>
 			<folder>services</folder>
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
index 5ddf2d7b..29a8871f 100644
--- a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
@@ -63,6 +63,8 @@ protected function addToolbar()
 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

 		$toolbar->addNew('foo.add');
+
+		$toolbar->preferences('com_foos');
 	}

 }
diff --git a/src/components/com_foos/src/Model/FooModel.php b/src/components/com_foos/src/Model/FooModel.php
index 7efa1d2e..87caca68 100644
--- a/src/components/com_foos/src/Model/FooModel.php
+++ b/src/components/com_foos/src/Model/FooModel.php
@@ -76,4 +76,21 @@ public function getItem($pk = null)

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
diff --git a/src/components/com_foos/tmpl/foo/default.php b/src/components/com_foos/tmpl/foo/default.php
index e5205d7e..87f2a1a2 100644
--- a/src/components/com_foos/tmpl/foo/default.php
+++ b/src/components/com_foos/tmpl/foo/default.php
@@ -10,4 +10,9 @@

 use Joomla\CMS\Language\Text;

-echo Text::_('COM_FOOS_NAME') . $this->item->name;
+if ($this->get('State')->get('params')->get('show_foo_name_label'))
+{
+	echo Text::_('COM_FOOS_NAME');
+}
+
+echo $this->item->name;

```

## Links