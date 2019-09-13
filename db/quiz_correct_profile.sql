SELECT b.first_name, b.last_name, b.profile_pic, b.user_age, b.user_id, b.bio, b.status, b.zipcode, b.email, b.gender FROM user_profiles a
JOIN (user_profiles b LEFT JOIN matches ON b.user_id = matches.user_id)
ON a.user_id = matches.matchee_id
WHERE a.user_id = $1;

--sql file to get all users profiles where the user on sessions took their quiz.