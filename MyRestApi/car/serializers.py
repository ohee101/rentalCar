from rest_framework.serializers import ModelSerializer

from car.models import UserProfile, CarType, CustomerDetail, Rent


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            "id",
            "email",
            "password",
        )
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}}
        }

    def create(self, validated_data):
        user = UserProfile.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


class CarSerializer(ModelSerializer):
    class Meta:
        model = CarType
        exclude = [
            "id",
        ]


class CustomerDetailSerializer(ModelSerializer):
    class Meta:
        model = CustomerDetail
        exclude = [
            "id",
        ]


class RentSerializer(ModelSerializer):
    carType = CarSerializer()
    customer = CustomerDetailSerializer()

    class Meta:
        model = Rent
        fields = "__all__"

    def create(self, validated_data):
        carType_data = validated_data.pop("carType")
        customer_data = validated_data.pop("customer")
        carType = CarSerializer.create(
            CarSerializer(),
            validated_data=carType_data
        )
        customer = CustomerDetailSerializer.create(
            CustomerDetailSerializer(), validated_data=customer_data
        )
        rent, created = Rent.objects.update_or_create(
            carType=carType,
            customer=customer,
            payment=validated_data.pop("payment"),
            rentTime=validated_data.pop("rentTime"),
            user=validated_data.pop("user")
        )

        return rent
