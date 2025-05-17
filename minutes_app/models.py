from django.db import models
from django.contrib.auth.models import User

class MeetingMinutes(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    category = models.CharField(max_length=100, blank=True)
    host = models.CharField(max_length=100, blank=True)
    co_hosts = models.TextField(blank=True)
    guests = models.TextField(blank=True)
    attendees = models.IntegerField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    written_by = models.CharField(max_length=100, blank=True)
    agenda = models.TextField(blank=True)
    topics = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title