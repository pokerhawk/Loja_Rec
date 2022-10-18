# loja-de-produtos

CREATE DATABASE lojaDB;

CREATE TABLE usuarios (
    ID serial NOT NULL PRIMARY KEY,
    login text UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    divida float
);

CREATE TABLE produtos (
    ID serial NOT NULL PRIMARY KEY,
    produto text UNIQUE NOT NULL,
    quantidade SMALLINT,
    preco float
);

CREATE TABLE pedidos (
    N_pedido serial NOT NULL PRIMARY KEY,
    usuario text,
    codigo text,
    data date
);

INSERT INTO produtos (produto, quantidade, preco) VALUES ('novo_produto', 10, 10);