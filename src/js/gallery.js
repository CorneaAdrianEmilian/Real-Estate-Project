let currentPage = 1;
const itemsPerPage = 5; 
let data = [];  
let filteredData = [];  // Stores filtered/sorted data

document.addEventListener("DOMContentLoaded", function () {
    fetch("./data.json")
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;  
            filteredData = [...data];  // Default to all data
            displayGallery();
            createPagination();
        })
        .catch(error => console.error("Error loading data:", error));

    // Event listener for applying filters
    document.querySelector("#apply-filters").addEventListener("click", applyFilters);
});

function displayGallery() {
    const galleryContainer = document.querySelector("#gallery-container");
    galleryContainer.innerHTML = ""; 

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const currentPageData = filteredData.slice(startIndex, endIndex);

    currentPageData.forEach(property => {
        const card = document.createElement("div");
        card.classList.add("gallery-card");

        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <h2>${property.title}</h2>
            <p><strong>Location:</strong> ${property.location}</p>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Size:</strong> ${property.size}</p>
        `;

        galleryContainer.appendChild(card);
    });

    createPagination();
}

function createPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationContainer = document.querySelector("#pagination");

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.toggle("active", i === currentPage);
        button.addEventListener("click", function () {
            currentPage = i;
            displayGallery();
        });
        paginationContainer.appendChild(button);
    }
}

// Apply sorting and filtering
function applyFilters() {
    filteredData = [...data];

    // Get sorting option
    const sortOption = document.querySelector("#sort").value;
    switch (sortOption) {
        case "price-low":
            filteredData.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredData.sort((a, b) => b.price - a.price);
            break;
        case "size-low":
            filteredData.sort((a, b) => a.size - b.size);
            break;
        case "size-high":
            filteredData.sort((a, b) => b.size - a.size);
            break;
        case "name-asc":
            filteredData.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "name-desc":
            filteredData.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }

    // Get location filter
    const locationFilter = document.querySelector("#location-filter").value.toLowerCase();
    if (locationFilter) {
        filteredData = filteredData.filter(property => 
            property.location.toLowerCase().includes(locationFilter)
        );
    }

    // Reset to first page when applying filters
    currentPage = 1;
    displayGallery();
}