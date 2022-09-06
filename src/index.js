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
)
    ;
// check does browser support indexDB
const checkIndexDB = () => {
    if (!window.indexedDB
    ) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
}

// create indexDB c4042;
const createIndexDB = () => {
    // create indexDB
    var request = window.indexedDB.open("c4042", 1);
    // on success
    request.onsuccess = function (event) {
        console.log("indexDB created");
        // create object store
        var db = event.target.result;
        var objectStore = db.createObjectStore("posts", { keyPath: "id" });
        // create index
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("body", "body", { unique: false });
        // add data to indexDB
        var transaction = db.transaction(["posts"], "readwrite");
        var objectStore = transaction.objectStore("posts");
        for (var i in posts) {
            objectStore.add(posts[i]);
        }
        transaction.oncomplete = function (event) {
            console.log("All done!");
        };
        transaction.onerror = function (event) {
            console.log("error");
        }
    }
    // on error
    request.onerror = function (event) {
        console.log("error");
    }
    // on upgrade needed
    request.onupgradeneeded = function (event) {
        console.log("upgrade needed");
    }
}
checkIndexDB();
createIndexDB();
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
