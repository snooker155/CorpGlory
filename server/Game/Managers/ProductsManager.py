__author__ = 'eduar'

from Game.Models.ProductModel import Product


def create_product(name):
    if not hasattr(create_product, 'id'):
        create_product.id = 0
    product = Product(name)

    product.id = create_product.id
    create_product.id += 1

    return product
