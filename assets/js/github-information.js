function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)  
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

/* line5-@ will appear before user login name, ${user.html_url}, link to users profile and opens in new window.
${user.login} - text will be users login name.
line 14 - will show user info*/

function repoInformationHTML(repos) {  //repos is the object returned from github API
    if (repos.length == 0) {   //repos is returned as array, so can be checked if == 0
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
// if there are repos, they have to be iterated through
// .map method (like for each, but returns array) is run against repos array
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {       //event arg used as function is called by onInput event
//ensure repo content is clear when text box is emptied
$("#gh-user-data").html("");
$("#gh-repo-data").html("");

    var username = $("#gh-username").val();   //use JQuery to select id and value of text field
    if (!username) {                //if no username entered
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);         //use JQ to set html inside div with id...
        return;            //prevent moving on to github api if field is empty by returning out of funct
    }
    $("#gh-user-data").html(
        `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading...">
        </div>`);

        //when method take a function as first arg,
        $.when(
            $.getJSON(`https://api.github.com/users/${username}`), //value obtained from input box
            $.getJSON(`https://api.github.com/users/${username}/repos`) // get repo info for user
        ).then(
            function(firstResponse, secondResponse) {  //1st arg is response from get.json method
                //were 2 calls are made, 'when' packs the responses into arrays, and each 1 is the 1st element 
                var userData = firstResponse[0];
                var repoData = secondResponse[0];
                $("#gh-user-data").html(userInformationHTML(userData));  //set content of div to results of function userInformationHTML 
                $("#gh-repo-data").html(repoInformationHTML(repoData));
            },
            function(errorResponse) {
                if (errorResponse.status === 404) {  //404 is not found error
                    $("#gh-user-data").html(
                        `<h2>No info found for user ${username}</h2>`); //html set to the following in case of error

              //API throttling = how many requests that can be made to an API in A given time period(to not overload servers)
             //error if throttling occurs
                } else if(errorResponse.status === 403) {      //403 - forbidden/access denied
                    //set to date object, store in errorResponse in the header
                    var resetTime = new Date(errorResponse.getResponseHeader(X-rateLimit-Reset)) //header provided by gitHub to let us know when quota is reset. present as unix time stamp, needs to be formatted by * 1000
                    $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}`) //pick up locacation from brower and print in local time
                } else {               //if not a 404 error
                    console.log(errorResponse);
                    $("#gh-user-data").html(
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`); //html set to json reponse
                }
            });

}

//display 'octocat' profile when page loads instead of empty div
$(document).ready(fetchGitHubInformation);