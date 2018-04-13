(function(){
  var username=localStorage.getItem("username");
  var userpwd=localStorage.getItem("userpwd");
	var yue=0;
//  //获取可用余额
  $.ajax({
		type: "POST",
		url: getAPIURL() + "readMemInfoByCode",
		dataType: "json",
		data:{
			"perjmcode":"",
			"username":username
		},
		success: function(data){
			var memInfo=JSON.stringify(data.memInfo);
			var jsonObj=JSON.parse(memInfo);
			var zhye="";
			for(var i=0;i<jsonObj.length;i++){
				zhye+=jsonObj[i].dongtaiSS;
			}
			document.getElementById("zhye").innerHTML =zhye;
			yue=Number(zhye);
		}
	});
  
  //提交步骤
  function submit(){
    $.ajax({
      type: "POST",
      url: getAPIURL()+"dtqbZhuangZ",
      data: {
		  "perjmcode":"",
		  "username":username,
           "zzdusername":$("#zrzh").val(),
		  "jine":$("#txje").val(),
            "jyPas":$("#jymm").val()
	  },
      dataType: 'json',
      
      success: function (data){
        if(data.rtn=="0")
        {
          layer.open({
            content:data.Data
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
            
          });
        }
        else
        {
          layer.open({
            content:data.Data,
            btn:'确定'
          });

        }
      }
      

    });
  }
  
  //点击提现按钮时
  $(".withdraw_btn").click(function(){
    
    if($("#txje").val() ==""){
      layer.open({
        content:"请输入转换金额！",
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
      return false;
    }else if($("#txje").val() >yue){
		layer.open({
        content:"您的余额不足！",
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
      return false;
	}else if($("#zrzh").val() ==""){
		layer.open({
        content:"请输入转出账号！",
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
      return false;
	}else if($("#jymm").val() ==""){
		layer.open({
        content:"请输入交易密码！",
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
      return false;
	}else if($("#jymm").val()!=userpwd){
		layer.open({
        content:"交易密码错误！",
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
      return false;
	}else{
		submit();
	}
   
    
  });
  
  
  
})();