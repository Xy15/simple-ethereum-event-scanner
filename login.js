async function isOwner(){
	const accounts = await web3.eth.getAccounts();
	const result = await contract.methods.isOwner().call({ from: accounts[0] });
	return result;
}

async function checkOwner(){
    const owner = await isOwner();
    if(owner){
        localStorage.setItem("isOwner", 1);
        localStorage.setItem("username", "Owner");
		window.location.href = 'product.html';
    }else{
        localStorage.setItem("isOwner", 0);
    }
}

$(document).ready(function() {
    checkOwner();
})

async function register(event){
    event.preventDefault();
    var username = document.getElementById('uname').value;
    var password = document.getElementById('password').value;
    //hashing password
    const usernameBytes = web3.utils.asciiToHex(username);
    const passwordHash = web3.utils.sha3(password);

    //Register new account
    contract.methods.register(usernameBytes, passwordHash).send({from:acc}).then(result => {
        if(result){
            Swal.fire({
                title:'Register Successful!',
                icon:'success'
            }).then(()=>{
                window.location.href = 'index.html';
              })
        }
    })
    .catch(error => {
        if (error.code === 4001) {
            window.alert('Permissions needed to continue.')
        }else if(error.code === -32603){
            Swal.fire(
                'Duplicate Registration.',
                "You already registered an account.",
                'warning'
              );
        }else{
            console.error(error);
            window.alert(error.message);
        }
    })
}

async function login(){
    var username = document.getElementById('uname').value;
    var password = document.getElementById('password').value;
    const usernameBytes = web3.utils.asciiToHex(username);
    const passwordHash = web3.utils.sha3(password);
    var acc = localStorage.getItem("acc");

    contract.methods.login(usernameBytes, passwordHash).call({from:acc}).then(result => {
        if(result){
            localStorage.setItem("username", username);
            window.location.href = "product.html";
        }else{
            Swal.fire({
                title: 'Username or password is incorrect.',
                text: "Current logged in Ethereum account is " + acc,
                icon: 'error'
            });
        }
    }).catch(error => {
        console.error(error);
    })     
}