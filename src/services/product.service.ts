import Product, { IProduct } from "../models/product.model";

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find().exec();
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (
  newProductData: Partial<IProduct>
): Promise<IProduct> => {
  try {
    const newProduct = new Product(newProductData);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  updatedProductData: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw error;
  }
};

export const searchProduct = async (
  searchTerm: string
): Promise<IProduct[]> => {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
      ],
    }).exec();
    return products;
  } catch (error) {
    throw error;
  }
};
