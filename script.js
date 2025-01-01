const allCategoryButton = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  allCategoryDisplay(data.categories);
};
const allCategoryDisplay = (categories) => {
  const allCategorys = document.getElementById("categoryContainer");
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = `
             <button id="sortPrice"class=" bg-activeBtn focus:bg-green-200 focus:rounded-full categoryBtn px-8 py-3 md:px-14  md:py-5 border rounded-xl md:justify-between md:mx-auto flex items-center gap-2"><img class="size-8" src="${category.category_icon}" alt=""> ${category.category}</button> 
           `;
    button.onclick = function () {
      const newButton = document.querySelectorAll(".categoryBtn");
      for (const btn of newButton) {
      }

      petsAllCategory(category.category);
    };
    allCategorys.appendChild(button);
  });
};

const allDataLoad = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  allDataDisplay(data.pets);
};

const allDataDisplay = (categories, pets) => {
  const cartContainer = document.getElementById("cartContainer");
  document.getElementById("cartContainer").innerHTML = null;
  if (categories.length == 0) {
    cartContainer.innerHTML = `
  <div class="border p-5 gap-5 flex flex-col justify-center items-center rounded-xl bg-gray-300 container mx-auto lg:h-[400px] lg:w-[1050px]">
  <img src="./image/error.webp" alt="">
 <h2 class="text-2xl font-bold">No Information Available</h2>
 <p class="font-bold text-sm">Please! Choose Another Animal</p>
  </div>
  `;
    return;
  } else {
    cartContainer.classList.add("w-auto");
  }

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="border p-5 rounded-xl flex flex-col">
                    <img class="rounded-lg" src="${category.image}" alt="">
                <div>
                    <h4 class="font-bold text-xl">${category.pet_name}</h4>
                    <p class="text-gray-400 font-base flex gap-2 my-1"> <i
                            class="fa-solid fa-vector-square my-1"></i><span>Breed: ${
                              category.breed == null || undefined
                                ? "Not available"
                                : category.breed
                            }  </span></p>
                    <p class="text-gray-400 font-base flex gap-2 my-1"><i
                            class="fa-regular fa-calendar my-1"></i><span>Birth: ${
                              category.date_of_birth == null || undefined
                                ? "Not available"
                                : category.date_of_birth
                            } </span></p>
                    <p class="text-gray-400 font-base flex gap-2 my-1"><i
                            class="fa-solid fa-venus my-1"></i><span>Gender: ${
                              category.gender == null || undefined
                                ? "Not available"
                                : category.gender
                            }  </span></p>
                    <p class="text-gray-400 font-base flex gap-2 my-1"><i
                            class="fa-solid fa-dollar-sign my-1"></i><span>Price: ${
                              category.price == null || undefined
                                ? "Not available"
                                : category.price
                            }$</span></p>
                    <hr class="border my-4 ">
                    <div class="flex justify-between">
                        <button onclick="categoryImage('${
                          category.image
                        }')" class="btn border-btnColor text-btnColor hover:bg-btnColor "><img
                                src="https://img.icons8.com/?size=24&id=82788&format=png" alt=""></button>
                        <button id="adopt" onclick="adoptModal()"  class="btn border-btnColor text-lg text-btnColor hover:bg-btnColor hover:text-white ">Adopt</button>
                        <button onclick="petDetails('${
                          category.petId
                        }');my_modal_5.showModal()" id="detailsButton" class="btn  py-2 text-lg border-btnColor text-btnColor hover:bg-btnColor hover:text-white" >Details</button>
                    </div>
                </div>
            </div> 
        `;
    cartContainer.appendChild(div);
    spinner(false);
  });
};

let countDown;
const adoptModal = () => {
  my_modal_2.showModal();
  const time = document.getElementById("counter");
  let timer = 3;
  if (countDown) {
    clearInterval(countDown);
  }
  time.innerText = timer;
  countDown = setInterval(() => {
    timer--;
    time.innerText = timer;
    if (timer <= 0) {
      my_modal_2.close();
      clearInterval(countDown);
    }
  }, 1000);
};

// Fetch Pet Details by ID
const petDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();

  petDetailsDisply(data.petData);
};

const petDetailsDisply = (petId) => {
  const images = document.getElementById("image");
  const petName = document.getElementById("petName");
  const petBreeds = document.getElementById("petBreed");
  const petBirth = document.getElementById("petBirth");
  const petGenders = document.getElementById("petGender");
  const vaccinatd = document.getElementById("vaccinatd");
  const petPrice = document.getElementById("petPrice");
  const petDetails = document.getElementById("petDetails");
  images.src = `${petId.image}`;
  petName.innerText = `${
    petId.pet_name == null || undefined ? "Not available" : petId.pet_name
  }`;
  petBreeds.innerText = `Breed: ${
    petId.breed == null || undefined ? "Not available" : petId.breed
  }`;
  petBirth.innerText = `Birth: ${
    petId.date_of_birth == null || undefined
      ? "Not available"
      : petId.date_of_birth
  }`;
  petGenders.innerText = `Genter: ${
    petId.gender == null || undefined ? "Not available" : petId.gender
  }`;
  vaccinatd.innerText = `vaccinated status: ${
    petId.vaccinated_status == null || undefined || "Not" ? "Not available" : petId.vaccinated_status
  }`;
  petPrice.innerText = `Price: ${
    petId.price == null || undefined ? "Not available" : petId.price
  }$ `;
  petDetails.innerText = `${
    petId.pet_details == null || undefined ? "Not available" : petId.pet_details
  }`;
};

// category image
const categoryImage = (image) => {
  console.log(image);
  const categoryContainer = document.getElementById("category-container");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="">
   <img class="w-[300px] h-[150px] rounded-lg border" src="${image}" alt="">
  </div>
 `;
  categoryContainer.appendChild(div);
};

//Fetch Pets by Category

const petsAllCategory = async (category) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();

  spinner(true);
  setTimeout(() => {
    allDataDisplay(data.data);
    spinner(false);
  }, 2000);
};
// spinner handler
const spinner = (isSpinner) => {
  const spinnerContainer = document.getElementById("spinner-container");
  if (isSpinner) {
    spinnerContainer.classList.remove("hidden");
    document.getElementById("cartContainer").innerHTML = "";
    document.getElementById("category-container").classList.add("hidden");
  } else {
    spinnerContainer.classList.add("hidden");
    document.getElementById("category-container").classList.remove("hidden");
  }
};

const allPrice = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );

  const data = await res.json();
  const pets = data.pets;
  pets.sort((a, b) => b.price - a.price);
  allDataDisplay(pets);
};

allDataLoad();
allCategoryButton();
