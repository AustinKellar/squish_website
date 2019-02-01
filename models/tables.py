db.define_table('home_page_assets',
    Field('logo', 'upload'),
    Field('trailer_url')
)

db.define_table('home_page_screenshots', 
    Field('img_src', 'upload')
)