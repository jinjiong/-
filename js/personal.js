(function(){
	var username=localStorage.getItem("username");
	alert("dif");
    $.ajax({
      type: "POST",
      url: getAPIURL() + "readBeseInfoByCode",
      dataType: "json",
      data:{
		  "perjmcode":"",
		  "phone":username
	  },
      success: function (data) {
        alert(data.membaseInfo.UserName);
      }
    });
  

});

  
