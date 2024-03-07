from rest_framework.exceptions import ValidationError


def get_path_upload_image(instance, file):
    return f'frontend/src/images/{instance.user}/{file}'


def validate_size_image(file_obj):
    limit = 2
    if file_obj.size > 1024 * 1024 * limit:
        raise ValidationError('Image size must be less than 2MB')
