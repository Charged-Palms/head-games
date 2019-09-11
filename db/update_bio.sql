UPDATE user_profiles
SET
bio = ${bio}
WHERE
user_id = ${user_id};