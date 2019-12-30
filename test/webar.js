const WebAR = function (interval, recognizeUrl) {
    var interval = interval;
    var recognizeUrl = recognizeUrl;

    var videoSetting = {
        width: 320,
        height: 240
    };
    var videoElement = null;
    var videoDeviceElement = null;

    var canvasElement = null;
    var canvasContext = null;

    var debug = document.createElement('div');
    debug.setAttribute('id', 'debug');
    debug.setAttribute('width', (window.innerWidth / 2).toString());
    debug.setAttribute('height', window.innerHeight.toString());
    document.body.appendChild(debug);

    this.listCamera = function (videoDevice) {
        videoDeviceElement = videoDevice;

        return new Promise((resolve, reject) => {
            navigator.mediaDevices.enumerateDevices()
                .then((devices) => {
                    devices.reverse().find((device) => {
                        if (device.kind === 'videoinput') {
                            console.log("input video device", device);
                            const option = document.createElement('option');
                            option.text = device.label || 'camera ' + (videoDeviceElement.length + 1).toString();
                            option.value = device.deviceId;

                            videoDeviceElement.appendChild(option);
                        }
                    });

                    if (videoDeviceElement.length === 0) {
                        reject('没有摄像头');
                    } else {
                        videoDeviceElement.style.display = 'inline-block';
                        canvasElement = document.createElement('canvas');
                        canvasContext = canvasElement.getContext('2d');

                        resolve(true);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    this.openCamera = function (video, deviceId, setting) {
        console.log("open camera", video, deviceId, setting);
        videoElement = video;
        if (setting) {
            videoSetting = setting;
        }

        const constraints = {
            audio: false,
            video: {
                deviceId: {
                    facingMode: 'environment',
                    exact: deviceId
                }
            }
        };

        canvasElement.setAttribute('width', videoSetting.width + 'px');
        canvasElement.setAttribute('height', videoSetting.height + 'px');

        if (videoElement.srcObject) {
            videoElement.srcObject.getTracks().forEach((track) => {
                track.stop();
            });
        }

        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    videoElement.srcObject = stream;
                    videoElement.style.display = 'block';
                    videoElement.onloadedmetadata = function () {
                        resolve(true);
                    };
                    videoElement.play();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    this.captureVideo = function () {
        canvasContext.drawImage(videoElement, 0, 0, videoSetting.width, videoSetting.height);
        return canvasElement.toDataURL('image/jpeg', 0.5).split('base64,')[1];
    };
};