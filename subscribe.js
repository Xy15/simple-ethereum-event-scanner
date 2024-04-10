$(document).ready(function() {
	checkLoginStatus();
    disabledBtnUnsubscribe();
})

const eventTemplate = {
    'ProductCreated': ['product'],
    'ProductPurchased': ['product', 'buyer', 'quantity', 'totalPrice'],
    'ProductUpdated': ['previousProduct','currentProduct'],
    'ProductDeleted' : ['product'],
    'ProductStockUpdated': ['product', 'currentStock'],
    'LowStock': ['product']
};
const productElements = ['productID', 'productName', 'description','category', 'price', 'imgPath']
const productTableColumns  = ['productID', 'productName', 'category', 'price', 'imgPath', 'stock']
const eventSignature = {
    'ProductCreated': "0xb9c673588e9c29cf4e51427b99023d21487f82f32ecedf7b44dae9c8933adbfc",
    'ProductPurchased': "0xbdd1f0775810437f8c4ef08cb50b480cb1eacf79dfa20808fc1f1fa3881f6a9f",
    'ProductUpdated': "0x1ccd49e1355a64ed756bcb2cee7306d1d872c043a1e13ff90269f71d944dc447",
    'ProductDeleted': "0x9c8decb91c4b41ee71990543dfc39a0fca0836e619659f6fc3a0945a8b2c095e",
    'ProductStockUpdated': "0x25b1e2245b8d125f9f58af14ee0db3956983813b529b917adaa50579e82118ad",
    'LowStock': "0x02b7af5c9ae36f6083a990027712917cb69e678428960da2b23d76fbeb03e7d9"
};
const eventABIs = {ProductCreated:[
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
], ProductPurchased:[
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
        "name": "number",
        "type": "uint256"
    }
], ProductUpdated:[
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
], ProductDeleted:[
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
], ProductStockUpdated:[
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
], LowStock:[
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
]}

var subscription = [];

function subcriptionMsg() {
    return new Promise((resolve) => {
        Swal.fire({
            title: 'Subscribe To Event',
            text: "Do you want to subscribe to " + document.getElementById('subscribeEvent').value + " event?",
            icon: 'info',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Subscribed!', '', 'success').then(() => {
                    resolve(true)
                })
            } else {
                resolve(false)
            }
        })
    })
}

function alertEventDetected(eventName, productID){
    Swal.fire({
        icon: 'info',
        title: 'Event Detected.',
        html: 'Event Name: ' + eventName + '<br>Product ID: ' + productID
    });
}

async function subscribe(){
    const eventName = document.getElementById('subscribeEvent').value;

    if(subscription[eventName]){
        Swal.fire({
            icon: 'error',
            title: 'Duplicate Subscription',
            text: 'You have already subscribed to ' + eventName + ' event!'
        });
        return;
    }
    const confirm = await subcriptionMsg();
    if (confirm){
        const signature = eventSignature[eventName]

        subscription[eventName] = web3.eth.subscribe('logs', {
            address: contractAddress,  
            topics: [signature]
        }, (error) => {
            if (error)
                console.error(error);
        }).on("connected", function (subscriptionId) {
            console.log("Subscribed with subscrition id ", subscriptionId);
            document.getElementById(eventName + 'Table').classList.remove("d-none");
            disabledBtnUnsubscribe();
        }).on("data", async function (log) {
            const eventData = web3.eth.abi.decodeLog(eventABIs[eventName], log.data);
            
            alertEventDetected(eventName, eventData[0].productID);
            
            const tableRow = document.createElement("tr");
            const txCell = document.createElement("td");
            txCell.textContent = log.transactionHash;
            txCell.style.cursor = 'pointer';
            txCell.onclick = function() { 
                window.open(`viewTransaction.html?hash=${log.transactionHash}`);
            }
            tableRow.appendChild(txCell);

            eventTemplate[eventName].forEach((element) => {
                const data = eventData[element];
                var tableCell = document.createElement("td");
                if (Array.isArray(data)) {  //data is a struct Product
                    //display product details
                    var displayElement;
                    if(eventName == 'ProductCreated' || eventName == 'ProductUpdated'){ 
                        displayElement = productElements;   //show description
                    }else{
                        displayElement = productTableColumns;
                    }
                    displayElement.forEach((item) => {
                        tableCell = document.createElement("td");
                        if(item == 'category'){
                            tableCell.textContent = category[data[item]];
                        }else if(item == 'imgPath'){
                            const img = document.createElement("img");
                            img.src = data[item];
                            img.width = 80;
                            img.height = 80;
                            tableCell.appendChild(img);
                        }else if(item == 'price'){
                            tableCell.textContent = web3.utils.fromWei(data[item].toString(), "gwei");
                        }else{
                            tableCell.textContent = data[item];
                        }
                        tableRow.appendChild(tableCell);
                    })
                }else{
                    if(element == 'totalPrice'){
                        const price = web3.utils.fromWei(event.returnValues.product.price.toString(), "gwei");	//convert gwei to ether
                        const totalPrice = price * event.returnValues.quantity;
                        console.log(price)
                        console.log(event.returnValues.quantity)
                        tableCell.textContent = totalPrice;
                    }else{
                        tableCell.textContent = data;
                    }
                tableRow.appendChild(tableCell);
                }
            })
            document.getElementById(eventName + 'List').appendChild(tableRow);                   
    })
}
}

function unsubscribe(){
    const eventName = document.getElementById('subscribeEvent').value;
    // unsubscribes the subscription
    if(subscription[eventName]){
        subscription[eventName].unsubscribe(function(error, success){
            if(success){
                subscription[eventName] = null;
                disabledBtnUnsubscribe();
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Unsubscribed.',
                    text: 'Unsubscribed to ' + eventName + ' event.'
                });
            }
        });
    }
}

function disabledBtnUnsubscribe(){
    const eventName = document.getElementById('subscribeEvent').value;
    if(subscription[eventName]){
        document.getElementById('btnUnsubscribe').disabled = false;
    }else{
        document.getElementById('btnUnsubscribe').disabled = true;
    }
}
