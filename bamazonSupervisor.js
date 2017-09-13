var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "password",
  database: "bamazon_db",
});

function viewProductSales() {
  var update = "UPDATE departments c INNER JOIN (SELECT department_name, SUM(product_sales) as total FROM products GROUP BY department_name) x ON c.department_name = x.department_name SET c.product_sales = x.total";
  connection.query(update, function(err, res) {
    if (err) {
      return console.log(err);
    }
    connection.query("SELECT * FROM departments", function(err, res) {
      if (err) {
        return console.log(err);
      }
      res.forEach(function(item) {
        console.log("Department ID: " + item.department_id + " | " + "Department Name: " + item.department_name + " | " + "Overhead Costs: " + item.over_head_costs + " | " + "Product Sales: " + item.product_sales);
      });
    });
  });
}

connection.connect(function(err) {
  if (err) {
    return console.log(err);
  }
  inquirer.prompt([{
    type: "list",
    name: "list",
    message: "Please Choose From One of the Options Below",
    choices: ["View Product Sales by Department", "Add New Department"]
  }]).then(function(response) {
    if (response.list === "View Product Sales by Department") {
      viewProductSales();
    }
  });
});
