from BackEnd.config.credential import prjobs_config
import psycopg2

class MessagesDAO: 
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
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
    
    def getMessagesByUserId(self, user_id):
        cursor = self.conn.cursor()
        query = """
            SELECT 
                m.*, 
                CONCAT(u1.user_fname, ' ', u1.user_lname) AS user1_name, 
                u1.user_image AS user1_image, 
                CONCAT(u2.user_fname, ' ', u2.user_lname) AS user2_name, 
                u2.user_image AS user2_image
            FROM messages m
            INNER JOIN users u1 ON m.user_id1 = u1.user_id
            INNER JOIN users u2 ON m.user_id2 = u2.user_id
            WHERE m.user_id1 = %s OR m.user_id2 = %s;
            """
        cursor.execute(query, (user_id, user_id,))
        result = cursor.fetchall()
        return result

    
    def getMessagesbySender(self, user_id1):
         cursor = self.conn.cursor()
         query = "select * from messages where user_id1 = %s;"
         cursor.execute(query, (user_id1,))
         result = []
         for row in cursor:
            result.append(row)
         return result    
    
    def getMessagesbyReceiver(self, user_id2):
         cursor = self.conn.cursor()
         query = "select * from messages where user_id2 = %s;"
         cursor.execute(query, (user_id2,))
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
        query = "insert into messages(user_id1, user_id2, msg_content, msg_time) values (%s, %s, %s, %s) returning msg_id;"
        cursor.execute(query, (user_id1, user_id2, msg_content, msg_time,))
        msg_id = cursor.fetchone()[0]
        self.conn.commit()
        return msg_id