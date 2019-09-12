SELECT user_id, email, first_name, last_name, gender, user_age, profile_pic, bio, status, zipcode FROM user_profiles
WHERE user_id = $1;