(function(){
	var username=localStorage.getItem("username");
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
		var newsID=getQueryVariable("newsID");
		  $.ajax({
				type:'POST',
				url:getAPIURL() + 'readNewsInfoByID',
				data:{
					"perjmcode":"",
					"username":username,
					"newsID":newsID
				},
				dateType:'JSON',
						
				success:function(data){
					
						 document.getElementById("news_title").innerHTML = data.newsTittle;
						 document.getElementById("news_text").innerHTML = data.newText;
					
					
				}		
						
		  });
		
  
  
  
})();