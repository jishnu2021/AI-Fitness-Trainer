from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


AI_FOLDER = os.path.join(os.path.dirname(__file__))

@app.route('/run-python', methods=['POST'])
def run_python_script():
    try:
        
        script_path = os.path.join(AI_FOLDER, 'test.py')
        
        # Check if the script file exists
        if not os.path.isfile(script_path):
            return jsonify({'error': 'PoseModule.py not found'}), 404

        # Run the Python script and capture output
        result = subprocess.run(['python', script_path], capture_output=True, text=True)
        
        if result.returncode != 0:
            return jsonify({'error': result.stderr}), 500
        
        output = result.stdout
        return jsonify({'output': output}), 200

    except subprocess.CalledProcessError as e:
        return jsonify({'error': str(e)}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
