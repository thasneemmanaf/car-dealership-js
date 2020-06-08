window.addEventListener("load", () =>
  document.querySelector(".preloader").classList.add("hidePreloader")
);
// create cars
const createCars = (function () {
  const cars = [];
  class Cars {
    constructor(make, country, img, special, model, price, type, trans, gas) {
      this.make = make;
      this.country = country;
      this.img = img;
      this.special = special;
      this.model = model;
      this.price = price;
      this.type = type;
      this.trans = trans;
      this.gas = gas;
    }
  }
  function makeCar(
    make,
    country,
    img,
    special = true,
    model = "mercedes",
    price = "$1000",
    type = "sedan",
    trans = "auto",
    gas = "50"
  ) {
    const car = new Cars(
      make,
      country,
      img,
      special,
      model,
      price,
      type,
      trans,
      gas
    );
    cars.push(car);
  }

  function produceCars() {
    makeCar("bmw1a", "american", "img/car-american-1.jpeg");
    makeCar("bmw1a", "american", "img/car-american-3.jpeg", false);
    makeCar("bmw2g", "german", "img/car-american-2.jpeg", false);
    makeCar("bmw3g", "german", "img/car-american-3.jpeg");
    makeCar("bmw4a", "american", "img/car-american-4.jpeg", false);
    makeCar("bmwg", "german", "img/car-german-5.jpeg", false);
    makeCar("bmw5a", "american", "img/car-german-3.jpeg");
    makeCar("bmw6g", "german", "img/car-german-4.jpeg", false);
    makeCar("bmwg", "german", "img/car-american-3.jpeg", false);
    makeCar("bmw7a", "american", "img/car-german-5.jpeg");
    makeCar("bmw8g", "german", "img/car-german-4.jpeg");
  }
  produceCars();
  const specialCars = cars.filter(function (car) {
    return car.special === true;
  });
  return { cars, specialCars };
})();

// display special cars
const displaySpecialCars = (function (createCars) {
  document.addEventListener("DOMContentLoaded", function () {
    const itemInfo = document.querySelector(".featured-info");
    let dynamicItem = "";
    let image;
    createCars.specialCars.forEach(function (specialCar) {
      dynamicItem =
        dynamicItem +
        `<div
              class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap"
            >
              <span data-img="${specialCar.img}" class="featured-icon mr-2">
                <i class="fas fa-car"></i>
              </span>
              <h5 class="font-weight-bold mx-1">${specialCar.make}</h5>
              <h5 class="mx-1">${specialCar.model}</h5>
            </div>`;
    });
    itemInfo.innerHTML = dynamicItem;
    // display image dynamically
    itemInfo.addEventListener("click", function (e) {
      if (e.target.parentElement.classList.contains("featured-icon")) {
        image = e.target.parentElement.dataset.img;
        document.querySelector(".featured-photo").src = image;
      }
    });
  });
})(createCars);

// display all cars
const displayAllCars = (function (createCars) {
  const allCars = createCars.cars;
  let dynamicItem = "";
  document.querySelector(".inventory-container").innerHTML = "";
  document.addEventListener("DOMContentLoaded", function () {
    allCars.forEach(function (car) {
      dynamicItem =
        dynamicItem +
        `<!-- single car -->
          <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${car.country} ">
            <div class="card car-card">
              <img
                src=${car.img}
                class="card-img-top car-img"
                alt=""
              />
              <!-- card body -->
              <div class="card-body">
                <div class="car-info d-flex justify-content-between">
                  <!-- first flex child -->
                  <div class="car-text text-uppercase">
                    <h6 class="font-weight-bold">${car.make}</h6>
                    <h6>${car.model}</h6>
                  </div>
                  <!-- second flex child -->
                  <h5 class="car-value align-self-center py-2 px-3">
                    $
                    <span class="car-price">${car.price}</span>
                  </h5>
                </div>
              </div>
              <!-- end of card -->
              <div
                class="card-footer text-capitalize d-flex justify-content-between"
              >
                <p>
                  <span><i class="fas fa-car"></i></span>${car.type}
                </p>
                <p>
                  <span><i class="fas fa-cogs"></i></span>${car.trans}
                </p>
                <p>
                  <span><i class="fas fa-gas-pump"></i></span>${car.gas}
                </p>
              </div>
            </div>
          </div>
          <!--end of single car -->`;
    });
    document.querySelector(".inventory-container").innerHTML = dynamicItem;
  });
})(createCars);

// filter buttons
const filterCars = (function () {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      let value = e.target.dataset.filter;
      const allCars = document.querySelectorAll(".single-car");
      allCars.forEach(function (car) {
        if (value === "all") {
          car.style.display = "block";
        } else if (value === "american") {
          if (car.classList.contains("american")) {
            car.style.display = "block";
          } else {
            car.style.display = "none";
          }
        } else {
          if (car.classList.contains("german")) {
            car.style.display = "block";
          } else {
            car.style.display = "none";
          }
        }
      });
    });
  });
})();
