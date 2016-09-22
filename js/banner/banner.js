//网页常见的轮播效果
//使用参数说明

//匿名立即执行函数，等待DOM加载完成之后才执行
(function($){
	$.fn.banner=function(imgW,imgH,json){
		//创建一个大插件box ，及其样式
		var plugBox = $('<div>').appendTo($(this));
		plugBox.css({position:'relative',border:'1px solid #f0f0f0',overflow:'hidden'})
		
		var swLeft=$('<span>').appendTo(plugBox);
		swLeft.css({position:'absolute',left:'1.5%',top:'40%',height:'50px',width:'50px',borderRadius:'50%',textAlign:'center',lineHeight:"50px",fontFamily:'WebSymbolsRegular',fontSize:'30px',cursor:'pointer',zIndex:12,opacity:0.6,filter:'alpha(opacity=60)'});
		swLeft.text("<");
		
		var swRight=$('<span>').appendTo(plugBox);
		swRight.css({position:'absolute',right:'1.5%',top:'40%',height:'50px',width:'50px',borderRadius:'50%',textAlign:'center',lineHeight:"50px",fontFamily:'WebSymbolsRegular',fontSize:'30px',cursor:'pointer',zIndex:12,opacity:0.6,filter:'alpha(opacity=60)'});
		swRight.text(">");
		
		/*
		//创建黑色半透明遮plugCover盖层
		var plugCover = $('<div>').appendTo(plugBox);
		plugCover.css({zIndex:100, width:'100%', height:28, background:'#000', bottom:0, position:'absolute', opacity:0.5, filter:'alpha(opacity=50)'});
		*/
		
		//创建图片的ul和按钮的ul
		var plugPic = $('<ul>').appendTo(plugBox);
		plugPic.css({position: 'absolute', top:0, left:0, overflow:'hidden'})
		var plugBtn = $('<ul>').appendTo(plugBox);
		plugBtn.css({position:'absolute',zIndex:10,overflow:'hidden',bottom:"62px",left:"45%"})
	    var jsonI = 0;
	    var picNum=0;
		//遍历json 生成li a img
	    for(key in json){
			picNum++;
		    var picLi = $('<li><a><img>').appendTo(plugPic);
			picLi.css({listStyle:'none',float:'left', background:'#0FF'});
			picLi.children('a').attr({href:json[key]});
			picLi.children('a').css({display:'block'});
			picLi.children('a').children('img').attr({src:key,alt:'轮播图片'});
			picLi.children('a').children('img').css({width:imgW,height:imgH});
			
			var btnLi = $('<li>' + (jsonI+1) + '</li>').appendTo(plugBtn);
		    btnLi.css({textAlign:'center',borderRadius:50,padding:'0px 6px',background:'#fff',listStyle:'none',cursor:'pointer', float:'left',margin:'0 5px',opacity:0.3, filter:'alpha(opacity=30)'}) 
		    jsonI++;	 
		}
		
		var imgWidth = picLi.children('a').children('img').eq(0).width();
		var imgHeight = picLi.children('a').children('img').eq(0).height();
		plugBox.css({width:imgWidth,height:imgHeight});
		plugPic.css({width:imgWidth*(jsonI)});
		plugBtn.children('li').css({color:"#fff",background:'#000'})
		plugBtn.children('li').eq(0).css({opacity:1, filter:'alpha(opacity=100)'})
		
		//自动轮播开始
		var timer = null;
		var target = 0;
	    var dir = 1;
		timer=setInterval(plugMove,8000);
		
		function plugMove(){
			var curLeft = plugPic.position().left;
            if(curLeft == 0){ 
				dir = 1;  
			}
			else if(curLeft == ((-imgWidth)*(jsonI-1))){
				dir = -1;  
			}
			if(dir == 1){ 
				target ++;
			}
			else if(dir == -1){ 
				target --;
			}
		    plugPic.animate({left:target*(-imgWidth)});
			
            for(key in json){ 
				//plugBtn.children('li').css({color:"#000",background:'#fff'})
				plugBtn.children('li').css({opacity:0.3, filter:'alpha(opacity=30)'})
			}
			//plugBtn.children('li').eq(target).css({color:"#fff",background:'#000'});
			plugBtn.children('li').eq(target).css({opacity:1, filter:'alpha(opacity=100)'})
		}
		//自动轮播结束
		
		//鼠标悬浮在按钮上
		plugBtn.children('li').each(function(){
			//鼠标hover，清除定时器
			$(this).mouseover(function(){ 
				clearInterval(timer);
				for(key in json){ 
					plugBtn.children('li').css({opacity:0.3, filter:'alpha(opacity=30)'})
				}
				$(this).css({opacity:1,filter:'alpha(opacity=100)'});
				target = $(this).index();
				plugPic.animate({left:target*(-imgWidth)});				
			});
			
			//鼠标离开，重启定时器
			$(this).mouseleave(function(){ 
				timer = setInterval(plugMove,8000);
				//$(this).css({opacity:0.3, filter:'alpha(opacity=30)'});
			});
		});
				
		//鼠标悬停在左切换按钮
		swLeft.mouseover(function(){
			clearInterval(timer);
			$(this).css({backgroundColor:'white'});
		});
		
		//鼠标悬停在左切换按钮
		swLeft.mouseleave(function(){
			timer = setInterval(plugMove,8000);
			$(this).css({backgroundColor:'transparent'});
		});
		
		//鼠标悬停在右切换按钮
		swRight.mouseover(function(){
			clearInterval(timer);
			$(this).css({backgroundColor:'white'});
		});
		
		//鼠标离开在右切换按钮
		swRight.mouseleave(function(){
			timer = setInterval(plugMove,8000);
			$(this).css({backgroundColor:'transparent'});
		});
		
		//点击左切换按钮
		swLeft.click(function(){
			clearInterval(timer);
			//$(this).css({backgroundColor:'black'});
			target=target==0?picNum-1:--target;
			
			for(key in json){ 
				plugBtn.children('li').css({opacity:0.3, filter:'alpha(opacity=30)'})
			}
			plugBtn.children('li').eq(target).css({opacity:1, filter:'alpha(opacity=100)'})
			plugPic.animate({left:target*(-imgWidth)});				
		});
				
		//点击右切换按钮
		swRight.click(function(){
			clearInterval(timer);
			//$(this).css({backgroundColor:'black'});
			target=target==picNum-1?0:++target;
			
			for(key in json){ 
				plugBtn.children('li').css({opacity:0.3, filter:'alpha(opacity=30)'})
			}
			plugBtn.children('li').eq(target).css({opacity:1, filter:'alpha(opacity=100)'})
			plugPic.animate({left:target*(-imgWidth)});				
		});
    } 
})(jQuery);