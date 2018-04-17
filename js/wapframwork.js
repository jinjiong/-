(function () {
  var userAgent = navigator.userAgent;
  var index = userAgent.indexOf("Android");
  if(index >= 0){
    var androidVersion = parseFloat(userAgent.slice(index+8));
    if(androidVersion<5){
      var html = document.documentElement;
      var hW = html.getBoundingClientRect().width;
      html.style.fontSize = hW / 7.5 + "px";
    }
  }
})();


var request ={
  QueryString : function(val){
    var uri = window.location.search;
    var re = new RegExp("" +val+ "=([^&?]*)", "ig");
    return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
  }
};

//判断是否登录，如果未登录跳转登录页，已登录则可以通过getUIDByJWT().unique_name获取UID
function getUIDByJWT() {
  
  var value = "";
  var str = window.navigator.userAgent;

  //如果是移动设备
  if (str.indexOf("jojojr") != -1) {
    /*是安卓*/
    var  search=window.location.search;
    // alert("search"+search)
    if(search.indexOf("?")!=-1){
      var msg=search.slice(1);
      if(msg.indexOf("&")!=-1){
        var msgArr= msg.split("&");
        for (var i=0;i<msgArr.length;i++){
          var item1=msgArr[i].split("=");
          if(item1[0]=="token"){
            value=item1[1];
          }
        }
      }else {
        var item2=msg.split("=");
        if(item2[0]=="token"){
          value=item2[1];
        }
      }
    }
    if (value == null
      || value == ""
      || value == undefined) {
      layer.open({
        content: "请登录",
        skin: 'msg',
        time: 2,
        end: function () {
          //RainbowBridge.callMethod('JsInvokeJavaScope','jump',{'url':'jojo://user/login'},function(){});
          window.location.href = 'login.html';
        }
      });
      return false;
    }
    else {
      var aftervalue = value.split(".");
      return $.parseJSON($.base64.atob(aftervalue[1], true));
    }
  }
  else {
    value = localStorage.getItem("token");
    if (value == null) {
      layer.open({
        content: "请登录",
        skin: 'msg',
        time: 2,
        end: function () {
          window.location.href = 'login.html';
        }
      });
      setTimeout(function () {
//              location.href = 'login.html?returnurl=' + window.location.href;
        location.href = 'login.html';
      }, 1000);
      return false;
    }
    else {
      var aftervalue = value.split(".");
      return $.parseJSON($.base64.atob(aftervalue[1], true));
    }
  }

}



function getUserName() {
  return localStorage.getItem("username");
}

function Logout() {
  //如果是移动设备
  /*if(device==="app")
   {
   localStorage.clear();
   }
   else
   {
   sessionStorage.clear();
   }*/
  localStorage.clear();
  layer.open({
    content: "已退出",
    skin: 'msg',
    time: 1, //2秒后自动关闭
    end: function () {
      location.href = './login.html';
    }
  });
}
/*
function getTOKEN() {
  return localStorage.getItem("token");
  //如果是移动设备
  if(device==="app")
   {
   return localStorage.getItem("token");
   }
   else
   {
   return sessionStorage.getItem("token");
   }
}
*/
function getAPIURL() {
  return "http://47.52.99.82:9901/api/HXData/";
}

function baseUrl() {
  return ""
}
var getwapURL = "";

function getP2PAPI() {
  return "";
}

//        取得参数
function parseUrl(){
  var url=location.href;
  var i=url.indexOf('?');
  if(i==-1)return;
  var querystr=url.substr(i+1);
  var arr1=querystr.split('&');
  var arr2 = new Object();
  for  (i in arr1){
    var ta=arr1[i].split('=');
    arr2[ta[0]]=ta[1];
  }
  return arr2;
}





function getTICKET() {
  return localStorage.getItem("ticket");
}
function getSHARD() {
  return localStorage.getItem("sharid");
}
function getOPENID() {
  return localStorage.getItem("openid");
}
function getNAME() {
  return localStorage.getItem("nickname");
}



