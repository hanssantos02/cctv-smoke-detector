import json
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

urls = [
    'https://makerlab.ph/products/raspberry-pi-4-model-b.js',
    'https://makerlab.ph/products/adc-16-bit-4-channel-ads1115.js',
    'https://makerlab.ph/products/fr4-universal-protoboard-pcb-double-sided.js',
    'https://makerlab.ph/products/weatherproof-enclosure-ip65-nema-4-abs-large.js',
    'https://makerlab.ph/products/40-pin-jumper-wires.js',
    'https://makerlab.ph/products/raspberry-pi-fan.js',
    'https://circuit.rocks/products/buzzer-module.js',
    'https://makerlab.ph/products/official-raspberry-pi-power-supply-5-1v-3a-usb-c-copy.js',
    'https://makerlab.ph/products/micro-sd-card-to-usb-adaptor-reader-c286.js',
    'https://makerlab.ph/products/raspberry-pi-4-heatsink-aluminum.js',
]

def read(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=25) as response:
            data = json.load(response)
        return {'url': url, 'title': data.get('title'), 'variants': [
            {k: v.get(k) for k in ('title', 'sku', 'price', 'available')}
            for v in data.get('variants', [])
        ]}
    except Exception as exc:
        return {'url': url, 'error': str(exc)}

results = list(ThreadPoolExecutor(max_workers=7).map(read, urls))
Path('tmp/review/retailer-prices.json').write_text(json.dumps(results, indent=2))
print(json.dumps(results, indent=2))
