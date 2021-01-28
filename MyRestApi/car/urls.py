from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from car.views import (UserProfileViewSet,
                       RentViewSet)

router = DefaultRouter()
router.register(r"user", UserProfileViewSet)
router.register(r"rent", RentViewSet, basename="rent")

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls
