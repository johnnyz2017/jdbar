// const webAR = new WebAR(1000, 'recognize.php');
 
// var initFunc = function () {
//     console.log("init func start");
//     const videoSetting = {
//         width: 480,
//         height: 360
//     };

//     const video = document.querySelector('#video');
//     const videoDevice = document.querySelector('#videoDevice');

//     const openCamera = (video, deviceId, videoSetting) => {
//         webAR.openCamera(video, deviceId, videoSetting)
//             .then((msg) => {
//                 let videoWidth = video.offsetWidth;
//                 let videoHeight = video.offsetHeight;

//                 if (window.innerWidth < window.innerHeight) {
//                     if (videoHeight < window.innerHeight) {
//                         video.setAttribute('height', window.innerHeight.toString() + 'px');
//                     }
//                 } else {
//                     if (videoWidth < window.innerWidth) {
//                         video.setAttribute('width', window.innerWidth.toString() + 'px');
//                     }
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };

//     webAR.listCamera(videoDevice)
//         .then(() => {
//             openCamera(video, videoDevice.value, videoSetting);
//             videoDevice.onchange = () => {
//                 openCamera(video, videoDevice.value, videoSetting);
//             };
//         })
//         .catch((err) => {
//             console.info(err);
//         });
// };

// initFunc();

var rtc = new RTCUtils(function(){
    rtc.setVisible(true)
});
rtc.init(); 