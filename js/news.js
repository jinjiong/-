(function(){
	var username=localStorage.getItem("username");
		if(username==""){
			layer.open({
                    content:"请您先登录！",
                    btn: '确定'
                  });
				location.href="./login.html";
		}else{
			setNews();
		}
  
  
  
})();
// 下来加载
var list_loading = false;
$(document).on('scroll', function(){
    if ( ! list_loading ){
        if ($(document).scrollTop() >= $(document).height() - $(window).height()-100) {
            $('.load-box').show();
            setNews();
        }
        
    }
})
var username=localStorage.getItem("username");
function setNews(){
	var nub = $('#news_list').attr('nub');
	list_loading = true;
  	$.ajax({
		type:'POST',
		url:getAPIURL() + 'searchNewsByKeyWord',
		data:{
			"perjmcode":"",
			"username":username,
			"pageIndex":nub,
			"keyWord":""
		},
		dateType:'JSON',
		beforeSend:function(){
            if (parseInt($('#news_list').attr('nub'))==1) {
                layer.open({type: 2,content: '加载中...'});
            }
        },
		success:function(data){
			console.log(data);
			if (data.newsList.length>0) {
                if (data.newsList.length==10) {
                    list_loading = false;
                }else{
                    list_loading=true;
                    $('.load-box').hide();
                    $('.no_data-box').show();
                }
                $('#news_list').attr('nub',parseInt($('#news_list').attr('nub'))+1)
				var newsList=JSON.stringify(data.newsList);
				var jsonObj = JSON.parse(newsList);
				var newsStr="";
				for(var i=0;i<jsonObj.length;i++){
					 newsStr+="<li class='item'><div class='question'><a href='./news_detail.html?newsID="+jsonObj[i].id+"'><span>"+jsonObj[i].id+"、"+jsonObj[i].newsTittle+"</span><i class='icon_xl'></i></a></div></li>";
				}
				$("#news_list").append(newsStr);
			}
			 layer.closeAll(2);
		}		
				
 	 });
}