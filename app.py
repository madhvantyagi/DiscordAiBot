from flask import Flask, render_template, request, redirect, url_for, abort
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_EXTENSIONS'] = ['.mov', '.mp4', '.m4v', '.jpm', '.jp2', '.3gp', '.3g2', '.mkv', '.mpg', '.ogv', '.webm', '.wmv']
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024

@app.errorhandler(413)
def too_large(e):
    return "File is too large", 413

@app.route('/')
def index():
    return render_template('something.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        print(f"request.files: {request.files}")
        print(f"request.form: {request.form}")
        my_files = request.files
        formData = request.form['myFormData']

        with open("my_data.txt", "w") as my_data:
            my_data.write(formData)

        for item in my_files:
            uploaded_file = my_files.get(item)
            uploaded_file.filename = secure_filename(uploaded_file.filename)

            if uploaded_file.filename != '':
                file_ext = os.path.splitext(uploaded_file.filename)[1]
                if file_ext not in app.config['UPLOAD_EXTENSIONS']:
                    abort(400)
                print(f"file_ext: {file_ext}")
                uploaded_file.save("new" +uploaded_file.filename)

        return render_template('something.html')

    except KeyError:
        # Handle the case when 'myFormData' is not present in the form data
        print('missing form data')
        return "Missing form data", 400

    except Exception as e:
        # Handle any other exceptions
        print('An error occurred')
        app.logger.error(f"Error occurred: {str(e)}")
        return "An error occurred", 500