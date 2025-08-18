-- Categories
INSERT INTO coupl_categories (id, name, description, order_index, parent_id) VALUES
(gen_random_uuid(),
 '{"sk":"Príprava na intimitu","en":"Preparing for Intimacy","de":"Vorbereitung auf Intimität"}',
 '{"sk":"Prostredie, atmosféra a mentálna príprava na intímne chvíle","en":"Setting, atmosphere and mental preparation for intimate moments","de":"Umgebung, Atmosphäre und mentale Vorbereitung auf intime Momente"}',
 1, NULL),
(gen_random_uuid(),
 '{"sk":"Maznanie a dotyky","en":"Cuddling and Touch","de":"Kuscheln und Berührung"}',
 '{"sk":"Rôzne druhy dotykov, masáže a fyzický kontakt","en":"Various types of touch, massage and physical contact","de":"Verschiedene Arten von Berührung, Massage und körperlichem Kontakt"}',
 2, NULL),
(gen_random_uuid(),
 '{"sk":"Komunikácia a verbálne prejavy","en":"Communication and Verbal Expression","de":"Kommunikation und verbaler Ausdruck"}',
 '{"sk":"Dirty talk, komplimenty a verbálna komunikácia počas intimity","en":"Dirty talk, compliments and verbal communication during intimacy","de":"Dirty Talk, Komplimente und verbale Kommunikation während der Intimität"}',
 3, NULL)
ON CONFLICT DO NOTHING;

-- Questions
INSERT INTO coupl_questions (id, category_id, question_type, text_male, text_female, description, is_reciprocal, order_index)
VALUES
(gen_random_uuid(),
 (SELECT id FROM coupl_categories WHERE name->>'sk'='Príprava na intimitu'),
 'single_choice',
 '{"sk":"Máš záujem o spoločné kúpele alebo sprchy s partnerkou?","en":"Are you interested in sharing baths or showers with your partner?"}',
 '{"sk":"Máš záujem o spoločné kúpele alebo sprchy s partnerom?","en":"Are you interested in sharing baths or showers with your partner?"}',
 '{"sk":"Spoločná hygiena a relax môže byť príjemným úvodom do intimity","en":"Shared hygiene and relaxation can be a nice introduction to intimacy"}',
 false, 1),
(gen_random_uuid(),
 (SELECT id FROM coupl_categories WHERE name->>'sk'='Príprava na intimitu'),
 'single_choice',
 '{"sk":"Aké osvetlenie preferuješ počas intímnych chvíľ?","en":"What lighting do you prefer during intimate moments?"}',
 '{"sk":"Aké osvetlenie preferuješ počas intímnych chvíľ?","en":"What lighting do you prefer during intimate moments?"}',
 '{"sk":"Osvetlenie môže výrazne ovplyvniť atmosféru a náladu","en":"Lighting can significantly affect atmosphere and mood"}',
 false, 2)
ON CONFLICT DO NOTHING;

-- Answer options
INSERT INTO coupl_answer_options (id, question_id, text, value, is_rejection, order_index) VALUES
(gen_random_uuid(),
 (SELECT id FROM coupl_questions WHERE text_male->>'sk' LIKE '%spoločné kúpele%'),
 '{"sk":"Áno, je to ideálny spôsob na relax a prepojenie","en":"Yes, it''s an ideal way to relax and connect"}',
 'ano_idealny', false, 1),
(gen_random_uuid(),
 (SELECT id FROM coupl_questions WHERE text_male->>'sk' LIKE '%spoločné kúpele%'),
 '{"sk":"Možno, záleží na nálade","en":"Maybe, depends on the mood"}',
 'mozno_nalada', false, 2),
(gen_random_uuid(),
 (SELECT id FROM coupl_questions WHERE text_male->>'sk' LIKE '%spoločné kúpele%'),
 '{"sk":"Nie, preferujem samostatnú prípravu","en":"No, I prefer individual preparation"}',
 'nie_samostatne', true, 3)
ON CONFLICT DO NOTHING;

-- Test sessions
INSERT INTO coupl_sessions (room_code, status) VALUES
('TEST01', 'waiting'),
('TEST02', 'waiting')
ON CONFLICT (room_code) DO NOTHING;

INSERT INTO coupl_participants (session_id, gender, nickname) VALUES
((SELECT id FROM coupl_sessions WHERE room_code='TEST01'),'male','Adam'),
((SELECT id FROM coupl_sessions WHERE room_code='TEST01'),'female','Eva')
ON CONFLICT DO NOTHING;
