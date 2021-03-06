from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import RegisterSerializer, UserSerializer

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserAPIView(APIView):

    def get(self, request):
        serializer = UserSerializer(request.user)
        context = {
            'user': serializer.data
        }
        return Response(context, status=status.HTTP_200_OK)
