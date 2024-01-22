create database budaSniper;

create table usuarios(
    id serial primary key,
    email text not null unique,
    senha text not null
);