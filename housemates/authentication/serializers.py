from rest_framework import serializers
from housemates.models.user import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128, min_length=6, write_only=True)
        
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active']