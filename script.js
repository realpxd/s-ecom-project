var a = 20
console.log(a)

var p_array_A = [
	{
		"img" : "./assets/img/blob.svg",
		"title" : "Product 1",
		"desc" : "Lorem ipsum dolor sit amet",
		"price" : "1000₹",
		"id" : "p1_this"
	},
	{
		"img" : "./assets/img/blob.svg",
		"title" : "Product 2",
		"desc" : "Lorem ipsum dolor sit amet",
		"price" : "negotiable",
		"id" : "p2_this"
	},
	{
		"img" : "./assets/img/blob.svg",
		"title" : "Product 3",
		"desc" : "Lorem ipsum dolor sit amet",
		"price" : "9000₹",
		"id" : "p3_this"
	}
]
console.log(p_array_A)

const menuIcon = document.querySelector(".menuBar")
const sNav = document.querySelector(".sNav")
/*const prodContA = document.querySelector(".b-b #productSlider")*/
sNav.style.left = "-120vw"
menuIcon.addEventListener("click" , function(){
	if(sNav.style.left == "-120vw"){
		sNav.style.left = "0"
		//menuIcon.value = "&#8801;"
		newMult()
	}else{
		sNav.style.left = "-120vw"
		//menuIcon.value = "&#9587;"
		defaultHb()
	}
})

//Function to Change the Hamburger icon
var equationValue = new Array("",'&#9587;','&#8801;',0,2,3);
var mdiv = document.createElement("p");

function newMult(){
	mdiv.innerHTML = equationValue[1];
	menuIcon.value = (mdiv.textContent || mdiv.innerText);
	menuIcon.style.fontSize = "2rem";
	menuIcon.style.fontWeight = "700";
};
function defaultHb(){
	mdiv.innerHTML = equationValue[2];
	menuIcon.value = (mdiv.textContent || mdiv.innerText);
	menuIcon.style.fontSize = "3rem";
	menuIcon.style.fontWeight = "200";
};


const prodCont = document.querySelectorAll(".b-b .productSlider")
const dvcWrapper = document.querySelector(".wrapper-a")
const detailViewCont = document.querySelector(".c-z")


p_array_A.map((prod) => {
	var displayData = `
		<div class="product" id="product" onclick='displayDataFunc("${prod.img}" , "${prod.title}" , "${prod.desc}", "${prod.price}" , "${prod.id}")'>
			<img src="${prod.img}" alt="product" />
			<h3>${prod.title}</h3>
			<p>${prod.desc}</p>
			<p id="pri">${prod.price}</p>
		</div>
	
	`
	prodCont[0].insertAdjacentHTML("beforeend", displayData)
	
})

p_array_A.map((prod) => {
	var displayData = `
		<div class="product" id="product" onclick='displayDataFunc("${prod.img}" , "${prod.title}" , "${prod.desc}", "${prod.price}" , "${prod.id}")'>
			<img src="${prod.img}" alt="product" />
			<h3>${prod.title}</h3>
			<p>${prod.desc}</p>
			<p id="pri">${prod.price}</p>
		</div>
	
	`
	prodCont[1].insertAdjacentHTML("beforeend", displayData)
	
})

p_array_A.map((prod) => {
	var displayData = `
		<div class="product" id="product" onclick='displayDataFunc("${prod.img}" , "${prod.title}" , "${prod.desc}", "${prod.price}" , "${prod.id}")'>
			<img src="${prod.img}" alt="product" />
			<h3>${prod.title}</h3>
			<p>${prod.desc}</p>
			<p id="pri">${prod.price}</p>
		</div>
	
	`
	prodCont[2].insertAdjacentHTML("beforeend", displayData)
	
})


function displayDataFunc(img , title , desc , price , pid){
	//alert(img + title + desc + price)
	var viewDetailData = `
		<i onclick="caretToggle()" class="fa fa-caret-down"></i>
		<div class="section s-a" id="s-a" >
			<img src="${img}" alt="product" />
			<h2>${title}</h2>
		</div>
		<div class="section s-b" id="s-b">
			<desc>${desc}</desc>
			<pri>${price}</pri>
		</div>
		<button onclick="buy('${pid}')"><i class="fa fa-whatsapp"></i>Contact on Whatsapp to Buy !</button>
	`
	console.log(pid)
	detailViewCont.innerHTML = viewDetailData
	dvcWrapper.style.display = "block"
	
	function exec(){
	detailViewCont.style.bottom = "0"
	}
	setTimeout(exec , 100)
	document.body.style.overflow = "hidden"
	
}

function caretToggle(){
	console.log("this")
	const caret = document.querySelector(".fa-caret-down")
	detailViewCont.style.bottom = "-120vh"
	function exec(){
	dvcWrapper.style.display = "none"
	}
	setTimeout(exec , 500)
	document.body.style.overflow = "auto"
	document.body.style.overflowX = "hidden"
}

function buy(pid){
	var name = prompt("What's your Name ?");
	window.location.href = "https://wa.me/918278568770?text=Hi%20Shubham,My%20name%20is%20"+name+"%20and%20am%20interested%20in%20this%20product%20:-%20*PID*:%20" + pid + "%20.%20Can%20you%20please%20provide%20me%20more%20details%20about%20it?%20"
}