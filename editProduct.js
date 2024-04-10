const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const index = urlParams.get('index')

$(document).ready(function() {
	checkLoginStatus();
})

contract.methods.products(index).call().then((product) => {
    insertProductData(product);
})

function insertProductData(product) {
    document.getElementById("productID").value = product.productID;
    document.getElementById("productName").value = product.productName;
    document.getElementById("productDesc").value = product.description;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = web3.utils.fromWei(product.price.toString(), "gwei");   //price in ether
    document.getElementById("productImg").value = product.imgPath;
}

function deleteProduct(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            contract.methods.deleteProduct(index).send({from:acc}).then(() => {
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success'
                ).then(()=>{
                    window.location.href = 'product.html';
                })
            }).catch((error) => {
                if(error.code === -32603){
                    window.alert('Index out of range.');
                }else{
                    window.alert(error.message)
                    console.error('Error occurred while fetching transaction:', error);
                }
            })
        }
        })
    
}

function editProduct(){
    contract.methods.products(index).call().then((product) => {
        const price = document.getElementById("productPrice").value;
        const newProductData = {
            productID: document.getElementById("productID").value,
            productName: document.getElementById("productName").value,
            description: document.getElementById("productDesc").value,
            category: document.getElementById("productCategory").value,
            price: web3.utils.toWei(price, "gwei"), // Price in gwei
            imgPath: document.getElementById("productImg").value,
            stock: product.stock
        }
        contract.methods.updateProduct(index, newProductData).send({from:acc}).then((result) => {
            if(result){
                Swal.fire({
                    title:'Product Updated Successfully!',
                    html:`<strong>Product ID:</strong> ${newProductData.productID}
                    <br><strong>Product Name: </strong>${newProductData.productName} 
                    <br><strong>Product Description: </strong>${newProductData.description} 
                    <br><strong>Product Category: </strong>${newProductData.category}: ${category[newProductData.category]}
                    <br><strong>Product Price (Gwei): </strong>${price} 
                    <br><strong>Image Path: </strong>${newProductData.imgPath}`,
                    icon:'success'
                }).then(()=>{
                    window.location.href = 'product.html';
                })
            }
        }).catch((error) => {
            window.alert(error.message);
        })
    })
}