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

CREATE TABLE companies
(
    company_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(254) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    phone NUMBER NOT NULL,
    website_url VARCHAR(2048) NOT NULL,
    addres_id NUMBER NOT NULL,
    CONSTRAINT FK_address_company FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE theaters
(
    theater_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cinema_id NUMBER NOT NULL,
    number_seats NUMBER NOT NULL,
    dimension_x NUMBER,
    dimension_y NUMBER,
    projector_type VARCHAR(100),
    sound_system VARCHAR(100),
    CONSTRAINT FK_cinema_theater FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id)
    
)

CREATE TABLE movie_languages
(
    movie_id NUMBER NOT NULL,
    language_id NUMBER NOT NULL,
    CONSTRAINT PK_movie_languages PRIMARY KEY (movie_id, language_id)
    CONSTRAINT FK_movlang_movID FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
    CONSTRAINT FK_movlang_langID FOREIGN KEY(language_id) REFERENCES languages(language_id)

)

CREATE TABLE employees
(
    Employe_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100) NOT NULL,
    first_name  VARCHAR(100) NOT NULL,
    second_surname VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    phone_number NUMBER NOT NULL,
    email VARCHAR(254) NOT NULL,
    addres_id NUMBER NOT NULL,
    employe_role VARCHAR (20),
    company_id NUMBER NOT NULL,
    CONSTRAINT FK_address_employee FOREIGN KEY (addres_id) REFERENCES addresses(address_id)
    CONSTRAINT FK_id_company FOREIGN KEY (company_id) REFERENCES companies(company_id)
)
/* googl authentication needs more research
CREATE TABLE user_mfa (
    user_id INT PRIMARY KEY,
    encrypted_secret_key VARCHAR(255) NOT NULL,
    is_mfa_enabled BOOLEAN DEFAULT FALSE,
    backup_codes TEXT -- Encrypted list of emergency recovery codes
);
*/