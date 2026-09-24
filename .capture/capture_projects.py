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
    targets = [
        ("huong-home", "https://huong-vi-viet.vercel.app/", [1900, 2800, 3600, 4400, 5200]),
        ("auralis", "https://headphone-azure.vercel.app/", [3950, 4300]),
    ]
    for name, url, positions in targets:
        driver.get(url)
        time.sleep(5)
        height = driver.execute_script("return document.documentElement.scrollHeight")
        headings = driver.execute_script("return [...document.querySelectorAll('h1,h2,h3')].map(e=>({text:e.innerText.slice(0,70),y:Math.round(e.getBoundingClientRect().top+scrollY)}))")
        print(name, "title=", ascii(driver.title), "height=", height, "headings=", ascii(headings), flush=True)
        for y in positions:
            driver.execute_script("window.scrollTo({top: arguments[0], behavior: 'instant'})", y)
            time.sleep(1.5)
            path = root / f"{name}-{y}.png"
            driver.save_screenshot(str(path))
            print("saved", path.name, flush=True)
finally:
    driver.quit()
