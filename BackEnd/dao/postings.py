from config.credential import prjobs_config
import psycopg2

class PostingsDAO:

    def __init__(self):
        connection_url = "name=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url)


    def getAllPostings(self):
        cursor = self.conn.cursor()
        query = "select * from postings;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    

    def getPostingById(self, post_id):
        cursor = self.conn.cursor()
        query = "select * from postings where post_id = %s;"
        cursor.execute(query, (post_id,))
        result = cursor.fetchone()
        return result
    

    def getPostingsByUserId(self, user_id):
        cursor = self.conn.cursor()
        query = "select * from postings where user_id = %s;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    

    def update(self, post_id, user_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires):
        cursor = self.conn.cursor()
        query = "update postings set user_id = %s, post_title = %s, post_description = %s, post_address = %s, post_municipality = %s, post_uploaded = %s, post_expires = %s where post_id = %s;"
        cursor.execute(query, (user_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires, post_id,))
        self.conn.commit()
        return post_id
    

    def insert(self, user_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires):
        cursor = self.conn.cursor()
        query = "insert into postings(user_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires) values (%s, %s, %s, %s, %s, %s, %s) returning post_id;"
        cursor.execute(query, (user_id, post_title, post_description, post_address, post_municipality, post_uploaded, post_expires,))
        post_id = cursor.fetchone()[0]
        self.conn.commit()
        return post_id
    

    def delete(self, user_id):
        cursor = self.conn.cursor()
        query = "delete from postings where post_id = %s;"
        cursor.execute(query)
        self.conn.commit()
        return user_id