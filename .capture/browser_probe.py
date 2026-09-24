import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

root = Path(__file__).resolve().parent
options = Options()
options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument(f"--user-data-dir={root / 'selenium-profile'}")
driver = webdriver.Chrome(options=options)
try:
    driver.set_window_size(1440, 900)
    driver.get("https://huong-vi-viet.vercel.app/")
    time.sleep(5)
    print("title:", ascii(driver.title))
    print("url:", driver.current_url)
    print("height:", driver.execute_script("return document.documentElement.scrollHeight"))
    print("links:", [(ascii(x.text), x.get_attribute("href")) for x in driver.find_elements("tag name", "a")][:20])
    print("text:", ascii(driver.find_element("tag name", "body").text[:2000]))
    driver.save_screenshot(str(root / "selenium-huong-home.png"))
finally:
    driver.quit()
