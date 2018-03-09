(function(window) {
  function lib() {
    const catalog = createCatalog(100);

    return {
      searchProductById: searchProductById,
      searchProductsByType: searchProductsByType,
      searchProductsByPrice: searchProductsByPrice,
      searchAllProducts: searchAllProducts
    };

    function createProduct() {
      const types = ["Electronics", "Clothing", "Food", "Books"];
      const price = (Math.random() * 500).toFixed(2);
      return { type: types[Math.floor(Math.random() * 4)], price: price };
    }

    function createCatalog(limit) {
      let catalog = [];
      for (let i = 0; i < limit; i++) {
        const obj = createProduct();
        catalog.push({ id: i, price: obj.price, type: obj.type });
      }
      return catalog;
    }

    function searchAllProducts() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve(catalog);
        }, 1000);
      });
    }

    function searchProductById(id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (let i = 0; i < catalog.length; i++) {
            if (catalog[i].id === id) {
              const obj = catalog[i];
              resolve({ id: obj.id, price: obj.price, type: obj.type });
            }
          }
          reject(`${id} not found`);
        }, 1000);
      });
    }

    function searchProductsByPrice(price, diff) {
      return new Promise((resolve, reject) => {
        let products = [];
        if (!isFinite(price)) {
          reject(`Invalid price: ${price}`);
        }
        setTimeout(() => {
          for (let i = 0; i < catalog.length; i++) {
            if (Math.abs(catalog[i].price - price) < diff) {
              products.push({
                id: catalog[i].id,
                price: catalog[i].price,
                type: catalog[i].type
              });
            }
          }
          resolve(products);
        }, 100);
      });
    }

    function searchProductsByType(type) {
      return new Promise((resolve, reject) => {
        let products = [];
        let types = ["Electronics", "Books", "Food", "Clothing"];
        if (!types.includes(type)) {
          reject(`Invalid type: ${type}`);
        }
        setTimeout(() => {
          for (let i = 0; i < catalog.length; i++) {
            if (catalog[i].type === type) {
              let obj = catalog[i];
              products.push({ id: obj.id, price: obj.price, type: obj.type });
            }
          }
          resolve(products);
        }, 1000);
      });
    }
  }

  if (typeof window.api === "undefined") {
    window.api = lib();
  }
})(window);
