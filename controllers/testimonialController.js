import Testimonial from '../model/testimonial.js';

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials.length)
      res.status(204).json({ message: 'No testimonials found' });

    res.json(testimonials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const { name, designation, image_uri, review } = req.body;

    if (!name || !designation || !image_uri || !review) {
      res.status(400).json({
        message: 'Name, Designation, Image_uri and Review are required',
      });
    }

    const newTestimonial = new Testimonial({
      name,
      designation,
      image_uri,
      review,
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(200).json(savedTestimonial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
