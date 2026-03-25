from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from pymongo import MongoClient
from octofit_tracker import models as app_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        # Drop collections directly to avoid ObjectId/int PK conflicts from stale data
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        for col in ['octofit_tracker_user', 'octofit_tracker_team',
                    'octofit_tracker_activity', 'octofit_tracker_leaderboard',
                    'octofit_tracker_workout']:
            db[col].drop()
        client.close()

        # Create Teams with explicit integer IDs
        marvel = app_models.Team.objects.create(id=1, name='Marvel')
        dc = app_models.Team.objects.create(id=2, name='DC')

        # Create Users with explicit integer IDs
        ironman = User.objects.create_user(
            id=1, username='ironman', email='ironman@marvel.com',
            password='password', team=marvel)
        captain = User.objects.create_user(
            id=2, username='captainamerica', email='cap@marvel.com',
            password='password', team=marvel)
        batman = User.objects.create_user(
            id=3, username='batman', email='batman@dc.com',
            password='password', team=dc)
        superman = User.objects.create_user(
            id=4, username='superman', email='superman@dc.com',
            password='password', team=dc)

        # Create Activities with explicit integer IDs
        app_models.Activity.objects.create(id=1, user=ironman, type='run', duration=30, distance=5)
        app_models.Activity.objects.create(id=2, user=batman, type='cycle', duration=60, distance=20)
        app_models.Activity.objects.create(id=3, user=superman, type='swim', duration=45, distance=2)
        app_models.Activity.objects.create(id=4, user=captain, type='run', duration=25, distance=4)

        # Create Workouts with explicit integer IDs
        app_models.Workout.objects.create(id=1, name='Morning Cardio', description='Cardio workout for all levels')
        app_models.Workout.objects.create(id=2, name='Strength Training', description='Strength workout for superheroes')

        # Create Leaderboard entries with explicit integer IDs
        app_models.Leaderboard.objects.create(id=1, user=ironman, points=100)
        app_models.Leaderboard.objects.create(id=2, user=batman, points=90)
        app_models.Leaderboard.objects.create(id=3, user=superman, points=95)
        app_models.Leaderboard.objects.create(id=4, user=captain, points=85)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
