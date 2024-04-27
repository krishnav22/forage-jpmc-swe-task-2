--- OriginalGraph.tsx
+++ ModifiedGraph.tsx
@@ -9,6 +9,10 @@
  * Perspective library adds load to HTMLElement prototype.
  * This interface acts as a wrapper for Typescript compiler.
  */
+interface PerspectiveViewerElement extends HTMLElement {
+  load: (table: Table) => void,
+}
+
 /**
  * React component that renders Perspective based on data
  * parsed from its parent through data property.
  */
@@ -28,7 +32,9 @@
     if (window.perspective && window.perspective.worker()) {
       this.table = window.perspective.worker().table(schema);
     }
-    
+
+    // Get element directly and load the table
+    const elem = document.getElementsByTagName('perspective-viewer')[0] as PerspectiveViewerElement;
     if (this.table) {
       // Load the `table` in the `<perspective-viewer>` DOM reference.
 
@@ -38,6 +44,8 @@
       // Set all required Perspective configurations
       elem.setAttribute('view', 'y_line');
       elem.setAttribute('column-pivots', '["stock"]');
+      elem.setAttribute('row-pivots', '["timestamp"]');
+      elem.setAttribute('columns', '["top_ask_price", "top_bid_price"]');
       elem.setAttribute('row-pivots', '["timestamp"]');
       elem.setAttribute('columns', '["top_ask_price"]');
       elem.setAttribute('aggregates', '{"stock":"distinct count"}');
@@ -61,7 +69,9 @@
     // Everytime the data props is updated, insert the data into Perspective table
     if (this.table) {
       // As part of the task, you need to fix the way we update the data props to
-      // avoid inserting duplicated entries into Perspective table again.
+      // avoid inserting duplicated entries into Perspective table again.      
+      // Format the data from ServerRespond to the schema
+
       this.table.update(this.props.data.map((el: any) => {
         return {
           stock: el.stock,
@@ -74,3 +84,4 @@
         };
       }));
     }
+  }

