/*var blocksArray = [
				{id:"1",title:"Block-1",content:"dist/images/bw/face.png"},
				{id:"2",title:"Block-2",content:"dist/images/bw/crutch.png"},
				{id:"3",title:"Block-3",content:"dist/images/bw/glass.png"},
				{id:"4",title:"Block-4",content:"dist/images/bw/love.png"}
];	*/

var blocksData = [];
var blocksArray = localStorage.getItem('allBlocks')? localStorage.getItem('allBlocks').split(',') : [];   
_.each(blocksArray, function(block){
	if(localStorage.getItem(block)!= null){
		blocksData.push({"id": block,"title": block, content:localStorage.getItem(block)});
	}
});

