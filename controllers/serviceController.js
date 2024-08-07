import Service from '../model/service.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services.length)
      return res.status(204).json({ message: 'No services found' });

    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, features, image } = req.body;

    if (!title || !description || !features || !image)
      return res.status(400).json({
        message: 'title, description, features, and image are required',
      });

    const newService = new Service({
      title,
      description,
      features,
      image,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, features, image } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { title, description, features, image },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService)
      return res.status(404).json({ message: 'Service not found' });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
