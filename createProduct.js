$(document).ready(function() {
	checkLoginStatus();
})

function cancel(){
    window.location.href = 'product.html';
}

function createProduct(){
    const price = document.getElementById("productPrice").value;
    const newProductData = {
        productID: document.getElementById("productID").value,
        productName: document.getElementById("productName").value,
        description: document.getElementById("productDesc").value,
        category: document.getElementById("productCategory").value,
        price: web3.utils.toWei(price, "gwei"), // Price in gwei
        imgPath: document.getElementById("productImg").value,
        stock: 0
    }

    contract.methods.addProduct(newProductData).send({from:acc}).then((result) => {
        if(result){
            Swal.fire({
                title:'Product Added Successfully!',
                html:`<strong>Product ID: </strong>${newProductData.productID}
                <br><strong>Product Name: </strong>${newProductData.productName} 
                <br><strong>Product Description: </strong>${newProductData.description} 
                <br><strong>Product Category: </strong>${newProductData.category}: ${category[newProductData.category]}
                <br><strong>Product Price (Ether): </strong>${price} 
                <br><strong>Image Path: </strong>${newProductData.imgPath}`,
                icon:'success'
            }).then(()=>{
                window.location.href = 'product.html';
            })
        }
    }).catch((error) => {
        if (error.code === -32603) {
            window.alert("Product ID already exists.");
        }else {
            window.alert(error.message);
        }
    })
}