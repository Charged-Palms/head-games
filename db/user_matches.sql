SELECT b.first_name, b.last_name, b.profile_pic, b.user_age, b.user_id, b.bio, b.status, b.zipcode, b.email, b.gender, matches.match_id FROM user_profiles a
JOIN (matches LEFT JOIN user_profiles b ON matches.matchee_id = b.user_id
)
on a.user_id = matches.user_id
WHERE a.user_id = $1;