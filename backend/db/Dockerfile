FROM postgres:12.2-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=^strapi123%$

ADD create.sql /docker-entrypoint-initdb.d
