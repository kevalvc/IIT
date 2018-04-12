var x=60,y=60;
var graph;
var parent;
function addFSBVertex(container,token)
{
  //var graph = new mxGraph(container);
  //var parent = graph.getDefaultParent();
  new mxRubberband(graph);
  graph.getModel().beginUpdate();
  try
    {
      if(token==1)
      var v1 = graph.insertVertex(parent, null, "F",x ,y, 80 ,30); //x,y,width,height
      else
        if(token==2)
        var v2 = graph.insertVertex(parent, null, "S",x ,y, 80 ,30); //x,y,width,height
        else {
          var v3 = graph.insertVertex(parent, null, "B",x ,y, 80 ,30); //x,y,width,height
        }

    }
   catch (e) {

  } finally {
    graph.getModel().endUpdate();
  }
};

function main(container)
{
  graph = new mxGraph(container);
  parent = graph.getDefaultParent();
  new mxRubberband(graph);
  if(!mxClient.isBrowserSupported())
  {
    mxUtils.error('Browser Not Supported');
  }
  else {
      graph.getModel().beginUpdate();
      try
        {
          var v1 = graph.insertVertex(parent, null, "F",20 ,20, 80 ,30); //x,y,width,height
          var v2 = graph.insertVertex(parent, null, "S",20 ,120, 80 ,30); //x,y,width,height
          var e1 = graph.insertEdge(parent,null,"joins to", v1,v2);
        }
       catch (e) {

      } finally {
        graph.getModel().endUpdate();
      }
  }
};
