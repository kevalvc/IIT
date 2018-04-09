// $(".element1").draggable({
//   containment: ".main-ws"
// });

function clearAll() {
  $(".new-cir").remove();
  $(".new-hex").remove();
  $(".new-rect").remove();
}

function gencircle() {
  var mainws = document.getElementsByClassName("main-ws")[0];
  var newcir = document.createElement("div");
  newcir.setAttribute('class', 'circle-xs node-eles new-cir');
  // newcir.setAttribute('id', '');
  newcir.innerHTML = '<span class="f-text" onclick="changeText(this)">F</span>';
  mainws.appendChild(newcir);

  $(".new-cir").draggable({
    containment: mainws
    // containment: ".main-ws"
  });
}

function genhex() {
  var mainws = document.getElementsByClassName("main-ws")[0];
  var newhex = document.createElement("div");
  newhex.setAttribute('class', 'hexagon-xs hexagon-warning node-eles new-hex');
  newhex.innerHTML = '<span class="S-text" onclick="changeText(this)">S</span>';
  mainws.appendChild(newhex);

  $(".new-hex").draggable({
    containment: mainws
    // containment: ".main-ws"
  });
}

function genrect() {
  var mainws = document.getElementsByClassName("main-ws")[0];
  var newrect = document.createElement("div");
  newrect.setAttribute('class', 'rect-xs node-eles new-rect text-center');
  newrect.innerHTML = '<span class="B-text" onclick="changeText(this)">B</span>';
  mainws.appendChild(newrect);

  $(".new-rect").draggable({
    containment: mainws
    // containment: ".main-ws"
  });
}

function changeText(s) {
  var ftext = s;
  // ftext.innerHTML =
}
