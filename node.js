// know for variables
const list = document.querySelector(".shop-list");
const order_list = document.querySelector(".order-list");
const ordercomplete = document.querySelector(".order-complete");
const newOrder = document.querySelector(".btn-warning");
let productArr;
// end
// function to style for card
const update = (x) => {
  // create container
  const container = document.createElement("div");
  container.classList.add("col-xl-4", "col-sm-6", "col-12", "g-3", "prod");
  list.append(container);
  const card = document.createElement("div");
  card.classList.add("card");
  container.append(card);
  //   create img
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  switch (true) {
    case window.innerWidth < 576:
      img.src = x.image.mobile;
      break;
    case window.innerWidth < 768:
      img.src = x.image.tablet;
      break;
    default:
      img.src = x.image.desktop;
  }
  //   create body card
  const card_body = document.createElement("div");
  card_body.classList.add("card-body");
  //   create btn
  const btn = document.createElement("button");
  btn.classList.add("btn", "d-flex", "button-before");
  //create items for btn
  const icon = document.createElement("img");
  icon.src = "assets/images/icon-add-to-cart.svg";
  icon.classList.add("icon");
  const text_btn = document.createElement("p");
  text_btn.classList.add("mt-auto", "mb-auto", "ms-2");
  text_btn.textContent = "Add to Cart";
  btn.append(icon, text_btn);
  // contineo to card body
  const text_one = document.createElement("p");
  text_one.textContent = x.name;
  text_one.classList.add("mt-2", "product-name-list");
  const text_two = document.createElement("p");
  text_two.textContent = x.category;
  text_two.style.fontWeight = "600";
  const text_three = document.createElement("p");
  text_three.classList.add("price");
  text_three.textContent = "$" + x.price;
  // add to card body
  card_body.append(btn, text_one, text_two, text_three);
  // add to card
  card.append(img, card_body);
};
// end
// function to create shop list
const created = async () => {
  try {
    const response = await fetch("data.json", { method: "GET" });
    const data = await response.json();
    for (let product of data) {
      update(product);
    }
    const shop_list = Array.from(list.children).filter((x) =>
      x.classList.contains("col-sm-6"),
    );
    // event to resize window for image
    window.addEventListener("resize", (x) => {
      let y = 0;
      for (let item of shop_list) {
        switch (true) {
          case window.innerWidth < 576:
            item.querySelector(".card-img-top").src = data[y].image.mobile;
            break;
          case window.innerWidth < 768:
            item.querySelector(".card-img-top").src = data[y].image.tablet;
            break;
          default:
            item.querySelector(".card-img-top").src = data[y].image.desktop;
        }
        y++;
      }
    });
  } catch (err) {
    console.log(err);
  }
};
(async function(){
  await created()
  await local_storage()
})()
// start to add items
// function to display itmes
function display_before_button(x) {
  x.children[0].style.display = "none";
  x.children[1].style.display = "none";
  x.innerHTML += `
      <img src="assets/images/icon-increment-quantity.svg" class='plus'>
      <p class="mt-3 text-light count-items">1</p>
      <img src="assets/images/icon-decrement-quantity.svg" class='nigative'>
      `;
  x.classList.add("btn-add-itmes");
  document.querySelectorAll(".order-impaty").forEach((element) => {
    element.classList.remove("d-flex");
    element.style.display = "none";
  });
}
// end
// function to add items for list
function add_itmes(x) {
  order_list.innerHTML += `<div class="col-12 d-flex justify-content-between pb-3 mt-2 order-item" style="line-height: 15px;
              border-bottom: solid 0.5px rgba(128, 128, 128, 0.742);">
                <div>
                  <p class='product-name-order'>${x.parentElement.children[1].textContent}</p>
                  <span style="color: rgba(148, 7, 7,1);" class='kount'>1x</span>
                  <span class="mx-2 priceitem" style="color: rgba(148, 7, 7, 0.4);">${x.parentElement.querySelector(".price").textContent}</span>
                  <span style="color: rgba(148, 7, 7, 0.4);" class='total-price'>${x.parentElement.querySelector(".price").textContent}</span>
                </div>
                <div class="mt-3">
                  <img src="assets/images/icon-remove-item.svg"class='remove'>
                </div>
              </div>`;
  document.querySelector(".confirm-btn").style.display = "block";
  document.querySelector(".carbon").classList.remove("none");
  document.querySelector(".total-div").classList.remove("none");
}
// end
// function to increase and deacrese cart count
function counter(y, x = 1) {
  x > 0 ? y.textContent++ : y.textContent--;
}
// end
// function to count items in count product
function items_cart(card_body, x = 1) {
  productArr = Array.from(order_list.children).filter((el) => {
    return el.querySelector(".product-name-order");
  });
  const prod = productArr.find((element) => {
    return (
      element.querySelector(".product-name-order").textContent ==
      card_body.querySelector(".product-name-list").textContent
    );
  });
  let price;
  x > 0
    ? (price =
        Number(card_body.querySelector(".price").textContent.replace("$", "")) +
        Number(prod.querySelector(".total-price").textContent.replace("$", "")))
    : (price =
        Number(
          prod.querySelector(".total-price").textContent.replace("$", ""),
        ) -
        Number(card_body.querySelector(".price").textContent.replace("$", "")));
  prod.querySelector(".total-price").textContent = "$" + price;
  let kount = prod.querySelector(".kount");
  x > 0
    ? (kount.textContent = +kount.textContent.replace("x", "") + 1 + "x")
    : (kount.textContent = +kount.textContent.replace("x", "") - 1 + "x");
}
// end
// funcation to remove button
const remove_from_shop = (x) => {
  x.querySelector(".icon").style.display = "block";
  x.querySelector("p").style.display = "block";
  x.querySelector(".plus").remove();
  x.querySelector(".count-items").remove();
  x.querySelector(".nigative").remove();
  x.classList.remove("btn-add-itmes");
};
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
const remove_from_order = (x) => {
  productArr = Array.from(order_list.children).filter((el) => {
    return el.querySelector(".product-name-order");
  });
  const prod = productArr.find((y) => {
    return (
      y.querySelector(".product-name-order").textContent ==
      x.querySelector(".product-name-list").textContent
    );
  });
  prod.remove();
};
//end
// function to back cart image
function cart_image() {
  order_list.querySelectorAll(".order-impaty")[0].style.display = "flex";
  order_list.querySelectorAll(".order-impaty")[1].style.display = "block";
  document.querySelector(".confirm-btn").style.display = "none";
  document.querySelector(".carbon").classList.add("none");
  document.querySelector(".total-div").classList.add("none");
}
// ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
// event to add list to cart
list.addEventListener("click", (e) => {
  // to change button first time
  if (
    e.target.closest("button") &&
    e.target.closest("button").querySelector("p").style.display != "none"
  ) {
    local(e.target.closest(".card"), 1);
    add_itmes(e.target.closest("button"));
    display_before_button(e.target.closest("button"));
    counter(order_list.querySelector(".count-list"), 1);
    count_total();
  } else if (e.target.closest(".plus")) {
    // to count for items in cart
    counter(
      e.target.closest(".plus").parentElement.querySelector(".count-items"),
    );
    items_cart(e.target.closest(".card-body"));
    count_total();
    local(
      e.target.closest(".card"),
      e.target.closest(".card").querySelector(".count-items").textContent,
    );
  } else if (e.target.closest(".nigative")) {
    if (
      e.target.closest("button").querySelector(".count-items").textContent != 1
    ) {
      counter(e.target.closest("button").querySelector(".count-items"), -1);
      items_cart(e.target.closest(".card-body"), -1);
      local(
        e.target.closest(".card"),
        e.target.closest(".card").querySelector(".count-items").textContent,
      );
    } else {
      local(e.target.closest(".card"), 0);
      remove_from_order(e.target.closest(".card-body"));
      counter(order_list.querySelector(".count-list"), -1);
      remove_from_shop(e.target.closest("button"));
      order_list.querySelector(".count-list").textContent == 0
        ? cart_image()
        : console.log("ahmed");
    }
    count_total();
  }
});
// end
// event to order list
order_list.addEventListener("click", (e) => {
  if (e.target.closest(".remove")) {
    counter(order_list.querySelector(".count-list"), -1);
    back(e.target.closest(".order-item"));
    e.target.closest(".order-item").remove();
    order_list.querySelector(".count-list").textContent == 0
      ? cart_image()
      : console.log("ahmed");
  }
});
// end
// function to back button only
function back(x) {
  const products = list.querySelectorAll(".prod");
  const prod = Array.from(products).find((el) => {
    return (
      el.querySelector(".product-name-list").textContent ==
      x.querySelector(".product-name-order").textContent
    );
  });
  remove_from_shop(prod.querySelector("button"));
}
//end
// function to count total price
function count_total() {
  productArr = Array.from(order_list.children).filter((el) => {
    return el.querySelector(".product-name-order");
  });
  const total = productArr.reduce((tot, x) => {
    return (
      tot + Number(x.querySelector(".total-price").textContent.replace("$", ""))
    );
  }, 0);
  document.querySelector(".total").textContent = "$" + total;
}
// end
// to create complete order
function order_complete() {
  const products = Array.from(order_list.querySelectorAll(".order-item"));
  for (let prodeuct of products) {
    create_complete(prodeuct);
  }
  document.querySelector(".container-confirm").classList.remove("d-none");
}

////////////////////////////////////////////////////////

function create_complete(x) {
  productArr = Array.from(list.children).filter((el) => {
    return el.querySelector(".product-name-list");
  });
  const prod = productArr.find((y) => {
    return (
      y.querySelector(".product-name-list").textContent ==
      x.querySelector(".product-name-order").textContent
    );
  });
  const itemcom = `                <div
                class="col-12 d-flex justify-content-between align-items-center bord"
              >
                <div class="d-flex align-items-center">
                  <img
                    src="${prod.querySelector(".card-img-top").src}"
                    width="40px"
                    height="40px"
                    style="border-radius: 2px"
                  />
                  <div class="ms-3 mt-2">
                    <p class="my-0">${x.querySelector(".product-name-order").textContent}</p>
                    <p>
                      <span class="me-4 text-danger">${x.querySelector(".kount").textContent}</span
                      ><span style="color: rgba(148, 7, 7, 0.4)">${x.querySelector(".priceitem").textContent}</span>
                    </p>
                  </div>
                </div>
                <p class="mt-2" style="font-weight: 700">${x.querySelector(".total-price").textContent}</p>
              </div>`;
  document.querySelector(".total-complete").textContent =
    order_list.querySelector(".total").textContent;
  ordercomplete.innerHTML += itemcom;
}

//////////////////////////////////////////////////

newOrder.addEventListener("click", () => {
  document.querySelector(".container-confirm").classList.add("d-none");
  const items = Array.from(ordercomplete.children).filter((X) => {
    return X.classList.contains("bord");
  });
  items.forEach((x) => x.remove());
  cart_image();
  productArr = Array.from(order_list.children).filter((el) => {
    return el.querySelector(".product-name-order");
  });
  productArr.forEach((x) => x.querySelector(".remove").click());
});

//////////////////////////////////

function local(x, y) {
  const data = x.querySelector(".product-name-list").textContent;
  if (y == 0) {
    localStorage.removeItem(data);
  } else {
    localStorage.setItem(data, y);
  }
}
function local_storage(){
  const num=localStorage.length
    for(let i=0;i< num;i++){
      const namedata= localStorage.key(i)
      const products=Array.from(list.children).filter(x=>{
      return  x.classList.contains('col-xl-4')
      })
      const prod= products.find(x=>{
     return   x.querySelector('.product-name-list').textContent==namedata
      })
      const numer=Number(localStorage.getItem(namedata))
      for(let z=0;z<numer;z++){
        if(prod.querySelector('.icon').style.display!='none'){
          prod.querySelector('button').click()
        }
        else{
          prod.querySelector('.plus').click()
        }
      }
    }
  }
