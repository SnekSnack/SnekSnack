# Docker file, Image and COntainter
FROM python:3.8

ADD ollama_model.py .

RUN pip install torch transformers

CMD ["python", "./ollama_model.py"]