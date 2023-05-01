let lastActivityTime = null;
const posts = [];

function updateLastUserActivityTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      lastActivityTime = new Date();
      resolve();
    }, 1000);
  });
}

function createPost(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts.push(post);
      resolve();
    }, 2000);
  });
}

function deleteLastPost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        const deletedPost = posts.pop();
        resolve(deletedPost);
      } else {
        reject("ERROR: ARRAY IS EMPTY");
      }
    }, 1000);
  });
}

// Call createPost and updateLastUserActivityTime promises together
createPost({ title: "Post 1" })
  .then(() => updateLastUserActivityTime())
  .then(() => {
    console.log("All promises resolved");
    console.log("Posts:", posts);
    console.log("Last Activity Time:", lastActivityTime);

    return deleteLastPost();
  })
  .then((deletedPost) => {
    console.log("Deleted Post:", deletedPost);
    console.log("Updated Posts:", posts);
  })
  .catch((error) => {
    console.log(error);
  });