const webAR = new WebAR(1000, 'recognize.php');
 
var canvas = document.getElementById("renderCanvas");

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = new BABYLON.Scene(engine);

BABYLON.Database.IDBStorageEnabled = true;
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 300, BABYLON.Vector3.Zero(), scene);
camera.lowerBetaLimit = 0.1;
camera.upperBetaLimit = (Math.PI / 2) * 0.9;
camera.lowerRadiusLimit = 30;
camera.upperRadiusLimit = 500;
camera.attachControl(canvas, true);
var engine = new BABYLON.Engine(canvas, true);

var initFunc = function () {
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

var audioObj = document.getElementById('bg_audio');
var muted = true;
var musicControllerObj = document.querySelector("#musicController");
var restartObj = document.querySelector("#restartScan");
// var armodeButton = document.querySelector("#armode");
// var viewmodeButton = document.querySelector("#viewmode");

restartObj.style.opacity = 0;

document.addEventListener('touchstart', function () {
    console.log("touch start");
});

// armodeButton.addEventListener('click', () => {
//     //try to switch to ar mode
//         startARmode();
// }, false);

// viewmodeButton.addEventListener('click', () => {
// }, false);

restartObj.addEventListener('click', () => {
    //try to restart scanning    
    startARmode();
}, false);

function startARmode(){

    document.querySelector('#videoDevice').style.display = 'block';
    restartObj.style.opacity = 0;

    console.log("try to continue to recognizing...");
    webAR.stopRecognize();

    webAR.startRecognize((msg) => {
        console.log("message is ", msg);
        recognized = true;
        restartObj.style.opacity = 1;
        document.querySelector('#videoDevice').style.display = 'none';

        webAR.stopRecognize();
    });
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
    engine.resize();
});

initFunc();

startARmode();

BABYLON.SceneLoader.Load("scenes/pro-02/", "scene.babylon", engine, function (newScene) {

    console.log("scene loaded ", newScene);

    newScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    
    newScene.executeWhenReady(function () {


        //newScene.getMaterialByName('soft_page').alpha = 0;

        // Attach camera to canvas inputs
        newScene.activeCamera = camera;
        newScene.beginAnimation(newScene.meshes[0], 0, 106, false, 0.99);

        // Once the scene is loaded, just register a render loop to render it
        console.log("scene run render loop ", newScene);
        engine.runRenderLoop(function() {
            newScene.render();
        });
    });
});