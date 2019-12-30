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

    webAR.listCamera(videoDevice)
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