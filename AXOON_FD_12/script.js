document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    // Using the correct API endpoint
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';

    // Function to display an error message
    function displayError(message) {
        errorMessage.textContent = `Oops! ${message}. It looks like we couldn't fetch the posts right now. Please check your internet connection and try again.`;
        errorMessage.style.display = 'block'; // Make sure the error message is visible
        loadingMessage.style.display = 'none'; // Hide loading message
        postsContainer.innerHTML = ''; // Clear any partial content
    }

    // Function to create and append a post card
    function createPostCard(post) {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');

        const title = document.createElement('h2');
        // Sanitize title by capitalizing first letter if it's not already
        title.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);

        const body = document.createElement('p');
        // Truncate body if it's too long, add ellipsis
        const maxBodyLength = 150;
        body.textContent = post.body.length > maxBodyLength
            ? post.body.substring(0, maxBodyLength) + '...'
            : post.body;

        postCard.appendChild(title);
        postCard.appendChild(body);
        postsContainer.appendChild(postCard);
    }

    // Fetch posts using Promises
    fetch(API_URL)
        .then(response => {
            // Check if the response is OK (status 200-299)
            if (!response.ok) {
                // If not OK, throw an error to be caught by .catch()
                throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
            }
            // Parse the JSON body of the response
            return response.json();
        })
        .then(data => {
            // Data successfully received and parsed
            loadingMessage.style.display = 'none'; // Hide loading message
            errorMessage.style.display = 'none'; // Hide any previous error message

            // Display the first 10 posts
            const firstTenPosts = data.slice(0, 10);
            if (firstTenPosts.length === 0) {
                postsContainer.innerHTML = '<p class="info-message">No posts found to display.</p>';
                return;
            }
            firstTenPosts.forEach(post => {
                createPostCard(post);
            });
        })
        .catch(error => {
            // An error occurred during the fetch operation or parsing
            console.error('Fetch error:', error);
            // Check if it's a network error
            if (error.message.includes('Failed to fetch')) {
                displayError("Network connection lost or server is unreachable");
            } else {
                displayError(error.message); // Display generic error from the throw
            }
        });
});