--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-05 15:48:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16402)
-- Name: Categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Categories_id_seq" OWNER TO postgres;

--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 218
-- Name: Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categories_id_seq" OWNED BY public."Categories".id;


--
-- TOC entry 219 (class 1259 OID 16403)
-- Name: Expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Expenses" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    amount real NOT NULL,
    name character varying(50) NOT NULL,
    category_id integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public."Expenses" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16406)
-- Name: Expenses_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expenses_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Expenses_category_id_seq" OWNER TO postgres;

--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 220
-- Name: Expenses_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expenses_category_id_seq" OWNED BY public."Expenses".category_id;


--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: Expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expenses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Expenses_id_seq" OWNER TO postgres;

--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 221
-- Name: Expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expenses_id_seq" OWNED BY public."Expenses".id;


--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: Expenses_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expenses_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Expenses_user_id_seq" OWNER TO postgres;

--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 222
-- Name: Expenses_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expenses_user_id_seq" OWNED BY public."Expenses".user_id;


--
-- TOC entry 229 (class 1259 OID 16453)
-- Name: Incomes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Incomes" (
    id integer DEFAULT nextval('public."Categories_id_seq"'::regclass) NOT NULL,
    user_id integer NOT NULL,
    amount real NOT NULL,
    name character varying(50) NOT NULL,
    date date NOT NULL
);


ALTER TABLE public."Incomes" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16446)
-- Name: Monthly_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Monthly_expenses" (
    id integer DEFAULT nextval('public."Categories_id_seq"'::regclass) NOT NULL,
    user_id integer NOT NULL,
    amount real NOT NULL,
    name character varying(50) NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public."Monthly_expenses" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16413)
-- Name: Monthly_incomes ; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Monthly_incomes " (
    id integer NOT NULL,
    user_id integer NOT NULL,
    amount real NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public."Monthly_incomes " OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16409)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    e_mail character varying(100) NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16412)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 224
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 226 (class 1259 OID 16418)
-- Name: incomes _id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."incomes _id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."incomes _id_seq" OWNER TO postgres;

--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 226
-- Name: incomes _id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."incomes _id_seq" OWNED BY public."Monthly_incomes ".id;


--
-- TOC entry 227 (class 1259 OID 16419)
-- Name: incomes _user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."incomes _user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."incomes _user_id_seq" OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 227
-- Name: incomes _user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."incomes _user_id_seq" OWNED BY public."Monthly_incomes ".user_id;


--
-- TOC entry 4768 (class 2604 OID 16420)
-- Name: Categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN id SET DEFAULT nextval('public."Categories_id_seq"'::regclass);


--
-- TOC entry 4769 (class 2604 OID 16421)
-- Name: Expenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses" ALTER COLUMN id SET DEFAULT nextval('public."Expenses_id_seq"'::regclass);


--
-- TOC entry 4770 (class 2604 OID 16422)
-- Name: Expenses user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses" ALTER COLUMN user_id SET DEFAULT nextval('public."Expenses_user_id_seq"'::regclass);


--
-- TOC entry 4771 (class 2604 OID 16423)
-- Name: Expenses category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses" ALTER COLUMN category_id SET DEFAULT nextval('public."Expenses_category_id_seq"'::regclass);


--
-- TOC entry 4773 (class 2604 OID 16425)
-- Name: Monthly_incomes  id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_incomes " ALTER COLUMN id SET DEFAULT nextval('public."incomes _id_seq"'::regclass);


--
-- TOC entry 4774 (class 2604 OID 16426)
-- Name: Monthly_incomes  user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_incomes " ALTER COLUMN user_id SET DEFAULT nextval('public."incomes _user_id_seq"'::regclass);


--
-- TOC entry 4772 (class 2604 OID 16424)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4941 (class 0 OID 16399)
-- Dependencies: 217
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" (id, name) FROM stdin;
1	Shopping
2	Entertainment
3	Transport
4	Rent&Energy
5	Other
\.


--
-- TOC entry 4943 (class 0 OID 16403)
-- Dependencies: 219
-- Data for Name: Expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Expenses" (id, user_id, amount, name, category_id, date) FROM stdin;
1	1	35	jeans	1	2025-04-01
7	1	95	Lebensmittel	1	2025-04-07
8	1	69	Lebensmittel	1	2025-04-14
9	1	55	Lebensmittel	1	2025-04-21
10	1	72	Lebensmittel	1	2025-04-28
11	1	20	Haushalt-Reinigungsmittel	1	2025-04-03
12	1	49.99	Bus Prag hin und zurück	3	2025-04-17
13	1	15	Club Eintritt	2	2025-04-30
14	1	15	Rollschuhe Kleinanzeigen	2	2025-04-04
15	1	10	Geburtstagsparty Geschenk	2	2025-04-04
16	1	19	Geburtstagsparty Geschenk	2	2025-04-12
17	1	75	Unterkunft Prag	2	2025-04-18
18	1	8	Kneipe	2	2025-04-19
19	1	12	Kneipe	2	2025-04-20
20	1	5	Medikament	5	2025-04-07
\.


--
-- TOC entry 4953 (class 0 OID 16453)
-- Dependencies: 229
-- Data for Name: Incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Incomes" (id, user_id, amount, name, date) FROM stdin;
6	1	150	Mamas Geschenk	2025-04-16
\.


--
-- TOC entry 4952 (class 0 OID 16446)
-- Dependencies: 228
-- Data for Name: Monthly_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Monthly_expenses" (id, user_id, amount, name, category_id) FROM stdin;
5	1	4.99	netflix abo	2
4	1	60	gym abo	2
3	1	42.99	internet	4
1	1	420	rent WG	4
2	1	58	Deutschlandticket	3
\.


--
-- TOC entry 4949 (class 0 OID 16413)
-- Dependencies: 225
-- Data for Name: Monthly_incomes ; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Monthly_incomes " (id, user_id, amount, name) FROM stdin;
1	1	520	Minijob
\.


--
-- TOC entry 4947 (class 0 OID 16409)
-- Dependencies: 223
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, password, e_mail) FROM stdin;
1	Tina	Tina1234	tina@zens.de
\.


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 218
-- Name: Categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Categories_id_seq"', 10, true);


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 220
-- Name: Expenses_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Expenses_category_id_seq"', 1, false);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 221
-- Name: Expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Expenses_id_seq"', 20, true);


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 222
-- Name: Expenses_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Expenses_user_id_seq"', 1, false);


--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 224
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);


--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 226
-- Name: incomes _id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."incomes _id_seq"', 1, true);


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 227
-- Name: incomes _user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."incomes _user_id_seq"', 1, false);


--
-- TOC entry 4779 (class 2606 OID 16428)
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 16430)
-- Name: Expenses Expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT "Expenses_pkey" PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 16457)
-- Name: Incomes Incomes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Incomes"
    ADD CONSTRAINT "Incomes_pkey" PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16450)
-- Name: Monthly_expenses Monthly_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_expenses"
    ADD CONSTRAINT "Monthly_expenses_pkey" PRIMARY KEY (id);


--
-- TOC entry 4785 (class 2606 OID 16452)
-- Name: Monthly_incomes  Monthly_incomes _pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_incomes "
    ADD CONSTRAINT "Monthly_incomes _pkey" PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 16432)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4777 (class 2606 OID 16433)
-- Name: Users valid_email; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public."Users"
    ADD CONSTRAINT valid_email CHECK (((e_mail)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)) NOT VALID;


--
-- TOC entry 4790 (class 2606 OID 16458)
-- Name: Expenses category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public."Categories"(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4793 (class 2606 OID 16468)
-- Name: Monthly_expenses category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_expenses"
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public."Categories"(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4792 (class 2606 OID 16434)
-- Name: Monthly_incomes  user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_incomes "
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- TOC entry 4791 (class 2606 OID 16463)
-- Name: Expenses user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expenses"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4794 (class 2606 OID 16473)
-- Name: Monthly_expenses user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Monthly_expenses"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4795 (class 2606 OID 16478)
-- Name: Incomes user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Incomes"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON DELETE CASCADE NOT VALID;


-- Completed on 2025-05-05 15:48:03

--
-- PostgreSQL database dump complete
--

