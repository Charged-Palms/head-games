INSERT INTO
  user_profiles (
    email,
    password,
    first_name,
    last_name,
    gender,
    user_age,
    zipcode,
    bio,
    status,
    topic_id,
    profile_pic
  )
VALUES
  (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11
  )
  RETURNING *;