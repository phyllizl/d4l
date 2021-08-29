from app.models import Patient, Doctor, Appointment
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import PatientSerializer, DoctorSerializer, AppointmentSerializer

# Create your views here.
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.AllowAny]

class DoctorViewSet(viewsets.ModelViewSet):
     queryset = Doctor.objects.all()
     serializer_class = DoctorSerializer
     permission_classes = [permissions.AllowAny]

class AppointmentViewSet(viewsets.ModelViewSet):
     queryset = Appointment.objects.all()
     serializer_class = AppointmentSerializer
     permission_classes = [permissions.AllowAny]

     # add logic to be able to filter appointments by doctor_id
     def get_queryset(self):
          queryset = Appointment.objects.all()
          query = self.request.query_params.get('doctor')
          if query is not None:
               queryset = queryset.filter(doctor_id=query)
          return queryset

     # add logic to be able to filter appointments by patient_id. 
     def get_queryset(self):
          queryset = Appointment.objects.all()
          query = self.request.query_params.get('patient')
          if query is not None:
               queryset = queryset.filter(patient_id=query)
          return queryset

  