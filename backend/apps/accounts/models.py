from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager
#Create Your models Here

class UserRole(models.TextChoices):
    PLATFORM_ADMIN = "platform_admin", "Platform Admin"

    COMPANY_OWNER = "company_owner", "Company Owner"
    COMPANY_ADMIN = "company_admin", "Company Admin"

    SALES_MANAGER = "sales_manager", "Sales Manager"
    SALES_AGENT = "sales_agent", "Sales Agent"

    MARKETING_EXECUTIVE = "marketing_executive", "Marketing Executive"
    LEGAL_EXECUTIVE = "legal_executive", "Legal Executive"

    BUYER = "buyer", "Buyer"


class CustomUser(AbstractUser):

    username = None

    email = models.EmailField(
        unique=True
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100,
        blank=True
    )

    phone_number = models.CharField(
        max_length=15,
        blank=True
    )

    profile_image = models.ImageField(
        upload_to="profile_images/",
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=30,
        choices=UserRole.choices,
        default=UserRole.BUYER
    )

    is_verified = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["first_name"]

    def __str__(self):
        return self.email