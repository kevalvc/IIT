function Actions(editorUi) {
  this.editorUi = editorUi;
  this.actions = new Object();
  this.init();
};

Actions.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var isGraphEnabled = function() {
    return Action.prototype.isEnabled.apply(this, arguments) && graph.isEnabled();
  };

  function deleteCells(includeEdges) {
    // Cancels interactive operations
    graph.escape();
    var cells = graph.getDeletableCells(graph.getSelectionCells());

    if (cells != null && cells.length > 0) {
      var parents = graph.model.getParents(cells);
      graph.removeCells(cells, includeEdges);

      // Selects parents for easier editing of groups
      if (parents != null) {
        var select = [];

        for (var i = 0; i < parents.length; i++) {
          if (graph.model.contains(parents[i]) &&
            (graph.model.isVertex(parents[i]) ||
              graph.model.isEdge(parents[i]))) {
            select.push(parents[i]);
          }
        }

        graph.setSelectionCells(select);
      }
    }
  };

  this.addAction('delete', function(evt) {
    deleteCells(evt != null && mxEvent.isShiftDown(evt));
  }, null, null, 'Delete');
  this.addAction('deleteAll', function() {
    deleteCells(true);
  }, null, null, Editor.ctrlKey + '+Delete');
  this.addAction('duplicate', function() {
    graph.setSelectionCells(graph.duplicateCells());
  }, null, null, Editor.ctrlKey + '+D');
}

Actions.prototype.addAction = function(key, funct, enabled, iconCls, shortcut) {
  var title;

  if (key.substring(key.length - 3) == '...') {
    key = key.substring(0, key.length - 3);
    title = mxResources.get(key) + '...';
  } else {
    title = mxResources.get(key);
  }

  return this.put(key, new Action(title, funct, enabled, iconCls, shortcut));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.put = function(name, action) {
  this.actions[name] = action;

  return action;
};

/**
 * Returns the action for the given name or null if no such action exists.
 */
Actions.prototype.get = function(name) {
  return this.actions[name];
};

/**
 * Constructs a new action for the given parameters.
 */
function Action(label, funct, enabled, iconCls, shortcut) {
  mxEventSource.call(this);
  this.label = label;
  this.funct = this.createFunction(funct);
  this.enabled = (enabled != null) ? enabled : true;
  this.iconCls = iconCls;
  this.shortcut = shortcut;
  this.visible = true;
};

// Action inherits from mxEventSource
mxUtils.extend(Action, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.createFunction = function(funct) {
  return funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setEnabled = function(value) {
  if (this.enabled != value) {
    this.enabled = value;
    this.fireEvent(new mxEventObject('stateChanged'));
  }
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isEnabled = function() {
  return this.enabled;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setToggleAction = function(value) {
  this.toggleAction = value;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setSelectedCallback = function(funct) {
  this.selectedCallback = funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isSelected = function() {
  return this.selectedCallback();
};
