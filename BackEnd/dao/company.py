from BackEnd.config.credential import prjobs_config
import psycopg2

class CompanyDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def getAllCompanies(self):
        cursor = self.conn.cursor()
        query = "select * from companies;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    
    def getCompanyByID(self, cm_id):
        cursor = self.conn.cursor()
        query = "select * from companies where cm_id = %s;"
        cursor.execute(query, (cm_id,))
        result = cursor.fetchone()
        return result
    
    def getCompanyByName(self, cm_name):
        cursor = self.conn.cursor()
        query = "select * from companies where cm_name = %s;"
        cursor.execute(query, (cm_name,))
        result = cursor.fetchone()
        return result
    
    def getCompanyNameByID(self, cm_id):
        cursor = self.conn.cursor()
        query = "select cm_name from companies where cm_id = %s;"
        cursor.execute(query, (cm_id,))
        result = cursor.fetchone()
        return result
    
    ''' Maybe should add getCompanyByEmail and getCompanyByPhone ? '''
    
    # Update Function
    def update(self, cm_id, cm_name, cm_phone, cm_email, cm_description, cm_logo):
        cursor = self.conn.cursor()
        query = "update companies set cm_name = %s, cm_phone = %s, cm_email = %s, cm_description = %s, cm_logo = %s where cm_id = %s;"
        cursor.execute(query, (cm_name, cm_phone, cm_email, cm_description, cm_logo, cm_id,))
        self.conn.commit()
        return cm_id
    
    # Insert Function
    def insert(self, cm_name, cm_phone, cm_email, cm_description, cm_logo):
        cursor = self.conn.cursor()
        query = "insert into companies(cm_name, cm_phone, cm_email, cm_description, cm_logo) values (%s, %s, %s, %s, %s) returning cm_id;"
        cursor.execute(query, (cm_name, cm_phone, cm_email, cm_description, cm_logo,))
        cm_id = cursor.fetchone()[0]
        self.conn.commit()
        return cm_id
    
    # Delete Function
    def delete(self, cm_id):
        cursor = self.conn.cursor()
        query = "delete from companies where cm_id = %s;"
        cursor.execute(query, (cm_id,))
        self.conn.commit()
        return cm_id
    