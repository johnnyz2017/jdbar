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

// var audioBG = document.getElementById('audio_bg');
// var audioContents = document.getElementById('audio_contents');
// var audioBirds = document.getElementById('audio_birds');
// var contentsTxt = document.getElementById('contents_text');
// var muted = true;
// var musicControllerObj = document.querySelector("#musicController");
// var restartObj = document.querySelector("#restartScan");
// var armodeButton = document.querySelector("#armode");
// var viewmodeButton = document.querySelector("#viewmode");

// var loadingUI = document.getElementById('loadingUI');
// loadingUI.classList.remove('sk-wave');
// loadingUI.classList.add('none');

// var scanOBJ = document.getElementById('scanIndict');
// var scanGIF = document.getElementById('scanGIF');
// var loadingGIF = document.getElementById('loadingGIF');
// scanGIF.style.opacity = 1;
// loadingGIF.style.opacity = 0;

// contentsTxt.classList.remove('fade-in-words');
// contentsTxt.classList.add('none');

// restartObj.style.opacity = 0;

document.addEventListener('touchstart', function () {
    console.log("touch start");
});

// audioBG.addEventListener('play', function () {
//     musicControllerObj.src = "asset/images/music.png";
//     muted = false;
// });

// audioBG.addEventListener('pause', function () {
//     musicControllerObj.src = "asset/images/muted.png";
//     muted = true;
// });

// d

// musicControllerObj.addEventListener('click', () => {
//     //try to play music
//     console.log("bg clicked", muted);
//     if (muted) {
        
//         // audioBirds.pause();
//         // audioBG.pause();
//         // audioContents.play();

//         contentsTxt.classList.remove('none');
//         contentsTxt.classList.remove('fade-in-words');
//         contentsTxt.classList.add('fade-in-words');

//         musicControllerObj.src = "asset/images/music.png";
//         muted = false;
//     } else {
//         // audioBG.pause();
//         // audioContents.pause();
//         // audioBirds.pause();

//         musicControllerObj.src = "asset/images/muted.png";
//         muted = true;
//     }
// }, false);

// restartObj.addEventListener('click', () => {
//     //try to restart scanning    
//     // startARmode();
//     contentsTxt.classList.remove('none');
//     contentsTxt.classList.add('fade-in-words');
// }, false);

function startARmode(){

    document.querySelector('#videoDevice').style.display = 'block';
    // restartObj.style.opacity = 0;

    console.log("try to continue to recognizing...");
}

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

initFunc();

startARmode();