// JavaScript Document

//获取可视区域宽和高
function getBrowserSize(){
	var pageWidth = window.innerWidth,
		pageHeight = window.innerHeight;
	if (typeof pageWidth != "number"){
		if (document.compatMode == "CSS1Compat"){
			pageWidth =  document.documentElement.clientWidth;
			pageHeight =  document.documentElement.clientHeight;
		} else{
			pageWidth =  document.body.clientWidth;
			pageHeight =  document.body.clientHeight;
		}
	}
	//ie减去17滚动条宽度
	if(!window.ActiveXObject){
		pageWidth -= 17;
	}
	return {
		width : pageWidth,
		height : pageHeight
	}
}
//获取滚动条高度
function getPageScroll(){ 
	var yScroll; 
	if (self.pageYOffset) { 
		yScroll = self.pageYOffset; 
	} else if (document.documentElement && document.documentElement.scrollTop){ 
		yScroll = document.documentElement.scrollTop; 
	} else if (document.body) { 
		yScroll = document.body.scrollTop; 
	} 
	return yScroll; 
} 
//执行显示与隐藏遮挡层
function showMask(mask,layer){
	document.getElementById(mask).style.display='block';
	document.getElementById(layer).style.display='block';  
	setBox(mask);
	setPosition(layer);
}
function closeMask(mask,layer)
{  
    document.getElementById(layer).style.display='none';
    document.getElementById(mask).style.display='none';
}
//设置遮挡层logMaskDiv宽高
function setBox(mask){	
	var widthMore = document.documentElement.scrollWidth;//有横向滚动条时的宽
	var sWidth = Math.max(getBrowserSize().width, widthMore);//实际宽度
	var heightMore = document.body.scrollHeight||(document.documentElement.scrollHeight);//有竖向滚动条时的高
	var sHeight = Math.max(getBrowserSize().height, heightMore);//实际高度
	document.getElementById(mask).style.width = sWidth + 'px';
	document.getElementById(mask).style.height = sHeight + 'px';	
}
//设置弹出层logLayerDiv位置
function setPosition(layer){
	document.getElementById(layer).style.left = (getBrowserSize().width - document.getElementById(layer).offsetWidth)/2 + 'px';
	document.getElementById(layer).style.top = getPageScroll() + (getBrowserSize().height - document.getElementById(layer).offsetHeight)/2 + 'px';
}
window.onresize = function(){
	setBox();
	setPosition()
}