(function(){
	var username=localStorage.getItem("username");
		if(username==""){
			layer.open({
                    content:"请您先登录！",
                    btn: '确定'
                  });
				location.href="./login.html";
		}else{
			//获取url参数
		function getQueryVariable(variable)
		{
			   var query = window.location.search.substring(1);
			   var vars = query.split("&");
			   for (var i=0;i<vars.length;i++) {
					   var pair = vars[i].split("=");
					   if(pair[0] == variable){return pair[1];}
			   }
			   return(false);
		}
		var goodsCode=getQueryVariable("goodsCode");
		if(goodsCode==false){
			goodsCode：
		}
		alert(goodsCode);
		  $.ajax({
				type:'POST',
				url:getAPIURL() + 'readSpOrderInfoByLs',
				data:{
					"perjmcode":"",
					"username":username,
					"goodsCode":goodsCode
				},
				dateType:'JSON',
						
				success:function(data){
					var kuaidi="<div class='pull-left'>"+data.kdName+"&nbsp;&nbsp;&nbsp;运单编号：</div>"+data.kdCode;
					var sjr="<span class='name'>收货人："+data.UserName+"</span><span class='tel'>"+data.UserPhone+"</span>";
					var shdz="收货地址："+data.UserAddress;
					var spt="<img src='"+data.spImgUrl+"'>";
					var price="￥<span>"+data.zje+"</span>";
					var spCount=data.spCount;
					var spmc=data.spName;
					
					document.getElementById("kuaidi").innerHTML =kuaidi;
					document.getElementById("sjr").innerHTML =sjr;
					document.getElementById("shdz").innerHTML =shdz;
					document.getElementById("spt").innerHTML =spt;
					document.getElementById("price").innerHTML =price;
					document.getElementById("spCount").innerHTML =spCount;
					document.getElementById("spmc").innerHTML =spmc;
				}		
						
		  });
		}
  
  
  
})();