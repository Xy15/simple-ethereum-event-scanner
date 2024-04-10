// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OnlineStore {
    enum ProductCategory { Moisturizer, Mask, Exfoliator, Serum, Other }

    struct UserAccount {
        bytes32 username;
        bytes32 passwordHash;
    }

    struct Product {
        uint16 productID;
        string productName;
        string description;
        ProductCategory category;
        uint256 price;  //Gwei
        string imgPath;
        uint256 stock; 
    }

    Product[] public products;
    address payable private owner;
    mapping(address => UserAccount) private userAccount;
    
    constructor(){
        owner = payable(msg.sender);
    }

    event ProductCreated(Product product);
    event ProductPurchased(Product product, address buyer, uint quantity);
    event ProductUpdated(Product previousProduct, Product currentProduct);
    event ProductDeleted(Product product);
    event ProductStockUpdated(Product product, uint currentStock);
    event LowStock(Product product);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier checkStock(uint currentStock, uint num) {
        require(currentStock >= num, "Not enough stock.");
        _;
    }

    modifier uniqueID(uint16 id) {
        bool isUnique = true;
        for (uint i = 0; i < products.length; i++){
            if(products[i].productID == id){
                isUnique = false;
                break;
            }
        }
        require(isUnique, "Product ID already exists.");
        _;
    }

    modifier checkIndex(uint index){
        require(index >= 0 && index < products.length, "Index out of range.");
        _;
    }

    modifier isRegistered {
        require(userAccount[msg.sender].username == 0, "You already registered an account.");
        _;
    }

    function isOwner() public view returns (bool){
        return msg.sender == owner;
    }

    function register(bytes32 _username, bytes32 _passwordHash) public isRegistered{
        userAccount[msg.sender].username = _username;
        userAccount[msg.sender].passwordHash = _passwordHash;
    }

    function login(bytes32 _username, bytes32 _passwordHash) public view returns(bool){
        return userAccount[msg.sender].username == _username && userAccount[msg.sender].passwordHash == _passwordHash;
    }
    
    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }

    function addProduct(Product memory product) public onlyOwner uniqueID(product.productID) {
        products.push(product);
        emit ProductCreated(product);
    }

    function purchaseProduct(uint index, uint num) external payable checkIndex(index) checkStock(products[index].stock, num){
        owner.transfer(msg.value);
        Product memory product = products[index];
        products[index].stock -= num;
        if(products[index].stock <= 10){
            emit LowStock(products[index]);
        }
        emit ProductPurchased(product, msg.sender, num);
    }

    function updateProduct(uint index, Product memory _product) external onlyOwner checkIndex(index){
        Product memory product = products[index];
        products[index] = _product;
        emit ProductUpdated(product, products[index]);
    }

    function deleteProduct(uint index) external onlyOwner checkIndex(index){
        emit ProductDeleted(products[index]);
        products[index] = products[products.length-1];
        products.pop();
    }

    function addStock(uint index, uint num) external onlyOwner checkIndex(index){
        Product memory product = products[index];
        products[index].stock += num;
        emit ProductStockUpdated(product, products[index].stock);
    }

    function reduceStock(uint index, uint num) external onlyOwner checkIndex(index){
        Product memory product = products[index];
        products[index].stock -= num;
        emit ProductStockUpdated(product, products[index].stock);
    }
}