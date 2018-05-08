<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Internship Project 1</title>
  <script src="js/jquery-3.2.1.min.js" charset="utf-8"></script>
  <script src="js/jquery-ui.min.js"></script>
  <script type="text/javascript">
    mxBasePath = 'src';
  </script>

  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/index.css">
  <link rel="stylesheet" href="css/hexagon.min.css">
  <!-- <link rel="stylesheet" href="css/font-awesome/css/fontawesome-all.css"> -->
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
</head>

<body onload="main(document.getElementById('mainer'))">

  <div class="container cont-main">
    <div class="row">
      <div class="col-md-3 agent-col">
        <div class="agent-img text-center">
          <img src="css/support.png" alt="" height="150" width="150" style="border: 8px solid grey;">
        </div>
        <div>
          <br>
          <p>This is a sample input of the agent's mesasage! <br>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
      </div>
      <div class="col-md-9 main-data">
        <div class="my-navbar text-center">
          <div class="header-placer">
            <span class="saver ws-ele" style="float:left;"><input type="submit" class="btn btn-info btn-save save-to" name="" onclick="" value="Save"></span>
            <!-- For saving uid & filename -->
            <div class="messagepop pop">
              <form action="process.php" method="post">
                <p><label for="username" class="modal-label">Your username</label><input type="text" class="form-control" size="30" name="username" id="uname" required/></p>
                <p><label for="filename" class="modal-label">Your filename</label><input type="text" class="form-control" size="30" name="filename" id="fname" required/></p>
                <p><input type="submit" class="btn btn-info" value="Send Message" name="commit" id="get-graph" onclick=""/> or <input type="button" class="btn-info btn closebtn" href="/" value="Cancel"></p>
                <input type="text" class="hidden-xml-ip" name="content" value="" style="display: none !important;">
              </form>
            </div>
            <span class="saver ws-ele" style="float:left;"><input type="submit" class="btn btn-info btn-save load-from" name="" onclick="" value="load"></span>
            <!-- For retrieving uid & filename -->
            <div class="messagepop2 pop2">
              <form action="retrieve.php" method="get">
                <p><label for="username" class="modal-label">Your username</label><input type="text" class="form-control" size="30" name="username" id="uname" required/></p>
                <p><label for="filename" class="modal-label">Your filename</label><input type="text" class="form-control" size="30" name="filename" id="fname" required/></p>
                <p><input type="submit" class="btn btn-info" value="Retrieve Message" name="commit" id="get-graph" onclick=""/> or <input type="button" class="btn-info btn closebtn2" href="/" value="Cancel"></p>
                <input type="text" class="hidden-xml-ip" name="content" value="" style="display: none !important;">
              </form>
            </div>

            <span class="ws-ele" style="float:left;"><input type="submit" class="btn btn-info btn-in" name="" onclick="zoomIn()" value="+"></span>
            <span class="ws-ele" style="float:left;"><input type="submit" class="btn btn-info btn-out" name="" onclick="zoomOut()"  value="-"></span>
          </div>
          <div class="header-placer">
            <span class="ws-ele text-center"> <h3 class="Workspace text-center">Workspace</h3> </span>
          </div>
          <div class="header-placer">
            <span class="ws-ele" style="float: right;"><input type="submit" class="btn btn-info btn-so" name="" onclick="clearAll()" value="Start Over"></span>
            <span class="ws-ele" style="float: right;"><input type="submit" class="btn btn-info btn-so" name="" onclick="deleteCells()" value="Delete"></span>
          </div>
        </div>
        <br>
        <!-- <br> -->
        <div class="row ws-data">
          <div class="col-md-2 tp-full text-center">
            <h4 class="tool-pal">Tool Palette</h4>
            <br>
            <span class="saver ws-ele text-center" style=""><input id="heirarchical" type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="" value="Auto Layout"></span>
            <br>
            <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="undoChange()" value="Undo"></span>
            <br>
            <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="redoChange()" value="Redo"></span>
            <br>
            <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="viewXML()" value="View XML"></span>
            <br>
            <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="downloadXML()" value="Download XML"></span>
            <input type="text" id="dwnld-name" placeholder="Save as" name="" value="">
            <br>
            <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" id="get_file" name="" onclick="importXML()" value="Import XML"></span>
            <input type="file" id="my_file" onchange='loadFileAsText(event, onFileLoad.bind(this, "contents"))'>
            <div id="customfileupload" class="text-center fileselect">Select a file</div>

          </div>
          <div class="col-md-8 main-row">
            <div class="main-ws" id="mainer">

              <!-- <span class="element1">You can drag me only within this div.</span> -->
            </div>
          </div>
          <div class="col-md-2 tp-full text-center">
            <h4 class="nodes-ws">Nodes</h4>
            <br>
            <!-- <div class="circle-xs node-eles" onclick="gencircle()"><span class="f-text">F</span></div> -->
            <img class="FVer" src="css\F.png" style="width:42px;height:42px;" onclick="addFSBVertex(mainer,1)">
            <br>
            <br>
            <!-- <div class="hexagon-xs hexagon-warning node-eles" onclick="genhex()">S</div> -->
            <img class="SVer" src="css\S.png" style="width:42px;height:42px;" onclick="addFSBVertex(mainer,2)">
            <br>
            <br>
            <!-- <div class="rect-xs node-eles" onclick="genrect()">B</div> -->
            <img class="BVer" src="css\B.png" style="width:48px;height:34px;" onclick="addFSBVertex(mainer,3)">
            <br>
            <br>
            <h4 class="nodes-ws">Connectors</h4>
            <br id="smallbreak">
            <img src="css\arrow1.png" style="width:80px;height:50px;" onclick="addFSBEdge(mainer, 1)">
            <br>
            <img src="css\arrow2.png" style="width:80px;height:50px;" onclick="addFSBEdge(mainer, 2)">
            <br>
            <img src="css\arrow3.png" style="width:80px;height:50px;" onclick="addFSBEdge(mainer, 3)">
            <br>
            <img src="css\arrow4.png" style="width:80px;height:50px;" onclick="addFSBEdge(mainer, 4)">

          </div>
        </div>
      </div>
    </div>
  </div>
</body>

<script type="text/javascript" src="js/mxClient.js"></script>
<script type="text/javascript" src="js/tether.min.js" charset="utf-8"></script>
<!-- <script type="text/javascript" src="js/index.js" charset="utf-8"></script> -->
<script type="text/javascript" src="js/bootstrap.min.js" charset="utf-8"></script>
<script type="text/javascript" src="js/graphFunctions.js"></script>
<script type="text/javascript" src="js/Actions.js"></script>

<script>
  document.getElementById('get_file').onclick = function() {
    document.getElementById('my_file').click();
  };

  $('input[type=file]').change(function(e) {
    $('#customfileupload').html($(this).val());
  });
</script>

</html>