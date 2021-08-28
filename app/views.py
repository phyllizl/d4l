from app.models import Patient, Doctor, Appointment
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import PatientSerializer, DoctorSerializer, AppointmentSerializer

# Create your views here.
class PatientViewSet(viewsets.ModelViewSet):
    ## The Main Query for the index route
    queryset = Patient.objects.all()
    # The serializer class for serializing output
    serializer_class = PatientSerializer
    # optional permission class set permission level
    permission_classes = [permissions.AllowAny]

class DoctorViewSet(viewsets.ModelViewSet):
     queryset = Doctor.objects.all()
     serializer_class = DoctorSerializer
     permission_classes = [permissions.AllowAny]

class AppointmentViewSet(viewsets.ModelViewSet):
     queryset = Appointment.objects.all()
     serializer_class = AppointmentSerializer
     permission_classes = [permissions.AllowAny]

     def get_queryset(self):
          queryset = Appointment.objects.all()
          query = self.request.query_params.get('doctor')
          if query is not None:
               queryset = queryset.filter(doctor_id=query)
          return queryset

     