def getAchievements(user_id):
	user = User.objects.get(user_id=user_id)
	achievements = Achievement.objects.filter(user=user)
	return achievements
