FROM python:3.11.3
LABEL authors="islam"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN alias python=python3

RUN apt-get update && apt-get -qy install gcc libjpeg-dev libxslt-dev \
    libpq-dev libmariadb-dev libmariadb-dev-compat gettext cron openssh-client flake8 locales vim \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip --no-cache-dir \
    && pip install poetry --no-cache-dir

RUN groupadd -r wb && useradd -rms /bin/bash -g wb adminuser

USER adminuser

WORKDIR /wb

RUN mkdir /wb/static && mkdir /wb/media && chown -R adminuser:wb /wb && chmod 755 /wb

COPY --chown=adminuser:wb . .

RUN python -m venv /home/adminuser/.venv
RUN /bin/bash -c "source /home/adminuser/.venv/bin/activate && pip install -r requirements.txt && poetry install --no-root --no-dev"

CMD ["/home/adminuser/.venv/bin/gunicorn", "-b", "0.0.0.0:8001", "react_django.wsgi:application"]
