db.define_table('home_page_assets',
    Field('logo', 'text'),
    Field('trailer_url')
)

db.define_table('home_page_screenshots', 
    Field('img_src', 'text', requires=IS_LENGTH(1200000))
)