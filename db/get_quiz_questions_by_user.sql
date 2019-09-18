SELECT * FROM questions
WHERE topic_id = (SELECT topic_id FROM user_profiles
WHERE user_id = $1);