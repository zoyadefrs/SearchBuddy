/* js main */
window.onload = function(){
document.getElementById("UI").onclick = openUI;

function openUI(){
  window.open("www.google.ca");
}

chrome.storage.sync.get("SearchBuddyInfo", function (obj)
{
    var info = obj.SearchBuddyInfo;
    if(info != null && info.length !=0){
    console.log("Recent Searches: " + info[0].search);
    for(var i=0;i<info.length;i++){
    var t= document.createTextNode(info[i].search);
    var t2= document.createElement("br");
    document.getElementById("search_stored").appendChild(t);
    document.getElementById("search_stored").appendChild(t2);
    }}
  });

document.getElementById("refresh").onclick = refreshBtn;

function refreshBtn(){

    chrome.storage.sync.clear();
  
  var elt = document.getElementById("search_stored");
  if (elt.hasChildNodes()) {
    elt.removeChild(elt.childNodes[0]);
  }
  

}
  
  document.getElementById("deleteBTN").onclick = deleteBtn;

  function deleteBtn(){
    var elt = document.getElementById("search_stored");
    
    chrome.storage.sync.get("SearchBuddyInfo", function (obj)
                            {
      var info = obj.SearchBuddyInfo;
                            if(info != null && info.length !=0){
                            
                            for(i=0;i<info.length;i++){
                            if(info[i].search == "cats"){
                            elt.removeChild(elt.children[i*2]);
                            }}

                            
                            }
                            }); }
}
