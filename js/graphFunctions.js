var x = 60,
  y = 60,
  p = 150,
  q = 100;
var graph;
var parent;

// "url(C:\\Users\\keval\\Desktop\\IDP-ET\\js\\examples\\editors\\images\\grid.gif)"

function deleteCells() {
  graph.removeCells(graph.getSelectionCells());
}

function clearAll() {
  graph.removeCells(graph.getChildVertices(graph.getDefaultParent()));
  graph.removeCells(graph.getChildEdges(graph.getDefaultParent()));
  y = 60;
}

function zoomIn() {
  graph.zoomIn();
}

function zoomOut() {
  graph.zoomOut();
}

function orderize() {
  var layout = new mxHierarchicalLayout(graph);

  parent = graph.getDefaultParent();
  console.log("Parent ");
  console.log(parent);

  // Adds a button to execute the layout
  var button = document.getElementById('heirarchical');
  mxUtils.write(button, 'Hierarchical');
  mxEvent.addListener(button, 'click', function(evt) {
    layout.execute(parent);
  });
}

function textSelection(container) {
  console.log("ge");



  console.log("mmn");
}

function addFSBEdge(container, token) {
  new mxRubberband(graph);
  new mxKeyHandler(graph);

  graph.getModel().beginUpdate();
  try {
    if (token == 1) {
      // console.log('hello');
      p = 150;
      parent = graph.getDefaultParent();
      var cell = new mxCell('consist of', new mxGeometry(0, 7, 50, 50), 'curved=1;endArrow=classic;html=1;');
      cell.geometry.setTerminalPoint(new mxPoint(p, q), true);
      p += 100;
      cell.geometry.setTerminalPoint(new mxPoint(p, q), false);
      // p+=50;
      q += 20;
      // cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)];
      cell.geometry.relative = true;
      cell.edge = true;

      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      // console.log('bye');
      var style = graph.getStylesheet().getDefaultEdgeStyle();

    } else if (token == 2) {
      // console.log('hello');
      p = 150;
      parent = graph.getDefaultParent();
      var cell = new mxCell('realized by', new mxGeometry(0, 7, 50, 50), 'curved=1;endArrow=classic;html=1;');
      cell.geometry.setTerminalPoint(new mxPoint(p, q), true);
      p += 100;
      cell.geometry.setTerminalPoint(new mxPoint(p, q), false);
      // p+=50;
      q += 20;
      // cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)];
      cell.geometry.relative = true;
      cell.edge = true;

      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      // console.log('bye');
    } else if (token == 3) {
      // console.log('hello');
      p = 150;
      parent = graph.getDefaultParent();
      var cell = new mxCell('realized as', new mxGeometry(0, 7, 50, 50), 'curved=1;endArrow=classic;html=1;');
      cell.geometry.setTerminalPoint(new mxPoint(p, q), true);
      p += 100;
      cell.geometry.setTerminalPoint(new mxPoint(p, q), false);
      // p+=50;
      q += 20;
      // cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)];
      cell.geometry.relative = true;
      cell.edge = true;

      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      // console.log('bye');
    } else if (token == 4) {
      // console.log('hello');
      p = 150;
      parent = graph.getDefaultParent();
      var cell = new mxCell('utilized by', new mxGeometry(0, 7, 50, 50), 'curved=1;endArrow=classic;html=1;');
      cell.geometry.setTerminalPoint(new mxPoint(p, q), true);
      p += 100;
      cell.geometry.setTerminalPoint(new mxPoint(p, q), false);
      // p+=50;
      q += 20;
      // cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)];
      cell.geometry.relative = true;
      cell.edge = true;

      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      // console.log('bye');
    }
    orderize();
  } catch (e) {

  } finally {
    graph.getModel().endUpdate();
  }
}

function addFSBVertex(container, token) {
  //var graph = new mxGraph(container);
  //var parent = graph.getDefaultParent();
  new mxRubberband(graph);
  new mxKeyHandler(graph);

  //graph.setEnabled(false);

  graph.getModel().beginUpdate();
  try {
    if (token == 1) {
      var v1 = graph.insertVertex(parent, null, "F", x, y, 80, 80); //x,y,width,height
      y = y + 40;
      var style = graph.getStylesheet().getDefaultVertexStyle();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
      style[mxConstants.STYLE_SPACING_TOP] = 0;
      style[mxConstants.STYLE_SPACING_RIGHT] = 0;
      // style[mxConstants.STYLE_ROUNDED] = 1;
      style[mxConstants.STYLE_FILLCOLOR] = '#45afe3';
      // style[mxConstants.STYLE_GRADIENTCOLOR] = '#70c4ed';
    } else
    if (token == 2) {
      var v2 = graph.insertVertex(parent, null, "S", x, y, 80, 70); //x,y,width,height
      y = y + 40;
      var style = graph.getStylesheet().getDefaultVertexStyle();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_HEXAGON;
      // style[mxConstants.STYLE_SHAPE] = 'rectangle';
      style[mxConstants.STYLE_SPACING_TOP] = 0;
      style[mxConstants.STYLE_SPACING_RIGHT] = 0;
      style[mxConstants.STYLE_FILLCOLOR] = '#ffa500';

    } else {
      var v3 = graph.insertVertex(parent, null, "B", x, y, 80, 40); //x,y,width,height
      y = y + 40;
      var style = graph.getStylesheet().getDefaultVertexStyle();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
      // style[mxConstants.STYLE_SHAPE] = 'box';
      // style[mxConstants.STYLE_SPACING_TOP] = FShape.prototype.extrude;
      // style[mxConstants.STYLE_SPACING_RIGHT] = FShape.prototype.extrude;
      // style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';
      style[mxConstants.STYLE_FILLCOLOR] = '#fe5';

    }
    orderize();
  } catch (e) {

  } finally {
    graph.getModel().endUpdate();
  }
};

function __Draw() {
  var encoder = new mxCodec();
  var result = encoder.encode(graph.getModel());
  var xml = encodeURIComponent(mxUtils.getXml(result));
  // var xml = mxUtils.getXml(EditorUi.editor.getGraphXml());
  // console.log('xml');
  console.log(xml);
  mxUtils.popup(mxUtils.getPrettyXml(xml), true);
  // var doc = mxUtils.createXmlDocument();
}

document.body.appendChild(mxUtils.button('View XML', function() {
  var encoder = new mxCodec();
  var node = encoder.encode(graph.getModel());
  mxUtils.popup(mxUtils.getPrettyXml(node), true);
}));

function main(container) {

  // ********************************************************************************************************************************************************
  // ********************************************************************************************************************************************************
  var textEditing = mxUtils.bind(this, function(evt) {
    return graph.isEditing();
  });
  container.onselectstart = textEditing;
  container.onmousedown = textEditing;
  if (mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9)) {
    mxEvent.addListener(container, 'contextmenu', textEditing);
  } else {
    container.oncontextmenu = textEditing;
  }
  // ********************************************************************************************************************************************************
  // ********************************************************************************************************************************************************

  graph = new mxGraph(container);
  parent = graph.getDefaultParent();
  graph.centerZoom = false;
  graph.setConnectable(true);
  graph.setPanning(true);

  new mxRubberband(graph);

  // graph.maximumGraphBounds = new mxRectangle(0, 0, parseInt($('.main-ws').width()), parseInt($('.main-ws').height()));
  var style = graph.getStylesheet().getDefaultVertexStyle();

  graph.addListener(mxEvent.TAP_AND_HOLD, function(sender, evt) {
    if (!mxEvent.isMultiTouchEvent(evt)) {
      var me = evt.getProperty('event');
      var cell = evt.getProperty('cell');

      if (cell == null) {
        var pt = mxUtils.convertPoint(this.container,
          mxEvent.getClientX(me), mxEvent.getClientY(me));
        rubberband.start(pt.x, pt.y);
      } else if (graph.getSelectionCount() > 1 && graph.isCellSelected(cell)) {
        graph.removeSelectionCell(cell);
      }

      // Blocks further processing of the event
      evt.consume();
    }
  });

  textSelection(container);
  orderize();

  //graph.setEnabled(false);
  // var style = graph.getStylesheet().getDefaultVertexStyle();
  //   style[mxConstants.STYLE_SHAPE] = 'box';
  //   style[mxConstants.STYLE_SPACING_TOP] = FShape.prototype.extrude;
  //   style[mxConstants.STYLE_SPACING_RIGHT] = FShape.prototype.extrude;
  //   style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';

  //Dynamic grid using HTML Canvas 5
  (function() {
    try {
      var canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.zIndex = -1;
      graph.container.appendChild(canvas);

      var ctx = canvas.getContext('2d');

      // Modify event filtering to accept canvas as container
      var mxGraphViewIsContainerEvent = mxGraphView.prototype.isContainerEvent;
      mxGraphView.prototype.isContainerEvent = function(evt) {
        return mxGraphViewIsContainerEvent.apply(this, arguments) ||
          mxEvent.getSource(evt) == canvas;
      };

      var s = 0;
      var gs = 0;
      var tr = new mxPoint();
      var w = 0;
      var h = 0;

      function repaintGrid() {
        if (ctx != null) {
          var bounds = graph.getGraphBounds();
          var width = Math.max(bounds.x + bounds.width, graph.container.clientWidth);
          var height = Math.max(bounds.y + bounds.height, graph.container.clientHeight);
          var sizeChanged = width != w || height != h;

          if (graph.view.scale != s || graph.view.translate.x != tr.x || graph.view.translate.y != tr.y ||
            gs != graph.gridSize || sizeChanged) {
            tr = graph.view.translate.clone();
            s = graph.view.scale;
            gs = graph.gridSize;
            w = width;
            h = height;

            // Clears the background if required
            if (!sizeChanged) {
              ctx.clearRect(0, 0, w, h);
            } else {
              canvas.setAttribute('width', w);
              canvas.setAttribute('height', h);
            }

            var tx = tr.x * s;
            var ty = tr.y * s;

            // Sets the distance of the grid lines in pixels
            var minStepping = graph.gridSize;
            var stepping = minStepping * s;

            if (stepping < minStepping) {
              var count = Math.round(Math.ceil(minStepping / stepping) / 2) * 2;
              stepping = count * stepping;
            }

            var xs = Math.floor((0 - tx) / stepping) * stepping + tx;
            var xe = Math.ceil(w / stepping) * stepping;
            var ys = Math.floor((0 - ty) / stepping) * stepping + ty;
            var ye = Math.ceil(h / stepping) * stepping;

            xe += Math.ceil(stepping);
            ye += Math.ceil(stepping);

            var ixs = Math.round(xs);
            var ixe = Math.round(xe);
            var iys = Math.round(ys);
            var iye = Math.round(ye);

            // Draws the actual grid
            ctx.strokeStyle = '#f6f6f6';
            ctx.beginPath();

            for (var x = xs; x <= xe; x += stepping) {
              x = Math.round((x - tx) / stepping) * stepping + tx;
              var ix = Math.round(x);

              ctx.moveTo(ix + 0.5, iys + 0.5);
              ctx.lineTo(ix + 0.5, iye + 0.5);
            }

            for (var y = ys; y <= ye; y += stepping) {
              y = Math.round((y - ty) / stepping) * stepping + ty;
              var iy = Math.round(y);

              ctx.moveTo(ixs + 0.5, iy + 0.5);
              ctx.lineTo(ixe + 0.5, iy + 0.5);
            }

            ctx.closePath();
            ctx.stroke();
          }
        }
      };
    } catch (e) {
      //mxLog.show();
      //mxLog.debug('Using background image');

      //container.style.backgroundImage = 'url(\'editors/images/grid.gif\')';
    }

    var mxGraphViewValidateBackground = mxGraphView.prototype.validateBackground;
    mxGraphView.prototype.validateBackground = function() {
      mxGraphViewValidateBackground.apply(this, arguments);
      repaintGrid();
    };
  })();


  if (!mxClient.isBrowserSupported()) {
    mxUtils.error('Browser Not Supported');
  } else {
    var doc = mxUtils.createXmlDocument();
    graph.getModel().beginUpdate();
    try {
      //removed default vertex
      addFSBVertex(container, 1);
    } catch (e) {

    } finally {
      graph.getModel().endUpdate();
    }
  }
};

function FShape() {
  mxCylinder.call(this);
};

mxUtils.extend(FShape, mxCylinder);

FShape.prototype.extrude = 10;

FShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
  var dy = this.extrude * this.scale;
  var dx = this.extrude * this.scale;

  if (isForeground) {
    path.moveTo(0, dy);
    path.lineTo(w - dx, dy);
    path.lineTo(w, 0);
    path.moveTo(w - dx, dy);
    path.lineTo(w - dx, h);
  } else {
    path.moveTo(0, dy);
    path.lineTo(dx, 0);
    path.lineTo(w, 0);
    path.lineTo(w, h - dy);
    path.lineTo(w - dx, h);
    path.lineTo(0, h);
    path.lineTo(0, dy);
    path.lineTo(dx, 0);
    path.close();
  }
};
mxCellRenderer.registerShape('box', FShape);
