let currentPage = 1;
const itemsPerPage = 5; 
let data = [];  


document.addEventListener("DOMContentLoaded", function () {
    fetch("./data.json")
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;  
            displayGallery(data);
            createPagination(data.length);
        })
        .catch(error => console.error("Error loading data:", error));
});

function displayGallery(data) {
    const galleryContainer = document.querySelector("#gallery-container");
    galleryContainer.innerHTML = ""; 


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    

    const currentData = data.slice(startIndex, endIndex);

    currentData.forEach(property => {
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
}

function createPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.querySelector("#pagination");

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", function () {
            currentPage = i;
            displayGallery(data); 
        });
        paginationContainer.appendChild(button);
    }
}