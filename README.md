# Case Study (Data4Life)

## Tech Stack
- PostgreSQL with Django (backend)
- Reactjs (frontend)

## Identify the entities & relations. Load the given CSV data into the objects
- created database 
- created 3 Tables: Patient, Doctor and Appointment. One to Many relationship (An appointment can only have 1 patient/ doctor. But patient/doctor can have many appointments).
- Patient table: name, sex, age. For sex, there are only 3 valid choices. 
- Doctor table: name
- Appointment Table: Takes in Patient and Doctor as Foreign Keys. It also has an appointment_datetime column.

Loading CSV data: 
- create a staging table to load csv data.
- in staging table, transformed seed data to prepare for inserts into the 3 production tables. 
- Key alterations: 
  (a) tried to alter datestamp to sql, dmy - this did not work. Instead, I used substring + concat to update the format of datetime.
  (b) seed data IDs were strings. Parsed seed IDs to integers so that foreign key reference could be made. 
  (c) performed inserts into all 3 tables. To prevent duplications for patients/doctor tables - used SELECT DISTINCT ON.

## Get all appointments for the given doctor & date
- in frontend, make a get request for a specific doctor's appointments.
- in backend, created queryset in AppointmentViewSet to get param of 'doctor_id'. Filtered all appointments according to doctor_id, and returned the filtered data.

## Fix appointment by patient, doctor and date & time
- in frontend, only existing patients can fix appointments. 
- created form for new patients to register themselves. Took submited information (name, sex, age) and made post request to create new patient. 
- created form to fix appointment. 
  (a) existing patients to select their name from dropdown list + doctor + appointment slot
  (b) logic in backend prevents any patient/doctor from having 2 appointments on the same date/time. 
  (c) logic in frontend only allows slots to be made within working hours (8am to 4pm).
  (d) taking the above information, submitted post request to make appointment. 

## Cancel appointment by patient, doctor and date & time
- a patient/doctor can select himself to see scheduled appointments (get request)
- delete button sends a delete request to delete the particular appointment from database. 
