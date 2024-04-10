var acc;
const category = {
	0: "Moisturizer",
	1: "Mask",
	2: "Exfoliator",
	3: "Serum",
	4: "Other"
};

// web3 = new Web3(window.ethereum);
var web3Provider;
if (window.ethereum) {
	web3Provider = window.ethereum;
}else if (window.web3) {
	// Legacy dapp browsers...
	web3Provider = window.web3.currentProvider;
}else {
	// If no injected web3 instance is detected, fall back to Ganache
	web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
}

web3 = new Web3(web3Provider);

const contractAddress = "0xf5Cd7eB92a3720eDfE2AaAF519Ce1eA80cB256Ce";
var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "product",
				"type": "tuple"
			}
		],
		"name": "LowStock",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "product",
				"type": "tuple"
			}
		],
		"name": "ProductCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "product",
				"type": "tuple"
			}
		],
		"name": "ProductDeleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "product",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "ProductPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "product",
				"type": "tuple"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentStock",
				"type": "uint256"
			}
		],
		"name": "ProductStockUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "previousProduct",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct OnlineStore.Product",
				"name": "currentProduct",
				"type": "tuple"
			}
		],
		"name": "ProductUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"internalType": "struct OnlineStore.Product",
				"name": "product",
				"type": "tuple"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "addStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "deleteProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"internalType": "struct OnlineStore.Product[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_passwordHash",
				"type": "bytes32"
			}
		],
		"name": "login",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "productID",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "enum OnlineStore.ProductCategory",
				"name": "category",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imgPath",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "stock",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "purchaseProduct",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "reduceStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_username",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_passwordHash",
				"type": "bytes32"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint16",
						"name": "productID",
						"type": "uint16"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum OnlineStore.ProductCategory",
						"name": "category",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imgPath",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stock",
						"type": "uint256"
					}
				],
				"internalType": "struct OnlineStore.Product",
				"name": "_product",
				"type": "tuple"
			}
		],
		"name": "updateProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contract = new web3.eth.Contract(abi, contractAddress);

web3.eth.requestAccounts().then(function(accounts) {
    acc = accounts[0];	
    localStorage.setItem("acc", acc);
}).catch((error) => {
    if (error.code === -32002) {
        window.alert("Please login to your Metamask account.");
    }
})

if(localStorage.getItem('acc') != null){
    window.ethereum.on('accountsChanged', function () {
		web3.eth.getAccounts().then(function(accounts) {
			if(acc != accounts[0]){
				window.alert("Please login again with your registered Ethereum account. ");
                logout();
			}
        }).catch((error) => {
            if (error.code === -32002) {
                window.alert("Please login to your Metamask account.");
            }
      });
    })
}else{
    window.ethereum.on('accountsChanged', function () {
        //Refresh page
        location.reload();
    })
}

async function showOwnerNav(){
	document.getElementById('logoutButton').classList.add('d-none');
	const elements = document.getElementsByClassName("onlyOwner");
	for (let i = 0; i < elements.length; i++) {
		elements[i].classList.remove("d-none");
	}
	
}

function logout(){
	localStorage.setItem('isOwner', 0);
    localStorage.removeItem('username');
	localStorage.removeItem('acc');
    window.location.href = 'index.html';
}

function checkLoginStatus(){
	return new Promise((resolve, reject) => {
	const username = localStorage.getItem('username');
	if (username) {
		//display username on navigation bar
		const usernameBanner = document.getElementById('usernameBanner');
		usernameBanner.textContent = `Welcome, ${username}!`;
		if(localStorage.getItem('isOwner') == 1){
			showOwnerNav();
		}
		resolve();
	}
	else {
		Swal.fire({
			title: 'Please log in to the system.',
			icon: 'warning'
		}).then(() => {
			logout();
		})
		reject();
	}
})
}