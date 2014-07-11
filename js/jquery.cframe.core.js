/*! Copyright Cframe.core
* version 1.0
* liscense MIT
*/

var Cdialog = {
		showMask: true,			//show mask
		isScroll:false,			//auto detect scroll
		zIndex: 1000,				//z-index of the mask
		scrollBar: 0,				//auto calc scrollbar width
		init: function(){
			
				$.ajaxSetup ({cache: false });	//disable ajax cache
				$(window).scrollTop(100);if($(window).scrollTop()){this.isScroll=true;$(window).scrollTop(0);}		//detect scroll
				
				if(this.isScroll){			//calc scrollbar width
					const scrollDiv = document.createElement("div");
					$(scrollDiv).width(100).height(100).css({"overflow-y":"scroll","position":"absolute","top":"-100px"});
					$("body").append(scrollDiv);
					this.scrollBar = 100-scrollDiv.clientWidth;
					$(scrollDiv).remove();
				}
				
				$("<div id='Cmodule'></div>").load("../common/common.html",function(e){$("body").append($(this));$(".Cclose").on("click",function(){$(".Cmask").trigger("click");$(this).parent().slideUp("fast");});Cajax.init();});		//preload module
				},
		show: function(name){		//show module via element id
			var dialog = $("#"+name);
			if(name&&dialog.length){
				if(this.showMask){
					$(window).scrollLeft(0);	//reset scrollLeft value
					var mask = $("<div class=\"Cmask\"></div>");
							mask.css({"background":"#000","opacity":"0.5","filter":"alpha(opacity=50)","zIndex":this.zIndex,"position":"absolute","top":"0","left":"0"})
									.height("100%").width("100%")
									.appendTo($("body")).show().click(function(){
										$(this).fadeOut("fast",function(){$(this).remove();$("html").css("padding-right","0");bar.remove();$("body").css("overflow","auto");});
										dialog.slideUp("fast");
									});
									
					if(this.isScroll){		//fix content offset when isScroll, refer to Qzone
						$("html").css({"padding-right":this.scrollBar+"px"});
						bar = $("<div style='position:fixed;right:0;width:"+this.scrollBar+"px;height:100%;top:0;background:url(../images/bg.jpg) repeat;z-index:"+(this.zIndex-1)+";'></div>");
						$("body").css("overflow","hidden").append(bar);
					}
					dialog.width(dialog.width()).height(dialog.height()).css({"zIndex":this.zIndex+1,"position":this.showMask?"absolute":"fixed","top":"50%","left":"50%","marginTop":-dialog.height()/2+"px","marginLeft":-dialog.width()/2-this.scrollBar/2+"px"})
					dialog.show();
				}	
			}
		}
	}
var Cverify = {
	email: function(data){if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(data))return true; else return false;},
	password:function(data){if(/^[\@A-Za-z0-9\!\#\$\%\^\*\.\~]{6,}$/.test(data))return true; else return false;},
	domain:function(data){if(/^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(data))return true; else return false;}
	}
var Cajax = {
	errorTip:"errorBox" || false,		//set to false for appending an element below the input
	post:function(form){
		var btn = form.children("input[type=submit]");
		var oriText = btn.val();
		var ingText = btn.attr("data-ing");
		var postData=form.serialize();
		btn.css({"opacity":0.5,"cursor":"default"}).val(ingText).attr("disabled","disabled");
		$.ajax({type:'POST',url:form.attr("action"),data:postData}).done(function(d){
			eval(form.attr("ajax"))(d);
		}).always(function(){btn.css({"opacity":1,"cursor":"pointer"}).val(oriText).removeAttr("disabled");});
	},
	init:function(){
		$("form[ajax]").on("submit",function(e){		
			e.preventDefault();
			Cajax.post($(this));
		});
		}
}
var Cothers = {
	getParam:function(name)    
            {   
                    var query=location.search.substring(1);  
                    var pairs=query.split("&");   
                    for(var i=0;i<pairs.length;i++)   
                    {   var pos=pairs[i].indexOf('=');  
                            if(pos==-1)   continue;   
                            if(name==pairs[i].substring(0,pos)) {value=pairs[i].substring(pos+1); return value;}
                    }return undefined;
            },
	opCookie:function(){
                var setCookie= function (name,value) 
                {   var Days = 30; 
                        var exp = new Date(); 
                        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
                        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";} 
                var getCookie=function(name) 
                { 
                        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                        if(arr=document.cookie.match(reg))return unescape(arr[2]); 
                        else return null;}  
                var delCookie=function (name) 
                {   var exp = new Date(); 
                        exp.setTime(exp.getTime() - 1); 
                        var cval=getCookie(name); 
                        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";}
                if(arguments[0]=="get") return getCookie(arguments[1]);
                else if(arguments[0]=="del") return delCookie(arguments[1]);
                else setCookie(arguments[0],arguments[1]);
            },
		
	}
var Cdata ={
				
	}
$(function(){Cdialog.init();Cajax.init();});