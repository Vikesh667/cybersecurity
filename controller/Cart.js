

const Cart = require("../model/Cart");

const fetchCartByUser = async (req, res) => {
  try {
    const cartItem = await Cart.find({ user: req.user._id }).populate("product");
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const cart = new Cart({
      ...req.body,
      user: req.user._id // assumes middleware sets req.user
    });

    const doc = await cart.save();
    const result = await doc.populate("product"); // ✅ Use lowercase field name
    res.status(201).json(result);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(400).json({ message: "Failed to add to cart", error });
  }
};

const deleteCart=async(req,res)=>{
      const deletedItem=await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({ id: deletedItem._id })
}
const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    const result = await cart.populate("product"); // ✅ Fix here
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = { addToCart ,fetchCartByUser,deleteCart,updateCart};
