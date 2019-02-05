db.define_table('home_page_assets',
    Field('logo', 'text'),
    Field('trailer_url')
)

db.define_table('home_page_screenshots', 
    Field('img_src', 'text', requires=IS_LENGTH(1200000))
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