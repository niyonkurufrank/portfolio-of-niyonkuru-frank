async function fetchProducts() {

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = response.json();
        console.log(data);
    } catch (error) {
        console.log('Error is: $(error)')
    }


}
fetchProducts();