BEGIN;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Profile CASCADE;



CREATE TABLE Users(
    ID SERIAL,
    User_Name VARCHAR(30) NOT NULL,
    Email VARCHAR(30),
    Password VARCHAR(30),
    PRIMARY KEY (ID)
);


CREATE TABLE Profile(
    ID SERIAL,
    User_Id int NOT NULL,
    Coins int DEFAULT 0,
    Level_Attack int DEFAULT 1,
    level_Auto int DEFAULT 0,
    PRIMARY KEY (ID) 
    FOREIGN KEY (User_Id) REFERENCES Users(ID)
);


/*INSERT INTO Users (User_Name, Email, Password) VALUES
('Hadeel', 'hadeel@gmail.com','123');

INSERT INTO profile (user_id) VALUES ((select id from users where user_name='Hadeel') );*/

COMMIT;
