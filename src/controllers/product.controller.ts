import { Request, Response } from "express";
import { productService } from "../services";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await productService.getProducts();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId: string = req.params.productId;
    const product = await productService.getProduct(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json({
      success: true,
      message: "New product added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured adding product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId: string = req.params.productId;
    const updatedProductData = await productService.updateProduct(
      productId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Product data successfully updated",
      data: updatedProductData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.productId;
    await productService.deleteProduct(productId);
    res.status(204).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {}
};

export const searchProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const searchTerm: string = req.query.searchTerm as string;

    if (!searchTerm) {
      res.status(400).json({ message: "Search term is required" });
      return;
    }

    const result = await productService.searchProduct(searchTerm);
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
};
