let constraints = { video: { facingMode: "environment" }, audio: false };//environment user
let video = document.querySelector('#video');
let jumpaudio = new Audio('asset/audio/jump.mp3');
let bgaudio = document.getElementById("bg_music");
let arCam = new ARCam("", "");

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
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#cell0").hide();
    $("#cell1").hide();
    $("#main").hide();
    hideMainList();
    
// $("#home_container").hide();
// $("#start").hide();
}

initHide();
 
let initFunc = function () {
    console.log("init func start");
    const videoSetting = {
        width: 480,
        height: 360
    };

    const video = document.querySelector('#video');
    const videoDevice = document.querySelector('#videoDevice');

    const openCamera = (video, deviceId, videoSetting) => {
        arCam.openCamera(video, deviceId, videoSetting)
            .then((msg) => {
                let videoWidth = video.offsetWidth;
                let videoHeight = video.offsetHeight;

                if (window.innerWidth < window.innerHeight) {
                    if (videoHeight < window.innerHeight) {
                        video.setAttribute('height', window.innerHeight.toString() + 'px');
                    }
                } else {
                    if (videoWidth < window.innerWidth) {
                        video.setAttribute('width', window.innerWidth.toString() + 'px');
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    arCam.listCamera(videoDevice)
        .then(() => {
            openCamera(video, videoDevice.value, videoSetting);
            videoDevice.onchange = () => {
                openCamera(video, videoDevice.value, videoSetting);
            };
        })
        .catch((err) => {
            console.info(err);
        });
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
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myid, duration){
    var newq = makeNewPosition();
    $(myid).animate({ top: newq[0], left: newq[1] }, duration,   function(){
      animateDiv(myid, duration);        
    });
    
};


$(".jdb").click(function(){
    console.log("jdb been clicked");
    $("#main").hide();
    $("#picking").show();

    // $("#yg-pick").hide();
    $("#yg-pick").show();
    $("#jdb-pick").show();
});

$(".yg").click(function(){
    console.log("yg been clicked");
    $("#main").hide();
    $("#picking").show();

    $("#yg-pick").show();
    // $("#jdb-pick").hide();
    $("#jdb-pick").show();
});

$(".jdb").attr('background', '').on('load', function(){
console.log("background loaded .....");
});

$("#start").click(function(){
    $(".home_container").hide();
    initFunc();
    $("#main").show();
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
    if(randValue > 30){
        $("#main").hide();
        $("#picking").hide();
        hideMainList();
        $(".picked_container_failed").hide();
        $(".picked_container").show();
        $("#cell0").hide();
        $("#cell1").show();
    }else{
        $("#main").hide();
        $("#picking").hide();
        hideMainList();
        $(".picked_container").hide();
        $(".picked_container_failed").show();
        $("#cell0").show();
        $("#cell1").hide();
    }
});

$("#s_restart").click(function(){
    console.log("restart")
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#picking").hide();
    $("#main").show();
    showMainList();
});

$("#f_restart").click(function(){
    console.log("restart")
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#picking").hide();
    $("#main").show();
    showMainList();
});


$(document).ready(function(){
    $(".home_container").height($(window).height());
});

document.addEventListener('touchstart', function () {
    console.log("touch start");
});




// var colors = ['#f10d00', // Standard ball
// '#a63deb', // Master ball
// '#5baeff', // Great ball
// '#00874b', // Safari ball
// '#505301'];

// // Editable.
// // Ultra ball
// var d = 72; // Diameter.
// var w = 8; // Inner line width.
// var T = 120; // Period, in frames @ 60fps.

// // Computed.
// var r = d / 2; // Radius.
// var r2_max = r / 5; // Max radius of the mid-section.
// var l = r * 2 + w; // Canvas side length.

// // Constants.
// var _Math = Math;
// var abs = _Math.abs;
// var pi = _Math.PI;

// var C_y = 4 / 3; // Simplified from 4/3*tan(θ/4)), since θ=π.
// var _document = document;
// var body = _document.body;

// var bag = document.createElement('div');
// Object.assign(bag.style, {
//   left: '50%',
//   position: 'absolute',
//   top: '50%',
//   transform: 'translate3d(-50%, -50%, 0)',
//   zIndex: 200000
// });

// var team = colors.map(pokeball);
// team.forEach(function (ball) {
//   return bag.appendChild(ball.canvas);
// });
// body.style.background = '#de73cd';
// body.appendChild(bag);

// !function loop(t) {
//   team.forEach(function (_ref, i, _ref2) {
//     var step = _ref.step;
//     var length = _ref2.length;
//     return step((t + i * T / length) % T);
//   });
//   requestAnimationFrame(loop.bind(this, t + 1));
// }(0);

// function pokeball(top) {
//   // Constants.
//   var canvas = document.createElement('canvas');
//   canvas.style.zIndex = "200000";
//   var ctx = canvas.getContext('2d');

//   // Prepare the canvas and clip it to a circle.
//   canvas.width = canvas.height = l;
//   Object.assign(canvas.style, {
//     background: '#f0f0f0',
//     border: w / 2 + 'px solid #f8f8f8',
//     borderRadius: '50%',
//     boxShadow: '2px 4px rgba(34, 34, 36, 0.2)',
//     height: l / 2 + 'px',
//     margin: w + 'px',
//     width: l / 2 + 'px'
//   });
//   ctx.translate(w / 2, w / 2);
//   ctx.beginPath();
//   ctx.lineWidth = w;
//   ctx.arc(r, r, r, 0, 2 * pi);
//   ctx.stroke();
//   ctx.clip();

//   ctx.strokeStyle = '#222224';
//   function step(t) {
//     // t:     0 -------- T/2 -------- T
//     // frame: 0 --------- T --------- 0
//     // y:     bottom --- top --- bottom
//     //     where bottom: 1 - C_y, top: C_y
//     var frame = 2 * (T / 2 - abs(T / 2 - t));
//     var y = 1 - C_y + frame / T * (2 * C_y - 1);

//     ctx.clearRect(0, 0, d, d);
//     ctx.lineWidth = w;

//     // Draw a "circle".
//     ctx.beginPath();
//     ctx.fillStyle = top;
//     ctx.moveTo(-w / 2, r);
//     ctx.bezierCurveTo(-w / 2, y * d, d + w, y * d, d + w, r);
//     ctx.stroke();
//     //ctx.arc(r, r, r, 0, pi, true);
//     ctx.lineTo(d, 0);
//     ctx.lineTo(0, 0);
//     ctx.fill();
//     ctx.closePath();

//     // Draw the center circle.
//     var c = d * y / C_y + r2_max * C_y;
//     var r2 = r2_max * (1 - abs(1 / 2 - y) / 3);
//     var r3 = r2 / 3 * 2;

//     ctx.beginPath();
//     ctx.lineWidth /= 2;
//     ctx.fillStyle = '#f0f0f0';
//     ctx.arc(r, c, r2, 0, 2 * pi);
//     ctx.fill();
//     ctx.stroke();
//     ctx.closePath();

//     ctx.beginPath();
//     ctx.lineWidth /= 2;
//     ctx.arc(r, c, r3, 0, 2 * pi);
//     ctx.stroke();
//     ctx.closePath();
//   };
//   return { canvas: canvas, step: step };
// }