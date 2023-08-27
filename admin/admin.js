
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebaseConfig from "../config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
var database = firebase.database();

// Function to fetch and display products
function displayProducts(nodeName, char) {
    var plistRef = database.ref(nodeName);

    plistRef.on("value", function (snapshot) {
        var productList = snapshot.val();

        var productHTML = '';

        // Loop through the products and create HTML elements
        for (var key in productList) {
            if (productList.hasOwnProperty(key)) {
                var product = productList[key];
                productHTML += `
                    <div class="product">
                        <button class="delete-btn" onclick="deleteProduct('${nodeName}', '${char}', '${product.id}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <img src="${product.img}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p>${product.desc}</p>
                        <p class="price">${product.price}₹</p>
                    </div>
                `;
            }
        }

        // Render the HTML on the page
        document.getElementById(`product-list-${char}`).insertAdjacentHTML("beforeend", productHTML);
    });
}
// ... your existing Firebase initialization code ...

// Function to delete a product
function deleteProduct(nodeName, char, productId) {
    // Reference to the selected "plist" node
    var plistRef = database.ref(nodeName);

    // Get the product's image URL from the database
    plistRef.child(productId).once("value", function (snapshot) {
        var product = snapshot.val();

        // Delete product data from the database
        plistRef.child(productId).remove()
            .then(function () {
                console.log('Product deleted from RTDB successfully!');

                // Delete product's image from Firebase Storage
                var storageRef = firebase.storage().refFromURL(product.img);
                storageRef.delete()
                    .then(function () {
                        console.log('Product image deleted from Storage successfully!');
                        // Remove the product's HTML element from the page
                        var productElement = document.getElementById(`product-${char}-${productId}`);
                        if (productElement) {
                            productElement.remove();
                        }
                        // Show restore option
                        showRestoreOption();
                    })
                    .catch(function (error) {
                        console.error('Error deleting product image from Storage:', error);
                    });
            })
            .catch(function (error) {
                console.error('Error deleting product from RTDB:', error);
            });
    });
}

/*
// Function to restore a deleted product
function restoreProduct(nodeName, char, productId, productData) {
    // Reference to the selected "plist" node
    var plistRef = database.ref(nodeName);

    // Add the product data back to the database
    plistRef.child(productId).set(productData)
        .then(function () {
            console.log('Product restored in RTDB successfully!');
            // Remove restore option
            removeRestoreOption();
        })
        .catch(function (error) {
            console.error('Error restoring product in RTDB:', error);
        });
}

// Show restore option
function showRestoreOption() {
    var restoreOption = document.getElementById('restore-option');
    if (restoreOption) {
        restoreOption.style.display = 'block';
        startCountdown(3); // Start the countdown timer
    }
    setTimeout(removeRestoreOption, 3000);
}


// Countdown timer
var countdownInterval;
function startCountdown(seconds) {
    var countdownDisplay = document.getElementById('countdown');
    var remainingSeconds = seconds;
    countdownDisplay.textContent = remainingSeconds;

    countdownInterval = setInterval(function () {
        remainingSeconds--;
        countdownDisplay.textContent = remainingSeconds;

        if (remainingSeconds === 0) {
            clearInterval(countdownInterval);
            restoreProduct(nodeName, char, productId, productData);
            removeRestoreOption();
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    var countdownDisplay = document.getElementById('countdown');
    countdownDisplay.textContent = '';
}

// Remove restore option
function removeRestoreOption() {
    var restoreOption = document.getElementById('restore-option');
    if (restoreOption) {
        restoreOption.style.display = 'none';
        resetCountdown(); // Reset the countdown timer
    }
}
*/
// Call the function for each "plist" node
displayProducts("plist-a", "a");
displayProducts("plist-b", "b");
displayProducts("plist-c", "c");













// Reference to the form element
var form = document.querySelector('.p-form form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Extract form data
    var title = document.getElementById('title').value;
    var desc = document.getElementById('desc').value;
    var price = document.getElementById('price').value;
    var list = document.getElementById('list').value;
    var imageFile = document.getElementById('image').files[0];

    // Reference to the selected "plist" node
    var plistRef = database.ref('plist-' + list);

    // Generate a new unique ID for the product
    var newProductId = plistRef.push().key;

    // Create a storage reference to store the image
    var storageRef = firebase.storage().ref('product-images/' + newProductId + '/' + imageFile.name);

    // Upload image to Firebase Storage
    var uploadTask = storageRef.put(imageFile);

    // Create product object
    var newProduct = {
        id: newProductId,
        title: title,
        desc: desc,
        price: price,
        img: null // Placeholder for the image URL
    };

    // Push the new product data (excluding image URL) to the "plist" node
    plistRef.child(newProductId).set(newProduct)
        .then(function () {
            console.log('Product data added to RTDB successfully!');

            // Create a storage reference to store the image
            var storageRef = firebase.storage().ref('product-images/' + newProductId + '/' + imageFile.name);

            // Upload image to Firebase Storage
            var uploadTask = storageRef.put(imageFile);

            // Monitor upload progress
            uploadTask.on('state_changed',
                function (snapshot) {
                    // You can monitor progress here if needed
                },
                function (error) {
                    console.error('Error uploading image:', error);
                },
                function () {
                    // Get the download URL of the uploaded image
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        // Update the product's image URL in the Realtime Database
                        plistRef.child(newProductId).update({ img: downloadURL })
                            .then(function () {
                                console.log('Image URL added to RTDB successfully!');
                                // Clear form fields after adding
                                form.reset();
                            })
                            .catch(function (error) {
                                console.error('Error updating image URL:', error);
                            });
                    });
                });
            alert("Product Added Successfully");

        })
        .catch(function (error) {
            console.error('Error adding product data to RTDB:', error);
            alert("Error adding product data to DB , take a screenshot of the current screen and send it to the developer" + error);
        });
});



// Reference to the search form and input
const searchForm = document.querySelector('.search-box');
const searchInput = searchForm.querySelector('input[type="search"]');
const searchButton = searchForm.querySelector('button');

// Reference to the element where you'll display the search results
const searchResultsContainer = document.querySelector('main');

// Function to fetch and display products based on ID
function searchProductById(productId) {
    // Reference to the Firebase location for each "plist" node
    const plistRefs = ["plist-a", "plist-b", "plist-c"];
    let productFound = false; // Flag to indicate if a match is found

    // Loop through each "plist" reference and fetch the product data
    for (const plistRef of plistRefs) {
        if (productFound) {
            break; // Exit the loop if a match has been found
        }
        const productListRef = database.ref(plistRef);

        productListRef.orderByChild('id').equalTo(productId).once('value', function(snapshot) {
            const productList = snapshot.val();
            console.log("productList", productList);

            if (productList) {
                // Loop through the productList to find the matching productData
                for (const productKey in productList) {
                    
            console.log("productKey", productKey);
                    if (productList.hasOwnProperty(productKey)) {
                        const productData = productList[productKey];
                        if (productData.id === productId) {
                            // Display the product data
                            const productHTML = `
                                <h1> Searched Product : <code>${productId}</code> </h1>
                                <div class="product searched-product">
                                    <img src="${productData.img}" alt="${productData.title}">
                                    <h2>${productData.title}</h2>
                                    <p>${productData.desc}</p>
                                    <p class="price">${productData.price}₹</p>
                                </div>
                            `;
                            searchResultsContainer.innerHTML = productHTML;
                            productFound = true; // Set the flag to true
                            break; // Exit the loop
                        }
                    }
                }
            }
        });
    }

    if (productFound) {
        // Display the product HTML
        searchResultsContainer.innerHTML = productHTML;
    } else {
        // Product not found in any "plist"
        searchResultsContainer.innerHTML = '<h1>Automatic refresh on the way</h1>:)<p>No product found with the provided ID.</p>';
        
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }
}


// Event listener for the search button
searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    const productId = searchInput.value.trim();

    if (productId) {
        // Call the function to search for the product by ID
        searchProductById(productId);
    }
});






// window.removeRestoreOption = removeRestoreOption;
// window.restoreProduct = restoreProduct;
window.deleteProduct = deleteProduct;
// window.startCountdown = startCountdown;
// window.resetCountdown = resetCountdown;
window.searchProductById = searchProductById;