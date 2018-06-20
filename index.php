<?php
  session_start();
  if (isset($_SESSION['xmlcontents'])) {
    $xmlval = $_SESSION['xmlcontents'];
  } else {
    $xmlval = "";
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Internship Project 1</title>
  <script src="js/jquery-3.2.1.min.js" charset="utf-8"></script>
  <script src="js/jquery-ui.min.js"></script>
  <script src="js/toastr.min.js"></script>
  <script type="text/javascript">
    mxBasePath = 'src';
  </script>
  <link rel="stylesheet" href="css/toastr.min.css"/>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/index.css">
  <link rel="stylesheet" href="css/hexagon.min.css">
  <link href="https://fonts.googleapis.com/css?family=Raleway:400,500,700|Roboto:400,500,700" rel="stylesheet">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
</head>

<body>
<!-- <body onload="main(document.getElementById('mainer'))"> -->
  <div class="container cont-main">
    <div class="row">
      <div class="col-2 agent-col">
        <div class="agent-img text-center">
        <img src="css/agent.png" alt="" class="agent-sizer" style="border-radius: 50%; margin-bottom: 25px;">
          <br>
          <p class="text-center agent-text">I'm going to give you a tour of the Workspace. Let's get started!</p>
          <input type="submit" class="text-center skip-intro" name="" value="Skip Intro">
        </div>
      </div>
      <div class="col-10 main-data">
        <div class="my-navbar text-center">
          <div class="header-placer">
            <span class="ws-ele" style="float:left;"><h3 class="Workspace">WORKSPACE</h3></span>
          </div>
          <!-- <div class="header-placer">
            <span class="ws-ele"><input type="submit" class="btn btn-info btn-in" name="" onclick="zoomIn()" value="+"></span>
            <span class="ws-ele"><input type="submit" class="btn btn-info btn-out" name="" onclick="zoomOut()"  value="-"></span>
          </div> -->
          <div class="header-placer">
            <span class="ws-ele del-rel" style="float: right;">
              <label for="stuff" class="fa fa-refresh input-icon"></label>
              <input type="submit" class="btn btn-info btn-so delete-btn" name="" onclick="clearAll()" value="Start Over">
            </span>
            <span class="ws-ele del-rel" style="float: right;">
              <label for="stuff" class="fa fa-times input-icon"></label>
              <input type="submit" class="btn btn-info btn-so delete-btn" name="" onclick="deleteCells()" value="Delete">
            </span>
            <span style="float: right;">
              <span class="saver ws-ele"><input type="submit" class="btn btn-info btn-save save-to" name="" onclick="" value="Save"></span>
              <!-- For saving uid & filename -->
              <div class="messagepop pop">
                <form action="process.php" method="post">
                  <p><label for="username" class="modal-label">Your username</label><input type="text" class="form-control" size="30" name="username" id="uname" required/></p>
                  <p><label for="filename" class="modal-label">Your filename</label><input type="text" class="form-control" size="30" name="filename" id="fname" required/></p>
                  <p><input type="submit" class="btn btn-info" value="Store Graph" name="commit" id="get-graph" onclick=""/> or <input type="button" class="btn-info btn closebtn" href="/" value="Cancel"></p>
                  <input type="text" class="hidden-xml-ip" name="content" value="" style="display: none !important;">
                </form>
              </div>
              <span class="saver ws-ele"><input type="submit" class="btn btn-info btn-save load-from" name="" onclick="" value="load"></span>
              <!-- For retrieving uid & filename -->
              <div class="messagepop2 pop2">
                <form action="retrieve.php" method="get" onsubmit="retrieveptr()">
                  <p><label for="username" class="modal-label">Your username</label><input type="text" class="form-control" size="30" name="username" id="uname" required/></p>
                  <p><label for="filename" class="modal-label">Your filename</label><input type="text" class="form-control" size="30" name="filename" id="fname" required/></p>
                  <p><input type="submit" class="btn btn-info" value="Retrieve Graph" name="commit" id="get-graph retrieve-graph" onclick=""/> or <input type="button" class="btn-info btn closebtn2" href="/" value="Cancel"></p>
                  <input type="text" class="hidden-xml-op" name="contented" value="<?php echo ($xmlval); ?>" style="display: none !important;">
                </form>
              </div>
            </span>
          </div>
        </div>
        <!-- <br> -->
        <div class="row ws-data">
          <div class="col-md-12 text-center extra-data">
            <span style="display: inline-block;" class="qn-text">Q1. Hello this is a random question of a minimum of 10 words to be displayed in the text area so please recheck it to adjust!</span>
            <div class="col-md-2 tp-full-left text-center floater og-pal">
              <h4 class="tool-pal">CANVAS PALETTE</h4>
              <br>
              <span class="ws-ele"><input type="submit" class="btn btn-info btn-in" name="" onclick="zoomIn()" value="+"></span>
              <span class="ws-ele"><input type="submit" class="btn btn-info btn-out" name="" onclick="zoomOut()"  value="-"></span>
              <!-- <br> -->
              <span class="saver ws-ele text-center blocker" style=""><input id="heirarchical" type="submit" class="autolayout-btn btn btn-info text-center left-toolbar" name="" onclick="" value="Auto Layout"></span>
              <!-- <br> -->
              <span class="saver ws-ele text-center blocker" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="undoChange()" id="undo-btn" value="Undo"></span>
              <!-- <br> -->
              <span class="saver ws-ele text-center blocker" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="redoChange()" id="redo-btn" value="Redo"></span>
              <!-- <br> -->
              <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="viewXML()" value="View XML"></span>
              <!-- <br> -->
              <!-- <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="downloadXML()" value="Download XML"></span> -->
              <!-- <input type="text" id="dwnld-name" placeholder="Save as" name="" value=""> -->
              <!-- <br> -->
              <span class="saver ws-ele text-center blocker" style=""><input type="submit" class="btn btn-info text-center left-toolbar" id="get_file" name="" onclick="importXML()" value="Import XML"></span>
              <input type="file" id="my_file" onchange='loadFileAsText(event, onFileLoad.bind(this, "contents"))'>
              <div id="customfileupload" class="text-center fileselect">Select a file</div>
              <br>
              <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar swap-btn" name="" onclick="swappal()" value="TOOLS PALETTE"></span>
            </div>
            <div class="col-md-2 tp-full-left text-center floater can-pal">
              <h4 class="tool-pal">TOOLS PALETTE</h4>
              <br>
              <!-- <br> -->
              <span class="saver ws-ele text-center blocker" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="undoChange()" id="undo-btn" value="Undo"></span>
              <!-- <br> -->
              <span class="saver ws-ele text-center blocker" style=""><input type="submit" class="btn btn-info text-center left-toolbar" name="" onclick="redoChange()" id="redo-btn" value="Redo"></span>
              <!-- <br> -->
              <span class="saver ws-ele text-center" style=""><input type="submit" class="btn btn-info text-center left-toolbar swap-btn" name="" onclick="swappal()" value="CANVAS PALETTE"></span>
            </div>
            <div class="col-md-8 main-row floater">
              <div class="main-ws" id="mainer">

                <!-- <span class="element1">You can drag me only within this div.</span> -->
              </div>
            </div>
            <div class="col-md-2 tp-full text-center floater">
              <h4 class="nodes-ws">NODES</h4>
              <br>
              <!-- <div class="circle-xs node-eles" onclick="gencircle()"><span class="f-text">F</span></div> -->
              <img class="FVer" src="css\F.png" style="width:50px;height:50px;" data-toggle="tooltip" data-placement="top" title="Function - It is the high level activities performed by the proposed system. It answers the question 'What all the proposed system does?'" onclick="addFSBVertex(mainer,1)">
              <br>
              <br>
              <!-- <div class="hexagon-xs hexagon-warning node-eles" onclick="genhex()">S</div> -->
              <img class="SVer" src="css\S.png" style="width:50px;height:50px;" data-toggle="tooltip" data-placement="top" title="Structure - The components required for implementing the function. It answers the question 'What are the visible/invisible components required to implement the function?'" onclick="addFSBVertex(mainer,2)">
              <br>
              <br>
              <!-- <div class="rect-xs node-eles" onclick="genrect()">B</div> -->
              <img class="BVer" src="css\B.png" style="width:60px;height:44px;" data-toggle="tooltip" data-placement="top" title="Behaviour - The working of the components together to achieve the function. It answers the question of 'How the components work together to achieve the function?'" onclick="addFSBVertex(mainer,3)">
              <br>
              <br>
              <h4 class="nodes-ws">CONNECTORS</h4>
              <br id="smallbreak">
              <img src="css\arrow1.png" style="width:95px;height:50px;" onclick="addFSBEdge(mainer, 1)">
              <br>
              <img src="css\arrow2.png" style="width:95px;height:50px;" onclick="addFSBEdge(mainer, 2)">
              <br>
              <img src="css\arrow3.png" style="width:95px;height:50px;" onclick="addFSBEdge(mainer, 3)">
              <br>
              <img src="css\arrow4.png" style="width:95px;height:50px;" onclick="addFSBEdge(mainer, 4)">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

<?php
echo " ";
if (isset($_SESSION['repeat'])) {
  if (($_SESSION['repeat']) == 2) {
    echo "  ";
    echo "<script>toastr.error('Please enter a new filename.', 'The filename already exists!');</script>";
    $_SESSION['repeat'] = 0;
  } else if (($_SESSION['repeat']) == 1) {
    echo "  ";
    echo "<script>toastr.success('The graph was successfully saved.', 'Save Successful!');</script>";
    $_SESSION['repeat'] = 0;
  }
}
?>

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
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });
</script>

</html>
