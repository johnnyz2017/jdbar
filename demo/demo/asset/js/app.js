let jumpaudio = new Audio('asset/audio/jump.mp3');
let bgaudio = document.getElementById("bg_music");
// let arCam = new ARCam();
let rtc;

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

    console.log("random value is ", randValue);
    if(randValue < 80){
        $("#pick_contents").text(pickContents[0]);
    }else if(randValue < 90){
        $("#pick_contents").text(pickContents[1]);
    }else{
        $("#pick_contents").text(pickContents[2]);
    }
    $("#main").hide();
    $("#picking").hide();
    hideMainList();
    $(".picked_container_failed").hide();
    $(".picked_container").show();
    $("#cell0").hide();
    $("#cell1").show();
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