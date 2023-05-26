from Model.dao.DataSource import DataSource

class PQRDAO():
    conn = DataSource().conn

    def getPQR(self):
        with self.conn.cursor() as cur:
            try:
                cur.execute("""
                    select * from PQR
                """)

                return cur.fetchall()
            except Exception as err:
                print(err)


    def setPQR(self, title: str, name: str, answer : str, idType: int):
        try:
            with self.conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO PQR (titulo, nombre, respuesta, tipo)
                    VALUES (%(title)s, %(name)s, %(answer)s, %(idType)s)
                """, {'title': title, 'name': name, 'answer': answer, 'idType':idType})

                self.conn.commit()
                return True

        except Exception as err:
            print(err)
            return False