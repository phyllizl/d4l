from django.db import models
from .models import Patient, Doctor, Appointment
from rest_framework import serializers

class PatientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        # The model it will serialize
        model = Patient
        # the fields that should be included in the serialized output
        fields = ['id', 'name', 'age', 'sex']

class DoctorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta: 
        model = Doctor
        fields = ['id', 'name']

class AppointmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta: 
        model = Appointment
        fields = ['id', 'doctor', 'patient', 'appointment_datetime']