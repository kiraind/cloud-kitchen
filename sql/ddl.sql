CREATE TABLE MenuItems (
    Id       INT PRIMARY KEY AUTO_INCREMENT,
    Title    VARCHAR(64),
    Price    DECIMAL(10, 2) NOT NULL,
    Calories FLOAT NOT NULL
);

CREATE TABLE Users (
    Id             INT PRIMARY KEY AUTO_INCREMENT,

    Name           VARCHAR(64),
    Email          VARCHAR(64) NOT NULL,
    BcryptPassword CHAR(60) NOT NULL,

    Registered     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserTokens (
    Created   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UserId    INT NOT NULL,
    Token     CHAR(64) NOT NULL,
    CSRFToken CHAR(64) NOT NULL, -- Cookie-to-Header : X-CSRF-Token

    foreign key (UserId) references Users(Id)
);

CREATE TABLE Customers (
    Id          INT PRIMARY KEY AUTO_INCREMENT,
    UserId      INT NOT NULL,

    BonusPoints INT DEFAULT 0,

    foreign key (UserId) references Users(Id)
);

CREATE TABLE Addresses (
    Id         INT PRIMARY KEY AUTO_INCREMENT,
    CustomerId INT NOT NULL,

    Street     VARCHAR(64) NOT NULL,
    Building   VARCHAR(6)  NOT NULL,
    Room       VARCHAR(6),

    foreign key (CustomerId) references Customers(Id)
);

CREATE TABLE CreditCards (
    CardNumber CHAR(16),
    Expires    CHAR(4),
    CVV        CHAR(3),
    HolderName VARCHAR(32),
    
    CustomerId INT NOT NULL,

    foreign key (CustomerId) references Customers(Id)
);

CREATE TABLE Cooks (
    Id     INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,

    Active BOOLEAN DEFAULT FALSE,

    foreign key (UserId) references Users(Id)
);

CREATE TABLE Couriers (
    Id     INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,

    Active BOOLEAN DEFAULT FALSE,
    Busy   BOOLEAN DEFAULT FALSE,

    foreign key (UserId) references Users(Id)
);

CREATE TABLE Orders (
    Id         INT PRIMARY KEY AUTO_INCREMENT,
    TempId     INT NOT NULL, -- Publicly displayed order id

    Ready      BOOLEAN DEFAULT FALSE,
    Delivered  BOOLEAN DEFAULT FALSE,

    CourierId  INT NOT NULL,

    CustomerId INT NOT NULL,
    AddressId  INT NOT NULL,
    Comment    VARCHAR(256),

    foreign key (CourierId)  references Couriers(Id),
    foreign key (AddressId)  references Addresses(Id),
    foreign key (CustomerId) references Customers(Id)
);

CREATE TABLE MenuItems_X_Orders (
    OrderId    INT NOT NULL,
    MenuItemId INT NOT NULL,
    CookId     INT NOT NULL,
    Amount     INT NOT NULL,
    Status     ENUM('New', 'InProgress', 'Ready') NOT NULL,

    foreign key (OrderId)    references Orders(Id),
    foreign key (MenuItemId) references MenuItems(Id),
    foreign key (CookId)     references Cooks(Id)
);
