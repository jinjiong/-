var username=localStorage.getItem("username");
if(username==null && username ==""){
    layer.open({
        content:"请您先登录！",
        btn: '确定'
    });
    location.href="./login.html";
}
/*给单选框或复选框添加样式*/
$(function(){
	var username=localStorage.getItem("username");
			if(username!=""){
				$.ajax({
				type:'POST',
				url:getAPIURL() + 'readShopGwcList',
				data:{
					"perjmcode":"",
					"username":username,
					"pageIndex":"1"
				},
				dateType:'JSON',
				beforeSend:function(){
			    	layer.open({type: 2,content: '加载中...'});
			    },
				success:function(data){
					var ShopList=JSON.stringify(data.shopList);
					var jsonObj = JSON.parse(ShopList);//转换为json对象
					var listStr="";
					console.log(jsonObj.lengt);
					if (jsonObj.length<=0) {
						$('header span,.content,.bottom').hide();
						$('.no-pro').show();
					}else{
						$('header span,.content').show();
						$('.bottom').css('opacity','1');
						for(var i=0;i<jsonObj.length;i++){
							listStr+="<li class='clearfix'><div class='label fl'><label><input type='checkbox' checked=='checked' spid="+jsonObj[i].ID;
							listStr+=" /><img src='./img/c_checkbox_on.png'/></label></div><div class='img fl'><img src='";
							listStr+=jsonObj[i].spImgUrl;
							listStr+="'/></div><div class='text fl'><p class='overflow'>";
							listStr+=jsonObj[i].spName;
							listStr+="</p><p class='clearfix'><span class='fl red'>￥";
							listStr+=jsonObj[i].spScj;
							listStr+="</span><span class='fr'><input type='button'value='-'class='btn1'/><span class='number'>1</span><input type='button' value='+' class='btn2'/></span></p></div></li>";
						}
						document.getElementById("goods_list").innerHTML =listStr;
						total();
						$(".btn2").on("click",add);
						$(".btn1").on("click",jian);
						
					}
					layer.closeAll(2);

				}
				});
			}else{
				layer.open({
                    content:"请您先登录！",
                    btn: '确定'
                  });
				location.href="./login.html";
			}
	total();
/*编辑*/
$("header span").click(function(){
       if ($(this).html()=="删除") {
       	$(this).html("完成");
       	$(".bottom").eq(1).show();
       }else{
       	$(this).html("删除");
       	$(".bottom").eq(1).hide();
       }
       hide();   
});
/*判断有无数据*/
function hide(){
	console.log($("#goods_list li").length);
	if ($("#goods_list li").length==0) {
		$('header span,.content,.bottom').hide();
		$('.no-pro').show();
		return;
	}
}
/*判断有无数据*/
/*计算总钱数*/
function total(){
	setTimeout(function(){
		var S=0;
	    $.each($('.total'), function() {
	    	var $ul_total=$(this).prev('ul').find("input[type='checkbox']");
	    	var s=0;
	        var n1=0;
	    	$.each($(this).prev('ul').find(".number"), function(i) {
	    		console.log('1111');
				if($ul_total.eq(i).attr("checked")=="checked"){
					if ($(this).parent().prev().html().replace("￥","")=='') {
						n1=n1+parseInt($(this).html());
					}else{
						s=s+parseInt($(this).html())*parseInt($(this).parent().prev().html().replace("￥",""));
						n1=n1+parseInt($(this).html());
					}
					
				}
			});
			$(this).children("span").html("￥"+s.toFixed(1));
			$(this).children("number").html(n1);
			S=S+s;
	    });
		$(".bottom span").html(S.toFixed(1));
	},100)
}
/*计算总钱数*/

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
		/*计算总钱数*/
		total();
		/*计算总钱数*/
}

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
$('ul').on('change',"input[type='checkbox']",function(){
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
});
/*点击加一*/
		function add(){
			
			if($(this).next('.number').html()>100){
				$(this).next('.number').html(100);
				$('.alert').show().html('超出库存了！');
				 setTimeout(function(){$('.alert').hide();},2000);
				return false;
			}else
			$(this).prev('.number').html(parseInt($(this).prev('.number').html())+1);
			total();
			/*计算总钱数*/
		}
		/*点击加一*/
		/*点击减一*/
		function jian(){
			if($(this).next('.number').html()-1==0)
				$(this).next('.number').html(0);
			else
				$(this).next('.number').html(parseInt($(this).next('.number').html())-1);	
				/*计算总钱数*/
				total();
				/*计算总钱数*/
		}
		/*点击减一*/
		$(".number").click(function(){
			$('.text1').css({"display":"flex","-webkit-display":"flex"}).attr({'ind':$(this).parents('li').index(),"ind_1":$(this).parents("ul").attr("ind")});
			$('.text1 input[type=number]').val($(this).html());
		})
		$('.text1 input[type="button"]').click(function(){
			if($('.text1 input[type=number]').val()==""){
				$('.alert').show().html('请输入数量！');
				 setTimeout(function(){$('.alert').hide();},2000);
				return false;
			}
			if ($('.text1 input[type=number]').val()>100) {
				$('.alert').show().html('超出库存了！');
				 setTimeout(function(){$('.alert').hide();},2000);
				return false;
			}
			$("ul").eq($('.text1').attr('ind_1')).find(".number").eq($('.text1').attr('ind')).html($('.text1 input[type=number]').val());
			$('.text1').css({"display":"none","-webkit-display":"none"});
			total();
		})
/*结算*/
$('.sett').click(function(){
	setOrder();
	// alert("你应付"+$(this).prev("span").html()+"元钱");
});

function setOrder(){
	// var username=localStorage.getItem("username");
	var Cart =[];
	$.each($('li'), function() {
		if ($(this).find("input[type=checkbox]").attr("checked")=="checked") {
			var spid= $(this).find("input[type=checkbox]").attr("spid");
			var nub =  $(this).find('.number').text();
			var product={};
			product.spID=spid;
			product.spCount=nub;
			Cart.push(product);
		}
	})
	localStorage.setItem('local_cart', JSON.stringify(Cart));
	location.replace('write_order.html');
}
/*结算*/


/*删除*/
$('.delete').click(function(){
	$.each($('li'), function() {
		if ($(this).find("input[type=checkbox]").attr("checked")=="checked") {
			var spid= $(this).find("input[type=checkbox]").attr("spid");
			var username=localStorage.getItem("username");
			$.ajax({
				type:'POST',
				url:getAPIURL() + 'cancelGwcShopByID',
				data:{
					"perjmcode":"",
					"username":username,
					"spID":spid
				},
				dateType:'JSON',
				success:function(data){
					console.log(data);
					if(data.ResultData==0){
						layer.open({
							content: data.Data
						    ,skin: 'msg'
						    ,time: 2 //2秒后自动关闭
						  });
					}else if(data.ResultData==1){
						layer.open({
							title:"温馨提示",
							content:data.Data,
							btn: '确定'
						  });
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
	total();
});
/*删除*/
})

$('#goods_list').on("click"," li .img , li .text .overflow, li .text .red",function(){
	var id =$(this).siblings('.label').find('input').attr('spid');
	location.replace('/list_detail.html?spID='+id);
	console.log(id);

});
