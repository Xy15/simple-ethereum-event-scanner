$(document).ready(function() {
	checkLoginStatus();
	getProducts();
})

function getProducts() {
    contract.methods.getAllProducts().call().then(async (result) => {
		var productsRow = $('#productsRow');
		var productsTemplate = $('#productsTemplate');
		var index = 0;
		for (const product of result) {
			productsTemplate.find('.products-title').text(product.productName);
			productsTemplate.find('img').attr('src', product.imgPath);
			productsTemplate.find('.products-id').text(product.productID);
			productsTemplate.find('.products-name').text(product.productName);
			productsTemplate.find('.products-desc').text(product.description);
			productsTemplate.find('.products-category').text(category[product.category]);
			const price = web3.utils.fromWei(product.price.toString(), "gwei");	//convert gwei to ether
			productsTemplate.find('.products-price').text(price);
			productsTemplate.find('.products-stock').text(product.stock);
			
			if(localStorage.getItem("isOwner") == 1){
				productsTemplate.find('.btn-buy').css('display', 'none')
				const btnOwner = productsTemplate.find('.btn-owner');
				btnOwner.each(function(){
					$(this).attr('data-index', index);
					$(this).css('display', 'block'); 
				})
			}else{	
				productsTemplate.find('.btn-buy').attr('data-index', index);
			}
			productsRow.append(productsTemplate.html());
			index++;
		  }
    })
}

function buy(event){
	event.preventDefault();
	const index = parseInt($(event.target).data('index'));
	contract.methods.products(index).call().then((productData) => {
		if(productData.stock < 1){
			Swal.fire({
				title: `Product Not Enough Stock.`,
				icon: 'warning'
			  }).then(() => {
				return;
			  });
		}else{
			Swal.fire({
				title: `Buy Product ${productData.productName}`,
				input: 'number',
				inputAttributes: {
				  min: 1,
				  max: productData.stock,
				},
				showCancelButton: true,
				confirmButtonText: 'Buy',
				cancelButtonText: 'Cancel',
				inputValidator: (value) => {
					const intValue = parseInt(value);
					if (!intValue || intValue < 1) {
						return 'Please enter a valid number.';
					}else if(intValue > productData.stock){
						return 'Product not enough stock.'
					}
				},
			  }).then((result) => {
				if (result.isConfirmed) {
					const priceWei = web3.utils.toWei(productData.price.toString(), 'gwei');
					const totalPriceWei =  priceWei * result.value;
					const totalPriceEther = web3.utils.fromWei(totalPriceWei.toString());
					contract.methods.purchaseProduct(index, result.value).send({from:acc, value: totalPriceWei}).then(() => {
						Swal.fire({
							title:'Order Successful!',
							html:`<strong>Product Name</strong>: ${productData.productName} <br><strong>Total Price (Ether)</strong>: ${totalPriceEther}<br><strong>Quantity</strong>: ${result.value}`,
							icon:'success'
						}).then(()=>{
							window.location.href = 'product.html';
						})
					})
				}
			  });
		}
		
	})
}

function edit(index){
	window.location.href = `editProduct.html?index=${index}`;
}

function addStock(event){
	event.preventDefault();
	const index = parseInt($(event.target).data('index'));
	contract.methods.products(index).call().then((productData) => {
		Swal.fire({
			title: `Add Stock for Product ${productData.productName}`,
			input: 'number',
			inputAttributes: {
			  min: 1,
			  step: 1,
			},
			showCancelButton: true,
			confirmButtonText: 'Add',
			cancelButtonText: 'Cancel',
			inputValidator: (value) => {
			  if (!value || value < 1) {
				return 'Please enter a valid number.';
			  }
			},
		  }).then((result) => {
			if (result.isConfirmed) {
				contract.methods.addStock(index, result.value).send({from:acc}).then(() => {
					Swal.fire({
						title:'Order Successful!',
						html:`<strong>Product ID</strong>: ${productData.productID}<br><strong>Product Name</strong>: ${productData.productName} <br><strong>Stock Added</strong>: ${result.value}`,
						icon:'success'
					}).then(()=>{
						window.location.href = 'product.html';
					})
				}).catch((error) =>{
					console.error(error)
				})
			}
		  });
	})
}

function reduceStock(event){
	event.preventDefault();
	const index = parseInt($(event.target).data('index'));
	contract.methods.products(index).call().then((productData) => {
		if(productData.stock < 1){
			Swal.fire({
				title: `Product Not Enough Stock.`,
				icon: 'warning'
			  }).then(() => {
				return;
			  });
			}else{

		Swal.fire({
			title: `Reduce Stock for Product ${productData.productName}`,
			input: 'number',
			inputAttributes: {
			  min: 1, 
			  max: productData.stock,
			},
			showCancelButton: true,
			confirmButtonText: 'Reduce',
			cancelButtonText: 'Cancel',
			inputValidator: (value) => {
				const intValue = parseInt(value);
				if (!intValue || intValue < 1) {
					return 'Please enter a valid number.';
				}else if(intValue > productData.stock){
					return 'Product not enough stock.'
				}
			},
		  }).then((result) => {
			if (result.isConfirmed) {
				contract.methods.reduceStock(index, result.value).send({from:acc}).then(() => {
					Swal.fire({
						title:'Order Successful!',
						html:`<strong>Product ID</strong>: ${productData.productID}<br><strong>Product Name</strong>: ${productData.productName} <br><strong>Stock Reduced</strong>: ${result.value}`,
						icon:'success'
					}).then(()=>{
						window.location.href = 'product.html';
					})
				}).catch((error) =>{
					console.error(error)
				})
			}
		  });
		}
	})
}