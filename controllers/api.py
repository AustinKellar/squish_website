
# home page assets
@auth.requires_signature()
def get_logo():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(logo=home_page_assets))
    else:
        return response.json(dict(logo=None))

@auth.requires_signature()
def save_logo():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        logo = request.vars.logo
    )

    return "success"

def get_title_screenshot():
    home_page_assets = db(db.home_page_assets).select().first()
    if home_page_assets:
        return response.json(dict(title_screenshot=home_page_assets.screenshot))
    else:
        return response.json(dict(title_screenshot=None))

@auth.requires_signature()
def save_title_screenshot():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        screenshot = request.vars.screenshot
    )

    return "success"  

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
def save_trailer():
    db.home_page_assets.update_or_insert(
        db.home_page_assets.id == request.vars.id,
        trailer_url = request.vars.trailer_url
    )

    return "success"


# media

@auth.requires_signature()
def get_all_media():
    home_page_media = db(db.home_page_media).select()

    all_media = []
    for media in home_page_media:
        all_media.append(media)

    return response.json(dict(all_media=all_media))

@auth.requires_signature()
def save_media():
    id = db.home_page_media.insert(
        img_src = request.vars.media,
        caption = request.vars.caption
    )

    return response.json(dict(id=id))

@auth.requires_signature()
def delete_media():
    db(db.home_page_media.id == request.vars.id).delete()
    return "success"


# playtests

def get_playtests():
    playtests = db(db.playtests).select(orderby=~db.playtests.id)
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
