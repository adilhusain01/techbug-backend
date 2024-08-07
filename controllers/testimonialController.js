import Testimonial from '../model/testimonial.js';

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials.length)
      return res.status(204).json({ message: 'No testimonials found' });

    res.json(testimonials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, designation, image_uri, review } = req.body;

    if (!name || !designation || !image_uri || !review)
      return res.status(400).json({
        message: 'name, designation, image_uri and review are required',
      });

    const newTestimonial = new Testimonial({
      name,
      designation,
      image_uri,
      review,
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, image_uri, review } = req.body;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, designation, image_uri, review },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedTestimonial)
      return res.status(404).json({ message: 'Testimonial not found' });

    res.json(updatedTestimonial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial)
      return res.status(404).json({ message: 'Testimonial not found' });

    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
