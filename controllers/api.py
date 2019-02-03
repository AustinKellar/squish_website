def get_logo():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(logo=home_page_assets.logo))
    else:
        return response.json(dict(logo=None))

def get_trailer_url():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(trailer_url=home_page_assets.trailer_url))
    else:
        return response.json(dict(trailer_url=None))

def get_screenshots():
    home_page_screenshots = db(db.home_page_screenshots).select()

    screenshots = []
    for index, screenshot in enumerate(home_page_screenshots):
        screenshots.append(dict(img=screenshot.img_src, index=index))

    return response.json(dict(screenshots=screenshots))
