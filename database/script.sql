CREATE TABLE cinemas
(
    cinema_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    companies_id NUMBER NOT NULL,
    CONSTRAINT fk_cinemas_companies FOREIGN KEY (companies_id) REFERENCES companies(companies_id)
);



CREATE TABLE movies
(
    movie_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    running_time NUMBER NOT NULL,
    synopsis VARCHAR(500) NOT NULL,
    poster_image VARCHAR(200) NOT NULL,
    release_year NUMBER(4) NOT NULL,
);

CREATE TABLE languages
(
    language_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code VARCHAR(2) NOT NULL,
);

CREATE TABLE invoice_products
(
    invoice_id NUMBER NOT NULL,
    product_id NUMBER NOT NULL,
    CONSTRAINT invoice_products_pk PRIMARY KEY (invoice_id, product_id),
);
