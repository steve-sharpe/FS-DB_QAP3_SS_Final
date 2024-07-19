CREATE DATABASE "bands"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE public.bands
(
    band_id SERIAL NOT NULL, 
    band_name character varying(30) NOT NULL,
    band_singer character varying(30) NOT NULL,
    band_label character varying(30) NOT NULL,
    number_albums numeric NOT NULL,
    favourite_album character varying(30) NOT NULL,
    PRIMARY KEY (band_id)
);

ALTER TABLE IF EXISTS public.bands
    OWNER to postgres;


