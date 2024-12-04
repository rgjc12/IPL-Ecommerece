import KKRProduct from "../Models/kkrProduct.js";

const addkkrproduct = async (req, res) => {
    try {
      const { name, description, price, isTrending, imageUrl } = req.body;
  
      if (!name || !description || !price) {
        return res.status(400).json({ success: false, msg: "Name, description, and price are required" });
      }
  
      const imageLinks = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
      const [img1, img2, img3, img4] = [imageLinks[0] || null, imageLinks[1] || null, imageLinks[2] || null, imageLinks[3] || null];
  
      const newProduct = new KKRProduct({
        name,
        description,
        price,
        imageUrl: [img1, img2, img3, img4],
        isTrending: isTrending || Math.random() < 0.5,
      });
  
      await newProduct.save();
      res.status(201).json({ success: true, msg: "KKR Product added successfully", product: newProduct });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  };
  
  


  const listkkrproducts = async (req, res) => {
    try {
      const products = await KKRProduct.find(); // Fetch all products from the KKR collection
      res.json({
        success: true,
        data: products,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        msg: "Failed to fetch KKR products",
      });
    }
  };





  

const singlekkrproduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract the product ID from the request parameters
    const product = await KKRProduct.findById(id); // Find the product by its ID

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Failed to fetch product details",
    });
  }
};
export{listkkrproducts,singlekkrproduct,addkkrproduct}