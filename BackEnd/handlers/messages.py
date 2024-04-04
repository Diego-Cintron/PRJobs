from flask import jsonify
from BackEnd.dao.messages import MessagesDAO
from datetime import datetime

class MessagesHandler:
    def build_messages_dict(self, row):
        result = {}
        result['msg_id'] = row[0]
        result['user_id1'] = row[1]
        result['user_id2'] = row[2]
        result['msg_content'] = row[3]
        result['msg_time'] = row[4]
        return result
    
    def build_messages_attributes(self, msg_id, user_id1, user_id2, msg_content, msg_time):
        result = {}
        result['msg_id'] = msg_id
        result['user_id1'] = user_id1
        result['user_id2'] = user_id2
        result['msg_content'] = msg_content
        result['msg_time'] = msg_time
        return result

    def getAllMessages(self):
        dao = MessagesDAO()
        message_list = dao.getAllMessages()
        result_list = []
        for row in message_list:
            result = self.build_messages_dict(row)
            result_list.append(result)
        return jsonify({"Messages" : result_list}), 200

    def getMessagesById(self, msg_id):
        dao = MessagesDAO()
        row = dao.getMessagesById(msg_id) 
        if not row:
            return jsonify(Error = "Message Not Found"), 404
        else:
            message = self.build_messages_dict(row)
            return jsonify({"Message" : message}), 200
        
    def getMessagesbySender(self, user_id1):
        dao = MessagesDAO()
        messages = dao.getMessagesbySender(user_id1)
        result_list = []
        for row in messages:
            result = self.build_messages_dict(row)
            result_list.append(result)
        return jsonify(Message=result_list) 
        
    def getMessagesbyReceiver(self, user_id2):
        dao = MessagesDAO()
        messages = dao.getMessagesbyReceiver(user_id2)
        result_list = []
        for row in messages:
            result = self.build_messages_dict(row)
            result_list.append(result)
        return jsonify(Message=result_list) 
        
    def getMessagesbyContent(self, msg_content):
        dao = MessagesDAO()
        row = dao.getMessagesbyContent(msg_content)
        if not row:
            return jsonify(Error="Message Not Found"), 404
        else:
            message = self.build_messages_dict(row)
            return jsonify(Message=message)
        
    def getMessagesbyTime(self, msg_time):
        dao = MessagesDAO()
        row = dao.getMessagesbyTime(msg_time)
        if not row:
            return jsonify(Error="Message Not Found"), 404
        else:
            message = self.build_messages_dict(row)
            return jsonify(Message=message)


    def insertMessage(self, form):
        print("form: ", form)
        if len(form) != 4:
            return jsonify(Error = "Malformed post request"), 400
        else:
            user_id1 = form['user_id1']
            user_id2 = form['user_id2']
            msg_content = form['msg_content']
            msg_time = datetime.now()
            if user_id1 and user_id2 and msg_content and msg_time:
                dao = MessagesDAO()
                msg_id = dao.insert(user_id1, user_id2, msg_content, msg_time)
                result = self.build_messages_attributes(msg_id, user_id1, user_id2, msg_content, msg_time)
                return jsonify(Message=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400

    def deleteMessage(self, msg_id):
        dao = MessagesDAO()
        if not dao.getMessagesById(msg_id):
            return jsonify(Error = "Message not found."), 404
        else:
            dao.delete(msg_id)
            return jsonify(DeleteStatus = "OK"), 200

    def updateMessage(self, msg_id, form):
        dao = MessagesDAO()
        if not dao.getMessagesById(msg_id):
            return jsonify(Error = "Message not found."), 404
        else:
            if len(form) != 4:
                return jsonify(Error="Malformed update request"), 400
            else:
                user_id1 = form['user_id1']
                user_id2 = form['user_id2']
                msg_content = form['msg_content']
                msg_time = datetime.now()
                if user_id1 and user_id2 and msg_content and msg_time:
                    dao = MessagesDAO()
                    msg_id = dao.insert(user_id1, user_id2, msg_content, msg_time)
                    result = self.build_messages_attributes(msg_id, user_id1, user_id2, msg_content, msg_time)
                    return jsonify(Message=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400