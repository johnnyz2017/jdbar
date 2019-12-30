let jumpaudio = new Audio('asset/audio/jump.mp3');
let bgaudio = document.getElementById("bg_music");
let rtc;

let imageNumbers = 0;

let ygSpriteImage = new Image();
ygSpriteImage.src = "asset/images/yg-sprites.png";
ygSpriteImage.onload = function(){
    imageNumbers++;
    console.log("yg sprite loaded", imageNumbers);
    $(".yg").css("background", "url(asset/images/yg-sprites.png)");
    $(".yg_p").css("background", "url(asset/images/yg-sprites.png)");
};

let jdbSpriteImage = new Image();
jdbSpriteImage.src = "asset/images/jdb-sprites.png";
jdbSpriteImage.onload = function(){
    imageNumbers++;
    console.log("jdb sprite loaded", imageNumbers);
    $(".jdb").css("background", "url(asset/images/jdb-sprites.png)");
    $(".jdb_p").css("background", "url(asset/images/jdb-sprites.png)");
};

let homeBGImage = new Image();
homeBGImage.src = "asset/images/others/home_bg.png";
homeBGImage.onload = function(){
    imageNumbers++;
    console.log("home bg loaded", imageNumbers);
    $(".home_container").css("background-image", "url(asset/images/others/home_bg.png)");
};

let ballSpriteImage = new Image();
ballSpriteImage.src = "asset/images/ball-sprites.png";
ballSpriteImage.onload = function(){
    imageNumbers++;
    console.log("ball sprite loaded", imageNumbers);
    $(".ball").css("background-image", "url(asset/images/ball-sprites.png)");
};

let pickContents=[
"片仔癀牙膏小样35g 一支",
"加多宝产品310mL",
"预防上火，天生一对Cp礼盒"
];

let mainList = [];
mainList.push($("#jdb01"));
mainList.push($("#yg02"));
mainList.push($("#jdb02"));
mainList.push($("#yg03"));
mainList.push($("#jdb03"));
mainList.push($("#yg01"));

function hideMainList(){
    for(i=0; i< 6; i++){
        mainList[i].hide();
    }
}

function initHide(){
    $("#picking").hide();
    $("#hintPick").hide();
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#main").hide();
    $("#hintMain").hide();
    hideMainList();
    
    $("#cell0").css('opacity', '0');
    $(".home_container").hide();
    $("#start").hide();

    $("#cell0").css('opacity', '0');
    $(".sucess_contents").css('opacity', '0');
}
initHide();
 
let initFunc = function () {
    rtc = new RTCUtils(function(){
        rtc.setVisible(true)
    });
    rtc.init(); 
};


function showMainList(){
    let timesRun = 0;
    mainList[0].show();
    let interval = setInterval(function(){
        
        timesRun += 1;
        if(timesRun === 6){
        clearInterval(interval);
        }else{
            mainList[timesRun].show();
        }
    }, 2000);
}

function makeNewPosition(){
    let h = $(window).height() - 50;
    let w = $(window).width() - 50;
    
    let nh = Math.floor(Math.random() * h);
    let nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myid, duration){
    var newq = makeNewPosition();
    $(myid).animate({ top: newq[0], left: newq[1] }, duration,   function(){
      animateDiv(myid, duration);        
    });
    
};


$(".jdb").click(function(){
    $("#main").hide();
    $("#hintMain").hide();
    $("#picking").show();
    $("#hintPick").show();

    // $("#yg-pick").hide();
    $("#yg-pick").show();
    $("#jdb-pick").show();
});

$(".yg").click(function(){
    $("#main").hide();
    $("#hintMain").hide();
    $("#picking").show();
    $("#hintPick").show();

    $("#yg-pick").show();
    // $("#jdb-pick").hide();
    $("#jdb-pick").show();
});

// initFunc();

$("#start").click(function(){
    $(".home_container").hide();
    initFunc();
    $("#main").show();
    $("#hintMain").show();
    showMainList();
    bgaudio.play();

    animateDiv('#jdb01', 2000);
    animateDiv('#yg01', 3000);
    animateDiv('#jdb02', 5000);
    animateDiv('#yg02', 3000);
    animateDiv('#jdb03', 1000);
    animateDiv('#yg03', 2000);
});

$("#ball-pick").click(function(){
    jumpaudio.play();

    let randValue = Math.random() * 100;

    if(randValue < 80){
        $("#pick_contents").text(pickContents[0]);
    }else if(randValue < 90){
        $("#pick_contents").text(pickContents[1]);
    }else{
        $("#pick_contents").text(pickContents[2]);
    }
    $("#main").hide();
    $("#hintMain").hide();
    $("#picking").hide();
    $("#hintPick").hide();
    hideMainList();
    $(".picked_container_failed").hide();
    $(".picked_container").show();

    $("#cell0").css('opacity', '0');
    $("#cell1").css('opacity', '1');
});

$("#s_restart").click(function(){
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#cell0").css('opacity', '0');
    $("#cell1").css('opacity', '0');
    $("#picking").hide();
    $("#hintPick").hide();
    $("#main").show();
    $("#hintMain").show();
    showMainList();
});

$("#f_restart").click(function(){
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#cell0").css('opacity', '0');
    $("#cell1").css('opacity', '0');
    $("#picking").hide();
    $("#hintPick").hide();
    $("#main").show();
    $("#hintMain").show();
    showMainList();
});

$(document).ready(function(){
    $(".home_container").height($(window).height());
});

var colors = ['#f10d00', // Standard ball
'#a63deb', // Master ball
'#5baeff'];

var d = 72; // Diameter.
var w = 8; // Inner line width.
var T = 120; // Period, in frames @ 60fps.

var r = d / 2; // Radius.
var r2_max = r / 5; // Max radius of the mid-section.
var l = r * 2 + w; // Canvas side length.

var _Math = Math;
var abs = _Math.abs;
var pi = _Math.PI;

var C_y = 4 / 3; // Simplified from 4/3*tan(θ/4)), since θ=π.
var _document = document;
var body = _document.body;

var bag = document.createElement('div');
Object.assign(bag.style, {
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate3d(-50%, -50%, 0)',
  zIndex: 200000
});

var team = colors.map(pokeball);
team.forEach(function (ball) {
  return bag.appendChild(ball.canvas);
});
body.appendChild(bag);

!function loop(t) {
  team.forEach(function (_ref, i, _ref2) {
    var step = _ref.step;
    var length = _ref2.length;
    return step((t + i * T / length) % T);
  });
  requestAnimationFrame(loop.bind(this, t + 1));
}(0);

let loadingInterval = setInterval(function(){
    if(imageNumbers == 4){
        clearInterval(loadingInterval);
        bag.style.display = "none";
        $(".home_container").show();
        $("#start").show();
    }
}, 500);

function pokeball(top) {
  var canvas = document.createElement('canvas');
  canvas.style.zIndex = "200000";
  var ctx = canvas.getContext('2d');

  canvas.width = canvas.height = l;
  Object.assign(canvas.style, {
    background: '#f0f0f0',
    border: w / 2 + 'px solid #f8f8f8',
    borderRadius: '50%',
    boxShadow: '2px 4px rgba(34, 34, 36, 0.2)',
    height: l / 2 + 'px',
    margin: w + 'px',
    width: l / 2 + 'px'
  });
  ctx.translate(w / 2, w / 2);
  ctx.beginPath();
  ctx.lineWidth = w;
  ctx.arc(r, r, r, 0, 2 * pi);
  ctx.stroke();
  ctx.clip();

  ctx.strokeStyle = '#222224';
  function step(t) {
    var frame = 2 * (T / 2 - abs(T / 2 - t));
    var y = 1 - C_y + frame / T * (2 * C_y - 1);

    ctx.clearRect(0, 0, d, d);
    ctx.lineWidth = w;

    ctx.beginPath();
    ctx.fillStyle = top;
    ctx.moveTo(-w / 2, r);
    ctx.bezierCurveTo(-w / 2, y * d, d + w, y * d, d + w, r);
    ctx.stroke();
    ctx.lineTo(d, 0);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.closePath();

    var c = d * y / C_y + r2_max * C_y;
    var r2 = r2_max * (1 - abs(1 / 2 - y) / 3);
    var r3 = r2 / 3 * 2;

    ctx.beginPath();
    ctx.lineWidth /= 2;
    ctx.fillStyle = '#f0f0f0';
    ctx.arc(r, c, r2, 0, 2 * pi);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth /= 2;
    ctx.arc(r, c, r3, 0, 2 * pi);
    ctx.stroke();
    ctx.closePath();
  };
  return { canvas: canvas, step: step };
}