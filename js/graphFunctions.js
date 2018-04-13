var x = 60,
  y = 60;
var graph;
var parent;

// "url(C:\\Users\\keval\\Desktop\\IDP-ET\\js\\examples\\editors\\images\\grid.gif)"

function deleteCells() {
  graph.removeCells(graph.getSelectionCells());
}

function clearAll() {
  graph.removeCells(graph.getChildVertices(graph.getDefaultParent()));
}

function addFSBVertex(container, token) {
  //var graph = new mxGraph(container);
  //var parent = graph.getDefaultParent();
  new mxRubberband(graph);
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
  } catch (e) {

  } finally {
    graph.getModel().endUpdate();
  }
};

function main(container) {
  graph = new mxGraph(container);
  parent = graph.getDefaultParent();
  new mxRubberband(graph);
  //graph.maximumGraphBounds = new mxRectangle(0, 0, parseInt($('.main-ws').width()), parseInt($('.main-ws').height()));
  var style = graph.getStylesheet().getDefaultVertexStyle();
  //graph.setEnabled(false);
  // var style = graph.getStylesheet().getDefaultVertexStyle();
  //   style[mxConstants.STYLE_SHAPE] = 'box';
  //   style[mxConstants.STYLE_SPACING_TOP] = FShape.prototype.extrude;
  //   style[mxConstants.STYLE_SPACING_RIGHT] = FShape.prototype.extrude;
  //   style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';


  if (!mxClient.isBrowserSupported()) {
    mxUtils.error('Browser Not Supported');
  } else {
    graph.getModel().beginUpdate();
    try {
      var v1 = graph.insertVertex(parent, null, "F", 20, 20, 80, 30); //x,y,width,height
      var v2 = graph.insertVertex(parent, null, "S", 20, 120, 80, 30); //x,y,width,height
      var e1 = graph.insertEdge(parent, null, "joins to", v1, v2);
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
