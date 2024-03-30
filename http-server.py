import http.server
import os
from urllib.parse import unquote

FOLDER_1 = '.\\build'
FOLDER_2 = 'I:\\git\\forensicmate-static-analysis\\output\\whatsapp-2.23.23.78'

class DualFolderHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = unquote(path)
        for folder in [FOLDER_1, FOLDER_2]:
            # Construct potential file path
            potential_path = os.path.join(folder, path.lstrip('/'))
            # If the file/directory exists in the current folder, use this path
            if os.path.exists(potential_path):
                return potential_path
        # If the file is not found in either folder, use the original method's behavior,
        # which will lead to a 404 error if the file does not exist.
        return super().translate_path(path)

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, DualFolderHTTPRequestHandler)
    print(f"Serving HTTP on port 8000...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.socket.close()