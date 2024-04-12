from flask import jsonify
from BackEnd.dao.users import UserDAO


class UserHandler:

    def build_user_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['user_type'] = row[1]
        result['user_birthday'] = row[2]
        result['user_fname'] = row[3]
        result['user_lname'] = row[4]
        result['user_phone'] = row[5]
        result['user_email'] = row[6]
        result['user_address'] = row[7]
        result['user_municipality'] = row[8]
        result['user_available'] = row[9]
        result['user_password'] = row[10]
        return result
    

    def build_user_attributes(self, user_id, user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password):
        result = {}
        result['user_id'] = user_id
        result['user_type'] = user_type
        result['user_birthday'] = user_birthday
        result['user_fname'] = user_fname
        result['user_lname'] = user_lname
        result['user_phone'] = user_phone
        result['user_email'] = user_email
        result['user_address'] = user_address
        result['user_municipality'] = user_municipality
        result['user_available'] = user_available
        result['user_password'] = user_password
        return result
    

    def getAllUsers(self):
        dao = UserDAO()
        users_list = dao.getAllUsers()
        result_list = []
        for row in users_list:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Users=result_list)
    

    def getUserById(self, user_id):
        dao = UserDAO()
        row = dao.getUserById(user_id)
        if not row:
            return jsonify(Error="User Not Found"), 404
        else:
            user = self.build_user_dict(row)
        return jsonify(User=user)
    
    
    def login(self, form):
        dao = UserDAO()
        if len(form) != 2:
            return jsonify(Error="Malformed login request"), 404
        else:
            user_email = form['user_email']
            user_password = form['user_password']
            row = dao.login(user_email, user_password)
            if not row:
                return jsonify(Error="User Not Found"), 404
            else:
                user = self.build_user_dict(row)
            return jsonify(User=user)
        

    def updateUser(self, user_id, form):
        dao = UserDAO()
        if not dao.getUserById(user_id):
            return jsonify(Error = "User Not Found"), 404
        else:
            if len(form) != 10:
                return jsonify(Error="Malformed update request"), 404
            else:
                user_type = form['user_type']
                user_birthday = form['user_birthday']
                user_fname = form['user_fname']
                user_lname = form['user_lname']
                user_phone = form['user_phone']
                user_email = form['user_email']
                user_address = form['user_address']
                user_municipality = form['user_municipality']
                user_available = form['user_available']
                user_password = form['user_password']
                if user_type and user_birthday and user_fname and user_lname and user_phone and user_email and user_address and user_municipality and user_available and user_password:
                    dao.update(user_id, user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password)
                    result = self.build_user_attributes(user_id, user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password)
                    return jsonify(User=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400
    

    def insertUser(self, form):
        if len(form) != 10:
            return jsonify(Error="Malformed post request"), 400
        else:
            user_type = form['user_type']
            user_birthday = form['user_birthday']
            user_fname = form['user_fname']
            user_lname = form['user_lname']
            user_phone = form['user_phone']
            user_email = form['user_email']
            user_address = form['user_address']
            user_municipality = form['user_municipality']
            user_available = form['user_available']
            user_password = form['user_password']
            if user_type and user_birthday and user_fname and user_lname and user_phone and user_email and user_address and user_municipality and user_available and user_password:
                dao = UserDAO()
                user_id = dao.insert(user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password)
                result = self.build_user_attributes(user_id, user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password)
                return jsonify(User=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400
            
    
    def deleteUser(self, user_id):
        dao = UserDAO()
        if not dao.getUserById(user_id):
            return jsonify(Error = "User Not Found"), 404
        else:
            dao.delete(user_id)
            return jsonify(DeleteStatus="OK"), 200
           