# bamazon

Bamazon is an Amazon-like storefront CLI app, created with the using the MySQL skills that I've learned in this course. The app will take in orders from customers and deplete stock from the store's inventory. 

### Bamazon has total of three views.
* Customer view
* Manager view
* Supervisor view

#### 1. Customer view

Running this application as a customer will first display all of the items available for sale.

![customer_1](https://github.com/isaac1104/bamazon/images/customer_1.png)

The app will then ask the users the ID and the quantity of the product that they would like to purchase.

![customer_2](https://github.com/isaac1104/bamazon/images/customer_2.png)

Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.

![customer_3](https://github.com/isaac1104/bamazon/images/customer_3.png)

If not, the app will log a phrase like "Insufficient quantity!", and then prevent the order from going through.

![customer_4](https://github.com/isaac1104/bamazon/images/customer_4.png)

Also, if the product is completely out of stock, it will notify the customer with a phrase like "Out of stock!".

![customer_5](https://github.com/isaac1104/bamazon/images/customer_5.png)

However, if the store does have enough of the product, it will fulfill the customer's order. 

![customer_6](https://github.com/isaac1104/bamazon/images/customer_6.png)

Once the update goes through, the app shows the customers the total cost of their purchase and ask if they would like to proceed.

![customer_7](https://github.com/isaac1104/bamazon/images/customer_7.png)

When the products get purchased, the quantity and the product sales are reflected in the database.

![customer_8](https://github.com/isaac1104/bamazon/images/customer_8.png)
