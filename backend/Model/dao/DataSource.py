import psycopg2

class DataSource:
    conn = None

    #connection setting
    def __init__ (self):
        try:
            self.conn = psycopg2.connect("postgresql://postgres:tAuOglxNbdHnuMwVq7ZL@containers-us-west-115.railway.app:5588/railway")
           
        except psycopg2.OperationalError as error:
            print(error)
            self.conn.close()
    

    #close connection
    def __def__(self):
        if self.conn is not None:
            self.conn.close()