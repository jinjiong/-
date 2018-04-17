(function(){
  var user = $("#user");
  var pwd = $("#pwd");
  function loginverify(){
    //loading.open();
    if(user.val()==""||user.val().replace(/\s/g,"")==""){
      loading.close();
      layer.open({
        content:"请输入用户名",
        btn:'确定'
      });
      return;
    }
    if(pwd.val()==""){
      loading.close();
      layer.open({
        content:"请输入密码",
        btn:'确定'
      });
      return;
    }
	
    $.ajax({
      type: "POST",
      url: getAPIURL() + "logininfo",
      dataType: "json",
     // contentType: "application/json",
      data:{
		"perjmcode":"1",
		"username":$.trim(user.val()),
		"userPas":pwd.val(),
		"datatype":"1"
      },
      success:function(data){
		
        if(data.ResultData == 0){
			
          localStorage.setItem("username",user.val());
          localStorage.setItem("userpwd",pwd.val());
          $.ajax({
			  type: "POST",
			  url: getAPIURL() + "readNcByCode",
			  dataType: "json",
			 // contentType: "application/json",
			  data:{
				"perjmcode":"",
				"phone":$.trim(user.val()),
				
			  },
			   success:function(data){
				   var nc=data.Data;
				   localStorage.setItem("nc",nc);
			   }
			   
		  });
          layer.open({
            content: '登录成功'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
            ,end:function(){
              //判断直接从登录页进去，跳到个人中心
              location.href="./index.html";
            }
              
          });
        }else{
			 layer.open({
          content: "用户名或密码错误！",
          btn: '确定'
        });
		}
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        loading.close();
        if(XMLHttpRequest.status == 400) {
          var obj = JSON.parse(XMLHttpRequest.responseText);
          layer.open({
            content:obj.Message,
            btn:'确定'
          });
        }
      }
    });
  }
  $(".login_btn").click(function(){
    loginverify();
  });
  //切换密码的可见状态
  $(".icon_eye").click(function(){
    var arr = this.src.split("/");
    if(arr[arr.length-1]=="bkj.png"){
      this.src = "./img/kj.png";
      $(this).prev().attr("type","text");
    }else{
      this.src = "./img/bkj.png";
      $(this).prev().attr("type","password");
    }

  });

})();