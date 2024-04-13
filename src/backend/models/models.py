from django.db import models
import uuid

# Create your models here.
class Tournament(models.Model):
    tournament_name = models.CharField(max_length=100)
    tournament_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f"{self.tournament_name} ({self.tournament_id})"

class Match(models.Model):
    match_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    finished_time_stamp = models.DateTimeField(auto_now_add=True)
    parent_match = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE) 

    def __str__(self):
        return str(self.match_id)

class Score(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE) #matchIdが欲しかったらScore.match_id
    score = models.IntegerField()
    participant_name = models.CharField(max_length=100)

    def __str__(self):
        return self.participant_name

