/* cloud.js */

window.onload = searchDivs;

function searchDivs()
{
	var info;
	chrome.storage.sync.get("SearchBuddyInfo", function (obj)
				{
				    info = obj.SearchBuddyInfo;

				    var parent = document.getElementById("searchContainer");
				    
				    for(i = 0 ; i < info.length ; i++)
				    {
					var div = document.createElement("div");
					var a = document.createElement("a");
					a.target = "_blank";
					a.href="http://www.google.com/search?q=" + info[i].search;
					//a.onclick = function(){return false};
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
			
				});
}
