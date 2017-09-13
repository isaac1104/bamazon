var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
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
      console.log("List Of Departments");
      var table = new Table({
        head: ["Department ID", "Department Name", "Overhead Costs", "Product Sales", "Profit"],
        style: {
          head: ['blue'],
          compact: false,
          colAligns: ['center'],
        }
      });
      res.forEach(function(item) {
        table.push([
          item.department_id, item.department_name, item.over_head_costs, item.product_sales, Number(item.product_sales - item.over_head_costs)
        ]);
      });
      console.log(table.toString());
    });
  });
}

function addNewDepartment() {
  inquirer.prompt([{
      type: "input",
      name: "department",
      message: "What Is The Name Of The Department You Would Like To Add?"
    },
    {
      type: "input",
      name: "overhead_costs",
      message: "Please Set The Overhead Costs For This Department"
    },
    {
      type: "input",
      name: "product_sales",
      message: "What Is The Product Sales Of This Department?"
    }
  ]).then(function(response) {
    var department = response.department;
    var overhead = Number(response.overhead_costs);
    var sales = Number(response.product_sales);
    var add = "INSERT INTO departments(department_name, over_head_costs, product_sales) VALUES ?";
    var value = [
      [department, overhead, sales]
    ];

    connection.query(add, [value], function(err, res) {
      if (err) {
        return console.log(err);
      }
      console.log("You have successfully added: " + department + " department " + "with $" + overhead + " overhead costs" + " that has $" + sales + " in product sales");
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
    } else if (response.list === "Add New Department") {
      addNewDepartment();
    }
  });
});
