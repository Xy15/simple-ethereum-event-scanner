$(document).ready(async function() {
	await checkLoginStatus();
    getAllEvents();
})

const productElements = ['productID', 'productName', 'description','category', 'price', 'imgPath']
const productTableColumns  = ['productID', 'productName', 'category', 'price', 'imgPath', 'stock']
const eventTemplate = {
    'ProductCreated': ['product'],
    'ProductPurchased': ['product', 'buyer', 'quantity', 'totalPrice'],
    'ProductUpdated': ['previousProduct','currentProduct'],
    'ProductDeleted' : ['product'],
    'ProductStockUpdated': ['product', 'currentStock'],
    'LowStock': ['product']
};

function getEvents(){
  const eventName = document.getElementById("viewEvent").value;
  if(eventName == 'All'){
    displayAllTables();
  }else{
    hideAllTablesExcept(eventName);
  }
}

async function getAllEvents(){
  contract.events.allEvents({
      fromBlock: 0
  }).on('data', async function(event) {
      const eventName = event.event;
      const tableRow = document.createElement("tr");
      const txCell = document.createElement("td");
      txCell.textContent = event.transactionHash;
      txCell.style.cursor = 'pointer';
      txCell.onclick = function() {
          window.open(`viewTransaction.html?hash=${event.transactionHash}`);
      }
      tableRow.appendChild(txCell);
      const timestampCell = document.createElement("td");
      const timestamp = (await web3.eth.getBlock(event.blockNumber)).timestamp;
      const date = new Date(timestamp * 1000);
      timestampCell.textContent = date.toDateString();
      tableRow.appendChild(timestampCell);

      eventTemplate[eventName].forEach((element) => {
          const data = event.returnValues[element];
          var tableCell = document.createElement("td");
          if (Array.isArray(data)) {  //data is a struct Product
              //display product details
              var displayElement;
              if(eventName == 'ProductUpdated' || eventName == 'ProductCreated'){ 
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
                    img.width = 60;
                    img.height = 60;
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
                    tableCell.textContent = totalPrice;
                }else{
                    tableCell.textContent = data;
                }
                tableRow.appendChild(tableCell);
          }
          document.getElementById(eventName + 'List').appendChild(tableRow);
        })
      }).on('error', function(error, receipt) { 
      console.log("Error" + error);
      console.log(receipt);
  })
}

function displayAllTables() {
    const allTables = document.querySelectorAll('table');
    allTables.forEach((table) => {    
    table.classList.remove('d-none');
    });
}

function hideAllTablesExcept(eventName) {
    const allTables = document.querySelectorAll('table');
    allTables.forEach((table) => {
        if (table.id !== eventName + 'Table') {
            table.classList.add('d-none');
        }else{
            table.classList.remove('d-none'); 
        }
    });
}

function searchTransaction() {
    const searchTx = document.getElementById('searchTx').value;
  
    if (searchTx.length == 66) {
        window.open(`viewTransaction.html?hash=${searchTx}`);
    } else {
        Swal.fire({
            title: 'Invalid Transaction Hash.',
            text: 'Transaction Hash must be 66 characters long.',
            icon: 'error'
        })
    }
  }