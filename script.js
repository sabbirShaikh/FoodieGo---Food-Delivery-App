//navbar sticky
 const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
      document.body.classList.add("body-offset");
    } else {
      header.classList.remove("sticky");
      document.body.classList.remove("body-offset");
    }
  });


// ===============================
// PRODUCT LIST SECTION
// ===============================
const products = [
  { id: 1, name: "Double Beef Burger", price: "$9.67", image: "images/burger.png" },
  { id: 2, name: "Veggie Pizza", price: "$10.99", image: "images/pizza.png" },
  { id: 3, name: "Fried Chicken", price: "$13.45", image: "images/fried-chicken.png" },
  { id: 4, name: "Chicken Roll", price: "$7.50", image: "images/chicken-roll.png" },
  { id: 5, name: "Sub Sandwich", price: "$6.99", image: "images/sandwich.png" },
  { id: 6, name: "Chicken Lasagna", price: "$16.45", image: "images/lasagna.png" },
  { id: 7, name: "Italian Spaghetti", price: "$7.65", image: "images/spaghetti.png" },
  { id: 8, name: "Spring Roll", price: "$9.31", image: "images/spring-roll.png" }
];

const container = document.getElementById("product-container");

function loadProducts() {
  products.forEach((item) => {
    const card = `
      <div class="order-card text-center">
        <div class="card-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <h4>${item.name}</h4>
        <h4 class="price">${item.price}</h4>
        <a href="#" class="btn add-to-cart" data-id="${item.id}">Add to Cart</a>
      </div>
    `;
    container.innerHTML += card;
  });
}
loadProducts();

// ===============================
// REVIEW SLIDER CODE
// ===============================
const reviews = [
  {
    name: "Guy Hawkins",
    text: "Foodie is the best. Besides the many delicious meals, the service is also very good, especially very fast delivery. I highly recommend Foodie to you.",
    img: "images/profile3.jpeg"
  },
  {
    name: "Sophia Anderson",
    text: "Fresh ingredients, creative menu, and warm service make this spot a hidden gem. Perfect for casual dinners or special nights out. Truly a foodie’s paradise!",
    img: "images/profile2.jpeg"
  },
  {
    name: "Olivia Smith",
    text: "Delicious dishes, cozy ambiance, and exceptional service. A must-visit for food lovers seeking bold flavors and unforgettable dining experiences. Highly recommended!",
    img: "images/profile1.jpeg"
  }
];

let index = 0;

const reviewerName = document.querySelector(".reviewer-name");
const reviewerText = document.querySelector(".review-text");
const reviewerImg = document.querySelector(".reviewer-img");

function updateReview() {
  reviewerName.textContent = reviews[index].name;
  reviewerText.textContent = reviews[index].text;
  reviewerImg.src = reviews[index].img;
}
updateReview();

document.getElementById("nextBtn").addEventListener("click", () => {
  index = (index + 1) % reviews.length;
  updateReview();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  index = (index - 1 + reviews.length) % reviews.length;
  updateReview();
});

// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const menuLinks = mobileMenu.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  document.body.style.overflow =
    mobileMenu.classList.contains("active") ? "hidden" : "auto";
});

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// CART SIDEBAR FUNCTIONALITY

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const closeBtnBottom = document.getElementById("closeBtnBottom");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartValue = document.querySelector(".cart-value");

let cart = [];

// OPEN SIDEBAR
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  document.body.style.overflow = "hidden";
});

// CLOSE SIDEBAR
function closeCartSidebar() {
  cartSidebar.classList.remove("active");
  document.body.style.overflow = "auto";
}
closeCart.addEventListener("click", closeCartSidebar);
closeBtnBottom.addEventListener("click", closeCartSidebar);

// ADD TO CART
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    e.preventDefault();
    const id = Number(e.target.dataset.id);
    const item = products.find(p => p.id === id);
    addToCart(item);
  }
});

function addToCart(item) {
  const existing = cart.find(p => p.id === item.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
}

// UPDATE CART DISPLAY
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price.replace("$", ""));
    total += price * item.quantity;
    count += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>$${price.toFixed(2)}</p>

          <div class="quantity">
            <button class="qty-btn" onclick="changeQty(${item.id}, 'minus')">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 'plus')">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartValue.textContent = count; // update count on icon
}

// CHANGE QUANTITY
function changeQty(id, action) {
  const product = cart.find(p => p.id === id);

  if (action === "plus") product.quantity++;
  else if (action === "minus" && product.quantity > 1) product.quantity--;
  else if (action === "minus" && product.quantity === 1) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}


