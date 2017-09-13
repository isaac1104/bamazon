var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "password",
  database: "bamazon_db",
});

//App begins
connection.connect(function(err) {
  if (err) {
    return console.log(err);
  }
//Display the list of items on sale in the beginning
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log("Welcome to Bamazon!");
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "$" + res[i].price);
    }
//Takes in user-input of which product & how many they would like to purchase
    inquirer.prompt([
      {
        type: "input",
        name: "product_id",
        message: "Please enter the ID of the product you want to purchase."
      },
      {
        type: "input",
        name: "quantity",
        message: "Please enter the quantity of the item you want to purchase."
      }
    ]).then(function(response) {
      var id = Number(response.product_id);
      var quantity = Number(response.quantity);
      var stockQuantity = Number(res[Number(response.product_id - 1)].stock_quantity);
      var price = Number(res[Number(response.product_id - 1)].price);
      var inventory = stockQuantity - quantity;
      var productName = res[Number(response.product_id - 1)].product_name;
      var total_sales = Number(res[Number(response.product_id - 1)].product_sales);
      var product_sales = (quantity * price) + total_sales;
      
//Prevent from purchasing the item if the customer wants more than what's in the inventory
      if (quantity > stockQuantity && stockQuantity !== 0) {
        return console.log("Insufficient quantity! Please choose different quantity for this item.");
        //Prevent from purchasing the item if the quantity in the inventory is 0
      } else if (stockQuantity === 0) {
        return console.log("This item is currently out of stock! Sorry for the inconvenience. Please check back later.");
      } else {
        //User has to confirm before making the purchase
        inquirer.prompt([
          {
            type: "confirm",
            name: "confirm",
            message: "Your total is $" + (quantity * price) + ". Would you like to proceed?"
          }
        ]).then(function(response) {
          if (response.confirm === true) {
            var update = "UPDATE products SET stock_quantity = " + inventory + ", product_sales = " + product_sales + " WHERE item_id = " + id;
            connection.query(update, function(err, res) {
              if (err) {
                return console.log(err);
              }
              console.log("Thank you for purchasing " + quantity + " " + productName);
            });
          } else {
            console.log("Thank you for Choosing Bamazon! We hope to see you again soon!");
          }
        });
      }
    });
  });
});
