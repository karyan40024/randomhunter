
var currentYear = (new Date()).getFullYear();
var temp = currentYear - 2013;
var year = Math.floor(Math.random() * temp) + 1;
var featuredYear = year + 2013;
var currentMonth = new Date().getMonth() + 1;
var featuredMonth = Math.floor(Math.random() * 12) + 1;
if(featuredYear == currentYear && featuredMonth > currentMonth){
  featuredMonth = currentMonth;
} 
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.producthunt.com/v1/posts/all?sort_by=votes_count&order=desc&search[featured_month]=" + featuredMonth + "&search[featured_year]=" + featuredYear, true);
xhr.setRequestHeader('Authorization', 'Bearer 4dc6a9ab1706a3ab5299056076baaf9f886dbd45400c055a9286cede1a8c726d');
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
    var postIndex = Math.floor(Math.random() * resp.posts.length) + 0;
    document.getElementById("product-name").innerHTML = resp.posts[postIndex].name;
    document.getElementById("product-img").src = resp.posts[postIndex].thumbnail.image_url;
    document.getElementById("product-desc").innerHTML = resp.posts[postIndex].tagline;
    document.getElementById("product-votes").innerHTML = "Votes: " + resp.posts[postIndex].votes_count;
    document.getElementById("product-date").innerHTML = resp.posts[postIndex].day;
    document.getElementById("product-url").href = resp.posts[postIndex].redirect_url;
    document.getElementById("producthunt-url").href = resp.posts[postIndex].discussion_url;

    document.getElementById("container").style.display = 'block';
    document.getElementById("upvote-link").style.display = 'block';
  }
}
xhr.send();

document.addEventListener("keydown", function(event){
	if (event.keyCode==32){
		location.reload();
	}
});