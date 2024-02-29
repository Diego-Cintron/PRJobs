from config.credential import prjobs_config
import psycopg2


class SetupTables:
    def __init__(self):
        self.sql_commands = None
        connection_url = "name=%s user=%s password=%s port=%s host=%s" % (
            prjobs_config['name'],
            prjobs_config['user'],
            prjobs_config['password'],
            prjobs_config['port'],
            prjobs_config['host'])
        self.conn = psycopg2.connect(connection_url, sslmode='require')

    def loadSqlFile(self, filename: str):
        try:
            fd = open(filename, 'r')
            sqlFile = fd.read()
            fd.close()

        except IOError as msg:
            print("ERROR: ", msg)
            return
        sqlCommands = sqlFile.split(';')
        if sqlCommands[len(sqlCommands)-1] == '':
            sqlCommands.pop()
        print("THE LAST  ", sqlCommands[len(sqlCommands)-1])
        self.sql_commands = sqlCommands
        print("Commands successfully loaded")

    def create(self):
        if self.sql_commands is not None:
            cursor = self.conn.cursor()
            for command in self.sql_commands:
                try:
                    print("COMMAND: ", command)
                    print("----------------------------")
                    cursor.execute(command)
                    self.conn.commit()
                except psycopg2.OperationalError as msg:
                    print("Command skipped: ", msg)
                    return "FAILURE"
            return "SUCCESS"
        else:
            return 'Cannot create table, no commands!'
