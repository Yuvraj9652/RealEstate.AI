from django.urls import path

from .views import (
    BuyerRegisterView,
    LoginView,
    LogoutView,
    RefreshTokenView,
    ProfileView,
    UpdateProfileView,
    ChangePasswordView,
    ForgotPasswordView,
    ResetPasswordView,
)

urlpatterns = [

    path(
        "register/buyer/",
        BuyerRegisterView.as_view(),
        name="buyer-register",
    ),

    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),

    path(
        "refresh/",
        RefreshTokenView.as_view(),
        name="refresh",
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),

    path(
        "profile/update/",
        UpdateProfileView.as_view(),
        name="update-profile",
    ),

    path(
        "change-password/",
        ChangePasswordView.as_view(),
        name="change-password",
    ),

    path(
        "forgot-password/",
        ForgotPasswordView.as_view(),
        name="forgot-password",
    ),

    path(
        "reset-password/",
        ResetPasswordView.as_view(),
        name="reset-password",
    ),
]

