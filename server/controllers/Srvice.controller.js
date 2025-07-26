import cloudinary from "../utils/cloudinary.js";
import Service from "../models/Service.model.js";

// router.post("/create", upload.single("image"), 

export const createService = async (req, res) => {
  try {
    const result =  cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "services" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: "Cloudinary upload failed" });

        const newService = new Service({
          type: req.body.type,
          description: req.body.description,
          price: req.body.price,
          state: req.body.state,
          city: req.body.city,
          providerName: req.body.providerName,
          pincode: req.body.pincode,
          imageUrl: result.secure_url,
        });

        await newService.save();
        return res.status(201).json({ 
          message: "Service created", 
          service: newService 
        });
      }
    );

    // Send buffer to Cloudinary
    result.end(req.file.buffer);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getServices = async (req,res) => {
  try {
    const services = await Service.find({})
    if(!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    return res.status(200).json(services);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
    
  }
}


export const getServicesById = async (req, res) => {
  const {serviceId}  = req.params;
  // console.log("Service ID:", serviceId);

  if (!serviceId || serviceId === "undefined") {
    return res.status(400).json({ error: "Invalid or missing service ID" });
  }

  try {
    const providers = await Service.findById( serviceId );
    return res.json(providers);
  } catch (err) {
    console.error(err);
    returnres.status(500).json({ error: "Server error" });
  }
};
