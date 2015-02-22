/* js main */
window.onload = function(){
document.getElementById("UI").onclick = openUI;

function openUI(){
  window.open("ui.html");
}

chrome.storage.sync.get("SearchBuddyInfo", function (obj)
{
    var info = obj.SearchBuddyInfo;
    if(info != null && info.length !=0)
    {
	console.log("Recent Searches: " + info[0].search);
	for(var i=0;i<info.length;i++)
	{
	    var t= document.createTextNode(info[i].search);
	    var t2= document.createElement("div");
	    t2.className = "searchItem";
	    var tl = document.createElement("a");
	    tl.param = info[i];
	    tl.onclick = function()
	    {
		var win = window.open("http://www.google.com/search?q=" + this.param.search, '_blank');
		win.focus();
		return false;
	    };
	    tl.appendChild(t);
	    t2.appendChild(tl);
	    var delBtn = document.createElement("span");
	    delBtn.className = "glyphicon glyphicon-remove-sign";
	    delBtn.param = info[i];
	    delBtn.onclick = function()
	    {
		console.log("delete button!");
		deleteBtn(this.param.search);
	    };
	    t2.appendChild(delBtn);
	    document.getElementById("search_stored").appendChild(t2);
	}
    }
 });

document.getElementById("refresh").onclick = refreshBtn;

function refreshBtn(){

    chrome.storage.sync.clear();
  
  var elt = document.getElementById("search_stored");
  while (elt.hasChildNodes()) {
    elt.removeChild(elt.childNodes[0]);
  }
}
  
  //document.getElementById("deleteBTN").onclick = deleteBtn;

  function deleteBtn(item)
  {
    var elt = document.getElementById("search_stored");
    chrome.storage.sync.get("SearchBuddyInfo", function (obj)
			    {
				var info = obj.SearchBuddyInfo;
				if(info != null && info.length !=0)
				{
				    for(i=0;i<info.length;i++)
				    {
					if(info[i].search == item)
					{
					    elt.removeChild(elt.children[i]);
					    info.splice(i,1);
					    break;
					}
				    }
                            
				}
				chrome.storage.sync.set({'SearchBuddyInfo': info}, function()
							{
							    // Notify that we saved.
							    console.log('Settings saved');		
							});
                            });
  }
}
