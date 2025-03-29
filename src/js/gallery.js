document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery-container");


  fetch("data.json")
      .then(response => response.json())
      .then(data => {
          data.forEach(property => {
              const card = document.createElement("div");
              card.classList.add("property-card");

              card.innerHTML = `
                  <img src="${property.image}" alt="${property.title}">
                  <h3>${property.title}</h3>
                  <p><strong>Location:</strong> ${property.location}</p>
                  <p><strong>Price:</strong> ${property.price}</p>
                  <p><strong>Size:</strong> ${property.size}</p>
              `;

              galleryContainer.appendChild(card);
          });
      })
      .catch(error => console.error("Error loading data:", error));
});