from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from car.models import UserProfile, Rent
from car.serializers import UserProfileSerializer, RentSerializer

# Create your views here.


class UserProfileViewSet(ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class RentViewSet(ModelViewSet):
    serializer_class = RentSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        queryset = Rent.objects.all()
        id = self.request.query_params.get("id", None)
        if id is not None:
            queryset = queryset.filter(user__id=id)
        return queryset
