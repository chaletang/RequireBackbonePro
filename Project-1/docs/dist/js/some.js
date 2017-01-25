function setMaxHeightForSiteMapModule($container,ele,per){
		$container.find(ele).css("height","auto");
		var len = $container.find(ele).length;
		var row = Math.ceil(len / per);
		for(i = 0; i < row; i++){
			var maxHeight = 0;
			for(j = 0; j < per; j++){
				var height = $container.find(ele).eq(i*per+j).innerHeight();
				if(height > maxHeight){
					maxHeight = height;
				}
			}
			var prange = i * per - 1;
			var nrange = (i + 1) * per;
			if(prange > 0){
				$container.find(ele + ":gt("+ prange +"):lt("+ nrange +")").css("height",maxHeight);
			}
			else {
				$container.find(ele + ":lt("+ nrange +")").css("height",maxHeight);
			}
		}
	};