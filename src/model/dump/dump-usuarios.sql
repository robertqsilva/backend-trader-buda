create database budaSniper;

create table usuarios(
    id serial primary key,
    nome varchar(120) not null,
    email text not null unique,
    senha varchar(50) not null
);