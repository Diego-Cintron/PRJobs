from config.credential import prjobs_config
import psycopg2

class PosterDAO:

    def __init__(self):
        connection_url = "name=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def getAllPosters(self):
        cursor = self.conn.cursor()
        query = "select * from posters;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    
    # Get Poster by UserID
    def getPosterByUserID(self, user_id):
        cursor = self.conn.cursor()
        query = "select * from posters where user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        return result
    
    # Get Poster by Job Post ID
    def getPostersByPostID(self, jpost_id):
        cursor = self.conn.cursor()
        query = "select * from posters where jpost_id = %s;"
        cursor.execute(query, (jpost_id,))
        result = cursor.fetchone()
        return result
    
    # Get Poster by Company ID
    def getPostersByCompanyID(self, cm_id):
        cursor = self.conn.cursor()
        query = "select * from posters where cm_id = %s;"
        cursor.execute(query, (cm_id,))
        result = cursor.fetchone()
        return result
    
    # Update Function
    def update(self, user_id, jpost_id, cm_id):
        cursor = self.conn.cursor()
        query = "update posters set jpost_id = %s, cm_id = %s where user_id = %s;"
        cursor.execute(query, (jpost_id, cm_id, user_id,))
        self.conn.commit()
        return user_id
    
    # Insert Function
    ''' NEEDS REVISION -> regarding value being returned '''
    def insert(self, user_id, jpost_id, cm_id):
        cursor = self.conn.cursor()
        query = "insert into posters(user_id, jpost_id, cm_id) values (%s, %s, %s) returning user_id;"
        cursor.execute(query, (user_id, jpost_id, cm_id,))
        self.conn.commit()
        return user_id
    
    # Delete Function
    def delete(self, user_id):
        cursor = self.conn.cursor()
        query = "delete from posters where user_id = %s;"
        cursor.execute(query, (user_id,))
        self.conn.commit()
        return user_id
    