console.log("Hello world");
if (document.title.indexOf("Google") != -1)
{
    //Creating Elements
    var btn = document.createElement("button")
    var t = document.createTextNode("CLICK ME");
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
					if(info != null)
					{
					    info.push({"search": searchText, "annotation": ""});
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
				    });
	};
	searchDiv.appendChild(btn);
   }
    
    
}

