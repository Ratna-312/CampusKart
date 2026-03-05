"""
CampusKart - Share via localhost.run (free, no signup)
"""
import subprocess
import threading
import http.server
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def start_server():
    handler = http.server.SimpleHTTPRequestHandler
    server = http.server.HTTPServer(("", PORT), handler)
    print(f"  Local server on http://localhost:{PORT}")
    server.serve_forever()

thread = threading.Thread(target=start_server, daemon=True)
thread.start()

print("")
print("=" * 56)
print("  CampusKart - Creating shareable link...")
print("=" * 56)
print("")

try:
    proc = subprocess.Popen(
        ["ssh", "-o", "StrictHostKeyChecking=no", "-R", f"80:localhost:{PORT}", "nokey@localhost.run"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding='utf-8',
        errors='replace'
    )
    for line in proc.stdout:
        line = line.strip()
        if line:
            print(f"  {line}")
        if "https://" in line:
            parts = line.split()
            for part in parts:
                if part.startswith("https://"):
                    url = part.rstrip(",").rstrip()
                    print("")
                    print("  " + "=" * 50)
                    print(f"  SHAREABLE URL: {url}")
                    print("  Share this link with anyone!")
                    print("  " + "=" * 50)
                    print("")
                    break
    proc.wait()
except KeyboardInterrupt:
    print("\nShutting down...")
    proc.terminate()
except Exception as e:
    print(f"\n  Error: {e}")
    print(f"  Try opening http://localhost:{PORT} locally instead.")
    input("\n  Press Enter to exit...")
