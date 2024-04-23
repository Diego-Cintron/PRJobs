from BackEnd.config.credential import prjobs_config
import psycopg2

class UserDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url)


    def getAllUsers(self):
        cursor = self.conn.cursor()
        query = "select * from users;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    

    def getUserById(self, user_id):
        cursor = self.conn.cursor()
        query = "select * from users where user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        return result
    
    def login(self, user_email, user_password):
        cursor = self.conn.cursor()
        query = "select * from users where user_email = %s and user_password = %s;"
        cursor.execute(query, (user_email, user_password,))
        result = cursor.fetchone()
        return result
    

    def update(self, user_id, user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password, user_skills, user_image):
        cursor = self.conn.cursor()
        query = "update users set user_type = %s, user_birthday = %s, user_fname = %s, user_lname = %s, user_phone = %s, user_email = %s, user_address = %s, user_municipality = %s, user_available = %s, user_password = %s, user_skills = %s, user_image = %s where user_id = %s;"
        cursor.execute(query, (user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password, user_skills, user_image, user_id,))
        self.conn.commit()
        return user_id
    

    def insert(self, user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password, user_skills, user_image):
        cursor = self.conn.cursor()
        query = "insert into users(user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password, user_skills, user_image) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning user_id;"
        cursor.execute(query, (user_type, user_birthday, user_fname, user_lname, user_phone, user_email, user_address, user_municipality, user_available, user_password, user_skills, user_image,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id
    

    def delete(self, user_id):
        cursor = self.conn.cursor()
        query = "delete from users where user_id = %s;"
        cursor.execute(query)
        self.conn.commit()
        return user_id