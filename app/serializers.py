from django.db import models
from .models import Patient, Doctor, Appointment
from rest_framework import serializers

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        # The model it will serialize
        model = Patient
        # the fields that should be included in the serialized output
        fields = ['id', 'name', 'age', 'sex']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Doctor
        fields = ['id', 'name']

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()

    class Meta: 
        model = Appointment
        fields = ['id', 'doctor', 'patient', 'appointment_datetime']
    
    def create (self, validated_data):
        patients_data = validated_data.pop('patients')
        appointment = Appointment.objects.create(**validated_data)
        for patient_data in patients_data:
            Patient.objects.create(**patient_data)
        return appointment