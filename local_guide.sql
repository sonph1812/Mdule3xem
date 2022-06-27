CREATE DATABASE local_guide;
USE local_guide;
CREATE TABLE country(
	Id INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE cities(
	Id INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    countryId INT ,
    area INT ,
    popular INT ,
    GDP INT ,
    desciption VARCHAR (1000) ,
    FOREIGN KEY (countryId) REFERENCES country(Id)
);


-- INSERT SOME COUNTRY
INSERT INTO country(name) VALUES ("Việt Name"), ("Thái Lan"), ("Hoa Kỳ"), ("Nhật Bản");

-- INSERT CITY TO CITIES TABLE

INSERT INTO cities(name,countryId,area,popular,GDP,desciption) VALUES ("Đà Nẵng",1, 3000, 2000, 1000, "Thành phố du lịch nổi tiếng của Việt Nam");
