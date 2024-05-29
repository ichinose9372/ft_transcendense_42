import logging
from django.test import TestCase, Client
from django.urls import reverse
from models.models import Tournament, Match, Score
import json
import uuid
import random
from faker import Faker

logger = logging.getLogger(__name__)

def generateTestData():
    fake = Faker()
    tournament_id = str(uuid.uuid4())
    match_ids = [str(uuid.uuid4()) for _ in range(3)]
    participant_names = [fake.first_name() for _ in range(3)]

    return {
        "tournament": {
            "name": fake.company(),
            "tournamentId": tournament_id
        },
        "matches": [
            {
                "matchId": match_ids[0],
                "finishedTimestamp": "2022-01-01T12:00:00+00:00",
                "parentMatchId": match_ids[2],
                "tournamentId": tournament_id
            },
            {
                "matchId": match_ids[1],
                "finishedTimestamp": "2022-01-01T12:00:00+00:00",
                "parentMatchId": match_ids[2],
                "tournamentId": tournament_id
            },
            {
                "matchId": match_ids[2],
                "finishedTimestamp": "2022-01-01T12:00:00+00:00",
                "parentMatchId": "",
                "tournamentId": tournament_id
            }
        ],
        "scores": [
            {
                "matchId": match_ids[0],
                "score": random.randint(1, 10),
                "participantName": participant_names[0]
            },
            {
                "matchId": match_ids[1],
                "score": random.randint(1, 10),
                "participantName": participant_names[1]
            },
            {
                "matchId": match_ids[2],
                "score": random.randint(1, 10),
                "participantName": participant_names[2]
            }
        ]
    }

class GameFinishTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('gamefinish')

    def test_store_tournament_result(self):
        test_data = generateTestData()

        response = self.client.post(self.url, json.dumps(test_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        if response.json()['status'] != 'success':
            logger.error("Error: Status is not success. Response: %s", json.dumps(response.json()))
        self.assertEqual(response.json()['status'], 'success')

        # Verify tournament
        tournament = Tournament.objects.get(tournament_id=test_data['tournament']['tournamentId'])
        self.assertEqual(tournament.tournament_name, test_data['tournament']['name'])

        # Verify matches
        for match_data in test_data['matches']:
            match = Match.objects.get(match_id=match_data['matchId'])
            self.assertEqual(match.finished_time_stamp.isoformat(), match_data['finishedTimestamp'])
            if match_data['parentMatchId']:
                self.assertEqual(match.parent_match.match_id, uuid.UUID(match_data['parentMatchId']))
            else:
                self.assertIsNone(match.parent_match)

        # Verify scores
        for score_data in test_data['scores']:
            match = Match.objects.get(match_id=score_data['matchId'])
            score = Score.objects.get(match=match, participant_name=score_data['participantName'])
            self.assertEqual(score.score, score_data['score'])
