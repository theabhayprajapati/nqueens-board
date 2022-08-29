// https://jsonplaceholder.typicode.com/posts
const getPosts = () => {
    return fetch("https://jsonplaceholder.typicode.com/posts")

        .then(response => response.json())
        .then(json => {
            return json;
        }).catch(error => {
            console.log(error);
        }
        );
}
getPosts().then(pts => {
    console.log("Getting posts");
    // print onle 5 post;
    console.log(pts.slice(0, 5));
    // var #posts
    var posts = document.getElementById("posts");
    // loop through posts and print on the page
    for (var i = 0; i < pts.slice(0, 5).length; i++) {
        var post = pts[i];
        var postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
            <h2>${post.title}</h2>

            <p>${post.body}</p>
        `;
        posts.appendChild(postDiv);
    }

}).catch(error => {
    console.log(error);
}
);
// regester service worker
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(function (registration) {
                console.log('Service worker registered!', registration);
            }).catch(function (err) {
                console.log('Service worker registration failed: ', err);
            });
    }
}
registerServiceWorker();
