function fetchGitHubInformation(event) {       //event arg used as function is called by onInput event
    var username = $("#gh-username").val();   //use JQuery to select id and value of text field
    if (!username) {                //if no username entered
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);         //use JQ to set html inside div with id...
        return;            //prevent moving on to github api if field is empty by returning out of funct
    }
    $("#gh-user-data").html(
        `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading...">
        </div>`);
}

