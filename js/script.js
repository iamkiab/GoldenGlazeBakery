
// ========================================
// PART 3: THE GOLDEN GLAZE BAKERY
// WEBSITE JAVASCRIPT
// ========================================


// ========================================
// 1. PRODUCT SEARCH, FILTER AND SORT
// ========================================

const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const productSort = document.getElementById("productSort");
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
const noProducts = document.getElementById("noProducts");

function updateProducts() {

    if (!productList) {
        return;
    }

    const searchValue = productSearch
        ? productSearch.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const selectedSort = productSort
        ? productSort.value
        : "default";

    const products = Array.from(
        productList.querySelectorAll(".product")
    );

    let visibleProducts = products.filter(function(product) {

        const productName = product.textContent.toLowerCase();

        const productCategory = product.dataset.category || "";

        const matchesSearch = productName.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        product.style.display = shouldShow ? "" : "none";

        return shouldShow;
    });

    // Sort products alphabetically
    if (selectedSort === "az") {

        visibleProducts.sort(function(a, b) {
            return a.textContent.localeCompare(b.textContent);
        });

    } else if (selectedSort === "za") {

        visibleProducts.sort(function(a, b) {
            return b.textContent.localeCompare(a.textContent);
        });

    }

    // Display sorted products
    visibleProducts.forEach(function(product) {
        productList.appendChild(product);
    });

    // Update product count
    if (productCount) {
        productCount.textContent =
            visibleProducts.length + " product(s) found";
    }

    // Display message when no products match
    if (noProducts) {
        noProducts.style.display =
            visibleProducts.length === 0 ? "block" : "none";
    }
}

if (productSearch) {
    productSearch.addEventListener("input", updateProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", updateProducts);
}

if (productSort) {
    productSort.addEventListener("change", updateProducts);
}

if (productList) {
    updateProducts();
}


// ========================================
// 2. PRODUCT IMAGE LIGHTBOX
// ========================================

const productImages = document.querySelectorAll(".product img");

if (productImages.length > 0) {

    const lightbox = document.createElement("dialog");

    lightbox.className = "image-lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">
            &times;
        </button>

        <img class="lightbox-image" src="" alt="">

        <p class="lightbox-caption"></p>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");

    function openLightbox(image) {

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent = image.alt;

        lightbox.showModal();
    }

    productImages.forEach(function(image) {

        image.style.cursor = "pointer";

        image.addEventListener("click", function() {
            openLightbox(image);
        });

        image.addEventListener("keydown", function(event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }

        });

    });

    closeButton.addEventListener("click", function() {
        lightbox.close();
    });

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            lightbox.close();
        }

    });

    lightbox.addEventListener("close", function() {
        lightboxImage.src = "";
    });
}


// ========================================
// 3. ENQUIRY FORM VALIDATION
// ========================================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const enquiryType = document.getElementById("enquiry-type").value;
        const message = document.getElementById("message").value.trim();

        const feedback = document.getElementById("enquiryFeedback");

        if (!name || !email || !enquiryType || message.length < 10) {

            feedback.textContent =
                "Please complete all required fields and enter a message of at least 10 characters.";

            feedback.style.color = "red";

            return;
        }

        const enquiryDetails = {
            name: name,
            email: email,
            phone: phone,
            enquiryType: enquiryType,
            message: message
        };

        console.log("Enquiry submitted:", enquiryDetails);

        feedback.textContent =
            "Thank you! Your enquiry has been completed successfully.";

        feedback.style.color = "green";

        enquiryForm.reset();

    });

}


// ========================================
// 4. CONTACT FORM
// PREPARE AN EMAIL DRAFT
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();

        const email = document.getElementById("contact-email").value.trim();

        const messageType = document.getElementById("contact-type").value;

        const message = document.getElementById("contact-message").value.trim();

        const feedback = document.getElementById("contactFeedback");

        if (!name || !email || !messageType || message.length < 10) {

            feedback.textContent =
                "Please complete all fields and enter a message of at least 10 characters.";

            feedback.style.color = "red";

            return;
        }

        // Demonstration recipient for the school project.
        // Replace this with an approved email address if provided.

        const bakeryEmail = "YOUR-BAKERY-EMAIL@example.com";

        const subject = encodeURIComponent(
            "Golden Glaze Bakery - " + messageType
        );

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nMessage Type: " + messageType +
            "\n\nMessage:\n" + message
        );

        const emailLink =
            "mailto:" + bakeryEmail +
            "?subject=" + subject +
            "&body=" + emailBody;

        feedback.textContent =
            "Your message has been prepared. Your email application will open so you can send it.";

        feedback.style.color = "green";

        window.location.href = emailLink;

    });

}


// ========================================
// 5. INTERACTIVE LEAFLET MAP
// TWO FICTIONAL BAKERY BRANCHES
// ========================================

const mapElement = document.getElementById("bakeryMap");

if (mapElement && typeof L !== "undefined") {

    // Centre the map on Johannesburg
    const bakeryMap = L.map("bakeryMap").setView(
        [-26.2041, 28.0473],
        12
    );

    // Load OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }).addTo(bakeryMap);

    // Fictional Branch 1 demonstration marker
    L.marker([-26.2041, 28.0473])
        .addTo(bakeryMap)
        .bindPopup(
            "<b>The Golden Glaze Bakery - Branch 1</b><br>23 Hillstreet"
        );

    // Fictional Branch 2 demonstration marker
    L.marker([-26.1950, 28.0350])
        .addTo(bakeryMap)
        .bindPopup(
            "<b>The Golden Glaze Bakery - Branch 2</b><br>75 Duckroad Main Ave"
        );

}


// ========================================
// END OF WEBSITE JAVASCRIPT
// ========================================
