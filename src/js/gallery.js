let currentPage = 1;
const itemsPerPage = 10;
let data = [];
let filteredData = [];
const params = new URLSearchParams(window.location.search);


const view = new URLSearchParams(window.location.search).get("view") || "sale";

document.addEventListener("DOMContentLoaded", function () {
    fetch("./data.json")
        .then(response => response.json())
        .then(fetchedData => {

            data = fetchedData.map(item => ({
                ...item,
                priceOriginal: item.price, 
                price: parseFloat(item.price.replace(/[^0-9.]/g, "")), 
                size: parseFloat(item.size.replace(/[^0-9.]/g, "")) 
            }));
            

            filteredData = data.filter(property => {
                if (view === "rent") {
                    return property.priceOriginal.includes("/month"); 
                } else if (view === "sale") {
                    return !property.priceOriginal.includes("/month"); 
                }
                return true; 
            });


            displayGallery();
            createPagination();
        })
        .catch(error => console.error("Error loading data:", error));

    document.querySelector("#apply-filters").addEventListener("click", applyFilters);
});

function displayGallery() {
    const galleryContainer = document.querySelector("#gallery-container");


    galleryContainer.style.opacity = 0;

    setTimeout(() => {
        galleryContainer.innerHTML = "";


        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = filteredData.slice(startIndex, endIndex);

 
        currentPageData.forEach(property => {
            const card = document.createElement("div");
            card.classList.add("gallery-card");

            card.innerHTML = `
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <h2 tabindex="0">${property.title}</h2> 
                <p tabindex="0"><strong>Location:</strong> ${property.location}</p> 
                <p tabindex="0"><strong>Price:</strong> ${property.priceOriginal}</p> 
                <p tabindex="0"><strong>Size:</strong> ${property.size} sqm</p> 
            `;
            galleryContainer.appendChild(card);
        });


        galleryContainer.style.opacity = 1;


        document.querySelector("#pagination").style.display = "flex";
    }, 200); 
}

function createPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationContainer = document.querySelector("#pagination");

    paginationContainer.innerHTML = "";


    if (totalPages <= 1) {
        paginationContainer.style.display = "none";
    } else {
        paginationContainer.style.display = "flex";
    }

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

function applyFilters() {

    filteredData = data.filter(property => {
        if (view === "rent") {
            return property.priceOriginal.includes("/month");
        } else if (view === "sale") {
            return !property.priceOriginal.includes("/month"); 
        }
        return true;
    });

    const locationFilter = document.querySelector("#location-filter").value.toLowerCase();
    if (locationFilter) {
        filteredData = filteredData.filter(property => 
            property.location.toLowerCase().includes(locationFilter)
        );
    }

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


    currentPage = 1;


    createPagination();


    displayGallery();
}