CREATE DATABASE store;

CREATE TABLE products(
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

CREATE TABLE projects(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    images BYTEA,
    info VARCHAR(300)
);

CREATE TABLE medias(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    media VARCHAR(50) NOT NULL,
    images BYTEA,
    content BYTEA,
    info VARCHAR(2000)
);

CREATE TABLE events(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    images BYTEA,
    price MONEY NOT NULL,
    info VARCHAR(300) NOT NULL
);

CREATE TABLE courses(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    course_subject VARCHAR(50) NOT NULL,
    images BYTEA,
    content BYTEA,
    info VARCHAR(300)
);

CREATE TABLE community(
    id BIGSERIAL PRIMARY KEY,
    post_title VARCHAR(50) NOT NULL,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE,
    post VARCHAR(300) NOT NULL
);