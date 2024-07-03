from flask import jsonify, request
from flask import render_template
from app.models import Producto

def index():
    return render_template('index.html')

def get_all_productos():
    productos = Producto.get_all()
    list_productos = [producto.serialize() for producto in productos]
    return jsonify(list_productos)

def create_producto():
    #recepcionando los datos enviados en la peticion en formato JSON
    data = request.json
    new_producto = Producto(
        tipo=data['tipo'],
        modelo=data['modelo'],
        color=data['color'],
        talle=data['talle'],
        precio=data['precio']
    )
    new_producto.save()
    return jsonify({'message':'Producto cargado exitosamente'}), 201
    
def update_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404
    data = request.json
    producto.tipo = data['tipo']
    producto.modelo = data['modelo']
    producto.color = data['color']
    producto.talle = data['talle']
    producto.precio = data['precio']
    producto.save()
    return jsonify({'message': 'Producto actualizado exitosamente'})

def get_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404
    return jsonify(producto.serialize())

def delete_producto(producto_id):
    producto = Producto.get_by_id(producto_id)
    if not producto:
        return jsonify({'message': 'Producto no encontrado'}), 404
    producto.delete()
    return jsonify({'message': 'Producto eliminado exitosamente'})