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
		t2.style.padding = "5px";
		t2.style.borderTop = "1px solid #eee";
		
	    var tl = document.createElement("a");
	    tl.param = info[i];
	    tl.onclick = function()
	    {
		var win = window.open("http://www.google.com/search?q=" + this.param.search, '_blank');
		win.focus();
		return false;
	    };
	    var delBtn = document.createElement("i");
	    delBtn.className = "fa fa-times 2x";
	    delBtn.param = info[i];
	    delBtn.onclick = function()
	    {
		console.log("delete button!");
		deleteBtn(this.param.search);
	    };
		delBtn.style.paddingRight = "5px";
		delBtn.style.paddingLeft = "5px";
		delBtn.style.color = "FFFFFF";
		tl.appendChild(t);
	    t2.appendChild(delBtn);
	    t2.appendChild(tl);
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
