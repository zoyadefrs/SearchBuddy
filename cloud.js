/* cloud.js */

window.onload = searchDivs;

function searchDivs(){
	
	var info;	
	chrome.storage.sync.get("SearchBuddyInfo", function (obj)
		{
			info = obj.SearchBuddyInfo;

			var parent = document.getElementById("searchContainer");
			
			for(i = 0 ; i < info.length ; i++){
				
				
				var a = document.createElement("a");
				a.id= i;
				a.className = "link";
				var div = document.createElement("div");
				div.className = "search";
				var p = document.createElement("p");
				p.className = "text";
				p.innerHTML = info[i].search;
				
				parent.appendChild(a);
				a.appendChild(div);
				div.appendChild(p);
			}
			
		});
	
}
