import re
from urllib.parse import urljoin
import requests

for url in (
    "https://huong-vi-viet.vercel.app/",
    "https://headphone-azure.vercel.app/",
):
    response = requests.get(url, timeout=20)
    print(url, response.status_code, len(response.content))
    scripts = re.findall(r'<script[^>]+src="([^"]+)', response.text)
    print("scripts:", scripts)
    for script in scripts:
        source = requests.get(urljoin(url, script), timeout=20).text
        print("bundle length:", len(source))
        print("anchors:", sorted(set(re.findall(r'href:\s*["\'](#[\w-]+)', source)))[:50])
        print("ids:", sorted(set(re.findall(r'id:\s*["\']([\w-]+)', source)))[:80])
        print("paths:", sorted(set(re.findall(r'(?:path|href|to):\s*["\'](/[\w-]+)', source)))[:80])
        print("route strings:", sorted(set(re.findall(r'["\'](/[a-z0-9-]{2,})["\']', source)))[:80])
        print("assets:", sorted(set(re.findall(r'[\w./-]+\.(?:webp|png|jpg|jpeg)', source)))[:50])
