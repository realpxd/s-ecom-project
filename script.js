// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Reference to the Firebase Realtime Database
var database = firebase.database();

// Function to fetch and display products
function displayProducts(nodeName, num) {
	var plistRef = database.ref(nodeName);

	plistRef.on("value", function (snapshot) {
		var productList = snapshot.val();

		var productHTML = '';

		// Loop through the products and create HTML elements
		for (var key in productList) {
			if (productList.hasOwnProperty(key)) {
				var product = productList[key];
				productHTML += `

					<div class="product" id="product" onclick='displayDataFunc("${product.img}" , "${product.title}" , "${product.desc}", "${product.price}" , "${product.id}")'>
						<img src="${product.img}" alt="product" />
						<h4>${product.title}</h4>
						<p>${product.desc}</p>
						<p id="pri">${product.price}₹</p>
					</div>
                `;
			}
		}

		// Render the HTML on the page
		prodCont[num].insertAdjacentHTML("beforeend", productHTML);
	});
}


displayProducts("plist-a", "0");
displayProducts("plist-b", "1");
displayProducts("plist-c", "2");



const menuIcon = document.querySelector(".menuBar")
const sNav = document.querySelector(".sNav")
/*const prodContA = document.querySelector(".b-b #productSlider")*/
sNav.style.left = "-120vw"
menuIcon.addEventListener("click", function () {
	if (sNav.style.left == "-120vw") {
		sNav.style.left = "0"
		//menuIcon.value = "&#8801;"
		newMult()
	} else {
		sNav.style.left = "-120vw"
		//menuIcon.value = "&#9587;"
		defaultHb()
	}
})

//Function to Change the Hamburger icon
var equationValue = new Array("", '&#9587;', '&#8801;', 0, 2, 3);
var mdiv = document.createElement("p");

function newMult() {
	mdiv.innerHTML = equationValue[1];
	menuIcon.value = (mdiv.textContent || mdiv.innerText);
	menuIcon.style.fontSize = "2rem";
	menuIcon.style.fontWeight = "700";
};
function defaultHb() {
	mdiv.innerHTML = equationValue[2];
	menuIcon.value = (mdiv.textContent || mdiv.innerText);
	menuIcon.style.fontSize = "3rem";
	menuIcon.style.fontWeight = "200";
};


const prodCont = document.querySelectorAll(".b-b .productSlider")
const dvcWrapper = document.querySelector(".wrapper-a")
const detailViewCont = document.querySelector(".c-z")




function displayDataFunc(img, title, desc, price, pid) {
	//alert(img + title + desc + price)
	var viewDetailData = `
		<i onclick="caretToggle()" class="fa fa-caret-down"></i>
		<div class="section s-a" id="s-a" >
			<img src="${img}" alt="product" />
		</div>
		<div class="section s-b" id="s-b">
			<h2>${title}</h2>
			<desc>${desc}</desc>
			<pri>${price}₹</pri>
		</div>
		<!-- <button onclick="buy('${pid}')"><i class="fa fa-whatsapp"></i>Contact on Whatsapp to Buy !</button> -->
		
		<div id="buttons"><button  onclick="initiatePayment('${pid}' , '${price}' , '${desc}')" id="payButton"><i class="fa fa-shopping-cart"></i>Buy Now!</button> <button onclick="buy('${pid}')"><i class="fa fa-whatsapp"></i>Get more Info!</button> </div>
	`
	console.log(pid)
	detailViewCont.innerHTML = viewDetailData
	dvcWrapper.style.display = "grid"

	function exec() {
		detailViewCont.style.bottom = "0"
	}
	setTimeout(exec, 100)
	document.body.style.overflow = "hidden"

}

function caretToggle() {
	console.log("this")
	const caret = document.querySelector(".fa-caret-down")
	detailViewCont.style.bottom = "-120vh"
	function exec() {
		dvcWrapper.style.display = "none"
	}
	setTimeout(exec, 500)
	document.body.style.overflow = "auto"
	document.body.style.overflowX = "hidden"
}

function buy(pid) {
	var name = prompt("What's your Name ?");
	window.location.href = "https://wa.me/918278568770?text=Hi%20Shubham,My%20name%20is%20" + name + "%20and%20am%20interested%20in%20this%20product%20:-%20*PID*:%20" + pid + "%20.%20Can%20you%20please%20provide%20me%20more%20details%20about%20it?%20"
}


window.newMult = newMult;
window.defaultHb = defaultHb;
window.displayDataFunc = displayDataFunc;
window.caretToggle = caretToggle;
window.buy = buy;
window.displayProducts = displayProducts;
