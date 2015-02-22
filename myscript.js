console.log("Hello world");
if (document.title.indexOf("Google") != -1)
{
    //Creating Elements
    var btn = document.createElement("button")
    var t = document.createTextNode("SAVE");
	btn.style.backgroundColor = "#4285F4";
	btn.style.border = "2px solid #4285F4";
	btn.style.borderRadius = "2px";
	btn.style.color = "#FFFFFF";
	btn.style.height = "30px";
	btn.style.width = "60px";
	btn.style.marginLeft = "3px";
	btn.style.marginRight = "3px";
	btn.style.fontWeight = "bold";
	
    btn.appendChild(t);
    var searchDiv = document.getElementById("gbqfbw");
    if(searchDiv != null)
    {
	console.log("Working");
	//Appending to DOM
	btn.onclick = function()
	{
	    console.log("Clicky!");
	    chrome.storage.sync.get("SearchBuddyInfo", function (obj)
				    {
					var info = obj.SearchBuddyInfo;
					var searchTextbox = document.getElementById("gbqfq");
					var searchText = searchTextbox.value;
					console.log(JSON.stringify(info));
					//console.log(info[0].date.getMonth());
					console.log("User searched for: " + searchText);
					var alreadyContains = false;
					if(info != null)
					{
					    alreadyContains = info.filter(function (e)
									      {
										  return e.search == searchText;
									      }).length != 0;
					    if(!alreadyContains)
					    {
						info.push({"search": searchText, "annotation": ""});
					    }
					}
					else
					{
					    info = [{"search": searchText, "annotation": ""}];
					}
					console.log("About to save!");
					//obj.SearchBuddyInfo = info;
					chrome.storage.sync.set({'SearchBuddyInfo': info}, function() {
					    // Notify that we saved.
                        console.log("The value about to be saved is:: " + info[0].search);
					    console.log('Settings saved');		
					});
					var tes = document.getElementById("errorSpanSB");
					if(tes != null)
					{
					    tes.parentNode.removeChild(tes);
					}
					if(alreadyContains)
					{
					    var errorSpan = document.createElement("span");
					    errorSpan.id = "errorSpanSB";
					    errorSpan.style.color = "red";
					    var errorSpanTextNode = document.createTextNode("Duplicate Search");
					    errorSpan.appendChild(errorSpanTextNode);
					    searchDiv.appendChild(errorSpan);
					    window.setTimeout(function ()
							      {
								  var tes = document.getElementById("errorSpanSB");
								  tes.parentNode.removeChild(tes);
							      }, 5000);
					}
					else
					{
					    chrome.storage.sync.set({'SearchBuddyInfo': info}, function() {
						// Notify that we saved.
						console.log('Settings saved');		
					    });
					}
				    });
	};
	searchDiv.appendChild(btn);
   }
    
    
}

