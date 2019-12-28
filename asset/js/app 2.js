const webAR = new WebAR(1000, 'recognize.php');

const threeHelper = new ThreeHelper();
var rotX = 0;
var rotY = 0;
var rotZ = 0;
var recognized = false;

var useOrbitController = false;

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
var armodeButton = document.querySelector("#armode");
var viewmodeButton = document.querySelector("#viewmode");

restartObj.style.opacity = 0;

document.addEventListener('touchstart', function () {
    console.log("touch start");
});

armodeButton.addEventListener('click', () => {
    //try to switch to ar mode
    if(useOrbitController){
        threeHelper.setControl(ControlType.DEVICEORIENTATION);
        useOrbitController = false;

        addClass(armodeButton, "active");
        removeClass(viewmodeButton, "active");

        startARmode();
    }
}, false);

viewmodeButton.addEventListener('click', () => {
    //try to switch to view mode
    if(!useOrbitController){
        threeHelper.setControl(ControlType.ORBIT);
        useOrbitController = true;

        addClass(viewmodeButton, "active");
        removeClass(armodeButton, "active");

        threeHelper.scene.visible = true;
    }
}, false);

restartObj.addEventListener('click', () => {
    //try to restart scanning    
    startARmode();
}, false);

function startARmode(){
    threeHelper.scene.visible = false;

    document.querySelector('#videoDevice').style.display = 'block';
    restartObj.style.opacity = 0;

    console.log("try to continue to recognizing...");
    webAR.stopRecognize();

    webAR.startRecognize((msg) => {
        console.log("message is ", msg);
        recognized = true;
        restartObj.style.opacity = 1;
        document.querySelector('#videoDevice').style.display = 'none';

        threeHelper.scene.visible = true;
        if(msg.name == "marker1"){
            console.log("marker1, change position");
            threeHelper.objModel.position.y = -2;
            threeHelper.objModel.position.z = 25;
            threeHelper.objModel.position.x = 5;
        }else if(msg.name == "marker2"){
            console.log("marker2, change position");
            threeHelper.objModel.position.y = -5;
            threeHelper.objModel.position.z = 27;
            threeHelper.objModel.position.x = 8;
        }else if(msg.name == "stone"){
            console.log("stone, change position");
            threeHelper.objModel.position.y = -2;
            threeHelper.objModel.position.z = 22;
            threeHelper.objModel.position.x = 8;
        }
        webAR.stopRecognize();
    });
}

threeHelper.scene.visible = false;

// threeHelper.loadOBJ('asset/model/obj/7.mtl', 'asset/model/obj/7.obj', () => {
threeHelper.loadGLTF('asset/model/jue_ju_ain_gltf/scene.gltf', () => {
    console.log("*****************");

    var loadingUI = document.querySelector('#loadingUI');
    loadingUI.style.display = 'none';

    //
    //restartObj.style.opacity = 1;

    initFunc();

    startARmode();

    // threeHelper.scene.visible = true;

    // webAR.startRecognize((msg) => {
	//     console.log("message is ", msg);
    //     recognized = true;
    //     restartObj.style.opacity = 1;
    //     document.querySelector('#videoDevice').style.display = 'none';

    //     threeHelper.scene.visible = true;
    //     if(msg.name == "marker1"){
    //         console.log("marker1, change position");
    //         threeHelper.objModel.position.y = -2;
    //         threeHelper.objModel.position.z = 25;
    //         threeHelper.objModel.position.x = 5;
    //     }else if(msg.name == "marker2"){
    //         console.log("marker2, change position");
    //         threeHelper.objModel.position.y = -5;
    //         threeHelper.objModel.position.z = 27;
    //         threeHelper.objModel.position.x = 8;
    //     }else if(msg.name == "stone"){
    //         console.log("stone, change position");
    //         threeHelper.objModel.position.y = -2;
    //         threeHelper.objModel.position.z = 22;
    //         threeHelper.objModel.position.x = 8;
    //     }
    //     webAR.stopRecognize();
    // });
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