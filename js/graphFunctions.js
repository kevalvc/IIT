var x = 60,
  y = 60,
  p = 150,
  q = 100;
var graph;
var parent;
var rubberband;
var undoManager;
var xml;
var cells = [];
var index = 0;

main(document.getElementById('mainer'));
// $(window).bind("load", function() {
//   var code_text;
//   var url = 'tempXmlFile.txt';
//    var request = new XMLHttpRequest();
// request.open('GET',url);
// request.responseType = 'text';
//
// request.onload = function() {
//   code_text = request.response;
//   //console.log(code_text);
//   xml = code_text;
//   // console.log(xml);
//   console.log("loaded");
//
//   importXML();
//
// };
//
// request.send();
// importXML();
// });

function swappal() {
  if ($('.og-pal').css('display') == 'none') {
    $(".can-pal").css('display', 'none');
    $(".og-pal").css('display', 'block');

  } else {
    $(".can-pal").css('display', 'block');
    $(".og-pal").css('display', 'none');

  }
}

var typo = 2;

$(document).ready(function() {
  $.ajax({
      url: "database.php/",
      data: 'type='+typo,
    }).done(function(data){
      $('.qn-text').empty().append(" " + data + " ");
  });
})

$('.agent-closer').hover(function() {
  $(this).fadeTo(1,1);
}, function() {
  $(this).fadeTo(1,0);
});
$('.agent-col').hover(function() {
  $('.agent-closer').fadeTo(1,1);
}, function() {
  $('.agent-closer').fadeTo(1,0);
});

function toasterOptions() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2500",
    "extendedTimeOut": "750",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
}

function hidagent() {
  if ($('.main-data').hasClass('col-10')) {
    $('.agent-col').hide();
    $('.main-data').removeClass('col-10').addClass('col-12');
    $('.arrow-left').removeClass('fa-arrow-left').addClass('fa-arrow-right');
  } else {
    $('.agent-col').show();
    $('.main-data').removeClass('col-12').addClass('col-10');
    $('.arrow-left').removeClass('fa-arrow-right').addClass('fa-arrow-left');
  }
}

if (localStorage.getItem("localXMLVal") == "" || localStorage.getItem("localXMLVal") == null) {
  retr();
}

function undoChange() {
  undoManager.undo();
  // loadFromDb();
}

function redoChange() {
  undoManager.redo();
}

// onFormSubmit : sets value of html after retrieval
function retr() {
  // main(document.getElementById('mainer'));
  // console.log("LS"+localStorage.getItem("localXMLVal"));
  var retrievedGraph = ($(".hidden-xml-op").val());
  if (retrievedGraph == "") {
    if (localStorage.getItem("localXMLVal") == "") {
      xml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';
      localStorage.setItem("localXMLVal", xml);
      // console.log("XML1"+xml);
      toasterOptions();
      toastr.error('The username and password do not match.', 'Load Failed!');
      importXML();
    } else if (localStorage.getItem("localXMLVal") == null) {
      xml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';
      // console.log("XML2"+xml);
      importXML();
    } else {
      xml = localStorage.getItem("localXMLVal");
      // console.log("XML3"+xml);
      importXML();
    }
  } else {
    xml = retrievedGraph;
    localStorage.setItem("localXMLVal", xml);
    importXML();
  }
}

function retrieveptr() {
  localStorage.setItem("localXMLVal", "");
}

$('.save-to').on('click', function() {
  if ($('.load-from').hasClass('selected')) {
    deselect2($('.load-from'));
  }
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

$('.load-from').on('click', function() {
  if ($('.save-to').hasClass('selected')) {
    deselect($('.save-to'));
  }
  if ($(this).hasClass('selected')) {
    deselect2($(this));
  } else {
    $(this).addClass('selected');
    $('.pop2').slideFadeToggle();
  }
  return false;
});

$('.closebtn2').on('click', function() {
  deselect2($('.load-from'));
  return false;
});

function deselect2(e) {
  $('.pop2').slideFadeToggle(function() {
    e.removeClass('selected');
  });
}

$.fn.slideFadeToggle = function(easing, callback) {
  return this.animate({
    opacity: 'toggle',
    height: 'toggle'
  }, 'fast', easing, callback);
};

function removeDefaultPops() {
  if ($('.save-to').hasClass('selected')) {
    deselect($('.save-to'));
  }
  if ($('.load-from').hasClass('selected')) {
    deselect2($('.load-from'));
  }
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
  xml = encodeURIComponent(mxUtils.getXml(node));
  $(".hidden-xml-ip")[0].value = (mxUtils.getXml(node));
  localStorage.setItem("localXMLVal", mxUtils.getXml(node));
  mxUtils.popup(mxUtils.getPrettyXml(node), true);
  // mxUtils.printScreen(graph);
}

function XMLSAVE() {
  var encoder = new mxCodec();
  var node = encoder.encode(graph.getModel());
  xml = encodeURIComponent(mxUtils.getXml(node));
  $(".hidden-xml-ip")[0].value = (mxUtils.getXml(node));
  localStorage.setItem("localXMLVal", mxUtils.getXml(node));
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

  // Adds a button to execute the layout
  var button = document.getElementById('heirarchical');
  mxUtils.write(button, 'Hierarchical');
  mxEvent.addListener(button, 'click', function(evt) {
    graph.refresh();
    layout.execute(parent);
  });
}

//Adding Edge
function addFSBEdge(container, token) {
  new mxRubberband(graph);
  new mxKeyHandler(graph);

  graph.getModel().beginUpdate();
  try {
    if (token == 1) {
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
      var style = graph.getStylesheet().getDefaultEdgeStyle();

    } else if (token == 2) {
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
    } else if (token == 3) {
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
    } else if (token == 4) {
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

function AutoSave() {
  graph.addListener(mxEvent.CELLS_MOVED, function() {
    XMLSAVE();
  });
  graph.addListener(mxEvent.CELLS_ADDED, function() {
    XMLSAVE();
  });
  graph.addListener(mxEvent.CELLS_RESIZED, function() {
    XMLSAVE();
  });
  graph.addListener(mxEvent.CELLS_REMOVED, function() {
    XMLSAVE();
  });
  graph.addListener(mxEvent.LABEL_CHANGED, function() {
    XMLSAVE();
  });
  graph.addListener(mxEvent.CELL_CONNECTED, function() {
    XMLSAVE();
  });
  $('#undo-btn').click(function() {
    XMLSAVE();
  });
  $('#redo-btn').click(function() {
    XMLSAVE();
  });
  $('.autolayout-btn').click(function() {
    XMLSAVE();
  });
  // var mgr = new mxAutoSaveManager(graph);
  // mgr.save = function() {
  //   mxLog.show();
  //   mxLog.debug('save');
  //   XMLSAVE();
  // };
}

function main(container) {
  // if(!mxClient.IS_TOUCH)

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
  rubberband = new mxRubberband(graph);
  parent = graph.getDefaultParent();
  graph.centerZoom = false;
  graph.setConnectable(true);
  graph.graphHandler.scaleGrid = true;
  graph.setPanning(true);
  graph.setCellsEditable(false); //so that connectors and vertices cannot be edited
  undoManager = new mxUndoManager();
  var listener = function(sender, evt) {
    undoManager.undoableEditHappened(evt.getProperty('edit'));
  };
  graph.getModel().addListener(mxEvent.UNDO, listener);
  graph.getView().addListener(mxEvent.UNDO, listener);



  // graph.maximumGraphBounds = new mxRectangle(0, 0, parseInt($('.main-ws').width()), parseInt($('.main-ws').height()));
  var style = graph.getStylesheet().getDefaultVertexStyle();

  // Tap and hold on background starts rubberband for multiple selected
  // cells the cell associated with the event is deselected
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
      canvas.style.width = '100%';
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

  (function() {
    // Enables rotation handle
    mxVertexHandler.prototype.rotationEnabled = true;

    // Enables managing of sizers
    mxVertexHandler.prototype.manageSizers = true;

    // Enables live preview
    mxVertexHandler.prototype.livePreview = true;

    // Sets constants for touch style
    mxConstants.HANDLE_SIZE = 16;
    mxConstants.LABEL_HANDLE_SIZE = 7;

    // Larger tolerance and grid for real touch devices
    if (mxClient.IS_TOUCH || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      mxShape.prototype.svgStrokeTolerance = 18;
      mxVertexHandler.prototype.tolerance = 12;
      mxEdgeHandler.prototype.tolerance = 12;
      mxGraph.prototype.tolerance = 12;
    }

    // One finger pans (no rubberband selection) must start regardless of mouse button
    mxPanningHandler.prototype.isPanningTrigger = function(me) {
      var evt = me.getEvent();

      return (me.getState() == null && !mxEvent.isMouseEvent(evt)) ||
        (mxEvent.isPopupTrigger(evt) && (me.getState() == null ||
          mxEvent.isControlDown(evt) || mxEvent.isShiftDown(evt)));
    };

    // Rounded edge and vertex handles
    var touchHandle = new mxImage('css/handle-main.png', 17, 17);
    mxVertexHandler.prototype.handleImage = touchHandle;
    mxEdgeHandler.prototype.handleImage = touchHandle;
    mxOutline.prototype.sizerImage = touchHandle;

    // Pre-fetches touch handle
    new Image().src = touchHandle.src;
    var vertexHandlerInit = mxVertexHandler.prototype.init;
    mxVertexHandler.prototype.init = function() {
      // TODO: Use 4 sizers, move outside of shape
      //this.singleSizer = this.state.width < 30 && this.state.height < 30;
      vertexHandlerInit.apply(this, arguments);

      this.redrawHandles();
    };

    var vertexHandlerHideSizers = mxVertexHandler.prototype.hideSizers;
    mxVertexHandler.prototype.hideSizers = function() {
      vertexHandlerHideSizers.apply(this, arguments);

      if (this.connectorImg != null) {
        this.connectorImg.style.visibility = 'hidden';
      }
    };

    var vertexHandlerReset = mxVertexHandler.prototype.reset;
    mxVertexHandler.prototype.reset = function() {
      vertexHandlerReset.apply(this, arguments);

      if (this.connectorImg != null) {
        this.connectorImg.style.visibility = '';
      }
    };

    var vertexHandlerRedrawHandles = mxVertexHandler.prototype.redrawHandles;
    mxVertexHandler.prototype.redrawHandles = function() {
      vertexHandlerRedrawHandles.apply(this);

      if (this.state != null && this.connectorImg != null) {
        var pt = new mxPoint();
        var s = this.state;

        // Top right for single-sizer
        if (mxVertexHandler.prototype.singleSizer) {
          pt.x = s.x + s.width - this.connectorImg.offsetWidth / 2;
          pt.y = s.y - this.connectorImg.offsetHeight / 2;
        } else {
          pt.x = s.x + s.width + mxConstants.HANDLE_SIZE / 2 + 4 + this.connectorImg.offsetWidth / 2;
          pt.y = s.y + s.height / 2;
        }

        var alpha = mxUtils.toRadians(mxUtils.getValue(s.style, mxConstants.STYLE_ROTATION, 0));

        if (alpha != 0) {
          var cos = Math.cos(alpha);
          var sin = Math.sin(alpha);

          var ct = new mxPoint(s.getCenterX(), s.getCenterY());
          pt = mxUtils.getRotatedPoint(pt, cos, sin, ct);
        }

        this.connectorImg.style.left = (pt.x - this.connectorImg.offsetWidth / 2) + 'px';
        this.connectorImg.style.top = (pt.y - this.connectorImg.offsetHeight / 2) + 'px';
      }
    };

    var vertexHandlerDestroy = mxVertexHandler.prototype.destroy;
    mxVertexHandler.prototype.destroy = function(sender, me) {
      vertexHandlerDestroy.apply(this, arguments);

      if (this.connectorImg != null) {
        this.connectorImg.parentNode.removeChild(this.connectorImg);
        this.connectorImg = null;
      }
    };

  })();

  if (!mxClient.isBrowserSupported()) {
    mxUtils.error('Browser Not Supported');
  } else {
    var doc = mxUtils.createXmlDocument();
    graph.getModel().beginUpdate();
    try {
      //removed default vertex
      // addFSBVertex(container, 1);
    } catch (e) {

    } finally {
      graph.getModel().endUpdate();
    }
    graphs.push(graph);
  }

  // Checks if xml exists
  if (localStorage.getItem("localXMLVal") != "") {
    xml = localStorage.getItem("localXMLVal");
    importXML();
  }

  AutoSave();

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

// function FShape() {
//   mxCylinder.call(this);
// };
//
// mxUtils.extend(FShape, mxCylinder);
//
// FShape.prototype.extrude = 10;
//
// FShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
//   var dy = this.extrude * this.scale;
//   var dx = this.extrude * this.scale;
//
//   if (isForeground) {
//     path.moveTo(0, dy);
//     path.lineTo(w - dx, dy);
//     path.lineTo(w, 0);
//     path.moveTo(w - dx, dy);
//     path.lineTo(w - dx, h);
//   } else {
//     path.moveTo(0, dy);
//     path.lineTo(dx, 0);
//     path.lineTo(w, 0);
//     path.lineTo(w, h - dy);
//     path.lineTo(w - dx, h);
//     path.lineTo(0, h);
//     path.lineTo(0, dy);
//     path.lineTo(dx, 0);
//     path.close();
//   }
// };
// mxCellRenderer.registerShape('box', FShape);
