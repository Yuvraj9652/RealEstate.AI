from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import BuyerRegisterSerializer, UserSerializer, LoginSerializer, UserSerializer,ChangePasswordSerializer

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated


class BuyerRegisterView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = BuyerRegisterSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(
            {
                "message": "Buyer registered successfully.",
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )
    



class LoginView(GenericAPIView):

    permission_classes = [AllowAny]

    serializer_class = LoginSerializer

    def post(self, request):

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {

                "message": "Login successful.",

                "access": str(refresh.access_token),

                "refresh": str(refresh),

                "user": UserSerializer(user).data,

            },

            status=status.HTTP_200_OK,
        )
    




class LogoutView(GenericAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            refresh_token = request.data["refresh"]

            token = RefreshToken(refresh_token)

            token.blacklist()

            return Response(
                {
                    "message": "Logout successful."
                },
                status=status.HTTP_200_OK
            )

        except Exception:

            return Response(
                {
                    "error": "Invalid refresh token."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
from rest_framework_simplejwt.views import TokenRefreshView


class RefreshTokenView(TokenRefreshView):
    pass

from rest_framework.permissions import IsAuthenticated


class ProfileView(GenericAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = UserSerializer

    def get(self, request):

        serializer = self.get_serializer(request.user)

        return Response(serializer.data)
    
class UpdateProfileView(GenericAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = UserSerializer

    def put(self, request):

        serializer = self.get_serializer(
            request.user,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "message": "Profile updated successfully.",
                "user": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
    
class ChangePasswordView(GenericAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = ChangePasswordSerializer

    def post(self, request):

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = request.user

        if not user.check_password(serializer.validated_data["old_password"]):

            return Response(
                {
                    "old_password": [
                        "Old password is incorrect."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(
            serializer.validated_data["new_password"]
        )

        user.save()

        return Response(
            {
                "message": "Password changed successfully."
            },
            status=status.HTTP_200_OK,
        )
    
 
class ForgotPasswordView(GenericAPIView):

    permission_classes = [AllowAny]

    def post(self, request):

        return Response(
            {
                "message":
                "Will be implemented with OTP."
            }
        )
    
class ResetPasswordView(GenericAPIView):

    permission_classes = [AllowAny]

    def post(self, request):

        return Response(
            {
                "message":
                "Will be implemented later."
            }
        )