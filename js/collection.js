
/*判断有无数据*/
function hide(){
	if ($(".content").length==0) {
		$(".bottom").hide();
		$(".no").css("display","-webkit-box");
		return;
	}else{
		$(".bottom").eq(0).show();
		$(".no").css("display","none");
	}
}
/*判断有无数据*/
/*判断是否全选*/
function sum(){
	if ($("ul input[checked='checked']").length==$("li").length) {
		$(".bottom input[type=checkbox]").attr("checked","checked");
		$(".bottom input[type=checkbox]").next("img").attr("src","img/c_checkbox_on.png");
	}else{
		$(".bottom input[type=checkbox]").removeAttr("checked");
		$(".bottom input[type=checkbox]").next("img").attr("src","img/c_checkbox_off.png");
	}
}
/*判断是否全选*/
/*给单选框或复选框添加样式*/
function checkbox($this){
	if($this.attr('type')=="checkbox"){
		   if ($this.attr('checked')=="checked") {
		   	$this.removeAttr("checked");
		   	 $this.next('img').attr("src","img/c_checkbox_off.png");
		   }else{
		   	 $this.attr("checked","checked");
		   	$this.next('img').attr("src","img/c_checkbox_on.png");
		   }
		}
		
}
/*给单选框或复选框添加样式*/
$(function(){
	var username=localStorage.getItem("username");
			if(username!=""){
				$.ajax({
				type:'POST',
				url:getAPIURL() + 'readShopScList',
				data:{
					"perjmcode":"",
					"username":username,
					"pageIndex":"1"
				},
				dateType:'JSON',
				
				success:function(data){
				
					var ShopList=JSON.stringify(data.shopList);
					var jsonObj = JSON.parse(ShopList);//转换为json对象
					var listStr="";
					for(var i=0;i<jsonObj.length;i++){
						listStr+="<li class='clearfix'><div class='label fl'><label><input type='checkbox'checked='checked' spid='";
						listStr+=jsonObj[i].ID;
						listStr+="'/><img src='./img/c_checkbox_on.png'/></label></div><div class='img fl'><img src='";
						listStr+=jsonObj[i].spImgUrl;
						listStr+="'/></div><div class='text fl'><p class='overflow'>";
						listStr+=jsonObj[i].spName;
						listStr+="</p><p class='clearfix'><span class='fl red'>￥";
						listStr+=jsonObj[i].spScj;
						listStr+="</span></p></div></li>";
					}
					document.getElementById("goods_list").innerHTML =listStr;
				}
				});
			}else{
				layer.open({
                    content:"请您先登录！",
                    btn: '确定'
                  });
				location.href="./login.html";
			}
			
	
	hide();
	
/*编辑*/
$("header span").click(function(){
       if ($(this).html()=="编辑") {
       	$(this).html("完成");
       	$(".bottom").eq(1).show();
       }else{
       	$(this).html("编辑");
       	$(".bottom").eq(1).hide();
       }
       hide();   
});
/*编辑*/
/*底部全选*/
$('.bottom-label input').change(function(){
		if ($(this).attr("checked")=="checked") {
			$(".con input[type='checkbox']").removeAttr("checked");
			$(".con input[type='checkbox']").next('img').attr("src","img/c_checkbox_off.png");
		}else{
			$(".con input[type='checkbox']").attr("checked","checked");
			$(".con input[type='checkbox']").next('img').attr("src","img/c_checkbox_on.png");
		}
		checkbox($(this));
})
/*底部全选*/
/*子项全选*/
$('.list input').change(function(){
	var $list_input=$(this).parents('.list').next('ul').find('input[type=checkbox]');
		if ($(this).attr("checked")==undefined) {
			$list_input.attr("checked","checked");
			$list_input.next('img').attr("src","img/c_checkbox_on.png");
		}else{
			$list_input.removeAttr("checked");
			$list_input.next('img').attr("src","img/c_checkbox_off.png");
		} 
		checkbox($(this));
		sum();
})
/*子项全选*/
$("ul").on('change',"input[type='checkbox']",function(){
	checkbox($(this));
	var $ul_input=$(this).parents('ul').prev('.list').find('input');
	if($(this).parents('ul').find("input[checked='checked']").length==$(this).parents("ul").children('li').length){	
		$ul_input.attr("checked","checked");
		$ul_input.next('img').attr("src","img/c_checkbox_on.png");
	}else{
		$ul_input.removeAttr("checked");
		$ul_input.next('img').attr("src","img/c_checkbox_off.png");
	} 
	sum();
})

/*结算*/
/*删除*/
$('.delete').click(function(){
	$.each($('li'), function() {
		if ($(this).find("input[type=checkbox]").attr("checked")=="checked") {
			var spid= $(this).find("input[type=checkbox]").attr("spid");
			var username=localStorage.getItem("username");
			$.ajax({
				type:'POST',
				url:getAPIURL() + 'cancelScShopByID',
				data:{
					"perjmcode":"",
					"username":username,
					"spID":spid
				},
				dateType:'JSON',
				
				success:function(data){
				
					if(data.ResultData==0){
						layer.open({
							content:data.Data,
							btn: '确定'
						  });
						 // location.href="./collection.html";
					}else if(data.ResultData==1){
						layer.open({
							content:data.Data,
							btn: '确定'
						  });
						  //location.href="./collection.html";
					}
				}
				});
			
			$(this).remove();
		}
	});
	$('input[type=checkbox]').attr("checked","checked");
	$('input[type=checkbox]').next("img").attr("src","img/c_checkbox_on.png");
	$.each($(".content"), function() {
		if ($(this).find("li").length==0) {
			$(this).remove();
		}
	});
	hide();
	
});
/*删除*/
})
