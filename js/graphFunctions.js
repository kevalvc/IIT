var x = 60,
  y = 60,
  p = 150,
  q = 100;
var graph;
var parent;
var undoManager;
var xml;
var cells = [];

function undoChange() {
  undoManager.undo();
}

function redoChange() {
  undoManager.redo();
}

$('.save-to').on('click', function() {
  if ($(this).hasClass('selected')) {
    deselect($(this));
  } else {
    $(this).addClass('selected');
    $('.pop').slideFadeToggle();
  }
  return false;
});

$('.closebtn').on('click', function() {
  deselect($('.save-to'));
  return false;
});

function deselect(e) {
  $('.pop').slideFadeToggle(function() {
    e.removeClass('selected');
  });
}

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({
    opacity: 'toggle',
    height: 'toggle'
  }, 'fast', easing, callback);
};

function storegraph() {
  var uname = $("#uname").val();
  var fname = $("#fname").val();
  var conn = new ActiveXObject("ADODB.Connection");
  var recordSet = new ActiveXObject("ADODB.Recordset");
  var connStr = "Provider=SQLOLEDB;Server=abcd;Database=mydatabase;User Id=root;Password=";
  conn.open(connStr);
  recordSet.Open("INSERT INTO iit VALUES ('" + uname + "','" + fname + "','" + xml + "')'", conn);
  recordSet.close;
  conn.close;
}

// For importing txt file
function loadFileAsText(event, onLoadFileHandler) {
  var file = document.getElementById('my_file').files[0];
  if (typeof window.FileReader !== 'function')
    throw ("The file API isn't supported on this browser.");
  let input = event.target;
  if (!input)
    throw ("The browser does not properly implement the event object");
  if (!input.files)
    throw ("This browser does not support the `files` property of the file input.");
  if (!input.files[0])
    return undefined;
  // let file = input.files[0];
  file = input.files[0];
  let fr = new FileReader();
  fr.onload = onLoadFileHandler;
  fr.readAsText(file);

  // $('#get_file').click(function() {});
}

function onFileLoad(elementId, event) {
  // console.log("YOLO: ");
  // console.log(event.target.result);
  xml = event.target.result;
  importXML();

}

function importXML() {
  // xml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="F" style="fillColor=#45afe3;shape=ellipse;" vertex="1" parent="1"><mxGeometry x="60" y="60" width="80" height="80" as="geometry"/></mxCell><mxCell id="3" value="S" style="fillColor=#ffa500;shape=hexagon;" vertex="1" parent="1"><mxGeometry x="220" y="200" width="80" height="70" as="geometry"/></mxCell><mxCell id="4" value="consist of" style="curved=1;endArrow=classic;html=1;" edge="1" parent="1" source="2" target="3"><mxGeometry y="7" width="50" height="50" relative="1" as="geometry"><mxPoint x="150" y="100" as="sourcePoint"/><mxPoint x="250" y="100" as="targetPoint"/></mxGeometry></mxCell></root></mxGraphModel>';

  var doc = mxUtils.parseXml(xml);
  var codec = new mxCodec(doc);
  codec.decode(doc.documentElement, graph.getModel());
  orderize();
}

function downloadXML() {
  var encoder = new mxCodec();
  var node = encoder.encode(graph.getModel());
  var dloadname = $('#dwnld-name').val();
  if (dloadname == "") {
    dloadname = "hello";
  }
  // console.log(dloadname);
  download(dloadname + ".xml", mxUtils.getXml(node));
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function viewXML() {
  var encoder = new mxCodec();
  var node = encoder.encode(graph.getModel());
  mxUtils.popup(mxUtils.getPrettyXml(node), true);
  // mxUtils.printScreen(graph);
}

// "url(C:\\Users\\keval\\Desktop\\IDP-ET\\js\\examples\\editors\\images\\grid.gif)"

// function exportFile(format)
// 				{
// 					var bg = '#ffffff';
// 					var scale = 1;
// 					var b = 1;
//
// 					var imgExport = new mxImageExport();
// 					var bounds = graph.getGraphBounds();
// 					var vs = graph.view.scale;
//
// 					// New image export
// 					var xmlDoc = mxUtils.createXmlDocument();
// 					var root = xmlDoc.createElement('output');
// 					xmlDoc.appendChild(root);
//
// 					// Renders graph. Offset will be multiplied with state's scale when painting state.
// 					var xmlCanvas = new mxXmlCanvas2D(root);
// 					xmlCanvas.translate(Math.floor((b / scale - bounds.x) / vs), Math.floor((b / scale - bounds.y) / vs));
// 					xmlCanvas.scale(scale / vs);
//
// 					imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
// 					// Puts request data together
// 					var w = Math.ceil(bounds.width * scale / vs + 2 * b);
// 					var h = Math.ceil(bounds.height * scale / vs + 2 * b);
//
// 					var xml = mxUtils.getXml(root);
//
// 					if (bg != null)
// 					{
// 						bg = '&bg=' + bg;
// 					}
//
// 					new mxXmlRequest('/Export', 'filename=export.' + format + '&format=' + format +
// 	        			bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
// 	        			simulate(document, '_blank');
// 				}



function deleteCells() {
  //graph.getModel().beginUpdate();
  graph.removeCells(graph.getSelectionCells());
  //graph.getModel().endUpdate();
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
  //console.log("Parent ");
  //console.log(parent);

  // Adds a button to execute the layout
  var button = document.getElementById('heirarchical');
  mxUtils.write(button, 'Hierarchical');
  mxEvent.addListener(button, 'click', function(evt) {
    graph.refresh();
    layout.execute(parent);
  });
}

function textSelection(container) {
  console.log("ge");



  console.log("mmn");
}
//Adding Edge
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

//ADDING VERTEX
function addFSBVertex(container, token) {
  //var graph = new mxGraph(container);
  //var parent = graph.getDefaultParent();
  new mxRubberband(graph);
  new mxKeyHandler(graph);

  //graph.setEnabled(false);

  graph.getModel().beginUpdate();
  try {
    if (token == 1) {
      // var v1 = graph.insertVertex(parent, null, "F", x, y, 80, 80,'fillColor=#45afe3;shape=ellipse'); //x,y,width,height
      parent = graph.getDefaultParent();
      var cell = new mxCell('F', new mxGeometry(x, y, 80, 80), 'fillColor=#45afe3;shape=ellipse;');
      cell.vertex = true;
      cell.connectable = true;
      // cell.geometry.relative = true;
      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      y = y + 40;

    } else
    if (token == 2) {
      // var v2 = graph.insertVertex(parent, null, "S", x, y, 80, 70,'fillColor=#ffa500;shape=hexagon'); //x,y,width,height
      parent = graph.getDefaultParent();
      var cell = new mxCell('S', new mxGeometry(x, y, 80, 70), 'fillColor=#ffa500;shape=hexagon;');
      cell.vertex = true;
      cell.connectable = true;
      // cell.geometry.relative = true;
      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      y = y + 40;

    } else {
      // var v3 = graph.insertVertex(parent, null, "B", x, y, 80, 40,'fillColor=#fe5;shape=rectangle'); //x,y,width,height
      parent = graph.getDefaultParent();
      var cell = new mxCell('B', new mxGeometry(x, y, 80, 40), 'fillColor=#fe5;shape=rectangle;');
      cell.vertex = true;
      cell.connectable = true;
      // cell.geometry.relative = true;
      cell = graph.addCell(cell);
      graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
      y = y + 40;

    }
    orderize();
  } catch (e) {

  } finally {
    graph.getModel().endUpdate();
  }
};

// function __Draw() {
//   var encoder = new mxCodec();
//   var result = encoder.encode(graph.getModel());
//   var xml = encodeURIComponent(mxUtils.getXml(result));
//   // var xml = mxUtils.getXml(EditorUi.editor.getGraphXml());
//   // console.log('xml');
// //console.log(xml);
//   mxUtils.popup(mxUtils.getPrettyXml(xml), true);
//   // var doc = mxUtils.createXmlDocument();
// }



function main(container) {
  // if(!mxClient.IS_TOUCH)
  // console.log("Yes");

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

  var graphs = [];
  graph = new mxGraph(container);
  parent = graph.getDefaultParent();
  graph.centerZoom = false;
  graph.setConnectable(true);
  graph.setPanning(true);
  undoManager = new mxUndoManager();
  var listener = function(sender, evt) {
    undoManager.undoableEditHappened(evt.getProperty('edit'));
  };
  graph.getModel().addListener(mxEvent.UNDO, listener);
  graph.getView().addListener(mxEvent.UNDO, listener);

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
    graphs.push(graph);
  }

  // Returns the graph under the mouse
  var graphF = function(evt) {
    var x = mxEvent.getClientX(evt);
    var y = mxEvent.getClientY(evt);
    var elt = document.elementFromPoint(x, y);

    for (var i = 0; i < graphs.length; i++) {
      if (mxUtils.isAncestorNode(graphs[i].container, elt)) {
        return graphs[i];
      }
    }

    return null;
  };

  // Inserts a cell at the given location
  var funct = function(graph, evt, target, x, y) {
    var cell = new mxCell('F', new mxGeometry(x, y, 80, 80), 'fillColor=#45afe3;shape=ellipse;');
    cell.vertex = true;
    var cells = graph.importCells([cell], x, y, target);

    if (cells != null && cells.length > 0) {
      graph.scrollCellToVisible(cells[0]);
      graph.setSelectionCells(cells);
    }
  };
  var funct2 = function(graph, evt, target, x, y) {
    var cell = new mxCell('S', new mxGeometry(x, y, 80, 70), 'fillColor=#ffa500;shape=hexagon;');
    cell.vertex = true;
    var cells = graph.importCells([cell], x, y, target);

    if (cells != null && cells.length > 0) {
      graph.scrollCellToVisible(cells[0]);
      graph.setSelectionCells(cells);
    }
  };
  var funct3 = function(graph, evt, target, x, y) {
    var cell = new mxCell('B', new mxGeometry(x, y, 80, 40), 'fillColor=#fe5;shape=rectangle;');
    cell.vertex = true;
    var cells = graph.importCells([cell], x, y, target);

    if (cells != null && cells.length > 0) {
      graph.scrollCellToVisible(cells[0]);
      graph.setSelectionCells(cells);
    }
  };

  var img = $('.FVer')[0];
  var img2 = $('.SVer')[0];
  var img3 = $('.BVer')[0];
  // document.body.appendChild(img);

  // Creates the element that is being for the actual preview.
  var dragElt = document.createElement('div');
  dragElt.style.border = 'dashed black 1px';
  dragElt.style.width = '80px';
  dragElt.style.height = '80px';

  // Drag source is configured to use dragElt for preview and as drag icon
  // if scalePreview (last) argument is true. Dx and dy are null to force
  // the use of the defaults. Note that dx and dy are only used for the
  // drag icon but not for the preview.
  // var ds = mxUtils.makeDraggable(img, graphF, funct, dragElt, null, null, graph.autoscroll, true);
  // var ds2 = mxUtils.makeDraggable(img2, graphF, funct2, dragElt, null, null, graph.autoscroll, true);
  // var ds3 = mxUtils.makeDraggable(img3, graphF, funct3, dragElt, null, null, graph.autoscroll, true);
  var ds = mxUtils.makeDraggable(img, graphF, funct, dragElt);
  var ds2 = mxUtils.makeDraggable(img2, graphF, funct2, dragElt);
  var ds3 = mxUtils.makeDraggable(img3, graphF, funct3, dragElt);

  // Restores original drag icon while outside of graph
  ds.createDragElement = mxDragSource.prototype.createDragElement;
  ds2.createDragElement = mxDragSource.prototype.createDragElement;
  ds3.createDragElement = mxDragSource.prototype.createDragElement;

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
