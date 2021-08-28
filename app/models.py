from django.db import models

# Create your models here.
class Patient(models.Model):
    SEX = (
        ('female', 'F'),
        ('male', 'M'),
        ('others', 'O') 
    )
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    sex = models.CharField(default='F', max_length=20, choices=SEX)

class Doctor(models.Model):
    name = models.CharField(max_length=100)

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    appointment_datetime = models.DateTimeField(default='timezone.now')

    class Meta: 
        constraints = [
            models.UniqueConstraint(fields = ['patient_id', 'appointment_datetime'], name='unique_patient_booking'),
            models.UniqueConstraint(fields = ['doctor_id', 'appointment_datetime'], name='unique_doctor_booking'),
        ]
