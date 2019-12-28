var constraints = { video: { facingMode: "user" }, audio: false };
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

cameraStart();


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

// initFunc();