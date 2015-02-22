/* cloud.js */

//window.onload = searchDivs;
document.getElementById("btwiea7ryt3").onclick = searchDivs;

function searchDivs(){
	var info;
	document.getElementById("searchContainer").innerHTML = "function";
	chrome.storage.sync.get("SearchBuddyInfo", function (obj)
		{
			info = obj.SearchBuddyInfo;
		});
	document.getElementById("searchContainer").innerHTML = "sync";	
	var parent = document.getElementById("searchContainer");
	
	for(i = 0 ; i < info.lengh ; i++){
		document.getElementById("searchContainer").innerHTML = "looping";
		parent.appendChild(a);
		var a = document.createElement(a);
		a.id="search " + i;
		var div = document.createElement(div);
		a.appendChild(div);
		var p = document.createElement(p);
		div.appendChild(p);
		p.innerHTML(info[i].search);
	}
	
}
