@auth.requires_signature()
def get_logo():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(logo=home_page_assets))
    else:
        return response.json(dict(logo=None))

def get_screenshot():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(screenshot=home_page_assets.screenshot))
    else:
        return response.json(dict(screenshot=None))

@auth.requires_signature()
def get_description():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(description=home_page_assets.description))
    else:
        return response.json(dict(description=None))

@auth.requires_signature()
def save_description():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        description = request.vars.description
    )

    return "success"

@auth.requires_signature()
def get_trailer_url():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(trailer_url=home_page_assets.trailer_url))
    else:
        return response.json(dict(trailer_url=None))

@auth.requires_signature()
def get_screenshots():
    home_page_screenshots = db(db.home_page_screenshots).select()

    screenshots = []
    for screenshot in home_page_screenshots:
        screenshots.append(screenshot)

    return response.json(dict(screenshots=screenshots))

def get_playtests():
    playtests = db(db.playtests).select()
    if (playtests):
        return response.json(dict(playtests=playtests))
    else:
        return response.json(dict(playtests=[]))

@auth.requires_signature()
def save_playtest():
    id = db.playtests.insert(
        title = request.vars.title,
        image = request.vars.image,
        playtest_date = request.vars.playtest_date,
        playtest_time = request.vars.playtest_time,
        playtest_location = request.vars.playtest_location,
        tagline = request.vars.tagline,
        description = request.vars.description
    )
    
    return response.json(dict(id=id))

@auth.requires_signature()
def delete_playtest():
    db(db.playtests.id == request.vars.id).delete()

    return "success"

@auth.requires_signature()
def save_logo():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        logo = request.vars.logo
    )

    return "success"

@auth.requires_signature()
def save_title_screenshot():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        screenshot = request.vars.screenshot
    )

    return "success"   

@auth.requires_signature()
def save_trailer():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        trailer_url = request.vars.trailer_url
    )

    return "success"

@auth.requires_signature()
def save_screenshot():
    id = db.home_page_screenshots.insert(
        img_src = request.vars.screenshot
    )

    return response.json(dict(id=id))

@auth.requires_signature()
def delete_screenshot():
    db(db.home_page_screenshots.id == request.vars.id).delete()
    return "success"
