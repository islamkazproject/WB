from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError


class UsernameValidator(object):
    def set_context(self, serializer_field):
        """
        This hook is called by the serializer instance,
        prior to the validation call being made.
        """
        # Determine the existing instance, if this is an update operation.
        self.instance = getattr(serializer_field.parent, "instance", None)
        if not self.instance:
            # try to get user from profesionales:
            root_instance = getattr(serializer_field.root, "instance", None)
            self.instance = getattr(root_instance, "user", None)

    def __call__(self, value):
        if (
            self.instance
            and User.objects.filter(username=value)
            .exclude(id=self.instance.id)
            .exists()
        ):
            raise ValidationError("Username already exists.")

        if not self.instance and User.objects.filter(username=value).exists():
            raise ValidationError("Username already exists.")
