document.addEventListener('DOMContentLoaded', function() {
    const recommendationsContainer = document.getElementById('recommendations-container');

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(recommendation => {
                const { name, description, imageUrl } = recommendation;

                // Create recommendation element
                const recommendationDiv = document.createElement('div');
                recommendationDiv.classList.add('recommendation');

                // Create image element
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = name;

                // Create heading element
                const heading = document.createElement('h3');
                heading.textContent = name;

                // Create description paragraph
                const descriptionPara = document.createElement('p');
                descriptionPara.textContent = description;

                // Append elements to recommendation div
                recommendationDiv.appendChild(image);
                recommendationDiv.appendChild(heading);
                recommendationDiv.appendChild(descriptionPara);

                // Append recommendation div to container
                recommendationsContainer.appendChild(recommendationDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
        });
});

// Event listener for form submission (Search button)
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input value and normalize to lowercase
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Fetch data from JSON file or API
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Determine the category based on searchTerm
            let filteredResults = data.filter(recommendation =>
                recommendation.name.toLowerCase().includes(searchTerm)
            );

            // Display results if any matching data is found
            if (filteredResults.length > 0) {
                displayResults(filteredResults);
            } else {
                alert('No matching recommendations found for: ' + searchTerm);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        // Create HTML for each result
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');

        resultElement.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;

        resultsContainer.appendChild(resultElement);
    });
}

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('searchInput').value = ''; // Clear input field
    document.getElementById('searchResults').innerHTML = ''; // Clear search results
});
