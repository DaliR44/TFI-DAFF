from app.database import get_db

class Producto:

    #constuctor
    def __init__(self,id_producto=None,tipo=None,modelo=None,color=None,talle=None,precio=None):
        self.id_producto=id_producto
        self.tipo=tipo
        self.modelo=modelo
        self.color=color
        self.talle=talle
        self.precio=precio

    def serialize(self):
        return {
            'id_producto': self.id_producto,
            'tipo': self.tipo,
            'modelo': self.modelo,
            'color': self.color,
            'talle': self.talle,
            'precio': self.precio
        }
  
    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        query = "SELECT * FROM productos"
        cursor.execute(query)
        rows = cursor.fetchall() #Me devuelve un lista de tuplas

        productos = [Producto(id_producto=row[0], tipo=row[1], modelo=row[2], color=row[3], talle=row[4], precio=row[5]) for row in rows]


        cursor.close()
        return productos
        

    @staticmethod
    def get_by_id(producto_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM productos WHERE id_producto = %s", (producto_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Producto(id_producto=row[0], tipo=row[1], modelo=row[2], color=row[3], talle=row[4], precio=row[5])
        return None
    
    """
    Insertar un registro si no existe el atributo id_producto
    """
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_producto:
            cursor.execute("""
                UPDATE productos SET tipo = %s, modelo = %s, color = %s, talle = %s, precio = %s
                WHERE id_producto = %s
            """, (self.tipo, self.modelo, self.color, self.talle, self.precio, self.id_producto))
        else:
            cursor.execute("""
                INSERT INTO productos (tipo, modelo, color, talle, precio) VALUES (%s, %s, %s, %s, %s)
            """, (self.tipo, self.modelo, self.color, self.talle, self.precio))
            self.id_producto = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM productos WHERE id_producto = %s", (self.id_producto,))
        db.commit()
        cursor.close()
