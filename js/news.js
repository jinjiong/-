(function(){
	var username=localStorage.getItem("username");
	console.log(username);
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
		var keyWord=getQueryVariable("keyWord");
		  $.ajax({
				type:'POST',
				url:getAPIURL() + 'searchNewsByKeyWord',
				data:{
					"perjmcode":"",
					"username":username,
					"pageIndex":"1",
					"keyWord":""
				},
				dateType:'JSON',
						
				success:function(data){
					console.log(data)
					var newsList=JSON.stringify(data.newsList);
					var jsonObj = JSON.parse(newsList);
					var newsStr="";
					for(var i=0;i<jsonObj.length;i++){
						 newsStr+="<li class='item'><div class='question'><a href='./news_detail.html?newsID="+jsonObj[i].id+"'><span>"+jsonObj[i].id+"、"+jsonObj[i].newsTittle+"</span><i class='icon_xl'></i></a></div></li>";
					}
					document.getElementById("news_list").innerHTML = newsStr;
				}		
						
		  });
		}
  
  
  
})();