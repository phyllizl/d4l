-- INSERT INTO app_patient(name, age, sex) VALUES 
--     ('p1', 12, 'F'),
--     ('p2', 22, 'M');

-- INSERT INTO app_doctor(name) VALUES 
--     ('d1'),
--     ('d2');

-- INSERT INTO app_appointment (appointment_datetime, doctor_id, patient_id) VALUES 
--     ('20180308 09:00:00', 2, 1);

-- DELETE FROM app_appointment;
-- DELETE FROM app_patient;
-- DELETE FROM app_doctor;

-- DROP TABLE staging;

-- CREATE TABLE staging (doctor_id varchar(20), doctor_name varchar(20), patient_id varchar(20), patient_name varchar(20), patient_age int, patient_gender varchar(20), appointment_id varchar(20), appointment_datetime varchar(50));

-- COPY staging FROM '/Users/thomasoh/SEI/d4l/dummy.csv' DELIMITER ',' CSV HEADER;

-- -- (1) change all IDs to Int (2) change date time format (3) perform inserts to tables  

-- UPDATE staging SET doctor_id = substring(doctor_id, 2);
-- ALTER TABLE staging ALTER COLUMN doctor_id DROP DEFAULT, ALTER COLUMN doctor_id TYPE int USING doctor_id::integer;

-- UPDATE staging SET appointment_id = substring(appointment_id, 2);
-- ALTER TABLE staging ALTER COLUMN appointment_id DROP DEFAULT, ALTER COLUMN appointment_id TYPE int USING appointment_id::integer;

-- UPDATE staging SET patient_id = substring(patient_id, 2);
-- ALTER TABLE staging ALTER COLUMN patient_id DROP DEFAULT, ALTER COLUMN patient_id TYPE int USING patient_id::integer;

-- UPDATE staging SET appointment_datetime = concat(
--     substring(appointment_datetime, 2, 5),
--     substring(appointment_datetime, 1, 1),
--     substring(appointment_datetime, 8, 2),
--     substring(appointment_datetime, 10));

-- ALTER TABLE staging ALTER COLUMN appointment_datetime DROP DEFAULT, ALTER COLUMN appointment_datetime TYPE timestamp with time zone USING appointment_datetime::timestamp with time zone;

-- INSERT INTO app_patient (name, age, sex) SELECT DISTINCT ON (patient_name) patient_name, patient_age, patient_gender FROM staging;

-- SELECT * FROM app_patient

-- INSERT INTO app_doctor (name) SELECT DISTINCT doctor_name FROM staging;

-- SELECT * FROM app_doctor;

-- SELECT * FROM app_appointment;

-- UPDATE staging 
-- SET doctor_id = id
-- FROM app_doctor
-- WHERE staging.doctor_name = app_doctor.name;

-- UPDATE staging 
-- SET patient_id = id
-- FROM app_patient
-- WHERE staging.patient_name = app_patient.name;

-- INSERT INTO app_appointment (appointment_datetime, doctor_id, patient_id) SELECT appointment_datetime, doctor_id, patient_id FROM staging;

SELECT * FROM app_appointment;

-- SELECT data_type FROM information_schema.columns WHERE 
--     TABLE_NAME = 'staging' AND
--     COLUMN_NAME = 'appointment_datetime'


