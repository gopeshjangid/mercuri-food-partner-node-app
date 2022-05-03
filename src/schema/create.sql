CREATE TABLE mercuri.Users
(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR (200) NOT NULL,
    first_name VARCHAR (200),
    last_name VARCHAR (200),
    password VARCHAR(200),
    partner_name VARCHAR(500),
    PRIMARY KEY(id)
);


CREATE TABLE mercuri.User_Sessions(
   id INT NOT NULL AUTO_INCREMENT,
   token VARCHAR (200) NOT NULL,
   user_id INT,
   start_time VARCHAR(200),
   end_time VARCHAR(200),
   ip VARCHAR(100),
   user_agent VARCHAR(200),
   isLoggedIn boolean,
   PRIMARY KEY(id),
   FOREIGN KEY (user_id) REFERENCES Users (id)
);

CREATE TABLE mercuri.order_type(
    id INT NOT NULL AUTO_INCREMENT,
    value VARCHAR (500),
    PRIMARY KEY (id)
)

CREATE TABLE mercuri.partner_type(
    id INT NOT NULL AUTO_INCREMENT,
    value VARCHAR (500),
    PRIMARY KEY (id)
)

CREATE TABLE mercuri.pos_system_type(
    id INT NOT NULL AUTO_INCREMENT,
    value VARCHAR (500),
    PRIMARY KEY (id)
)

CREATE TABLE mercuri.Partners(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    partner_name VARCHAR (200), 
    simplified_name VARCHAR (200),
    description VARCHAR (1000),
    website VARCHAR (500),
    phone VARCHAR (200),
    address_1 VARCHAR (500),
    address_2 VARCHAR (200),
    city VARCHAR (500),
    state VARCHAR (500),
    zip_code VARCHAR (500),
    profile_image VARCHAR(500),
    cover_image VARCHAR (500),
    brand_color VARCHAR (500),
    partner_type INT,
    pos_system_type INT,
    sales_tax VARCHAR (200), 
    alcohol_tax VARCHAR (200), 
    is_temporary_closed boolean,
    enable_open_tab boolean,
    enable_loyalty boolean,
    is_approved boolean,
    is_active boolean,
    merchant_account_id VARCHAR (200), 
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY(partner_type) REFERENCES partner_type(id),
    FOREIGN KEY(pos_system_type) REFERENCES pos_system_type(id)
);

CREATE TABLE mercuri.partner_order_type(
    id INT NOT NULL AUTO_INCREMENT,
    partner_id INT,
    order_type_id INT,
    group VARCHAR(500),
    PRIMARY KEY (id),
    FOREIGN KEY (partner_id) REFERENCES partners(id),
    FOREIGN KEY(order_type_id) REFERENCES order_type(id)
);


CREATE TABLE mercuri.partner_schedule(
    id INT NOT NULL AUTO_INCREMENT,
    partner_id INT,
    schedule json,
    PRIMARY KEY (id),
    FOREIGN KEY (partner_id) REFERENCES partners(id)
);

CREATE TABLE mercuri.menus(
    id INT NOT NULL AUTO_INCREMENT,
    partner_id INT,
    partner_name VARCHAR (500),
    menu_name VARCHAR (500),
    is_active boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (partner_id) REFERENCES partners(id)
);

CREATE TABLE mercuri.menu_categories(
    id INT NOT NULL AUTO_INCREMENT,
    menu_id INT,
    name VARCHAR (500),
    description VARCHAR (1000),
    takeout_available boolean,
    is_active boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

CREATE TABLE mercuri.menu_items(
    id INT NOT NULL AUTO_INCREMENT,
    category_id INT,
    name VARCHAR (500),
    description VARCHAR (1000),
    item_image VARCHAR (500),
    item_calories VARCHAR (500),
    price INT,
    applicable_taxes INT,
    enable_special_instructions boolean,
    takeout_available boolean,
    is_active boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

INSERT INTO `mercuri`.`partner_type`(`value`) VALUES("Business");
INSERT INTO `mercuri`.`partner_type`(`value`) VALUES("restaurant");
INSERT INTO `mercuri`.`partner_type`(`value`) VALUES("test");

INSERT INTO `mercuri`.`pos_system_type`(`value`)VALUES("omnivore");
INSERT INTO `mercuri`.`pos_system_type`(`value`)VALUES("test1");
INSERT INTO `mercuri`.`pos_system_type`(`value`)VALUES("test2");


CREATE TABLE mercuri.Orders(
    id INT NOT NULL AUTO_INCREMENT,
    order_number VARCHAR (200),
    order_status VARCHAR (100),
    partner_id INT,
    order_type VARCHAR (500),
    table_number INT,
    subtotal INT,
    total INT,
    tax INT,
    card_last_four INT,
    first_name VARCHAR (200),
    last_name VARCHAR (200),
    email VARCHAR (400),
    phone_number VARCHAR (200),
    device_type VARCHAR (500),
    device_os VARCHAR(500),
    payment_status VARCHAR (500),
    payment_reference VARCHAR (200), 
    payment_method VARCHAR (200),
    card_holder_name VARCHAR (200),
    created_at DATE,
    updated_at DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (partner_id) REFERENCES Partners(id)
);

CREATE TABLE mercuri.order_items(
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT,
    item_id INT,
    quantity INT,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);


CREATE TABLE mercuri.order_items_sides(
    id INT NOT NULL AUTO_INCREMENT,
    order_item_id INT,
    side_item_id INT,
    quantity INT,
    PRIMARY KEY (id),
    FOREIGN KEY (order_item_id) REFERENCES order_items(id),
    FOREIGN KEY (side_item_id) REFERENCES side_items(id)
);


CREATE TABLE mercuri.customers
(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR (200) NOT NULL,
    first_name VARCHAR (200),
    last_name VARCHAR (200),
    password VARCHAR(200),
    phone VARCHAR(500),
    PRIMARY KEY(id)
);


CREATE TABLE mercuri.customer_sessions(
   id INT NOT NULL AUTO_INCREMENT,
   token VARCHAR (200) NOT NULL,
   customer_id INT,
   start_time VARCHAR(200),
   end_time VARCHAR(200),
   ip VARCHAR(100),
   user_agent VARCHAR(200),
   isLoggedIn boolean,
   PRIMARY KEY(id),
   FOREIGN KEY (customer_id) REFERENCES customers (id)
);


CREATE TABLE mercuri.menu_item_variations(
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT,
    name VARCHAR (500),
    calories VARCHAR (500),
    price INT,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

CREATE TABLE mercuri.side_categories(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (500),
    label VARCHAR (1000),
    partner_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (partner_id) REFERENCES partners(id)
    
);

CREATE TABLE mercuri.side_items(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (500),
    item_image VARCHAR(1000),
    calories VARCHAR (500),
    side_category_id INT,
    price INT,
    is_default boolean,
    enable_customization boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (side_category_id) REFERENCES side_categories(id) 
);

CREATE TABLE mercuri.menu_item_sides(
    id INT NOT NULL AUTO_INCREMENT,
    side_category_id INT,
    label VARCHAR (1000),
    item_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (side_category_id) REFERENCES side_categories(id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id) 
);
