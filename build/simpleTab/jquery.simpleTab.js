/*!
 * jQuery simple tab Plugin
 * shandl
 *	eg:
 * <ul class='tabs'>
	    <li><a href='#tab1'>Tab 1</a></li>
	    <li><a href='#tab2'>Tab 2</a></li>
	    <li><a href='#tab3'>Tab 3</a></li>
	</ul>
	<div id='tab1'>
	    <p>Hi, this is the first tab.</p>
	</div>
	<div id='tab2'>
	    <p>This is the 2nd tab.</p>
	</div>
	<div id='tab3'>
	    <p>And this is the 3rd tab.</p>
	</div>
	
	 $('ul.tabs').simpleTab();
 */
//为避免冲突，将我们的方法用一个匿名方法包裹起来
(function($) {
    //扩展这个方法到jquery
    $.fn.extend({
        //插件名字
    	simpleTab: function() {

			var areaHeight = $("div.tabsArea").height() - $("div.tab-hd").height() - 4;
			//设置内容区高度撑满整个整个容器
			//如果要高度撑满可视区域，可以使用$(window).height()
			$("div.tab-content").css({'height':areaHeight})

            //遍历匹配元素的集合
            return this.each(function() {
                // For each set of tabs, we want to keep track of
                // which tab is active and it's associated content
                var $active, $content, $links = $(this).find('a');
                // If the location.hash matches one of the links, use that as the active tab.
                // If no match is found, use the first link as the initial active tab.
                $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
                $active.parent().addClass('tab-cur');
                $content = $($active.attr('href'));
                // Hide the remaining content
                $links.not($active).each(function () {
                    $($(this).attr('href')).hide();
                });
                // Bind the click event handler
                $(this).on('click', 'a', function(e){
                    // Make the old tab inactive.
                    $active.parent().removeClass('tab-cur');
                    $content.hide();

                    // Update the variables with the new link and content
                    $active = $(this);
                    $content = $($(this).attr('href'));

                    // Make the tab active.
                    $active.parent().addClass('tab-cur');
                    $content.show();

                    // Prevent the anchor's default click action
                    e.preventDefault();
                });
            });
        }
    });
//传递jQuery到方法中，这样我们可以使用任何javascript中的变量来代替"$"      
})(jQuery); 