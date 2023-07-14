CREATE TABLE `pruebas-rds`.employees (
    id BIGINT UNSIGNED auto_increment NOT NULL COMMENT 'Identificador único del empleado',
    first_name varchar(25) NOT NULL COMMENT 'Primer nombre del empleado',
    middle_name varchar(25) NULL COMMENT 'Segundo nombre del empleado',
    last_name varchar(25) NOT NULL COMMENT 'Primer apellido del empleado',
    second_last_name varchar(25) NULL COMMENT 'Segundo apellido del empleado',
    birthday DATE NOT NULL COMMENT 'Fecha de nacimiento del empleado',
    document_type varchar(5) NOT NULL COMMENT 'Tipo de identificación del empleado (cc, pas, otro)',
    document_number varchar(15) NOT NULL COMMENT 'Número de identificación del empleado',
    salary DOUBLE NOT NULL COMMENT 'Sueldo del empleado equivalente al dolar',
    CONSTRAINT employees_PK PRIMARY KEY (id),
    CONSTRAINT employees_CHECK CHECK (document_type IN ('cc', 'pas', 'otro'))
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;