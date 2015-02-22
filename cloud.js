/* cloud.js */

window.onload = searchDivs;
var string = "";
function searchDivs()
{
	var info;
	chrome.storage.sync.get("SearchBuddyInfo", function (obj)
				{
				    info = obj.SearchBuddyInfo;

				    displaySearch(info);
				    var searchBar = document.getElementById("searchbar");
				    searchBar.onkeyup = function(e)
				    {
					console.log("key recorded!");
					displaySearch(info);
					string = string + String.fromCharCode(e.keyCode);
				    };
				    searchBar.onclick = function()
				    {
					var ad = document.getElementById("annotations");
					if(ad != null)
					{
					    ad.innerHTML = "";
					}
				    };
				});
}

function displaySearch(info)
{
    var parent = document.getElementById("searchContainer");
    var searchBar = document.getElementById("searchbar");
    var searchText = searchBar.value;
    console.log("-----------------------------------");
    console.log("searchtext: " + searchText);
    parent.innerHTML = "";
    for(i = 0 ; i < info.length ; i++)
    {
	console.log("search: " + info[i].search);
	console.log("INdex: " + searchText.indexOf(info[i].search));
	if(searchText != "" && (info[i].search.indexOf(searchText) <= -1 && info[i].annotation.indexOf(searchText) <= -1))
	{
	    continue;
	}
	var div = document.createElement("div");
	var a = document.createElement("a");
	a.target = "_blank";
	a.href="http://www.google.com/search?q=" + info[i].search;
	div.className = "search";
	div.param = i;
	div.onclick = function()
	{
	    console.log("clicked the div");
	    var annotationDiv = document.getElementById("annotations");
	    annotationDiv.innerHTML = "";
	    var textarea = document.createElement("textarea");
	    var at = document.createTextNode(info[this.param].annotation);
	    textarea.appendChild(at);
	    annotationDiv.appendChild(textarea);
	    annotationDiv.appendChild(document.createElement("br"));
	    var saveBtn = document.createElement("input");
	    saveBtn.type = "button";
	    saveBtn.value = "save annotation";
	    saveBtn.param = this.param;
	    saveBtn.onclick = function()
	    {
		info[this.param].annotation = textarea.value;
		console.log(textarea.value);
		console.log("saving!");
		chrome.storage.sync.set({'SearchBuddyInfo': info}, function()
					{
					    console.log("information saved in back end");
					});
	    };
	    annotationDiv.appendChild(saveBtn);
	};
	a.className = "text";
	a.appendChild(document.createTextNode(info[i].search));
	div.appendChild(a);
	parent.appendChild(div);
    }
}
