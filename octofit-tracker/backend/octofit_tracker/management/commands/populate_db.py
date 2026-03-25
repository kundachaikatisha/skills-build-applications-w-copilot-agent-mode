from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from pymongo import MongoClient
from octofit_tracker import models as app_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()

        # Drop collections to start fresh
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']
        for col in ['octofit_tracker_user', 'octofit_tracker_team',
                    'octofit_tracker_activity', 'octofit_tracker_leaderboard',
                    'octofit_tracker_workout']:
            db[col].drop()
        client.close()

        # Create Teams
        marvel = app_models.Team.objects.create(name='Marvel', members=['ironman', 'captainamerica'])
        dc = app_models.Team.objects.create(name='DC', members=['batman', 'superman'])

        # Create Users (team stored as team name string)
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team='Marvel')
        captain = User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password', team='Marvel')
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='password', team='DC')
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='password', team='DC')

        # Create Activities
        app_models.Activity.objects.create(username='ironman', type='run', duration=30, distance=5)
        app_models.Activity.objects.create(username='batman', type='cycle', duration=60, distance=20)
        app_models.Activity.objects.create(username='superman', type='swim', duration=45, distance=2)
        app_models.Activity.objects.create(username='captainamerica', type='run', duration=25, distance=4)

        # Create Workouts
        app_models.Workout.objects.create(name='Morning Cardio', description='Cardio workout for all levels')
        app_models.Workout.objects.create(name='Strength Training', description='Strength workout for superheroes')

        # Create Leaderboard
        app_models.Leaderboard.objects.create(username='ironman', points=100)
        app_models.Leaderboard.objects.create(username='batman', points=90)
        app_models.Leaderboard.objects.create(username='superman', points=95)
        app_models.Leaderboard.objects.create(username='captainamerica', points=85)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
