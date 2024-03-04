from flask import Flask, jsonify, request
from handlers.postings import PostingsHandler 
from handlers.searchers import SearchersHandler
# Import Cross-Origin Resource Sharing to enable
# services on other ports on this machine or on other
# machines to access this app
from flask_cors import CORS, cross_origin

app = Flask(__name__)


# Apply CORS to this app
CORS(app)

@app.route('/')
def greeting():
    return 'Hello, this is PRJobs!'

# Insert a new Posting or get all Postings
@app.route('/postings', methods=['GET', 'POST'])
def getAllPostings():
    if request.method == 'GET':
        return PostingsHandler().getAllPostings()
    elif request.method == 'POST':
        data = request.json
        return PostingsHandler().insertPosting(data)
    else:
        return jsonify(Error="Method not allowed."), 405


# Get posting by ID, Update a posting, or Delete a posting
@app.route('/postings/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def searchByPostID(post_id):
    if request.method == 'GET':
        return PostingsHandler().getPostingById(post_id)
    elif request.method == 'PUT':
        data = request.json
        return PostingsHandler().updatePosting(post_id, data)
    elif request.method == 'DELETE':
        return PostingsHandler().deletePosting(post_id)
    else: 
        return jsonify(Error="Method not allowed!!!"), 405

# Get all Postings by user_id
@app.route('/postings/user/<int:user_id>', methods=['GET'])
def user_postings(user_id):
    return PostingsHandler().getPostingByUserId(user_id)

@app.route('/searchers', methods=["GET", "PUT"])
def getSearchers(user_id):
    if request.method == "GET":
        return SearchersHandler().getAllSearchers(user_id)
    elif request.method == "PUT":
        args = request.json
        return SearchersHandler().updateSearchers(user_id, args)
    else:
        return jsonify("Not supported"), 405

if __name__ == '__main__':
    app.run(debug=True)
