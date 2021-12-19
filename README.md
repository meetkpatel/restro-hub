# restro-hub

A full stack web application for restaurants to improve customer and restaurant experience.


# purpose

This application is designed to improve customer and restaurant experience, it allows resturant to manages customers and orders and also allows customers explore resturant menu and order food.


## Live Demo

Try the application live at [http://restro-hub.herokuapp.com/]

## Preview

Admin can add food item

![taco](https://user-images.githubusercontent.com/39370528/146510801-716332c4-d765-45b7-bd79-7654bed318e7.gif)

Customer can view menu and place order

![order-order](https://user-images.githubusercontent.com/39370528/146511895-a44c37c9-74e3-4d6d-a387-3bc3f00e64c9.gif)

Customer orders on admin side

![order-status-33](https://user-images.githubusercontent.com/39370528/146513507-ce8e9b3c-14f1-4504-9fb6-3cfbde3d2f3c.gif)


## Technologies Used

- React.js
- Webpack
- Socket IO
- Twilio
- Node.js
- Node Fetch
- argon 2
- AWS
- HTML5
- CSS3
- Heroku


## Features

- Admin can sign in with monile number and password
- Admin can add food category
- Admin can add food item
- Admin can view food menu
- Admin can create customer waiting list
- Admin can assign customer a table
- Admin can view customer placed orders
- Admin can change order status
- Customer can sign in with mobile number and password
- Customer can view menu
- Customer can add food to cart
- Customer can view cart
- Customer can add note to a order
- Customer can view order status

## Stretch Features

- Customer can view multiple orders status
- Customer can edit food cart


### System Requirements

- VS code or any other code editor supporting JavaScript ES6
- NPM 6 or higher
- Node.js 10 or higher


### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:meetkpatel/restro-hub.git
    cd restro-hub
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Make a copy of the provided .env.example file. Name your copy .env.

    switch all config variables to your project's variables ( API keys, AWS access keys, heroku database URL, etc.)

    ```shell
    cp .env.example .env
    ```

4. Create a new database for your personal project name

    ```shell
    createdb <yourprojectname>
    ```

5. Import the database schema and test data using the provided "db:import" script in package.json.

    ```shell
    npm run db:import
    ```

6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
