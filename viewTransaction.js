const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const hash = urlParams.get('hash');   //get transaction hash from url

$(document).ready(async function() {
	await checkLoginStatus();
    getTxDetails(hash);
})

const eventTemplate = {
    'ProductCreated': ['product'],
    'ProductPurchased': ['product', 'buyer', 'quantity'],
    'ProductUpdated': ['previousProduct','currentProduct'],
    'ProductDeleted' : ['product'],
    'ProductStockUpdated': ['product', 'currentStock'],
    'LowStock': ['product']
};

const productElement = ['productID', 'productName', 'description','category', 'price', 'imgPath', 'stock']


async function getTxDetails(txHash){
    await web3.eth.getTransaction(txHash).then( async (transaction) => {
        if (transaction) {
            document.getElementById('txHash').innerHTML = transaction.hash;
            const status = transaction.blockNumber ? 'Confirmed' : 'Pending';   //Determines if the transaction is pending or confirmed based on the presence of blockNumber.
            document.getElementById('status').innerHTML = status;
            document.getElementById('block').innerHTML = transaction.blockNumber;
            const timestamp = (await web3.eth.getBlock(transaction.blockNumber)).timestamp;
            const date = new Date(timestamp * 1000); 
            document.getElementById('timestamp').innerHTML = timestamp + ' (' + date.toLocaleString() + ') ';
            document.getElementById('from').innerHTML = transaction.from;
            document.getElementById('to').innerHTML = transaction.to;
            document.getElementById('value').innerHTML = web3.utils.fromWei(transaction.value, 'ether');
            const transactionFee = transaction.gasPrice * transaction.gas;
            document.getElementById('txFee').innerHTML = web3.utils.fromWei(transactionFee.toString(), 'ether');
            document.getElementById('gasPrice').innerHTML = transaction.gasPrice;
            
            //Display Event Details
            const eventData = await getEventsByTxHash(txHash, transaction.blockNumber);
            getEventDetails(eventData)
        } else {
            Swal.fire({
                title: 'Transaction not found.',
                icon: 'error'
            }).then(() => {
                window.close();
            })
        }
    })
    .catch((error) => {
        console.error('Error occurred while fetching transaction:', error);
    });
}

function getEventDetails(eventData){
    const eventName = eventData.event;
    document.getElementById('eventName').innerHTML = eventName;
    document.getElementById('eventName').colSpan = '2';
    document.getElementById('eventName').style.textAlign = 'center';
    document.getElementById('eventName').style.backgroundColor = '#6a6868';
    document.getElementById('eventName').style.color = 'white';
    eventTemplate[eventName].forEach((element) => {
        const data = eventData.returnValues[element];

        if (Array.isArray(data)) {  //data is a struct Product 
            //display product details
            const productTableRow = document.createElement("tr");
            const productTableHeader = document.createElement("th");
            productTableHeader.textContent = element.charAt(0).toUpperCase() + element.slice(1);
            productTableHeader.colSpan = 2;
            productTableHeader.style.backgroundColor = 'rgb(230, 231, 232)';
            productTableHeader.style.textAlign = 'center';
            productTableRow.appendChild(productTableHeader);
            document.getElementById('eventDetailsTable').appendChild(productTableRow);

            productElement.forEach((item) => {
                const itemRow = document.createElement("tr");
                const itemHeader = document.createElement("th");
                const itemCell = document.createElement("td");
                itemHeader.textContent = item;
                itemCell.textContent = data[item];
                if(item == 'category'){
                    itemCell.textContent += `: ${category[data[item]]}`;
                }else if(item == 'imgPath'){
                    const newline = document.createElement("br");
                    const img = document.createElement("img");
                    img.src = data[item];
                    img.width = 100;
                    img.height = 100;
                    itemCell.appendChild(newline);
                    itemCell.appendChild(img);
                }else if(item == 'price'){
                    itemCell.textContent += ` gwei (${web3.utils.fromWei(data[item], 'gwei')} ether)`;
                }
                itemRow.appendChild(itemHeader);
                itemRow.appendChild(itemCell);
                

                document.getElementById('eventDetailsTable').appendChild(itemRow);
            });
        } else {
            const tableRow = document.createElement("tr");
            const tableHeader = document.createElement("th");
            const tableCell = document.createElement("td");
            tableHeader.textContent = element;
            tableCell.textContent = data;
            tableRow.appendChild(tableHeader);
            tableRow.appendChild(tableCell);
            document.getElementById('eventDetailsTable').appendChild(tableRow);
        }
        
    })
}

async function getEventsByTxHash(txHash, blockNumber) {
	const events = await contract.getPastEvents('allEvents', {
	  fromBlock: blockNumber,
	  toBlock: 'latest'
	});
	// Filter events based on the transactionHash
	const filteredEvents = events.find(event => event.transactionHash === txHash);

	return filteredEvents;
}