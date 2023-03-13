FROM python:3.11-alpine
WORKDIR /code/

COPY requirements.txt /code/requirements.txt
RUN pip install --upgrade pip
RUN pip3 install --no-cache-dir -r /code/requirements.txt

COPY  src/  /code/src
COPY .env /code/.env
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
