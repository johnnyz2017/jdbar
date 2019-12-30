var RTCUtils = function(success,fail){ 
    this.videoInputs = []; 
    this.currentVideoInput = undefined;  
    this.isVideoPlaying = false;
    this.currentStream = null;  
    this.currentVideo = null;
    this.success = success;
    this.fail = fail;
    this.initLoad = true;
    this.constraints = {
        audio: false,
        video: {
            facingMode: 'environment',
            deviceId: this.currentVideoInput,
            width: {ideal: 1280}, 
            height: {ideal: 720}
        }
    };
} 

RTCUtils.prototype.init = function(success){
    var scope = this;
    this.setupVideo();
    if(this.checkRTCSupport())
    { 
        this.findCamInputs(
          function(){
              //if not set just use the first as back camera
              if (navigator.userAgent.toLowerCase().indexOf("iphone") < 0) {
                console.log(scope.videoInputs)
                  if(scope.currentVideoInput == null || scope.currentVideoInput == undefined)
                    scope.currentVideoInput = scope.videoInputs[0];
                  scope.constraints.video.deviceId = scope.currentVideoInput ? { exact: scope.currentVideoInput } : undefined; 
              }  
              console.log("loadCameraVideo currentVideoId ",scope.currentVideoInput)
              scope.startStream();
          }
        ); 
       
        window.addEventListener('focus',function(e){
            e.preventDefault();
            if (!scope.isVideoPlaying) {
                scope.layoutVideo();
                scope.isVideoPlaying = true;
            }
            window.removeEventListener('focus', this);
        }); 
    }
    else
    {
        scope.fail && scope.fail();
    }
}; 

RTCUtils.prototype.setupVideo = function(){
    var scope = this;
    this.currentVideo =  document.createElement('video');
    this.currentVideo.id = 'backVideo';
    this.currentVideo.setAttribute('autoplay', '');
    this.currentVideo.setAttribute('muted', '');
    // This is critical for iOS or the video initially goes fullscreen
    this.currentVideo.setAttribute('playsinline', '');
    this.currentVideo.setAttribute('x5-playsinline', '');
    this.currentVideo.setAttribute('webkit-playsinline', '');  
    var style = this.currentVideo.style;
    style.position = 'absolute'; 
    style.overflow = 'hidden';
    style.zIndex = '0';  
    style.display = "none"; 
    document.body.appendChild(this.currentVideo); 
    this.currentVideo.addEventListener('canplay', function () {
        if (!scope.isVideoPlaying) {
            scope.layoutVideo();
            scope.isVideoPlaying = true;
        } 
    });
}


RTCUtils.prototype.checkRTCSupport = function(){ 
    // check API is available
    var isSupport = true;
    if (navigator.mediaDevices === undefined
        || navigator.mediaDevices.enumerateDevices === undefined
        || navigator.mediaDevices.getUserMedia === undefined) {
        console.error("WEBRTC NOT SUPPORT!") 
        isSupport = false; 
    }
     
    var ua = navigator.userAgent.toLowerCase();
    var os = "other";
    var isWechat = false;
    if (/iphone|ipad|ipod/.test(ua)) {
      os = "ios";
    } else if (/android/.test(ua)) {
      os = "android"; 
    }
    if (/micromessenger/.test(ua)) {
      isWechat = true; 
    } 

    return {
      isSupport:isSupport,
      os:os,
      isWechat:isWechat
    };
};

RTCUtils.prototype.findCamInputs=function(callback){
    var scope = this;
    navigator.mediaDevices.enumerateDevices().then(function (devices) {  
        for (var i = devices.length - 1; i >= 0; i--) {
            var isVideo= devices[i].kind === 'videoinput';
            var hasBack = devices[i].label.indexOf("back") !== -1; 
            if (isVideo) {
                scope.videoInputs.push(devices[i].deviceId);
                if(hasBack) scope.currentVideoInput = devices[i].deviceId;
            }
        }
        
        callback && callback();
    });
}



RTCUtils.prototype.startStream = function(){
    var scope = this;
    
    if(this.currentStream)
    {
        this.currentStream.getTracks().forEach(function(track) {
            track.stop();
        });
    } 
    console.log("start stream constraints ",this.constraints); 
    navigator.mediaDevices.getUserMedia(this.constraints).then(function (stream) { 
        scope.currentStream = stream;
        scope.currentVideo.srcObject = stream;   
    }).catch(function (e) { 
        console.log(e);
    });
}
 
RTCUtils.prototype.layoutVideo = function() { 
    var videoW = this.currentVideo.videoWidth;
    var videoH = this.currentVideo.videoHeight;
    var videoRatio = videoW / videoH;

    var windowW = window.innerWidth;
    var windowH =  window.innerHeight;
    var windwoRatio = windowW/windowH;

    var style = this.currentVideo.style;
    if(videoRatio > windwoRatio)
    {
        style.width =  (windowH/videoH  * videoW)+"px";
        style.height = windowH+"px";
        style.top = '0';
        style.left = (-((windowH/videoH  * videoW) - windowW)/2)+"px";
    }
    else{
        style.width =  windowW +"px";
        style.height = (windowW/videoW * videoH)+"px";
        style.left  = '0';
        style.top = (( windowH-(windowW/videoW * videoH))/2)+"px";
    }
    if(this.initLoad) 
    {
      this.success && this.success();
      this.initLoad = false;   
    }
}

RTCUtils.prototype.setVisible= function(flag){
    if(!this.currentVideo) return;
    if(flag)
        this.currentVideo.style.display = ""; 
    else
        this.currentVideo.style.display = "none"; 
}

RTCUtils.prototype.switchCam= function(){ 
    if(this.videoInputs.length>1)
    {
        var currentIdx = this.videoInputs.indexOf(this.currentVideoInput);
        if(currentIdx == 0)
            this.currentVideoInput = this.videoInputs[1];
        else
            this.currentVideoInput = this.videoInputs[0];
        this.constraints.video.deviceId = this.currentVideoInput ? { exact: this.currentVideoInput } : undefined; 
        this.startStream() 
    }
}