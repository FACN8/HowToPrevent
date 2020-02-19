BEGIN;

DROP TABLE IF EXISTS usernames CASCADE;
DROP TABLE IF EXISTS profile CASCADE;

CREATE TABLE usernames (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);

CREATE TABLE profile (
    ID SERIAL PRIMARY KEY,
    name_id int NOT NULL,
    coin int DEFAULT 0,
    level_attack int DEFAULT 1,
    level_auto int DEFAULT 0, 
    FOREIGN KEY (name_id) REFERENCES usernames(ID)
);

COMMIT;
