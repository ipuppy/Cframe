/*! Copyright Cframe.ui
* version 1.0
* liscense MIT
*/

var Cui={
    init:function(){
       Array.prototype.in_array = function(e){var j=0;for(var i=0;i<this.length;i++){for(var k=0;k<e.length&&this[i]!=e[k];k++);if(k!=e.length)j++;}return j==this.length;}
			 Array.prototype.uniq = function(){for(var i=0;i<this.length;i++)for(var j=0;j<this.length;j++)if(this[i]==this[j]&&i!=j)this.splice(j,1);return this;}
			 String.prototype.reverse=function(){return this.split("").reverse().join("")}

       $(function(){
				 
            $(".selectbox>div").click(function(){$(this).siblings("ul").slideToggle("fast");});
						$(".selectbox").mouseleave(function(){$(this).children("ul").slideUp();})
						$(".selectbox>ul>li").click(Cui.selectBox);
						
						$(".check-box span").bind("click", Cui.checkBox);
						
						$(".input-box>span").click(function(){$(this).siblings("input").focus();});
						$(".input-box>input").bind("keydown",Cui.inputBox);
						
						var mainobj=scrolltotop;
						var iebrws=document.all;
						mainobj.cssfixedsupport=!iebrws||iebrws&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
						mainobj.$body=(window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body");
						mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+"</div>").css({position:mainobj.cssfixedsupport?"fixed":"absolute",bottom:mainobj.controlattrs.offsety,right:mainobj.controlattrs.offsetx,opacity:0,cursor:"pointer"}).attr({title:"Back to top"}).click(function(){mainobj.scrollup();return false;}).appendTo("body");if(document.all&&!window.XMLHttpRequest&&mainobj.$control.text()!=""){mainobj.$control.css({width:mainobj.$control.width()});}mainobj.togglecontrol();
						$('a[href="'+mainobj.anchorkeyword+'"]').click(function(){mainobj.scrollup();return false;});
						$(window).bind("scroll resize",function(e){mainobj.togglecontrol();});
						
       });
 
    },
    selectBox:function(){
        var li=$(this);
        var selectbox=li.parent().parent();
        $("li[data-value="+selectbox.attr("data-checked")+"]").show();
        selectbox.attr("data-checked",li.attr("data-value"));
        selectbox.children("div").text(li.text());
        $(this).hide();
        li.parent().slideUp("fast");
        },
		checkBox:function(){
				var checked=parseInt($(this).attr("data-checked"));
				if(!checked){$(this).css("backgroundImage","url(../images/checked.png)");$(this).attr("data-checked","1");}
				else {$(this).css("backgroundImage","url(../images/check.png)");$(this).attr("data-checked","0");}
		},
		inputBox:function(e){
				var input=$(this);
				if(input.val().length>=0&&e.keyCode!=8) input.next("span").hide();
				if(input.val().length==1&&e.keyCode==8) input.next("span").show();
			},
		imgCarousel:function(imgBox,btnBox,relContent){
        var img=$(imgBox).children();
        var btn=$(btnBox);
        var rel=$(relContent).children();
         
        var effectSpeed=500;
        var carouselSpeed=5000;
        var focusClass = "focusClass";
        var dir = $(".imgBox_Dir");
        var zIndex=parseInt($(img[0]).css("z-index"));
        var currentIndex=0;
        var btnLeft,btnRight,triggerType,carousel;
         
         
        var switchImg=function(){
            var currentBtn,currentIndex,lastIndex=btn.filter("."+focusClass).index();
            triggerType=$(this).hasClass(dir.attr("class"))?3:(this==window)?2:0;;
            img.add(btn).add(rel).stop(false,true);
            switch(triggerType){
                case 3:     //for dir trigger
                    if($(this).attr("id").indexOf("Left")!=-1)currentBtn=lastIndex==0?$(btn[img.length-1]):$(btn[lastIndex-1]);
                    else currentBtn=lastIndex==img.length-1?$(btn[0]):$(btn[lastIndex+1]);
                    break;
                case 2:     //for auto trigger
                    currentBtn=lastIndex==img.length-1?$(btn[0]):$(btn[lastIndex+1]);
                    break;
                case 0:     //for mouseover trigger
                default:
                    clearInterval(carousel);
										carousel=null;
                    currentBtn=$(this);
            }
            currentIndex=currentBtn.index();
            if(lastIndex==currentIndex) return false;
            $(img[lastIndex]).css("z-index",zIndex+1).fadeOut(effectSpeed,function(){$(this).css("z-index",zIndex)});
            $(img[currentIndex]).show();
            if(relContent) {$(rel[lastIndex]).fadeOut(effectSpeed);$(rel[currentIndex]).fadeIn(effectSpeed);}
            btn.removeClass(focusClass);
            currentBtn.addClass(focusClass);
            }
        for(var i=0;i<img.length;i++) btn.append($("<li>"));
        btn=btn.children();
        btn.first().addClass(focusClass);
        btn.mouseover(switchImg);
        btn.parent().add(dir).mouseleave(function(){if(carousel==null)carousel=setInterval(switchImg,carouselSpeed);});
        dir.mouseenter(function(){clearInterval(carousel);carousel=null;});
        if(dir.length){
            btnLeft=$(imgBox+"_Left");
            btnRight=$(imgBox+"_Right");
            btnLeft.add(btnRight).click(switchImg);
            }
        if(carouselSpeed) carousel=setInterval(switchImg,carouselSpeed);
        },
}
var scrolltotop={
	setting:{
		startline:200,
		scrollto:0,
		scrollduration:400,
		fadeduration:[500,100]
	},
	controlHTML:'<img src="../images/back.png" style="width:58px; height:50px; border:0;" />', 
	controlattrs:{offsetx:30,offsety:80},
	anchorkeyword:"#top",
	state:{
		isvisible:false,
		shouldvisible:false
	},scrollup:function(){
		if(!this.cssfixedsupport){
			this.$control.css({opacity:0});
		}
		var dest=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
		if(typeof dest=="string"&&jQuery("#"+dest).length==1){
			dest=jQuery("#"+dest).offset().top;
		}else{
			dest=0;
		}
		this.$body.animate({scrollTop:dest},this.setting.scrollduration);
	},keepfixed:function(){
		var $window=jQuery(window);
		var controlx=$window.scrollLeft()+$window.width()-this.$control.width()-this.controlattrs.offsetx;
		var controly=$window.scrollTop()+$window.height()-this.$control.height()-this.controlattrs.offsety;
		this.$control.css({left:controlx+"px",top:controly+"px"});
	},togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop();
		if(!this.cssfixedsupport){
			this.keepfixed();
		}
		this.state.shouldvisible=(scrolltop>=this.setting.startline)?true:false;
		if(this.state.shouldvisible&&!this.state.isvisible){
			this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]);
			this.state.isvisible=true;
		}else{
			if(this.state.shouldvisible==false&&this.state.isvisible){
				this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]);
				this.state.isvisible=false;
			}
		}
	}
};
void Cui.init();