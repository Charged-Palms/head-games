SELECT * FROM matches 
JOIN messages ON matches.match_id = messages.match_id
WHERE matches.match_id = 14