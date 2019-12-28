const webAR = new WebAR(1000, 'recognize.php');
 
var canvas = document.getElementById("renderCanvas");

var sceneChecked;
var sceneLocation = "../../Scenes/";

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

BABYLON.Database.IDBStorageEnabled = false;
BABYLON.SceneLoader.ShowLoadingScreen = false;
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 1, 300, BABYLON.Vector3.Zero(), scene);
camera.lowerBetaLimit = 0.1;
camera.upperBetaLimit = (Math.PI / 2) * 0.9;
camera.lowerRadiusLimit = 30;
camera.upperRadiusLimit = 500;
camera.attachControl(canvas, true);
camera.useAutoRotationBehavior = true;

//Adding a light
var light = new BABYLON.HemisphericLight();

var waterMaterial = new BABYLON.WaterMaterial("water_material", scene);
waterMaterial.bumpTexture = new BABYLON.Texture("asset/images/bump.png", scene); // Set the bump texture

// Water properties
waterMaterial.windForce = 15;
waterMaterial.waveHeight = 0.2;
waterMaterial.windDirection = new BABYLON.Vector2(1, 1);
waterMaterial.waterColor = new BABYLON.Color3(0.0, 0.5, 0.9);
waterMaterial.colorBlendFactor = 0.8;
waterMaterial.bumpHeight = 0.2;
waterMaterial.waveLength = 0.5;

waterMaterial.waveSpeed = 50;
waterMaterial.alpha = 0.8;

// Render loop
var renderFunction = function () {
    // Render scene
    if (scene) {
        if (!sceneChecked) {
            var remaining = scene.getWaitingItemsCount();
            console.log("streaming item ... ", remaining, " reamining ");

            if (remaining === 0) {
                sceneChecked = true;
            }
        }

        if (scene.activeCamera) {
            scene.render();
        }

        // Streams
        if (scene.useDelayedTextureLoading) {
            var waiting = scene.getWaitingItemsCount();
            if (waiting > 0) {
                console.log("waiting ...", waiting);
                status.innerHTML = "Streaming items..." + waiting + " remaining";
            } else {
                console.log("finished loading");
                status.innerHTML = "";
            }
        }
    }
};

// Launch render loop
engine.runRenderLoop(renderFunction);

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

var audioBG = document.getElementById('audio_bg');
var audioContents = document.getElementById('audio_contents');
var audioBirds = document.getElementById('audio_birds');
var contentsTxt = document.getElementById('contents_text');
var muted = true;
var musicControllerObj = document.querySelector("#musicController");
var restartObj = document.querySelector("#restartScan");
// var armodeButton = document.querySelector("#armode");
// var viewmodeButton = document.querySelector("#viewmode");

var loadingUI = document.getElementById('loadingUI');
// loadingUI.classList.remove('sk-wave');
// loadingUI.classList.add('none');

var scanOBJ = document.getElementById('scanIndict');
// var scanGIF = document.getElementById('scanGIF');
// var loadingGIF = document.getElementById('loadingGIF');
// scanGIF.style.opacity = 1;
// loadingGIF.style.opacity = 0;

contentsTxt.classList.remove('fade-in-words');
contentsTxt.classList.add('none');

restartObj.style.opacity = 0;

document.addEventListener('touchstart', function () {
    console.log("touch start");
});

audioBG.addEventListener('play', function () {
    musicControllerObj.src = "asset/images/music.png";
    muted = false;
});

// audioBG.addEventListener('pause', function () {
//     musicControllerObj.src = "asset/images/muted.png";
//     muted = true;
// });

audioContents.addEventListener('pause', function () {
    // musicControllerObj.src = "asset/images/muted.png";
    audioContents.pause();
    audioBG.play();
});

musicControllerObj.addEventListener('click', () => {
    //try to play music
    console.log("bg clicked", muted);
    if (muted) {
        
        audioBirds.pause();
        audioBG.pause();
        audioContents.play();

        contentsTxt.classList.remove('none');
        contentsTxt.classList.remove('fade-in-words');
        contentsTxt.classList.add('fade-in-words');

        musicControllerObj.src = "asset/images/music.png";
        muted = false;
    } else {
        audioBG.pause();
        audioContents.pause();
        audioBirds.pause();

        musicControllerObj.src = "asset/images/muted.png";
        muted = true;
    }
}, false);

restartObj.addEventListener('click', () => {
    //try to restart scanning    
    // startARmode();
    audioBG.pause();
    audioBirds.pause();
    audioContents.play();
    contentsTxt.classList.remove('none');
    contentsTxt.classList.add('fade-in-words');
}, false);

function startARmode(){

    document.querySelector('#videoDevice').style.display = 'block';
    restartObj.style.opacity = 0;

    console.log("try to continue to recognizing...");
    webAR.stopRecognize();

    webAR.startRecognize((msg) => {
        console.log("message is ", msg);
        if(msg.name == "jueju_01"){
            recognized = true;
            
            document.querySelector('#videoDevice').style.display = 'none';
            scanOBJ.style.display = 'none';
            scanOBJ.classList.remove('wrap');
            // scanGIF.style.opacity = 0;
            // loadingGIF.style.opacity = 1;

            loadingUI.classList.remove('none');
            loadingUI.classList.add('sk-wave');

            webAR.stopRecognize();

            

            // BABYLON.SceneLoader.Append("asset/chunyexiyu_ain_gltf/", "scene.gltf", scene, function (newMeshes) {
            BABYLON.SceneLoader.Append("asset/jue_ju_ain_gltf/", "scene.gltf", scene, function (newMeshes) {

                loadingUI.classList.remove('sk-wave');
                loadingUI.classList.add('none');
                // restartObj.style.opacity = 1;
                musicControllerObj.style.opacity = 1;
                // loadingGIF.style.opacity = 0;

                var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 150, 150, 32, scene, false);
                waterMesh.material = waterMaterial;
                waterMesh.position.y = -3;

                newMeshes.meshes.forEach(element => {
                    if(element.id.includes("lambert4") || element.id.includes("lambert17")){
                        waterMaterial.addToRenderList(element);
                    }
                    else{
                        element.renderingGroupId = 1;
                    }
                });
            });
        }
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

// BABYLON.SceneLoader.Load("scenes/pro-02/", "scene.babylon", engine, function (newScene) {

//     console.log("scene loaded ", newScene);

//     musicControllerObj.style.opacity = 1;
//     restartObj.style.opacity = 1;

//     newScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    
//     newScene.executeWhenReady(function () {


//         //newScene.getMaterialByName('soft_page').alpha = 0;

//         // Attach camera to canvas inputs
//         newScene.activeCamera = camera;
//         newScene.beginAnimation(newScene.meshes[0], 0, 106, false, 0.99);

//         // Once the scene is loaded, just register a render loop to render it
//         console.log("scene run render loop ", newScene);
//         engine.runRenderLoop(function() {
//             newScene.render();
//         });
//     });
// });

