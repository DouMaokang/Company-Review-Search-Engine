from rest_framework import serializers

class StringSerializer(serializers.Serializer):
   """Your data serializer, define your fields here."""
   string = serializers.CharField()
#    likes = serializers.IntegerField()