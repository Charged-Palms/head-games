CREATE TABLE topics (
topic_id SERIAL PRIMARY KEY,
topic_name VARCHAR(50)
);

CREATE TABLE user_profiles (
user_id SERIAL PRIMARY KEY,
email VARCHAR(30),
password TEXT,
first_name VARCHAR(30),
last_name VARCHAR(30),
gender BOOLEAN,
user_age INTEGER,
profile_pic TEXT,
zipcode INTEGER,
bio TEXT,
status TEXT,
topic_id INTEGER REFERENCES topics(topic_id)
);

CREATE TABLE questions (
question_id SERIAL PRIMARY KEY,
question TEXT,
answer TEXT,
topic_id INTEGER REFERENCES topics(topic_id)
);

CREATE TABLE matches (
user_id INTEGER REFERENCES user_profiles(user_id),
matchee_id INTEGER REFERENCES user_profiles(user_id)
);

INSERT INTO topics (topic_name)
VALUES ('General'),
('Harry Potter'),
('Pokemon'),
('Star Wars'),
('JavaScript');

INSERT INTO user_profiles (email, password, first_name, last_name, gender, user_age, zipcode, bio, status, topic_id, profile_pic)
VALUES ('notyourordinaryemail@gmail.com', ':P', 'Evil', 'Catfish', true, 21, 456987, 'IZ HOOMAN TOO. LIKEZ DOIN HOOMAN THINGS. PREFERZ REEL HOOMANS.', 'NOT CATFIS, IZ HOOMAN', 2, 'https://previews.123rf.com/images/cthoman/cthoman1507/cthoman150705167/42829751-a-cartoon-illustration-of-an-evil-looking-catfish-.jpg'),
('buster.brown@bb.net', 'brb', 'Brownette', 'MacBuster', false, 25, 123655, 'I grew up in the wilds of Zambizia. I killed my first dodo at age 12. I like to ride wild wildebeasts.', 'Feelin Wild', 3, null),
('test.test@test.com', 'test', 'Test', 'MacGuyver', true, 19, 123655, 'TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST-TEST', 'TEST-TEST', 5, 'https://upload.wikimedia.org/wikipedia/commons/d/d3/IBM_Blue_Gene_P_supercomputer.jpg'),
('fluffyogurt@blueocean.gov', 'Oceans', 'Patrica', 'Wack', false, 20, 456987, 'I am an oceanographer with a love of marine life. I enjoy long dives off of reefs.', 'Saving oceans one drop at a time', 1, null),
('aaron@nordin.com', 'password', 'Aaron', 'Nordin', true, 999, 123655, 'I enjoy riding trucks on the beach', 'Developing truck bros', 4, null),
('kn0wlton@spencer.com', 'wordpass', 'Spencer', 'Knowlton', true, 999, 123655, 'I am the genius behind the concept of Head Games', 'Coding heads since 1989!', 1, null),
('des.furtick@devmtn.com', 'passTHEword', 'Desmond', 'Furtick', true, 999, 123655, 'I never give straight answers, but Im a cool guy anyways', 'Pro-coder', 5, null),
('theawesomeone@awesomest.gov', 'fantastic', 'Daniel', 'Lawyer', true, 999, 123655, 'I put data into this database, so I create all these accounts!', 'Incredibly awesome', 4, null),
('warmfuzzies@fuzz.fuzz', 'fuzz1', 'Amelia', 'Earhart', false, 28, 123655, 'I like hiking, running, football, soccer, basketball, tennis, swimming, bocce, and curling. I like sports.', 'I am not a pilot', 1, null);

INSERT INTO questions (question, answer, topic_id)
VALUES ('What is the capital of Spain?', 'Madrid', 1),
('Where is the fountain of youth located?', 'Lehi', 1),
('Which country did the US buy Alaska from?', 'Russia', 1),
('Which WW2 US ship received the most battle stars?', 'Enterprise', 1),
('What is the street name the Dursleys lived on?', 'Privet', 2),
('Who can turn into a dog?', 'Sirius', 2),
('What is Gryffindors first name?', 'Godric', 2),
('What are Dumbledors office passwords?', 'Candy', 2),
('What is the evolution of Feebas?', 'Milotic', 3),
('Which is a Hoenn starter?', 'Mudkip', 3),
('What should be a dragon type, but isnt?', 'Charizard', 3),
('What is the 359th pokemon in the national dex?', 'Absol', 3),
('What is the name of Darth Vaders personal ship?', 'Executor', 4),
('What is the name of the planet that the Death Star I blew up in Episode IV?', 'Alderaan', 4),
('What is the name of the jedi who told Anakin he was not made a jedi master?', 'Windu', 4),
('Who is the most hated character in the Star Wars universe?', 'Jar-Jar', 4),
('What is not a valid React child?', 'objects', 5),
('What datatype will .split() return?', 'array', 5),
('What is not a JavaScript datatype?', 'long long', 5),
('Which is a function?', 'reverse', 5);

INSERT INTO matches (user_id, matchee_id)
VALUES (1, 2),
(1, 4),
(3, 9),
(7, 2),
(7, 4),
(7, 9);

--match grid user matches
-- SELECT b.first_name, b.last_name, b.profile_pic, b.user_age, b.user_id FROM user_profiles a
-- JOIN (matches LEFT JOIN user_profiles b ON matches.matchee_id = b.user_id
-- )
-- on a.user_id = matches.user_id
-- WHERE a.user_id = 7;