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
					displaySearch(info);
					string = string + String.fromCharCode(e.keyCode);
				    };
				    searchBar.onclick = function()
				    {
					var ad = document.getElementById("annotations");
					if(ad != null)
					{
					    var annotationDiv = document.getElementById("annotations");
					    annotationDiv.innerHTML = "";
					    var textarea = document.createElement("textarea");
					    var at = document.createTextNode(info[this.param].annotation);
					    textarea.appendChild(at);
						textarea.style.width = "100%";
					    annotationDiv.appendChild(textarea);
					    annotationDiv.appendChild(document.createElement("br"));
					    var saveBtn = document.createElement("input");
					    saveBtn.type = "button";
					    saveBtn.value = "save annotation";
					    saveBtn.param = this.param;
					    saveBtn.onclick = function()
					    {
						info[this.param].annotation = textarea.value;
						chrome.storage.sync.set({'SearchBuddyInfo': info}, function()
						{
						});
					    };
					    annotationDiv.appendChild(saveBtn);
					};
					a.className = "text";
					a.appendChild(document.createTextNode(info[i].search));
					div.appendChild(a);
					parent.appendChild(div);
					ad.innerHTML = "";
}
				    });
}

function displaySearch(info)
{
    var parent = document.getElementById("searchContainer");
    var searchBar = document.getElementById("searchbar");
    var searchText = searchBar.value;
    parent.innerHTML = "";
    for(i = 0 ; i < info.length ; i++)
    {
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
	    var divs = document.getElementsByClassName("search");
	    for(var i = 0; i < divs.length; ++i)
	    {
		divs[i].className = "search";
	    }
	    this.className = "search clicked";
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
		chrome.storage.sync.set({'SearchBuddyInfo': info}, function()
					{
					});
	    };
	    annotationDiv.appendChild(saveBtn);
	};
	a.className = "text";
	a.appendChild(document.createTextNode(info[i].search));
	var delSpan = document.createElement("span");
	delSpan.className = "fa fa-times 2x";
	delSpan.param = i;
	delSpan.onclick = function(e)
	{
	    console.log("Deleting!");
	    deleteBtn(this.param, info);
	    e.preventDefault();
	    e.stopPropagation();
	    
	    return false;
	};
	div.appendChild(delSpan);
	div.appendChild(a);
	parent.appendChild(div);
    }
}

function deleteBtn(item, info)
{
    info.splice(item, 1);
    chrome.storage.sync.set({'SearchBuddyInfo': info}, function()
			    {
				displaySearch(info);
			    });
}
