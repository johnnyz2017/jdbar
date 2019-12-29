var constraints = { video: { facingMode: "environment" }, audio: false };//environment user
const video = document.querySelector('#video');

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        video.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

// cameraStart();


mainList = [];
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


const webAR = new WebAR(1000, 'recognize.php');
 
var initFunc = function () {
    console.log("init func start");
    const videoSetting = {
        width: 480,
        height: 360
    };

    const video = document.querySelector('#video');
    const videoDevice = document.querySelector('#videoDevice');

    const openCamera = (video, deviceId, videoSetting) => {
        webAR.openCamera(video, deviceId, videoSetting)
            .then((msg) => {
                // 打开摄像头成功
                // 将视频铺满全屏(简单处理)
                let videoWidth = video.offsetWidth;
                let videoHeight = video.offsetHeight;

                if (window.innerWidth < window.innerHeight) {
                    // 竖屏
                    if (videoHeight < window.innerHeight) {
                        video.setAttribute('height', window.innerHeight.toString() + 'px');
                    }
                } else {
                    // 横屏
                    if (videoWidth < window.innerWidth) {
                        video.setAttribute('width', window.innerWidth.toString() + 'px');
                    }
                }
            })
            .catch((err) => {
                console.log("##################"); //here
                console.error(err);
            });
    };

    // 列出视频设备
    webAR.listCamera(videoDevice)
        .then(() => {
            openCamera(video, videoDevice.value, videoSetting);
            videoDevice.onchange = () => {
                openCamera(video, videoDevice.value, videoSetting);
            };
        })
        .catch((err) => {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$");
            console.info(err);
        });
};


document.addEventListener('touchstart', function () {
    console.log("touch start");
});

function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
  }
   
  function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
    }
  }
   
  function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }


  // Resize
window.addEventListener("resize", function () {
    console.log("window resize");
});



// document.getElementById("jdb01").onclick = function s(){
//     console.log("jdb01 been clicked");
// }


$(document).ready(function(){
    animateDiv('#jdb01', 2000);
    animateDiv('#yg01', 3000);
    animateDiv('#jdb02', 5000);
    animateDiv('#yg02', 3000);
    animateDiv('#jdb03', 1000);
    animateDiv('#yg03', 2000);

    console.log("set its height to", $(window).height());
    $(".home_container").height($(window).height());
});

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

    $("#yg-pick").hide();
    $("#jdb-pick").show();
});

$(".yg").click(function(){
    console.log("yg been clicked");
    $("#main").hide();
    $("#picking").show();

    $("#yg-pick").show();
    $("#jdb-pick").hide();
});

$(".jdb").attr('background', '').on('load', function(){
console.log("background loaded .....");
});

$("#start").click(function(){
    $(".home_container").hide();
    initFunc();
    $("#main").show();
    showMainList();
});

$("#picking").hide();
$(".picked_container").hide();
$("#main").hide();
hideMainList();

$("#ball-pick").click(function(){
    $(".picked_container").show();
    $("#main").hide();
    hideMainList();
});

$("#restart").click(function(){
    $(".picked_container").hide();
    $("#picking").hide();
    $("#main").show();
    showMainList();
});


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