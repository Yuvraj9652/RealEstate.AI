from django.urls import path

from .views import BuyerRegisterView

urlpatterns = [

    path(
        "register/buyer/",
        BuyerRegisterView.as_view(),
        name="buyer-register"
    ),

]
