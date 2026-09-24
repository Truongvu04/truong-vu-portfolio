import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

root = Path(__file__).resolve().parent
options = Options()
options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
options.page_load_strategy = "eager"
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument(f"--user-data-dir={root / 'project-capture-profile'}")
driver = webdriver.Chrome(options=options)
try:
    driver.set_window_size(1440, 900)
    driver.get("https://huong-vi-viet.vercel.app/")
    time.sleep(4)
    driver.execute_script("window.scrollTo(0, 3100)")
    time.sleep(10)
    print(ascii(driver.execute_script("return [...document.images].map(i=>({src:i.currentSrc,naturalWidth:i.naturalWidth,top:Math.round(i.getBoundingClientRect().top),opacity:getComputedStyle(i).opacity})).filter(i=>i.top>-500&&i.top<1300)")))
    driver.save_screenshot(str(root / "huong-menu-loaded.png"))
    driver.execute_script("window.scrollTo(0, 4150)")
    time.sleep(8)
    print(ascii(driver.execute_script("return [...document.images].map(i=>({src:i.currentSrc,naturalWidth:i.naturalWidth,top:Math.round(i.getBoundingClientRect().top),opacity:getComputedStyle(i).opacity})).filter(i=>i.top>-500&&i.top<1300)")))
    driver.save_screenshot(str(root / "huong-space-loaded.png"))
    driver.execute_script("window.scrollTo(0, 1200)")
    time.sleep(6)
    driver.save_screenshot(str(root / "huong-story-loaded.png"))
    driver.execute_script("window.scrollTo(0, 5350)")
    time.sleep(6)
    driver.save_screenshot(str(root / "huong-reservation-loaded.png"))
finally:
    driver.quit()
