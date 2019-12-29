let constraints = { video: { facingMode: "environment" }, audio: false };//environment user
let video = document.querySelector('#video');
let jumpaudio = new Audio('asset/audio/jump.mp3');
let bgaudio = document.getElementById("bg_music");
let arCam = new ARCam();

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
    $("#main").hide();
    $("#picking").show();

    // $("#yg-pick").hide();
    $("#yg-pick").show();
    $("#jdb-pick").show();
});

$(".yg").click(function(){
    $("#main").hide();
    $("#picking").show();

    $("#yg-pick").show();
    // $("#jdb-pick").hide();
    $("#jdb-pick").show();
});

// $(".jdb").attr('background', '').on('load', function(){
// });

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
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#picking").hide();
    $("#main").show();
    showMainList();
});

$("#f_restart").click(function(){
    $(".picked_container").hide();
    $(".picked_container_failed").hide();
    $("#picking").hide();
    $("#main").show();
    showMainList();
});


$(document).ready(function(){
    $(".home_container").height($(window).height());
});

// document.addEventListener('touchstart', function () {
//     console.log("touch start");
// });