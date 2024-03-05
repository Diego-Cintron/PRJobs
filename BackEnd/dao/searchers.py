from config.credential import prjobs_config
import psycopg2

class SearchersDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url)

    #Get Info on Users Job Searchers
    def getAllSearchers(self):
        cursor = self.conn.cursor()
        query = "select * from searchers;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    
    def getSearchersByUserId(self, user_id):
        cursor = self.conn.cursor()
        query = "select user_id, user_region, schedule, user_address from searchers where user_id = %s;"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        return result
    
    def getSearcherbySchedule(self, schedule):
         cursor = self.conn.cursor()
         query = "select * from searchers where schedule = %s;"
         cursor.execute(query, (schedule,))
         result = []
         for row in cursor:
            result.append(row)
         return result    
    
    def getSearcherbyRegion(self, user_region):
         cursor = self.conn.cursor()
         query = "select * from searchers where user_region = %s;"
         cursor.execute(query, (user_region,))
         result = []
         for row in cursor:
            result.append(row)
         return result    
    
    def delete(self, user_id):
        cursor = self.conn.cursor()
        query = "delete from searchers where user_id = %s;"
        cursor.execute(query, (user_id,))
        self.conn.commit()
        return user_id
    
    def update(self, user_id, user_region, schedule, user_address):
        cursor = self.conn.cursor()
        query = "update searchers set user_region = %s, schedule = %s, user_address = %s where user_id = %s;"
        cursor.execute(query, (user_region, schedule, user_address,))
        self.conn.commit()
        return user_id
     
    def insert(self, user_region, schedule, user_address):
        cursor = self.conn.cursor()
        query = "insert into searchers(user_region, schedule, user_address) values (%s, %s, %s) returning user_id;"
        cursor.execute(query, (user_region, schedule, user_address,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id