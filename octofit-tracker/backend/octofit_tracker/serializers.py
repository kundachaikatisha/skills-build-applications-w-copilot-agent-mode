from rest_framework import serializers
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Workout, Leaderboard

User = get_user_model()


def _get_id(obj):
    """Return the MongoDB _id as a string, falling back to pk."""
    raw = getattr(obj, '_id', None) or obj.pk
    return str(raw) if raw is not None else None


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'members']

    def get_id(self, obj):
        return _get_id(obj)


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'team']

    def get_id(self, obj):
        return _get_id(obj)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'username', 'type', 'duration', 'distance', 'timestamp']

    def get_id(self, obj):
        return _get_id(obj)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']

    def get_id(self, obj):
        return _get_id(obj)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = ['id', 'username', 'points']

    def get_id(self, obj):
        return _get_id(obj)
