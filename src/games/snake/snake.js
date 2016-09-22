// JavaScript Document
window.onload = function(){ 
            var oStart = document.getElementById('start');
			var oBox = document.getElementById('box') 
			var cellUl = document.getElementById('cellList');
			var oGetIt = document.getElementById('getIt');
			var oBgMusic = document.getElementById('bgMusic');
			var fragment = document.createDocumentFragment();
			var oSocre = document.getElementById('score');
			oSocre.innerHTML = 0;
			var oReload = document.getElementById('reload');
			var perCell = 50
			var cellOuterWidth = perCell + 2;
			var cellOuterHeight = perCell + 2;
			var boxArea = oBox.offsetWidth * oBox.offsetHeight;
			var cell = null;
			
			
			//创建格子cell
			for(var i = 0;i<boxArea/(cellOuterWidth*cellOuterHeight);i++){ 
			  cell = document.createElement('li');
			  cell.style.border = '1px solid #1D6707';
			  cell.style.float = 'left';
			  cell.style.background = '#1D6707';
			  cell.style.width = cell.style.height = perCell + 'px';
			  fragment.appendChild(cell);
			}
			cellUl.appendChild(fragment);
			
			var cellList = cellUl.getElementsByTagName('li');
			
			//创建蛇snake
			var snakeUl = document.createElement('ul');
			snakeUl.id  = 'snake';
			document.body.appendChild(snakeUl);
			
			for(var i=0;i<6;i++)
			{ 
			   var snakeLi = document.createElement('li');
			   snakeLi.style.position = 'absolute';
			   snakeLi.style.zIndex = 100;
			   snakeLi.style.width = snakeLi.style.height = cellList[0].offsetWidth-2 + 'px';
			   snakeLi.style.border = '1px solid #1D6707';
			   snakeLi.style.borderRadius = '10px';
			   snakeLi.style.backgroundColor = '#fff';
			   snakeLi.style.left = oBox.offsetLeft + 'px';
			   snakeLi.style.top = oBox.offsetTop + 'px';
			   fragment.appendChild(snakeLi);
			}
			
			snakeUl.appendChild(fragment);
			
			
			//初始化蛇的位置
			snakeBody = document.getElementById('snake').getElementsByTagName('li');
			for(var i=0;i<6;i++)
			{
			  snakeBody[i].style.left = oBox.offsetLeft + ((i+7)*snakeBody[0].offsetWidth) + 'px';
			}
			//初始化蛇头蛇尾
			snakeBody[0].style.backgroundImage = 'url(images/snakeHeadLeft.png)';
			snakeBody[0].style.backgroundColor = '#1D6707';
						
			oStart.onclick = function(){	
				        //音乐响起来	
						oBgMusic.play();	
						//蛇开始移动
						moveSnake(snakeBody,'left',-52);
						function moveSnake(obj,direction,speed)
						{
						   clearInterval(obj.startTimer);
						   obj.startTimer = setInterval(function(){ 
											var oldSite = [];
											for(var i=0;i<obj.length;i++)
											{ 
											   oldSite[i] = {thisL:obj[i].offsetLeft,thisT:obj[i].offsetTop}; 
											} 
											
											obj[0].style[direction]= parseInt(getStyle(obj[0],direction))+ speed + 'px';
											for(var i=1;i<obj.length;i++)
											{ 
											   obj[i].style.left = oldSite[i-1].thisL + 'px';
											   obj[i].style.top = oldSite[i-1].thisT + 'px';
											   isTouchSelf(obj);
											   isCreateFood(obj);
											   gameOver(obj);
											
											}
											
											
						   },200);
						}
						
						//改变蛇的方向
						document.onkeydown = function(ev)
						{ 
						   var oEvent = ev||event;
						  
						   switch(oEvent.keyCode)
						   { 
							   case 37:if(snakeBody[0].offsetLeft > snakeBody[1].offsetLeft)
									   { 
										 return ;
									   }
									   else
									   {
										  snakeBody[0].style.backgroundImage = 'url(images/snakeHeadLeft.png)';
										  moveSnake(snakeBody,'left',-52) 
									   };break;//左
							   case 38:if(snakeBody[0].offsetTop > snakeBody[1].offsetTop)
									   { 
										 return ;
									   }
									   else
									   {
										  snakeBody[0].style.backgroundImage = 'url(images/snakeHeadTop.png)';  
										  moveSnake(snakeBody,'top',-52)
									   };break;//上
							   case 39:if(snakeBody[0].offsetLeft < snakeBody[1].offsetLeft)
									   {
										 return ;
									   }
									   else
									   {
										  snakeBody[0].style.backgroundImage = 'url(images/snakeHeadRight.png)'; 
										  moveSnake(snakeBody,'left',+52)
									   };break;//右
							   case 40:if(snakeBody[0].offsetTop < snakeBody[1].offsetTop)
									   { 
										 return ;
									   }
									   else
									   {
										  snakeBody[0].style.backgroundImage = 'url(images/snakeHeadDown.png)'; 
								    	  moveSnake(snakeBody,'top',+52)
									   };break;//下
						   }
						}
						
						//判断是否要产生食物
						function isCreateFood(obj){ 
						
						   var food = document.getElementById('food')||null; 
						   if(food)  //还有食物
						   { 
								for(var i=0;i<obj.length;i++)
								{ 
								  if(obj[i].offsetLeft - oBox.offsetLeft == food.offsetLeft && obj[i].offsetTop - oBox.offsetTop == food.offsetTop)
								  { 
										   //蛇身与食物重叠了，去除食物   
										   oBox.removeChild(food);
										   oGetIt.play();
					
								  };
								}
						   }
						   else   //被蛇吃了，要产生
						   {
							  oSocre.innerHTML = parseInt(oSocre.innerHTML)+1; 
							  createFood(obj);
							  lengthening(obj);
						   }
						}
						 
						 //吃食物，增加蛇的长度
						function lengthening(obj){  
							var lastLi = document.createElement('li');
							lastLi.style.position = 'absolute';
							lastLi.style.left = snakeBody[snakeBody.length - 1].offsetLeft + 'px';
							lastLi.style.top = snakeBody[snakeBody.length - 1].offsetTop + 'px';
							lastLi.style.zIndex = 100;
							lastLi.style.width = lastLi.style.height = snakeBody[0].offsetWidth-2 + 'px';
							lastLi.style.border = '1px solid #1D6707';
							lastLi.style.borderRadius = '10px';
						    lastLi.style.backgroundColor = '#fff';
							lastLi.style.color = '#fff';
							lastLi.innerHTML = snakeBody.length;
							snakeUl.appendChild(lastLi);
							
						} 
						
						//检测是否追尾了
						function isTouchSelf(obj){
						  var firstSite = {firstL:obj[0].offsetLeft,firstT:obj[0].offsetTop} 
						   for(var i=2;i<obj.length;i++)
						   { 
							  if(obj[i].offsetLeft == firstSite.firstL && obj[i].offsetTop == firstSite.firstT )
							  { 
								  clearInterval(obj.startTimer);
								  document.onkeydown = null;
								  //背景音乐停止
								  oBgMusic.pause();
							  }
						   }
						}
						//产生食物
						function createFood(obj){ 
							   food = document.createElement('div');
							   food.id = 'food';
							   food.style.width = food.style.height = obj[0].offsetWidth + 2 + 'px';
							   var foodL = Math.floor(Math.random()*20)*obj[0].offsetWidth;
							   var foodT = Math.floor(Math.random()*10)*obj[0].offsetHeight;
							   food.style.position = 'absolute';
							   food.style.left = foodL + 'px';
							   food.style.top = foodT + 'px';
							   food.style.background = 'url(images/food.png) no-repeat';
							   oBox.appendChild(food);
							
						}
				
						//检测碰到边就完蛋了
						function gameOver(obj){
							var snakeL  = obj[0].offsetLeft - oBox.offsetLeft ;
							var snakeT = obj[0].offsetTop;
							var snakeR  = obj[0].offsetLeft + obj[0].offsetWidth;
							var snakeB  = obj[0].offsetTop + obj[0].offsetHeight;
							if( snakeL < 0 || snakeT < oBox.offsetTop || snakeR > oBox.offsetLeft + oBox.offsetWidth ||snakeB > oBox.offsetTop + oBox.offsetHeight ){ 
							   //背景音乐停止
							   oBgMusic.pause();
							   clearInterval(obj.startTimer);
							   document.onkeydown = null;
							   obj[0].style.visibility = 'hidden';
							   oReload.style.display='inline';  
							}
						}
						oReload.onclick = function(){ 
						   window.location.reload();
						}
						//获取元素的样式，包括单位
						function getStyle(obj,attr){
							//ie
							if(obj.currentStyle)
							{
								return obj.currentStyle[attr];
							}
							else
							{
								return getComputedStyle(obj,false)[attr];	
							}
						}
		          } 
}