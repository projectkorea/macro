# activate
# py crwal.py

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
import time

options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
driver = webdriver.Chrome(options=options)
driver.get("https://arca.live/b/random")
file = open("nameArray.txt", "w", encoding='utf-8');

for paragraph in range(2, 45): 
    parents = driver.find_elements_by_css_selector(".user-info")
    for parent in parents:
        child = parent.find_element_by_tag_name("span").get_attribute("data-filter")
        modified_child = child.split("_", 1)[0]
        file.write('\n'+modified_child)
    driver.get("https://arca.live/b/random?p={}".format(paragraph))

file.close()
driver.quit()
