CREATE DATABASE store;

CREATE TABLE collection(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50),
    product VARCHAR(50),
    images BYTEA,
    price MONEY,
    info VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    iv VARCHAR(255),
    cart VARCHAR[]
);

CREATE TABLE shipment(
    id BIGSERIAL PRIMARY KEY,
    shipment VARCHAR[],
    address VARCHAR(255),
    suite VARCHAR(10),
    city VARCHAR(255),
    state VARCHAR(255),
    zipcode VARCHAR(50),
    phone VARCHAR(50)
);