export function setupSearchFilter() {
  /*SELECT SEARCH BAR - THAT'S THE "PLACE" WHERE THE WORDS WILL BE FILTERED*/

    const searchBar = document.getElementById("searchBar");

    if (!searchBar) {
      return
    }
  
    /* THE USER'S INPUT IS HEARD ON THE SEARCH BAR (VIA PRESSING KEYS)*/

    searchBar.addEventListener("input", () => {
      /*SELECT .prices article AND .stores article - EVERYTHING INSIDE THOSE CLASSES WILL BE SELECTED SO THE USER CAN SEE THE PRODUCT/SERVICE AND ITS CHARACTERISTICS*/

      const priceArticles = document.querySelectorAll(".prices article");
      const storeArticles = document.querySelectorAll(".store article");
      /*CONST FILTER RETURNS WHATEVER STRING THE USER WRITES IN LOWERCASE (TO MAKE IT CASE-INSENSITIVE)*/

      const filter = searchBar.value.toLowerCase();
      
      /*CONST FILTEREDPRODUCTS - IF .prices article IS ON THAT PAGE, THEN FILTEREDPRODUCTS BE AN ARRAY WHICH INCLUDES THOSES ELEMENTS; OTHERWISE, IT'LL BE AN ARRAY HOLDING ELEMENTS FROM .stores article*/

      const filteredProducts = priceArticles.length ? [...priceArticles] : [...storeArticles];

      /*LOOPS THROUGH EVERY ELEMENT INSIDE FILTEREDPRODUCTS; IF IT FINDS THOSE CHARACTERS, IT'LL FILTER OUT THOSE THAT DON'T HAVE THEM, AND SHOW THOSE THAT DO IN LOWERCASE (CASE-INSENSITIVE); OTHERWISE, IT'LL SHOW NOTHING. */
      filteredProducts.forEach((el) => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }
  