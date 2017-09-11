var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "password",
  database: "bamazon_db",
});

function showProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log("List of All Products Available for Sale");
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "$" + res[i].price + " | " + "Quantity In-Stock: " + res[i].stock_quantity);
    }
  });
}

function showLowInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      return console.log(err);
    }
    res.filter(function(item) {
      return item.stock_quantity < 300;
    }).forEach(function(items) {
      console.log("Product ID: " + items.item_id + " | " + "Item: " + items.product_name + " | " + "$" + items.price + " | " + "Quantity In-Stock: " + items.stock_quantity);
    });
  });
}

function addToInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      return console.log(err);
    }
    for (var i = 0; i < res.length; i++) {
      console.log("Product ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "$" + res[i].price + " | " + "Quantity In-Stock: " + res[i].stock_quantity);
    }
    inquirer.prompt([
      {
        type: "input",
        name: "product_id",
        message: "Please Input the ID of the Product That You Would Like To Re-Stock"
      },
      {
        type: "input",
        name: "quantity",
        message: "How Many of That Product Would You Like To Re-Stock?"
      }
    ]).then(function(response) {
      var productName = res[Number(response.product_id - 1)].product_name;
      var id = Number(response.product_id);
      var quantity = Number(response.quantity);
      var stockQuantity = Number(res[Number(response.product_id - 1)].stock_quantity);
      var inventory = stockQuantity + quantity;
      var update = "UPDATE products SET stock_quantity = " + inventory + " WHERE item_id = " + id;
      connection.query(update, function(err, res) {
        if (err) {
          return console.log(err);
        }
          console.log("You have successfully restocked " + quantity + " " + productName + "(s)");
      });
    });
  });
}

function addNewProduct() {
  inquirer.prompt([
    {
      type: "input",
      name: "product",
      message: "What Is The Name Of The Product You Would Like To Add?"
    },
    {
      type: "input",
      name: "department",
      message: "Assign The Department For This Product"
    },
    {
      type: "input",
      name: "price",
      message: "Please Set The Price For This Product"
    },
    {
      type: "input",
      name: "quantity",
      message: "Please Set The Initial Quantity For This Product"
    }
  ]).then(function(response) {
    var product = response.product;
    var department = response.department;
    var price = Number(response.price);
    var quantity = Number(response.quantity);
    var add = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ?";
    var value = [
      [product, department, price, quantity]
    ];

    connection.query(add, [value], function(err, res) {
      if (err) {
        return console.log(err);
      }
      console.log("You have successfully added: " + quantity + " " + product + "(s) " + "to " + department + " department" + "for $" + price);
    });
  });
}

connection.connect(function(err) {
  if (err) {
    return console.log(err);
  }
  inquirer.prompt([
    {
      type: "list",
      name: "list",
      message: "List of Available Options",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
  ]).then(function(response) {
    if (response.list === "View Products for Sale") {
      showProducts();
    } else if (response.list === "View Low Inventory") {
      showLowInventory();
    } else if (response.list === "Add to Inventory") {
      addToInventory();
    } else if (response.list === "Add New Product") {
      addNewProduct();
    }
  });
});
