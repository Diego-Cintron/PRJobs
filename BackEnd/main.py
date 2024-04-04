from flask import Flask, jsonify, request, send_from_directory
from handlers.postings import PostingsHandler 
from handlers.company import CompanyHandler
from handlers.messages import MessagesHandler
from handlers.users import UserHandler
# Import Cross-Origin Resource Sharing to enable
# services on other ports on this machine or on other
# machines to access this app
from flask_cors import CORS, cross_origin

app = Flask(__name__)


# Apply CORS to this app
CORS(app)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/')
def greeting():
    return 'Hello, this is PRJobs!'


# ----- Users -----
# Insert a new User or get all Users
@app.route('/users', methods=['GET', 'POST'])
def getAllUsers():
    if request.method == 'GET':
        return UserHandler().getAllUsers()
    elif request.method == 'POST':
        data = request.json
        return UserHandler().insertUser(data)
    else:
        return jsonify(Error="Method not allowed."), 405
    
# Get User by ID, Update a User, or Delete a User
@app.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def searchByUserID(user_id):
    if request.method == 'GET':
        return UserHandler().getUserById(user_id)
    elif request.method == 'PUT':
        data = request.json
        return UserHandler().updateUser(user_id, data)
    elif request.method == 'DELETE':
        return UserHandler().deleteUser(user_id)
    else: 
        return jsonify(Error="Method not allowed!!!"), 405
    
@app.route('/users/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        return UserHandler().login(data)
    else:
        return jsonify(Error="Method not allowed."), 405


# ----- POSTINGS -----
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


# ----- Companies -----
# Insert a new Company or get all Companies
@app.route('/companies', methods=['GET', 'POST'])
def getAllCompanies():
    if request.method == 'GET':
        return CompanyHandler().getAllCompanies()
    elif request.method == 'POST':
        data = request.json
        return CompanyHandler().insertCompany(data)
    else:
        return jsonify(Error="Method not allowed."), 405
    
# Get User by ID, Update a User, or Delete a User
@app.route('/companies/<int:cm_id>', methods=['GET', 'PUT', 'DELETE'])
def searchByCompanyID(cm_id):
    if request.method == 'GET':
        return CompanyHandler().getCompanyByID(cm_id)
    elif request.method == 'PUT':
        data = request.json
        return CompanyHandler().updateCompany(cm_id, data)
    elif request.method == 'DELETE':
        return CompanyHandler().deleteCompany(cm_id)
    else: 
        return jsonify(Error="Method not allowed."), 405

# ----- Messages -----
@app.route('/messages', methods=["GET", "POST"])
def getMessage():
    if request.method == "GET":
        return MessagesHandler().getAllMessages()
    elif request.method == "POST":
        data = request.json
        return MessagesHandler().insertMessage(data)
    else:
        return jsonify("Not supported"), 405   

 
@app.route('/messages/ID/<int:msg_id>', methods=["GET", 'DELETE'])
def searchByMessagesID(msg_id):
    if request.method == 'GET':
        return MessagesHandler().getMessagesById(msg_id)
    elif request.method == 'DELETE':
        return MessagesHandler().deleteMessage(msg_id)
    else: 
        return jsonify("Not supported"), 405
    
@app.route('/messages/sender/<int:user_id1>', methods=["GET", 'DELETE'])
def searchByMessagesSender(user_id1):
    if request.method == 'GET':
        return MessagesHandler().getMessagesbySender(user_id1)
    elif request.method == 'DELETE':
        return MessagesHandler().deleteMessage(user_id1)
    else: 
        return jsonify("Not supported"), 405
    
@app.route('/messages/receiver/<int:user_id2>', methods=["GET", 'DELETE'])
def searchByMessagesReceiver(user_id2):
    if request.method == 'GET':
        return MessagesHandler().getMessagesbyReceiver(user_id2)
    elif request.method == 'DELETE':
        return MessagesHandler().deleteMessage(user_id2)
    else: 
        return jsonify("Not supported"), 405

if __name__ == '__main__':
    app.run(debug=True)