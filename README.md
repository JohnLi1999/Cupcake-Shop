## How to run this repo locally

0. **Set-up**

    Make sure you have installed the following requirements
    - [Maven](https://maven.apache.org/download.cgi)
    - [NodeJS](https://nodejs.org/en/download/)
    - [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

1. **Clone the repo**
    ```
    git clone https://github.com/JohnLi1999/Cupcake-Shop.git
    cd Cupcake-Shop
    ```

2. **Create MySQL database**
    ```
    CREATE DATABASE cupcake_shop;
    ```
   
3. **Update username and password for your database**
    - open `cupcake-shop-server/src/main/resources/application.properties` file.
    - change `spring.datasource.username` and `spring.datasource.password` to your database username and password
   
4. **Run the server side**
    ```
    cd cupcake-shop-server
    ./mvnw spring-boot:run
    ```
   
5. **Run the client side**
    ```
    cd cupcake-shop-client
    yarn && yarn start
    ```

6. **Default Roles**

    Your have two roles to use at the beginning.
    1. a **USER** account whose `username` is `user` and `password` is `useruser`.
    2. an **ADMIN** account whose `username` is `admin` and `password` is `adminadmin`.