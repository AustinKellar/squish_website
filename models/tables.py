db.define_table('home_page_assets',
    Field('logo', 'text'),
    Field('screenshot', 'text', requires=IS_LENGTH(12000000)),
    Field('trailer_url'),
    Field('description', 'text')
)

db.define_table('home_page_media', 
    Field('img_src', 'text', requires=IS_LENGTH(12000000)),
    Field('caption')
)

db.define_table('playtests',
    Field('title'),
    Field('image', 'text', requires=IS_LENGTH(12000000)),
    Field('playtest_date'),
    Field('playtest_time'),
    Field('playtest_location'),
    Field('tagline'),
    Field('description')
)

db.define_table('team_members',
    Field('name'),
    Field('title'),
    Field('image', 'text', requires=IS_LENGTH(12000000)),
    Field('bio', 'text'),
    Field('funny_bio', 'text'),
    Field('linkedin'),
    Field('portfolio'),
    Field('itchio'),
    Field('soundcloud'),
    Field('github')
)