from config.credential import prjobs_config
import psycopg2

class MessagesDAO: 
    def __init__(self):
        connection_url = "name=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url)

    #Get Info on the Post by the users on the app
    def getAllMessages(self):
        cursor = self.conn.cursor()
        query = "select * from messages;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    
    def getMessagesById(self, msg_id):
        cursor = self.conn.cursor()
        query = "select msg_id, user_id1, user_id2, msg_content, msg_time from messages where msg_id = %s;"
        cursor.execute(query, (msg_id,))
        result = cursor.fetchone()
        return result
    
    def getMessagesbySender(self, user_id1):
         cursor = self.conn.cursor()
         query = "select * from messages where user_id1 = %s;"
         cursor.execute(query, (user_id1,))
         result = []
         for row in cursor:
            result.append(row)
         return result    
    
    def getMessagesbyContent(self, msg_content):
         cursor = self.conn.cursor()
         query = "select * from messages where msg_content = %s;"
         cursor.execute(query, (msg_content,))
         result = []
         for row in cursor:
            result.append(row)
         return result    
    
    def getMessagesbyTime(self, msg_time):
         cursor = self.conn.cursor()
         query = "select * from messages where msg_time = %s;"
         cursor.execute(query, (msg_time,))
         result = []
         for row in cursor:
            result.append(row)
         return result      
    
    def delete(self, msg_id):
        cursor = self.conn.cursor()
        query = "delete from messages where msg_id = %s;"
        cursor.execute(query, (msg_id,))
        self.conn.commit()
        return msg_id
    
    def update(self, msg_id, user_id1, user_id2, msg_content, msg_time):
        cursor = self.conn.cursor()
        query = "update messages set user_id1 = %s, user_id2 = %s, msg_content = %s, msg_time = %s where msg_id = %s;"
        cursor.execute(query, (user_id1, user_id2, msg_content, msg_time,))
        self.conn.commit()
        return msg_id
     
    def insert(self, user_id1, user_id2, msg_content, msg_time):
        cursor = self.conn.cursor()
        query = "insert into messages(user_id1, user_id2, msg_content, msg_time,) values (%s, %s, %s, %s, %s) returning msg_id;"
        cursor.execute(query, (user_id1, user_id2, msg_content, msg_time,))
        msg_id = cursor.fetchone()[0]
        self.conn.commit()
        return msg_id