from urllib.parse import urlparse

import urllib


url = "https://rev-static.yogiyo.co.kr/franchise_logos/처갓집치킨_20151228_Franchise이미지약정서_crop_200x200_ZaH9UvS.jpg"
u = urlparse(url)
print(urllib.parse.quote(url))
