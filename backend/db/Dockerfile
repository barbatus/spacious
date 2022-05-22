FROM postgres:14.1-alpine

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=^admin123%

ADD create.sql /docker-entrypoint-initdb.d
