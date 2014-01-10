// JavaScript Document

//��ȡ���������͸�
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
	//ie��ȥ17���������
	if(!window.ActiveXObject){
		pageWidth -= 17;
	}
	return {
		width : pageWidth,
		height : pageHeight
	}
}
//��ȡ�������߶�
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
//ִ����ʾ�������ڵ���
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
//�����ڵ���logMaskDiv���
function setBox(mask){	
	var widthMore = document.documentElement.scrollWidth;//�к��������ʱ�Ŀ�
	var sWidth = Math.max(getBrowserSize().width, widthMore);//ʵ�ʿ��
	var heightMore = document.body.scrollHeight||(document.documentElement.scrollHeight);//�����������ʱ�ĸ�
	var sHeight = Math.max(getBrowserSize().height, heightMore);//ʵ�ʸ߶�
	document.getElementById(mask).style.width = sWidth + 'px';
	document.getElementById(mask).style.height = sHeight + 'px';	
}
//���õ�����logLayerDivλ��
function setPosition(layer){
	document.getElementById(layer).style.left = (getBrowserSize().width - document.getElementById(layer).offsetWidth)/2 + 'px';
	document.getElementById(layer).style.top = getPageScroll() + (getBrowserSize().height - document.getElementById(layer).offsetHeight)/2 + 'px';
}
window.onresize = function(){
	setBox();
	setPosition()
}