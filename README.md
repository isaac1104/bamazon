# bamazon

Bamazon is an Amazon-like storefront CLI app, created with the using the MySQL skills that I've learned in this course. The app will take in orders from customers and deplete stock from the store's inventory. 

### Bamazon has total of three views.
* Customer view
* Manager view
* Supervisor view

#### 1. Customer View

a. Running this application as a customer will first display all of the items available for sale.

![Alt text](/images/customer_1.png?raw=true "Optional Title")

b. The app will then ask the users the ID and the quantity of the product that they would like to purchase.

c. Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.

![Alt text](/images/customer_2.png?raw=true "Optional Title")

d. If not, the app will log a phrase like "Insufficient quantity!", and then prevent the order from going through.

![Alt text](/images/customer_3.png?raw=true "Optional Title")

e. Also, if the product is completely out of stock, it will notify the customer with a phrase like "Out of stock!".

![Alt text](/images/customer_4.png?raw=true "Optional Title")

f. However, if the store does have enough of the product, it will fulfill the customer's order. 

![Alt text](/images/customer_5.png?raw=true "Optional Title")

g. Once the update goes through, the app shows the customers the total cost of their purchase and ask if they would like to proceed.

h. When the products get purchased, the quantity and the product sales are reflected in the database.

#### 2. Manager View

Running this application with manager view will list a set of menu options:

* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

a. If a manager selects View Products for Sale, the app will list every available item: the item IDs, names, prices, and quantities.

![Alt text](/images/manager_1.png?raw=true "Optional Title")

b. If a manager selects View Low Inventory, then it will list all items with an inventory count lower than five.

![Alt text](/images/manager_2.png?raw=true "Optional Title")

c. If a manager selects Add to Inventory, the app will display a prompt that will let the manager "add more" of any item currently in the store.

![Alt text](/images/manager_3.png?raw=true "Optional Title")

d. If a manager selects Add New Product, it will allow the manager to add a completely new product to the store. (Also notice that the fidget spinners have been restocked from "c.")

![Alt text](/images/manager_4.png?raw=true "Optional Title")

#### 3. Supervisor View

Running this application will list a set of menu options:

* View Product Sales by Department
* Create New Department

a. When a supervisor selects View Product Sales by Department, the app will display a summarized table in the terminal/bash window. 

![Alt text](/images/supervisor_1.png?raw=true "Optional Title")

b. When a supervisor selects Create New Department, the app will take responses from the user and create a new department into the database.

![Alt text](/images/supervisor_2.png?raw=true "Optional Title")
