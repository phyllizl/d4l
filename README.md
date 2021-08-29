## Q1: Identify the entities & relations. Load the given CSV data into the objects
3 Tables: Patient, Doctor and Appointment 
Appointment Table: Takes in Patient and Doctor as Foreign Keys. 

Loading CSV data: 
- create a staging table to alter csv data to fit Table columns. 
- tried to alter datestamp to sql, dmy - this did not work. Instead, I used substring + concat to update the format of datetime.

## Q2: Get all appointments for the given doctor & date
- get request. 
- created queryset in appointment to get param of 'doctor_id'. Filtered all appointments according to doctor_id.

## Q3: Fix appointment by patient, doctor and date & time
- 

## Q4: Cancel appointment by patient, doctor and date & time
