
//orderSubmit.html
document.addEventListener('DOMContentLoaded', function () {
    let currentPage = window.location.pathname;
    if (currentPage.includes("orderSubmit.html")) {
        let formData = localStorage.getItem("formData");
        console.log(formData);
        if (formData) {
            formData = JSON.parse(formData);
            let clientInfoElement = document.getElementById("client-info");

            if (clientInfoElement) {
                clientInfoElement.innerHTML = `
                     <ul>
                        <li><strong>Preferred Name:</strong> ${formData.preferredName}</li>
                        <li><strong>Full Name:</strong> ${formData.fullName}</li>
                        <li><strong>Surname:</strong> ${formData.surname}</li>
                        <li><strong>ID Number:</strong> ${formData.idNumber}</li>
                        <li><strong>telephoneWork Phone:</strong> ${formData.telephoneWork}</li>
                        <li><strong>Cellphone Number:</strong> ${formData.cellphoneNumber}</li>
                        <li><strong>E-mail:</strong> ${formData.email}</li>
                        <li><strong>Home Address:</strong> ${formData.homeAddress}</li>
                        <li><strong>Postal Address:</strong> ${formData.postalAddress}</li>
                     </ul>
                `;
            } else {
                console.error("Element with ID 'client-info' not found.");
            }
        } else {
            console.error("No formData found in localStorage.");
        }
        let selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts')) || [];
        const productList = document.getElementById('product-list');
        const totalElement = document.getElementById('total');
        const vatElement = document.getElementById('vat');
        const totalWithVATElement = document.getElementById('totalWithVAT');

        let total = 0;
        let vat = 0.15;
        let totalWithVAT = 0;

        selectedProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: R${product.price}</p>
            `;
            productList.appendChild(productDiv);
            total += product.price;
        });

        vat = total * 0.15;
        totalWithVAT = total + vat;

        totalElement.textContent = `Total: R${total.toFixed(2)}`;
        vatElement.textContent = `VAT (15%): R${vat.toFixed(2)}`;
        totalWithVATElement.textContent = `Total with VAT: R${totalWithVAT.toFixed(2)}`;

        const goToPaymentButton = document.getElementById('goToPayment');
        if (goToPaymentButton) {
            goToPaymentButton.addEventListener('click', function () {
                let productsQuery = selectedProducts.map(product => `${encodeURIComponent(product.name)}=${encodeURIComponent(product.price)}`).join('&');
                let queryString = `preferredName=${encodeURIComponent(formData.preferredName)}&surname=${encodeURIComponent(formData.surname)}&${productsQuery}`;
                window.location.href = `clientPaymentForm.html?${queryString}`;
            });
        }

    }



});


// Lightbox/Index
if (window.location.pathname.includes("index.html")) {
    let lightboxTitle = "Afro Street Art";

    let imgFiles = [
        "img/WhatsApp Image 2024-08-03 at 08.51.45.jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.44.jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.44 (1).jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.43.jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.43 (1).jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.42.jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.42 (1).jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.41.jpeg",
        "img/WhatsApp Image 2024-08-03 at 08.51.41 (1).jpeg",
        "img/R.jfif",
        "img/R (1).jfif",
        "img/Afro Street art logo.png"
    ];

    let imgCaptions = [
        "Elephant head",
        "Family of Meerkat",
        "Two Giraffes",
        "Three headed Giraffes",
        "Love Giraffes",
        "Leopard desk decoration",
        "Buffalo",
        "Rhino",
        "Tea time in the Jungle",
        "African beads",
        "Giraffes keyring",
        "Afro Street logo"
    ];

    window.addEventListener('load', createLightbox);

    function createLightbox() {
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        let lbTitle = document.createElement('h1');
        let lbCounter = document.createElement('div');
        let lbPrev = document.createElement('div');
        let lbNext = document.createElement('div');
        let lbPlay = document.createElement('div');
        let lbImages = document.createElement('div');

        lightbox.appendChild(lbTitle);
        lbTitle.id = 'lbTitle';
        lbTitle.textContent = lightboxTitle;
        lightbox.appendChild(lbCounter);
        lbCounter.id = 'lbCounter';
        let currentImage = 1;
        lbCounter.textContent = currentImage + '/' + imgFiles.length;

        lightbox.appendChild(lbPrev);
        lbPrev.id = 'lbPrev';
        lbPrev.innerHTML = "&#9664;";
        lbPrev.onclick = showPrev;

        lightbox.appendChild(lbNext);
        lbNext.id = 'lbNext';
        lbNext.innerHTML = "&#9654;";
        lbNext.onclick = showNext;

        lightbox.appendChild(lbPlay);
        lbPlay.id = 'lbPlay';
        lbPlay.innerHTML = "&#9199;";

        let timeID;
        lbPlay.onclick = function () {
            if (timeID) {
                window.clearInterval(timeID);
                timeID = undefined;
            } else {
                showNext();
                timeID = window.setInterval(showNext, 1000);
            }
        };

        lightbox.appendChild(lbImages);
        lbImages.id = 'lbImages';

        imgFiles.forEach((file, index) => {
            let img = document.createElement('img');
            img.src = file;
            img.alt = imgCaptions[index];
            img.onclick = createOverlay;
            lbImages.appendChild(img);
        });

        function showNext() {
            lbImages.appendChild(lbImages.firstElementChild);
            (currentImage < imgFiles.length) ? currentImage++ : currentImage = 1;
            lbCounter.textContent = currentImage + "/" + imgFiles.length;
        }

        function showPrev() {
            lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
            (currentImage > 1) ? currentImage-- : currentImage = imgFiles.length;
            lbCounter.textContent = currentImage + "/" + imgFiles.length;
        }

        function createOverlay() {
            let overlay = document.createElement("div");
            overlay.id = "lbOverlay";
            let figurebox = document.createElement("figure");
            overlay.appendChild(figurebox);
            let overlayImage = this.cloneNode(true);
            figurebox.appendChild(overlayImage);

            let overlayCaption = document.createElement("figcaption");
            overlayCaption.textContent = this.alt;
            figurebox.appendChild(overlayCaption);

            let closeButton = document.createElement("div");
            closeButton.id = "lbOverlayCloseButton";
            closeButton.innerHTML = "&times;";
            closeButton.onclick = function () {
                document.body.removeChild(overlay);
            }
            overlay.appendChild(closeButton);

            document.body.appendChild(overlay);
        }
    }
};

// Client Registration
if (window.location.pathname.includes("clientRegistrationForm.html")) {
    let submitButton = document.getElementById('submitButton');
    let sameAsHomeCheckbox = document.getElementById("sameAsHome");
    let homeAddress = document.getElementById("homeAddress");
    let postalAddress = document.getElementById("postalAddress");
    let passwordField = document.getElementById("password");
    let ValidationMessage = document.getElementById("passwordValidationMessage");

    function pNameValidation() {
        let preferefName = document.getElementById("preferredName");
        if (preferefName.validity.valueMissing) {
            preferefName.setCustomValidity("Enter your preferred name to use");
        } else {
            preferefName.setCustomValidity("");
        }
    }

    function fullNameValidation() {
        let fullName = document.getElementById("fullName");
        if (fullName.validity.valueMissing) {
            fullName.setCustomValidity("Enter your full name");
        } else {
            fullName.setCustomValidity("");
        }
    }

    function surnameValidation() {
        let surname = document.getElementById("surname");
        if (surname.validity.valueMissing) {
            surname.setCustomValidity("Enter your surname");
        } else {
            surname.setCustomValidity("");
        }
    }

    function idnumberValidation() {
        let idNumber = document.getElementById("idNumber");
        if (idNumber.validity.valueMissing) {
            idNumber.setCustomValidity("Enter ID Number");
        } else if (idNumber.validity.patternMismatch) {
            idNumber.setCustomValidity("Enter valid ID Number");
        } else {
            idNumber.setCustomValidity("");
        }
    }

    function teleValidation() {
        let telephone = document.getElementById('telephoneWork');
        if (telephone.validity.valueMissing) {
            telephone.setCustomValidity("Enter valid telephone number");
        } else if (telephone.validity.patternMismatch) {
            telephone.setCustomValidity("Enter valid telephone number");
        } else {
            telephone.setCustomValidity("");
        }
    }

    function cellphoneValidation() {
        let cellphone = document.getElementById('cellphoneNumber');
        if (cellphone.validity.valueMissing) {
            cellphone.setCustomValidity("Enter valid cellphone number");
        } else if (cellphone.validity.patternMismatch) {
            cellphone.setCustomValidity("Enter valid cellphone number");
        } else {
            cellphone.setCustomValidity("");
        }
    }

    function validateForm() {
        const password = passwordField.value;
        const passwordRegx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$]).{8,}$/;

        if (!passwordRegx.test(password)) {
            passwordField.setCustomValidity('Password must be at least 8 characters long, include an uppercase letter, a digit, and a symbol (! @ # $).');
            return false;
        } else {
            passwordField.setCustomValidity(''); // Clear the custom validation message
            ValidationMessage.textContent = '';
            return true;
        }
    }

    sameAsHomeCheckbox.addEventListener("change", function () {
        if (this.checked) {
            postalAddress.value = homeAddress.value;
            postalAddress.disabled = true;
        } else {
            postalAddress.disabled = false;
            postalAddress.value = '';
        }
    });

    function emailValidation() {
        let email = document.getElementById("email");
        if (email.validity.valueMissing) {
            email.setCustomValidity("Enter email");
        } else if (email.validity.typeMismatch) {
            email.setCustomValidity("Enter a valid email");
        } else {
            email.setCustomValidity("");
        }
    }

    const lastVisitedElement = document.getElementById('last-visited');

    // Get the last visited date from localStorage
    let lastVisitedDate = localStorage.getItem('lastVisitedDate');

    // If it exists, display it
    if (lastVisitedDate) {
        lastVisitedElement.textContent = `Last visited on: ${lastVisitedDate}`;
    } else {
        lastVisitedElement.textContent = 'This is your first visit.';
    }

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission.

        pNameValidation();
        fullNameValidation();
        surnameValidation();
        idnumberValidation();
        teleValidation();
        cellphoneValidation();
        emailValidation();

        let formData = {
            preferredName: document.getElementById('preferredName').value,
            fullName: document.getElementById('fullName').value,
            surname: document.getElementById('surname').value,
            idNumber: document.getElementById('idNumber').value,
            telephoneWork: document.getElementById('telephoneWork').value,
            cellphoneNumber: document.getElementById('cellphoneNumber').value,
            email: document.getElementById('email').value,
            homeAddress: document.getElementById('homeAddress').value,
            postalAddress: document.getElementById('postalAddress').value
        };

        localStorage.setItem("formData", JSON.stringify(formData));
        window.location.href = "orderSubmit.html";
    });
};

//proudct.html
if (window.location.pathname.includes("products.html")) {
    let products = [
        {
            id: 1,
            name: 'Wild Boar',
            price: 50,
            image: 'img/7cc93307ed05b60421bbbff048d5cabb.jpg',
            description: 'Wild boar made from copper'
        }, {
            id: 2,
            name: 'Impala',
            price: 35,
            image: 'img/86f5e485529e223111727153a5a3f739.jpg',
            description: 'Impala made from wood '
        }, {
            id: 3,
            name: 'Springbok',
            price: 55,
            image: 'img/476beb59a1d36c37ff848401c293f537.jpg',
            description: 'Springbok made from wood'
        }, {
            id: 4,
            name: 'Bull',
            price: 170,
            image: 'img/c1cfd45ee638fdfc1e5256f59de5d529.jpg',
            description: 'Black bull and from stone'
        }, {
            id: 5,
            name: 'Pig',
            price: 100,
            image: 'img/e988e478aadf8a407741e1809dbd867b.jpg',
            description: 'A pig made from an old barrel'
        }, {
            id: 6,
            name: 'Elephant',
            price: 200,
            image: 'img/elephant.webp',
            description: 'Two elephant made of broken glass'
        }, {
            id: 7,
            name: 'Giraffe Gold',
            price: 320,
            image: 'img/Giraffe-nat.jpg',
            description: 'Giraffe statue made of copper and spread with gold paint'
        }, {
            id: 8,
            name: 'Giraffe Sliver',
            price: 300,
            image: 'img/home-design.jpg',
            description: 'A 6 foot Giraffe statue made of copper and spraed with sliver paint'
        }, {
            id: 9,
            name: 'Impala head',
            price: 200,
            image: 'img/OIP (1).jfif',
            description: 'An impala head and of steel'
        }, {
            id: 10,
            name: 'Spingbok stone',
            price: 180,
            image: 'img/OIP (2).jfif',
            description: 'Springbok on an stone and of steel '
        }, {
            id: 11,
            name: 'Bronze Bull',
            price: 280,
            image: 'img/OIP (3).jfif',
            description: 'Bronze Bull statue for table '
        }, {
            id: 12,
            name: 'Timon and Pumbaa',
            price: 120,
            image: 'img/OIP (4).jfif',
            description: 'Metal copper statue on grinite sone of Timon and Pumbaa '
        }
    ];

    let productsContainer = document.getElementById('products');
    products.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" width="100">
            <h3>${product.name}</h3>
            <p>Price: R${product.price}</p>
            <input type="checkbox" id="product-${product.id}" value="${product.price}">
            <p class="product-description" style="display: none;">${product.description}</p>
        `;
        productsContainer.appendChild(productDiv);
    });

    $(document).ready(function () {
        $('.product-image').click(function () {
            $(this).siblings('.product-description').slideToggle('fast');
        });
    });

    document.getElementById('submitButton').onclick = submitOrder;

    function submitOrder() {
        let selectedProducts = [];
        products.forEach(product => {
            let checkbox = document.getElementById(`product-${product.id}`);
            if (checkbox.checked) {
                selectedProducts.push(product);
            }
        });

        sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        document.cookie = `selectedProducts=${encodeURIComponent(JSON.stringify(selectedProducts))}; path=/`;
        location.href = 'orderSubmit.html';
    }
}


//clientPaymentForm.html
if (window.location.pathname.includes('clientPaymentForm.html')) {
    function getQueryParams() {
        let params = {};
        window.location.search.substring(1).split('&').forEach(function (param) {
            let [key, value] = param.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        });

        return params;
    }

    let queryParams = getQueryParams();
    document.getElementById('client-info').innerHTML = `
    <p><strong>Preferred Name:</strong> ${queryParams.preferredName}</p>
    <p><strong>Surname:</strong> ${queryParams.surname}</p>
    `;

    let productsList = document.getElementById('products-list');
    let totalDue = 0;

    Object.keys(queryParams).forEach(key => {
        if (key !== 'preferredName' && key !== 'surname') {
            let price = parseFloat(queryParams[key]);
            productsList.innerHTML += `<li>${key}: R${price.toFixed(2)}</li>`;
            totalDue += price;
        }
    });
    document.getElementById('total-due').textContent = `Total Due: R${totalDue.toFixed(2)}`;
    function validateName() {
        let cardName = document.getElementById("CardName");
        if (cardName.validity.valueMissing) {
            cardName.setCustomValidity("Enter your name as it appears on the card");
        } else {
            cardName.setCustomValidity("");
        }
    }
    function validateCardNum() {
        let cardNum = document.getElementById("CardNumber");
        if (cardNum.validity.valueMissing) {
            cardNum.setCustomValidity("Enter your card number");
        } else if (cardNum.validity.patternMismatch) {
            cardNum.setCustomValidity("Enter a valid card number");
        } else {
            cardNum.setCustomValidity("");
        }
    }
    function validateMonth() {
        let month = document.getElementById("expMonth");
        if (month.selectedIndex === 0) {
            month.setCustomValidity("Select the  expirttion month");
        } else {
            month.setCustomValidity("");
        }
    }
    function validateYear() {
        let year = document.getElementById("expYear");
        if (year.selectedIndex === 0) {
            year.setCustomValidity("Select the expirttion year");
        } else {
            year.setCustomValidity("");
        }
    };
    function validateCVC() {
        let cvc = document.getElementById("cvcNumber");
        if (cvc.validity.valueMissing) {
            cvc.setCustomValidity("Enter your CVC Number");
        } else if (cvc.validity.patternMismatch) {
            cvc.setCustomValidity("Enter a valid CVC Number");
        } else {
            cvc.setCustomValidity("");
        }
    }
    let submitPay = document.getElementById("submitPay");
    submitPay.addEventListener("click", validateName);
    submitPay.addEventListener("click", validateCardNum);
    submitPay.addEventListener("click", validateMonth);
    submitPay.addEventListener("click", validateYear);
    submitPay.addEventListener("click", validateCVC);

    let form = document.getElementById('paymentForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert(`Payment was successful!Total Due: R${totalDue.toFixed(2)}`);
        window.location.href = 'index.html';
    });

};

//staff.html
if (window.location.pathname.includes("staff.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        let staffContainer = document.getElementById("staff-card");


        fetch("staff.json").then(response => response.json()).then(data => {
            data.forEach(member => {
                let card = document.createElement("div");
                card.classList.add("staff-card");

                card.innerHTML = `
                <img src="${member.image}" alt="${member.firstName} ${member.lastName}" class="staff-image">
                <div class="staff-details">
                    <h3>${member.firstName} ${member.lastName}</h3>
                    <p><strong>Job Description:</strong> ${member.jobDescription}</p>
                    <p><strong>Phone:</strong> ${member.workPhoneNumber}</p>
                    <p><strong>Email:</strong> ${member.workEmailAddress}</p>
                </div>
                `;

                staffContainer.appendChild(card);
            });
        }).catch(error => { console.error('Error fetching staff data:,', error); });
    });
};

//play.html
if (window.location.pathname.includes("play.html")) {
    document.addEventListener('DOMContentLoaded', function () {

        let products = document.querySelectorAll('.draggable');
        let basket = document.getElementById('basket');
        let targetProductId = 'targetProduct';
        let currentProductInBasket = null;


        products.forEach(product => {
            product.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData('text', e.target.id);
            });
        });

        basket.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        basket.addEventListener('drop', function (e) {
            e.preventDefault();
            let productId = e.dataTransfer.getData('text');
            let product = document.getElementById(productId);

            if (currentProductInBasket) {
                currentProductInBasket.remove();
            }
            let productClone = product.cloneNode(true);
            productClone.style.position = 'relative';
            productClone.style.marginBottom = '10px';
            basket.insertBefore(productClone, basket.firstChild);
            currentProductInBasket = productClone;

            let removeButton = document.getElementById('remove-button');
            if (!removeButton) {
                removeButton = document.createElement('button');
                removeButton.innerText = 'Remove';
                removeButton.id = 'remove-button';
                let buttonContainer = document.createElement('div');
                buttonContainer.id = 'button-container';
                basket.parentElement.appendChild(buttonContainer);
                buttonContainer.appendChild(removeButton);
            }

            removeButton.addEventListener('click', function () {
                if (currentProductInBasket) {
                    currentProductInBasket.remove();
                    currentProductInBasket = null;
                }
            });

            if (productId === targetProductId) {
                alert("You have successfully moved the target product into the basket!");
            } else {
                alert("This is not the target product, but it has been placed in the basket.");
            }
        });
    });
}








