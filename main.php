<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>CASA</title>
    <script src="js/jquery-3.2.1.min.js" charset="utf-8"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/toastr.min.js"></script>
    <link rel="stylesheet" href="css/toastr.min.css"/>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,500,700|Roboto:400,500,700" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
  </head>
  <body>

    <div class="container cont">
      <div class="inner-data">
        <h1 class="h1-header">Solo-Team-Solo</h1>
        <hr class="bor-wid">
        <ul>
          <li>Orchestration: Solo-Team-Solo</li>
          <li>Solo: (time constrained activity)</li>
          <ul>
            <li>refining the problem and solution using the mixed strategy of breadth and depth</li>
            <li>identify the FSB nodes</li>
            <li>link the different nodes</li>
          </ul>
          <li>At the end of this step the participant would have created the 'first version of FSB (FR) tree'</li>
          <li>This version of the system is intended for the above objective</li>
        </ul>
        <input type="submit" class="next-btn" name="Next" value=" Next >">
      </div>
      <div class="form-group-1 text-center">
        <input type="submit" class="btn skintro" name="skip-intro" value="Skip Intro">
      </div>

    <div class="inner-data-2">
      <div class="row">
        <div class="col-5">
          <img src="css/agenteclipse.png" height="150" width="150" alt="" style="position: absolute;left: -2px;top: 80px;}">
          <img src="css/casa.png" height="320" width="115" alt="" style="position: relative;">
        </div>
        <div class="col-7">
          <div class="text-center casa-text">
            <div>Hello, Welcome to</div>
            <div>&lt; AppName &gt;</div>
            <div>I am <span style="color: grey;">'Casa'</span></div>
          </div>
        </div>
      </div>
      <input type="submit" class="next-btn-2" name="Next2" value=" Next >">
    </div>
    <div class="form-group-2 text-center">
      <input type="submit" class="btn skintro" name="skip-intro" value="Skip Intro">
    </div>

    <div class="inner-data-3">
      <div class="row">
        <div class="col-5">
          <img src="css/agenteclipse.png" height="150" width="150" alt="" style="position: absolute;left: -2px;top: 80px;}">
          <img src="css/casa.png" height="320" width="115" alt="" style="position: relative;">
        </div>
        <div class="col-7">
          <div class="text-center casa-text">
            <div>We will work together</div>
            <div>to create a conceptual</div>
            <div>design of a software</div>
          </div>
        </div>
      </div>
      <input type="submit" class="next-btn-3" name="Next3" value=" Next >">
    </div>
    <div class="form-group-3 text-center">
      <input type="submit" class="btn skintro" name="skip-intro" value="Skip Intro">
    </div>

    <div class="inner-data-4">
      <div class="row">
        <div class="col-5">
          <img src="css/agenteclipse.png" height="150" width="150" alt="" style="position: absolute;left: -2px;top: 80px;}">
          <img src="css/casa.png" height="320" width="115" alt="" style="position: relative;">
        </div>
        <div class="col-7">
          <div class="text-center casa-text" style="margin-top: 0;">
            <div class="row">choose your profile</div>
            <hr class="bor-wid">
            <div class="layers">
            <span class="col-4 img-text">
              <img src="css/Layer2.png" alt="" height="55" width="55">
              <span class="caption">abc</span>
            </span>
            <span class="col-4 img-text">
              <img src="css/Layer2.png" alt="" height="55" width="55">
              <span class="caption">def</span>
            </span>
            <span class="col-4 img-text">
              <img src="css/Layer2.png" alt="" height="55" width="55">
              <span class="caption">ghi</span>
            </span>
          </div>
            <br>
            <div class="row">New profile?</div>
            <hr class="bor-wid">
            <input type="text" class="new-profile" name="" value="" placeholder="type your name">
          </div>
        </div>
      </div>
      <input type="submit" class="next-btn-4" name="Next4" value=" Next >">
    </div>
    <div class="form-group-4 text-center">
      <input type="submit" class="btn skintro" name="skip-intro" value="Skip Intro">
    </div>

    <div class="inner-data-5">
      <div class="row">
        <div class="col-5">
          <img src="css/agenteclipse.png" height="150" width="150" alt="" style="position: absolute;left: -2px;top: 80px;}">
          <img src="css/casa.png" height="320" width="115" alt="" style="position: relative;">
        </div>
        <div class="col-7">
          <div class="text-center casa-text" style="margin-top: 0; font-size: 17px;">
            <div class="row final-pg">"Username" pick any one of the problems to create conceptual design</div>
            <div class="layers">
            <span class="col-4 img-text">
              <img src="css/fingerprint.png" alt="" height="75" width="75">
            </span>
            <span class="col-4 img-text">
              <img src="css/musicplayer.png" alt="" height="75" width="75">
            </span>
            <span class="col-4 img-text">
              <img src="css/recipe.png" alt="" height="75" width="75">
            </span>
          </div>
          </div>
        </div>
      </div>
      <input type="submit" class="next-btn-5" name="Next5" value=" Next >">
    </div>
    <div class="form-group-5 text-center">
      <input type="submit" class="btn skintro" name="skip-intro" value="Skip Intro">
    </div>

  </div>
  </body>
  <script type="text/javascript">
  $("input[name='Next']").click(function() {
    $('.inner-data').hide();
    $('.form-group-1').hide();
    $('.inner-data-2').show();
    $('.form-group-2').show();
  });
  $(".next-btn-2").click(function() {
    $('.inner-data-3').show();
    $('.form-group-3').show();
    $('.inner-data-2').hide();
    $('.form-group-2').hide();
  });
  $(".next-btn-3").click(function() {
    $('.inner-data-4').show();
    $('.form-group-4').show();
    $('.inner-data-3').hide();
    $('.form-group-3').hide();
  });
  $(".next-btn-4").click(function() {
    $('.inner-data-5').show();
    $('.form-group-5').show();
    $('.inner-data-4').hide();
    $('.form-group-4').hide();
  });
  $(".next-btn-5").click(function() {
    window.location ='http://localhost:8080/IDP-ET/index.php';
  });
  </script>
</html>
