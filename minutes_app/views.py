import os
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import MeetingMinutes
from .forms import MeetingMinutesForm
from django.db.models import Q
from django.http import HttpResponse
from django.conf import settings

@login_required
def home(request):
    search_query = request.GET.get('q')
    if search_query:
        meetings = MeetingMinutes.objects.filter(
            Q(title__icontains=search_query) |
            Q(date__icontains=search_query) |
            Q(category__icontains=search_query) |
            Q(guests__icontains=search_query)
        ).filter(created_by=request.user).order_by('-date')
    else:
        meetings = MeetingMinutes.objects.filter(created_by=request.user).order_by('-date')
    context = {'meetings': meetings}
    return render(request, 'home.html', context)  # Changed template path

@login_required
def add_meeting(request):
    if request.method == 'POST':
        form = MeetingMinutesForm(request.POST)
        if form.is_valid():
            meeting = form.save(commit=False)
            meeting.created_by = request.user
            meeting.save()
            return redirect('minutes:home')
    else:
        form = MeetingMinutesForm()
    context = {'form': form, 'action': 'Add'}
    return render(request, 'edit.html', context)  # Changed template path

@login_required
def edit_meeting(request, pk):
    meeting = get_object_or_404(MeetingMinutes, pk=pk, created_by=request.user)
    if request.method == 'POST':
        form = MeetingMinutesForm(request.POST, instance=meeting)
        if form.is_valid():
            form.save()
            return redirect('minutes:home')
    else:
        form = MeetingMinutesForm(instance=meeting)
    context = {'form': form, 'action': 'Edit', 'meeting_id': pk}
    return render(request, 'edit.html', context)  # Changed template path

@login_required
def view_meeting(request, pk):
    meeting = get_object_or_404(MeetingMinutes, pk=pk, created_by=request.user)
    context = {'meeting': meeting}
    return render(request, 'view.html', context)  # Changed template path

@login_required
def delete_meeting(request, pk):
    meeting = get_object_or_404(MeetingMinutes, pk=pk, created_by=request.user)
    if request.method == 'POST':
        meeting.delete()
        return redirect('minutes:home')
    return render(request, 'delete_confirm.html', {'meeting': meeting}) # Assuming delete_confirm.html is in the root templates

@login_required
def save_meeting_minutes(request, pk):
    meeting = get_object_or_404(MeetingMinutes, pk=pk, created_by=request.user)
    response = HttpResponse(meeting.topics, content_type='text/plain')
    response['Content-Disposition'] = f'attachment; filename="meeting_minutes_{meeting.title.replace(" ", "_")}.txt"'
    return response

@login_required
def save_meeting_minutes_to_server(request, pk):
    meeting = get_object_or_404(MeetingMinutes, pk=pk, created_by=request.user)
    filename = f"meeting_minutes_{meeting.title.replace(' ', '_')}.txt"
    filepath = os.path.join(settings.MEDIA_ROOT, 'minutes', filename)

    os.makedirs(os.path.join(settings.MEDIA_ROOT, 'minutes'), exist_ok=True)

    try:
        with open(filepath, 'w') as f:
            f.write(f"Title: {meeting.title}\n")
            f.write(f"Date: {meeting.date}\n")
            f.write(f"Start Time: {meeting.start_time}\n")
            f.write(f"End Time: {meeting.end_time}\n")
            f.write(f"Category: {meeting.category}\n")
            f.write(f"Host: {meeting.host}\n")
            f.write(f"Co-Hosts: {meeting.co_hosts}\n")
            f.write(f"Guests: {meeting.guests}\n")
            f.write(f"Attendees: {meeting.attendees}\n")
            f.write(f"Location: {meeting.location}\n")
            f.write(f"Written By: {meeting.written_by}\n")
            f.write(f"Agenda: {meeting.agenda}\n")
            f.write(f"Topics Discussed:\n{meeting.topics}\n")

        return HttpResponse(f"Meeting minutes saved to server at: {filepath}")
    except Exception as e:
        return HttpResponse(f"Error saving to server: {e}", status=500)

def index(request):
    return render(request, 'index.html')