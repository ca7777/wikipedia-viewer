function searchwiki(term){
  
  var newTerm = term.replace(/\s/g, '_');
  
  var searchTerm = "https://en.wikipedia.org/api/rest_v1/page/summary/" + newTerm;
  
   var searchURL = "https://en.wikipedia.org/wiki/" + newTerm;
  
  
  $.getJSON(searchTerm, function(data){
    console.log(data);
    console.log(searchTerm);
    if (data.description === "Disambiguation page providing links to articles with similar titles" || data.description === "Wikipedia disambiguation page"){
      $("#title").html("Disambiguation Page");
      $("#articlesummary").html("Consider refining your search term.<br>" + data.extract_html)
       $("#linkToPage").html("<a href=" + searchURL + " target=_blank>Click for Possible Matches</a>");
      
    }
    else{
    $("#title").html(data.title);
    $("#articlesummary").html(data.extract_html);
    
    $("#linkToPage").html("<a href=" + searchURL + " target=_blank>Link to Full Article</a>");
    };
  });
  
}

function randomWiki(){
  $.getJSON("https://en.wikipedia.org/api/rest_v1/page/random/summary", function(data){
    
     $("#title").html(data.title);
    $("#articlesummary").html(data.extract_html);
    
     var term = (data.title);
    
     var newTerm = term.replace(/\s/g, '_');
     var searchURL = "https://en.wikipedia.org/wiki/" + newTerm;
    
    $("#linkToPage").html("<a href=" + searchURL + " target=_blank>Link to Full Article</a>");
    
  });
}

$("document").ready(function(){
   
 
  
  $("#randomBtn").on("click", function(){
    randomWiki();
  });
  
  $("#searchbtn").on("click", function(){
    var input = document.getElementById("searchbar");
    searchwiki(input.value);
    input.value="";
  });
  
  $('#searchbar').keypress(function(e){
        if(e.which == 13){
            $('#searchbtn').click();
        }
    });
  
});
