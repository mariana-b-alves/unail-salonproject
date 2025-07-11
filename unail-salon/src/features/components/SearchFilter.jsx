export function SearchFilter() {
    const searchBar = document.getElementById("searchBar");
  
    if (!searchBar) return;
  
    searchBar.addEventListener("input", () => {
      const priceArticles = document.querySelectorAll(".prices article");
      const storeArticles = document.querySelectorAll(".store article");
  
      const filter = searchBar.value.toLowerCase();
      const filteredProducts = priceArticles.length ? [...priceArticles] : [...storeArticles];
  
      filteredProducts.forEach((el) => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }
  