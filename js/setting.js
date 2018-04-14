(function(){
	$("#jcgx").click(function(){
    checkgx();
  });
  function checkgx(){
	var uname="";
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
	uname="1";
	// window.location.href = "mobile/index.html";
	} else if (u.indexOf('iPhone') > -1) {//苹果手机
	// window.location.href = "mobile/index.html";
	uname="2";
	}
    
  $.ajax({
    type:"POST",
    url:getAPIURL()+ "appVersionGet",
    dataType: "json",
    data:{
		"perjmcode":"",
		"username":uname
	},
    success:function(data){
      if(data.ResultData==0){
		  layer.open({
			  title:"最新版本："+data.appVersion,
			  content:"更新地址："+data.appUrl,
			  btn:'确定'
			});
	  }else{
		  layer.open({
			  
			  content:"检测更新失败！",
			  btn:'确定'
			});
	  }

    },
    error:function(){
     
    }
    
  })
  }
})();